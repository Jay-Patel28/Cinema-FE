import { defineConfig } from "cypress";
const cucumber = require("cypress-cucumber-preprocessor").default;

export default defineConfig({
  projectId: "ksrcar",
  e2e: {
    video: false,
    baseUrl: "http://localhost:3000",
    experimentalStudio: true,
    setupNodeEvents(on) {
      const options = {
        typescript: require.resolve("typescript"),
      };

      on("file:preprocessor", cucumber(options));
    },
    specPattern: "**/*.feature",
  },
});
