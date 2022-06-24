import {instance} from "./instance";


export default class authService {
    static async login(email, password) {
        return instance.post('/login', { email, password });
    }

    static async registration(email, password) {
        return instance.post("/registration", { email, password });
    }

    static async logout() {
        return instance.post("/logout");
    }
}