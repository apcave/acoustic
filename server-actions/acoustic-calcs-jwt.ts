import axios from "axios";

const API_URL = "http://localhost:3000/api";

async function login(username: string, password: string) {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    const token = response.data.token;
    console.log("Login successful. JWT:", token);
    return token;
  } catch (error) {
    console.error("Login failed:", error.response.data);
    throw error;
  }
}

async function renewToken(token: string) {
  try {
    const response = await axios.post(`${API_URL}/renew-jwt`, { token });
    const newToken = response.data.token;
    console.log("Token renewed. New JWT:", newToken);
    return newToken;
  } catch (error) {
    console.error("Token renewal failed:", error.response.data);
    throw error;
  }
}

async function main() {
  try {
    const username = "user1";
    const password = "password1";

    // Log in to get the initial JWT
    let token = await login(username, password);

    // Simulate token expiration and renewal
    setTimeout(async () => {
      try {
        token = await renewToken(token);
      } catch (error) {
        console.error("Failed to renew token:", error);
      }
    }, 3500); // Adjust the timeout to simulate token expiration
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
