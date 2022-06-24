import { instance } from "./instance";

export default class authService {
  static async login(credentials) {
    return instance.post("/login", credentials);
  }

  static async registration(credentials) {
    return instance.post("/registration", credentials);
  }

  static async logout() {
    return instance.post("/logout");
  }
}
