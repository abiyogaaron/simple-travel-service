import React from "react";
import { render } from '@testing-library/react';
import { renderPage } from "../testingUtils";

import Login from "../pages/Login";

describe('Login Page', () => {
  it('Should render perfectly fine!', () => {
    const { ui } = renderPage({
      ui: (<Login />),
      path: '/',
      route: '/'
    });
    render(ui);
  })
})