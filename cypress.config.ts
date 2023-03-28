import { defineConfig } from "cypress";
const cucumber = require("cypress-cucumber-preprocessor").default;

export default defineConfig({
  projectId: 'kkfm4d',
  e2e: {
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
  // m{
  //   projectId: "kkfm4d",
  //   // The rest of the Cypress config options go here...
  // },
});
