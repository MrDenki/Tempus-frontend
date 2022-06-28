import instance from "./instance";

export default class authService {
  static signIn(credentials) {
    return instance.post("/auth/signIn", credentials);
  }

  static signUp(credentials) {
    return instance.post("/auth/signUp", credentials);
  }

  static signOut = () => instance.post("/auth/signOut");

  static refresh() {
    return instance.get("/auth/refresh");
  }

  static getCurrentUser() {
    return instance.get("/user/currentUser");
  }
}
