import { defineStore } from "pinia";

export const useUserSeccionStore = defineStore("UserSeccion", {
  state: () => ({
    id: "62c5a72a7bc60bd4f10f5f76",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjJjNWE3MmE3YmM2MGJkNGYxMGY1Zjc2IiwiZW1haWwiOiJZYWFsQFlhYWwiLCJmdWxsX25hbWUiOiJZYWFsIiwiaWF0IjoxNjU3MTQyNzE0LCJleHAiOjE2NjQ5MTg3MTR9.W5eM2qx-cjp0UcOa1tLEcxJane3jOzB7_MFlKUZDi48",
    fullName: "Johans",
    email: "Yaal@Yaal",
  }),
  getters: {
    ID: (state) => state.id,
    Token: (state) => state.token,
    FullName: (state) => state.fullName,
    Email: (state) => state.email,
  },
  actions: {
    setId(state) {
      this.id = state;
    },
    setToken(state) {
      this.token = state;
    },
    setFullName(state) {
      this.fullName = state;
    },
    setEmail(state) {
      this.email = state;
    },
    fillSeccion(id, token, fullName, email) {
      this.setId(id);
      this.setToken(token);
      this.setFullName(fullName);
      this.setEmail(email);
    },
  },
});
