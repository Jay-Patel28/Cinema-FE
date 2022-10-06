import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'ekpiam',
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
    },
  },
});
