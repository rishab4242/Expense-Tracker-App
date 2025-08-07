import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // in seconds
    return decoded.exp < currentTime;
  } catch (err) {
    console.error("Invalid token", err);
    return true; // treat as expired if invalid
  }
};
