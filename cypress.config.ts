import { defineConfig } from "cypress";
const cucumber = require("cypress-cucumber-preprocessor").default;

export default defineConfig({
  projectId: "kkfm4d",
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
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    reporterEnabled: "mochawesome, junit",
    mochawesomeReporterOptions: {
      reportDir: "cypress/reports/mochawesome",
      reportFilename: "report",
      quiet: true,
      overwrite: true,
      html: true,
      json: true,
      css: true,
    },
    junitReporterOptions: {
      mochaFile: "cypress/reports/junit/test-results-[hash].xml",
      toConsole: true,
    },
  },
  // m{
  //   projectId: "kkfm4d",
  //   // The rest of the Cypress config options go here...
  // },
});
