import React from "react";
import renderWithRouter from "./service/renderWithRouter";
import { wait } from "@testing-library/react";
import axios from "axios";

import '@testing-library/jest-dom/extend-expect';

import { Provider } from "../context";
import PrivateRoute from "../PrivateRoute";

jest.mock("axios");

describe("Private route Component", () => {
  test("page render correct", async () => {
    axios.get.mockResolvedValue();
    const fakeComponent = jest.fn(() => <div data-testid="testComponent">Hello</div>);
    const { getByTestId } = renderWithRouter(
      <Provider>
        <PrivateRoute component={fakeComponent} />
      </Provider>
    );

    await wait();

    expect(fakeComponent).toBeCalledTimes(1);
    expect(getByTestId('testComponent')).toBeInTheDocument();
    expect(getByTestId('testComponent')).toHaveTextContent('Hello')
  });

  test("page render correct", async () => {
    axios.get.mockImplementation(() => Promise.reject('error'));
    const fakeComponent = jest.fn(() => <div data-testid="testComponent">Hello</div>);
    
    renderWithRouter(
      <Provider>
        <PrivateRoute component={fakeComponent} />
      </Provider>
    );

    await wait();

    expect(fakeComponent).toBeCalledTimes(0);

    
  });
});
