import axios from "axios";
import dotenv from "dotenv";


const API_URL = "http://localhost:8000/api/auth/";
console.log(API_URL);

class AuthService {
  async login(username: string, password: string) {
    return await axios
      .post(API_URL + "signin", {
        username,
        password,
      })
      .then((response) => {
        console.log(response)
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username: string, email: string, password: string) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  }
}

export default new AuthService();
