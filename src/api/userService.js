import axios from "axios";
import {instance} from "./instance";

export default class userService {
    static async getUsers() {
        return instance.get('/users')
    }
}