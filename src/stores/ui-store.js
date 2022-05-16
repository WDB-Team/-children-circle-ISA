import { defineStore } from "pinia";

export const useUIStore = defineStore("UI", {
  state: () => ({
    isHeader: true,
  }),
  getters: {
    Header: (state) => state.isHeader,
  },
  actions: {
    ToggleHeader() {
      this.isHeader = !this.isHeader;
    },
  },
});
