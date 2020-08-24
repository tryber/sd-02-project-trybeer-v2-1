import React from "react";
import {
  fireEvent,
  render,
  waitForDomChange,
  cleanup,
} from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import { Provider } from "../context";
import Register from "../pages/Register";

jest.mock("axios");

beforeEach(() => {
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: jest.fn(() => null),
      setItem: jest.fn(() => null),
    },
    writable: true,
  });
});

afterEach(() => {
  cleanup();
});

const mockUserAdmin = {
  name: "Ana Rita",
  email: "ana@hotmail.com",
  role: "admin",
};

const mockUserClient = {
  name: "Rian",
  email: "rian@gmail.com",
  role: "client",
};

const renderRegister = () => {
  const { getByTestId } = render(
    <Provider>
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    </Provider>
  );

  return { getByTestId };
};

const mockToken = "a94645eac13f2be0f44acd0487cdfc34";

describe("REGISTER PAGE", () => {
  describe("Valid Fields Format", () => {
    describe("Name Field", () => {
      it("Invalid Format", () => {
        const { getByTestId } = renderRegister();

        expect(getByTestId("signup-name-feedback").style.display).toBe("none");

        fireEvent.change(getByTestId("signup-name"), {
          target: { value: "N" },
        });

        expect(getByTestId("signup-name-feedback").style.display).toBe("block");
      });

      it("Valid Format", () => {
        const { getByTestId } = renderRegister();

        expect(getByTestId("signup-name-feedback").style.display).toBe("none");

        fireEvent.change(getByTestId("signup-name"), {
          target: { value: "Bolivar Lindo" },
        });

        expect(getByTestId("signup-name-feedback").style.display).toBe("none");
      });
    });

    describe("Email Field", () => {
      it("Invalid Format", () => {
        const { getByTestId } = renderRegister();

        expect(getByTestId("signup-email-feedback").style.display).toBe("none");

        fireEvent.change(getByTestId("signup-email"), {
          target: { value: "WrongEmailFormat.com" },
        });

        expect(getByTestId("signup-email-feedback").style.display).toBe(
          "block"
        );
      });

      it("Valid Format", () => {
        const { getByTestId } = renderRegister();

        expect(getByTestId("signup-email-feedback").style.display).toBe("none");

        fireEvent.change(getByTestId("signup-email"), {
          target: { value: "correct@email.com" },
        });

        expect(getByTestId("signup-email-feedback").style.display).toBe("none");
      });
    });

    describe("Password Field", () => {
      it("Invalid Format", () => {
        const { getByTestId } = renderRegister();

        expect(getByTestId("password-invalid").style.display).toBe("none");

        fireEvent.change(getByTestId("signup-password"), {
          target: { value: "wrongpassword" },
        });

        expect(getByTestId("password-invalid").style.display).toBe("block");
      });

      it("Valid Format", () => {
        const { getByTestId } = renderRegister();

        expect(getByTestId("password-invalid").style.display).toBe("none");

        fireEvent.change(getByTestId("signup-password"), {
          target: { value: "correct123456password" },
        });

        expect(getByTestId("password-invalid").style.display).toBe("none");
      });
    });

    describe("Confirm Field", () => {
      it("Invalid Format", () => {
        const { getByTestId } = renderRegister();

        expect(getByTestId("confirm-invalid").style.display).toBe("none");

        fireEvent.change(getByTestId("confirm-password"), {
          target: { value: "wrongpassword" },
        });

        expect(getByTestId("confirm-invalid").style.display).toBe("block");
      });

      it("Differ from password", () => {
        const { getByTestId } = renderRegister();

        expect(getByTestId("confirm-invalid").style.display).toBe("none");

        fireEvent.change(getByTestId("signup-password"), {
          target: { value: "correct123456password" },
        });

        fireEvent.change(getByTestId("confirm-password"), {
          target: { value: "correct123456passwordDiffer" },
        });

        expect(getByTestId("confirm-invalid").style.display).toBe("block");
      });

      it("Valid Format and Equal Password", () => {
        const { getByTestId } = renderRegister();

        expect(getByTestId("confirm-invalid").style.display).toBe("none");

        fireEvent.change(getByTestId("signup-password"), {
          target: { value: "correct123456password" },
        });

        fireEvent.change(getByTestId("confirm-password"), {
          target: { value: "correct123456password" },
        });

        expect(getByTestId("confirm-invalid").style.display).toBe("none");
      });
    });
  });

  describe("Button Subbmit", () => {
    describe("Format Fiels", () => {
      it("Disabled when Invalid", () => {
        const { getByTestId } = renderRegister();

        fireEvent.change(getByTestId("signup-name"), {
          target: { value: "B" },
        });

        fireEvent.change(getByTestId("signup-email"), {
          target: { value: "WrongEmailFormat.com" },
        });

        fireEvent.change(getByTestId("signup-password"), {
          target: { value: "wrongpassword" },
        });

        fireEvent.change(getByTestId("confirm-password"), {
          target: { value: "wrongpassword" },
        });

        expect(getByTestId("register-btn").disabled).toBeTruthy();
      });

      it("Enabled when Valid", () => {
        const { getByTestId } = renderRegister();

        fireEvent.change(getByTestId("signup-name"), {
          target: { value: "Bolivar Lindo" },
        });

        fireEvent.change(getByTestId("signup-email"), {
          target: { value: "correct@email.com" },
        });

        fireEvent.change(getByTestId("signup-password"), {
          target: { value: "correct123456password" },
        });

        fireEvent.change(getByTestId("confirm-password"), {
          target: { value: "correct123456password" },
        });

        expect(getByTestId("register-btn").disabled).toBeFalsy();
      });
    });

    describe("Event Submit", () => {
      describe("On Success", () => {
        it("Admin should redirect to Admin - Home", async () => {
          const history = createMemoryHistory();

          const { getByTestId } = render(
            <Provider>
              <Router history={history}>
                <Register />
              </Router>
            </Provider>
          );

          axios.post.mockResolvedValueOnce({
            data: { token: mockToken, user: mockUserAdmin },
          });

          fireEvent.change(getByTestId("signup-name"), {
            target: { value: "Bolivar Lindo" },
          });

          fireEvent.change(getByTestId("signup-email"), {
            target: { value: "correct@email.com" },
          });

          fireEvent.change(getByTestId("signup-password"), {
            target: { value: "correct123456password" },
          });

          fireEvent.change(getByTestId("confirm-password"), {
            target: { value: "correct123456password" },
          });

          fireEvent.click(getByTestId("signup-seller"));

          fireEvent.click(getByTestId("register-btn"));

          await waitForDomChange();

          expect(history.location.pathname).toBe("/admin/orders");
        });

        it("Client should redirect to Client - Products", async () => {
          const history = createMemoryHistory();

          const { getByTestId } = render(
            <Provider>
              <Router history={history}>
                <Register />
              </Router>
            </Provider>
          );

          axios.post.mockResolvedValueOnce({
            data: { token: mockToken, user: mockUserClient },
          });

          fireEvent.change(getByTestId("signup-name"), {
            target: { value: "Bolivar Lindo" },
          });

          fireEvent.change(getByTestId("signup-email"), {
            target: { value: "correct@email.com" },
          });

          fireEvent.change(getByTestId("signup-password"), {
            target: { value: "correct123456password" },
          });

          fireEvent.change(getByTestId("confirm-password"), {
            target: { value: "correct123456password" },
          });

          fireEvent.click(getByTestId("register-btn"));

          await waitForDomChange();

          expect(history.location.pathname).toBe("/products");
        });
      });

      describe("On Failure", () => {
        it("Display a message", async () => {
          const { getByTestId } = render(
            <Provider>
              <MemoryRouter>
                <Register />
              </MemoryRouter>
            </Provider>
          );

          axios.post.mockRejectedValueOnce(new Error("Error Message"));

          fireEvent.change(getByTestId("signup-name"), {
            target: { value: "Bolivar Lindo" },
          });

          fireEvent.change(getByTestId("signup-email"), {
            target: { value: "correct@email.com" },
          });

          fireEvent.change(getByTestId("signup-password"), {
            target: { value: "correct123456password" },
          });

          fireEvent.change(getByTestId("confirm-password"), {
            target: { value: "correct123456password" },
          });

          fireEvent.click(getByTestId("register-btn"));

          await waitForDomChange();

          expect(getByTestId("message").style.display).toBe("flex");

          expect(getByTestId("message-text").innerHTML).toBe("Error Message");
        });
      });
    });
  });
});
