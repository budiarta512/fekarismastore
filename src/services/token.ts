import { getToken } from "../utils/auth";

class Token {
  getLocalAccessToken() {
    if (typeof window !== "undefined") {
      return getToken();
    }
  }
}

export default new Token();
