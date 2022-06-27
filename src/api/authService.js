import instance from "./instance";

export default class authService {
  static async signIn(credentials) {
    return instance.post("/auth/signIn", credentials);
  }

  static async signUp(credentials) {
    return instance.post("/auth/signUp", credentials);
  }

  static async signOut() {
    return instance.post("/auth/signOut");
  }

  static async refresh() {
    return instance.get("/auth/refresh");
  }

  static async getCurrentUser() {
    return instance.get("/user/currentUser")
  }
}
