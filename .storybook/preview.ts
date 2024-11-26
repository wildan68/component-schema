import type { Preview } from "@storybook/vue3";
import "@/assets/styles/css/main.css";
import "@/assets/styles/scss/index.scss";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
