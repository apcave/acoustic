import axios from "axios";
import { iModel } from "@/lib/data-helpers";
const { CALC_HOST, CALC_EMAIL, CALC_PASS } = process.env;

interface iTokens {
  access: string;
  refresh: string;
}

let tokens: iTokens | null = null;

async function login(): Promise<iTokens> {
  console.log("Logging in to the calculations server...");
  const response = await axios.post(`http://${CALC_HOST}/api/user/token/`, {
    email: CALC_EMAIL,
    password: CALC_PASS,
  });
  const tokens = response.data;
  console.log("Login successful. JWTs:", tokens);
  return tokens;
}

async function refreshToken(refresh: string) {
  const response = await axios.post(
    `http://${CALC_HOST}/api/user/token/refresh/`,
    { refresh }
  );
  console.log("response:", response.data);
  const access = response.data.access;
  console.log("Token renewed. New JWT:", access);
  return access;
}

export async function keepAliveCalcs() {
  if (!tokens) {
    tokens = await login();
  }
}

export async function runAcousticCalcs(model: iModel): Promise<iModel> {
  if (!tokens) {
    tokens = await login();
  }

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
    if (error.response && error.response.status === 401) {
      try {
        // Token expired, refresh it
        tokens.access = await refreshToken(tokens.refresh);
        // Retry the request with the new token
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
      } catch (refreshError) {
        console.error("Token renewal failed, logging in again:", refreshError);
        // If token renewal fails, log in again
        tokens = await login();
        // Retry the request with the new token
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
      }
    } else {
      throw error;
    }
  }
}
