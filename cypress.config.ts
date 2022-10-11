import { defineConfig } from "cypress";
const cucumber = require("cypress-cucumber-preprocessor").default;

export default defineConfig({
  projectId: 'ksrcar',
  e2e: {
    baseUrl: "http://localhost:3000",

    setupNodeEvents(on) {
      const options = {
        typescript: require.resolve("typescript"),
      };
      
      on("file:preprocessor", cucumber(options));
    },
    specPattern: "**/*.feature",
  },
});
