/* eslint-disable @typescript-eslint/no-namespace */

import { mount } from "cypress/react";

import Providers from "@/context/providers";
import "./commands";

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add("mount", (component) =>
  mount(<Providers>{component}</Providers>)
);
