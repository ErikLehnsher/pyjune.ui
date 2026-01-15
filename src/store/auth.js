import { defineStore } from "pinia";
import authService from "@/services/auth.service";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    isAuth: false,
    loading: false,
  }),

  actions: {
    async login(credentials) {
      try {
        // console.group("🟢 AUTH LOGIN FLOW");
      // console.log("Credentials:", credentials);

      this.loading = true;

      const res = await authService.login(credentials);
      const { access, refresh } = res.data;

      // console.log("Access token:", access);
      // console.log("Refresh token:", refresh);

      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      console.log(
        "LocalStorage access_token:",
        localStorage.getItem("access_token")
      );

      // console.log("➡️ CALL fetchMe()");
      await this.fetchMe();
      return true
      // console.groupEnd();
      }catch(err) {
        this.logout()
        throw err
      }
      
    },

    async fetchMe() {
      console.group("🟡 FETCH ME");
      console.log(
        "Token before request:",
        localStorage.getItem("access_token")
      );

      try {
        const res = await authService.getMe();
        console.log("User data:", res.data);

        this.user = res.data;
        this.isAuth = true;
      } catch (err) {
        console.error("❌ fetchMe failed → logout");
        this.logout();
      } finally {
        this.loading = false;
        console.groupEnd();
      }
    },

    logout() {
      console.warn("🔴 LOGOUT – clearing auth data");

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      this.user = null;
      this.isAuth = false;
      this.loading = false;
    },
  },
});
