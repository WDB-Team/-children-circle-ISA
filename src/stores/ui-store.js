import { defineStore } from "pinia";

export const useUIStore = defineStore("UI", {
  state: () => ({
    isHeader: true,
    isMainNotChild: true,
  }),
  getters: {
    Header: (state) => state.isHeader,
    MainNotChild: (state) => state.isMainNotChild,
  },
  actions: {
    ToggleHeader() {
      this.isHeader = !this.isHeader;
    },
    ToggleMainNotChild() {
      this.isMainNotChild = !this.isMainNotChild;
    },
  },
});
