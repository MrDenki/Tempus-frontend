import instance from "./instance";

export default class userService {
  static getUsers = () => instance.get("/user");
}
