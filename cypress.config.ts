import { defineConfig } from "cypress";

export default defineConfig({
  reporterOptions: {
    reportDir: "cypress/results",
    overwrite: false,
    html: false,
    json: true,
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
  video: false,
  screenshotOnRunFailure: true,
  chromeWebSecurity: false,
  viewportHeight: 820,
  viewportWidth: 600,
});
