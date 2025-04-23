import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    'baseUrl':'https://product-manager-1903f.web.app',
     setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
