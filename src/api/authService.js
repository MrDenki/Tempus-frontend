import instance from "./instance";

export default class authService {
  static signIn = (credentials) => instance.post("/auth/signIn", credentials);
  static signUp = (credentials) => instance.post("/auth/signUp", credentials);
  static signOut = () => instance.post("/auth/signOut");
  static refresh = () => instance.get("/auth/refresh");
  static getCurrentUser = () => instance.get("/user/currentUser");
}
