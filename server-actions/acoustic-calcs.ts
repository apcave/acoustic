import axios from "axios";
import { iModel } from "@/lib/data-helpers";
const { CALC_HOST, CALC_EMAIL, CALC_PASS } = process.env;

interface iTokens {
  access: string;
  refresh: string;
}

let tokens: iTokens | null = null;

async function login(): Promise<iTokens> {
  // console.log("Logging in to the calculations server...");
  const response = await axios.post(`http://${CALC_HOST}/api/user/token/`, {
    email: CALC_EMAIL,
    password: CALC_PASS,
  });
  const tokens = response.data;
  // console.log("Login successful. JWTs:", tokens);
  return tokens;
}

async function refreshToken(refresh: string) {
  const response = await axios.post(
    `http://${CALC_HOST}/api/user/token/refresh/`,
    { refresh }
  );
  // console.log("response:", response.data);
  const access = response.data.access;
  //console.log("Token renewed. New JWT:", access);
  return access;
}

export async function keepAliveCalcs() {
  if (!tokens) {
    tokens = await login();
  }
}

async function getResults(model: iModel, tokens: iTokens): Promise<iModel> {
  try {
    const response = await axios.post(
      `http://${CALC_HOST}/api/composite/`,
      { data: model },
      {
        headers: {
          Authorization: `Bearer ${tokens.access}`,
        },
      }
    );
    return response.data as iModel;
  } catch (error: any) {
    if (error.response) {
      //console.error("Error response status:", error.response.status);
      //console.error("Error response data:", error.response.data);

      // Extract return_code and return_message
      const failedModel = error.response.data["payload"] as iModel;

      const returnCode = failedModel.results?.return_code || "Unknown Code";
      let returnMessage =
        failedModel.results?.return_message || "Unknown Message";
      returnMessage = returnMessage.replace(/^b'|\'$/g, ""); // Remove b' prefix and trailing '

      // Throw a new error with the extracted message
      throw new Error(`Code: ${returnCode}, Message: ${returnMessage}`);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
      throw new Error("No response received from the calculations server.");
    } else {
      // Something else happened while setting up the request
      console.error("Error message:", error.message);
      throw new Error(`Unexpected error: ${error.message}`);
    }
  }
}

// Next.js server posting to acoustic-calcs server.
export async function runAcousticCalcs(model: iModel): Promise<iModel> {
  if (!tokens) {
    tokens = await login();
  }

  try {
    return getResults(model, tokens);
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      // Token expired, refresh it
      try {
        tokens.access = await refreshToken(tokens.refresh);
        return getResults(model, tokens);
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          try {
            console.error("Token renewal failed, logging in again:", error);
            // If token renewal fails, log in again
            tokens = await login();
            // Retry the request with the new token
            return getResults(model, tokens);
          } catch (error) {
            console.error("Login failed:", error);
            throw new Error("Failed to log in to the calculations server.");
          }
        }
      }
    }
  }
}
