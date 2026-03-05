import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-fs/plugins')(on);      
      return config;
    },
  },
});