import React from "react";
import { fireEvent, render, waitForElement } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import { Provider } from "../context";
import Login from "../pages/Login";

jest.mock("axios");

const mockHistory = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistory,
  }),
}));

beforeEach(() => {
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: jest.fn(() => null),
      setItem: jest.fn(() => null),
    },
    writable: true,
  });
});

const renderLogin = () => {
  const { getByTestId } = render(
    <Provider>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  );

  return { getByTestId };
};

beforeEach(() => {
  jest.clearAllMocks();
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

const mockToken = "a94645eac13f2be0f44acd0487cdfc34";

describe("LOGIN PAGE", () => {
  describe("Valid Fields Format", () => {
    describe("Email Field", () => {
      it("Invalid Format", () => {
        const { getByTestId } = renderLogin();

        expect(getByTestId("email-input-feedback").style.display).toBe("none");

        fireEvent.change(getByTestId("email-input"), {
          target: { value: "WrongEmailFormat.com" },
        });

        expect(getByTestId("email-input-feedback").style.display).toBe("block");
      });

      it("Valid Format", () => {
        const { getByTestId } = renderLogin();

        expect(getByTestId("email-input-feedback").style.display).toBe("none");

        fireEvent.change(getByTestId("email-input"), {
          target: { value: "correct@email.com" },
        });

        expect(getByTestId("email-input-feedback").style.display).toBe("none");
      });
    });

    describe("Password Field", () => {
      it("Invalid Format", () => {
        const { getByTestId } = renderLogin();

        expect(getByTestId("password-input-feedback").style.display).toBe(
          "none"
        );

        fireEvent.change(getByTestId("password-input"), {
          target: { value: "wrongpassword" },
        });

        expect(getByTestId("password-input-feedback").style.display).toBe(
          "block"
        );
      });

      it("Valid Format", () => {
        const { getByTestId } = renderLogin();

        expect(getByTestId("password-input-feedback").style.display).toBe(
          "none"
        );

        fireEvent.change(getByTestId("password-input"), {
          target: { value: "correct123456password" },
        });

        expect(getByTestId("password-input-feedback").style.display).toBe(
          "none"
        );
      });
    });
  });
  describe("Button Subbmit", () => {
    describe("Format Fiels", () => {
      it("Disabled when Invalid", () => {
        const { getByTestId } = renderLogin();

        expect(getByTestId("signin-btn").disabled).toBeTruthy();

        fireEvent.change(getByTestId("email-input"), {
          target: { value: "WrongEmailFormat.com" },
        });

        fireEvent.change(getByTestId("password-input"), {
          target: { value: "WrongPassword" },
        });

        expect(getByTestId("signin-btn").disabled).toBeTruthy();
      });

      it("Enabled when Valid", () => {
        const { getByTestId } = renderLogin();

        expect(getByTestId("signin-btn").disabled).toBeTruthy();

        fireEvent.change(getByTestId("email-input"), {
          target: { value: "correct@email.com.com" },
        });

        fireEvent.change(getByTestId("password-input"), {
          target: { value: "correct123456password" },
        });

        expect(getByTestId("signin-btn").disabled).toBeFalsy();
      });
    });

    describe("Event Submit", () => {
      describe("On Success", () => {
        it("Save Token in LocalStorage", async () => {
          const { getByTestId } = renderLogin();

          axios.post.mockResolvedValueOnce({
            data: { token: mockToken, user: mockUserAdmin },
          });

          fireEvent.change(getByTestId("email-input"), {
            target: { value: "correct@email.com.com" },
          });

          fireEvent.change(getByTestId("password-input"), {
            target: { value: "correct123456password" },
          });

          fireEvent.click(getByTestId("signin-btn"));

          await waitForElement(() => getByTestId("signin-btn"));

          expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);

          expect(window.localStorage.setItem).toHaveBeenCalledWith(
            "token",
            mockToken
          );
        });

        describe("Redirect", () => {
          it("Admin should redirect to Admin - Home", async () => {
            const { getByTestId } = renderLogin();

            axios.post.mockResolvedValueOnce({
              data: { token: mockToken, user: mockUserAdmin },
            });

            fireEvent.change(getByTestId("email-input"), {
              target: { value: "correct@email.com.com" },
            });

            fireEvent.change(getByTestId("password-input"), {
              target: { value: "correct123456password" },
            });

            fireEvent.click(getByTestId("signin-btn"));

            await waitForElement(() => getByTestId("signin-btn"));

            expect(mockHistory).toHaveBeenCalledTimes(1);

            expect(mockHistory).toHaveBeenCalledWith("/admin/orders");
          });

          it("Client should redirect to Client - Products", async () => {
            const { getByTestId } = renderLogin();

            axios.post.mockResolvedValueOnce({
              data: { token: mockToken, user: mockUserClient },
            });

            fireEvent.change(getByTestId("email-input"), {
              target: { value: "correct@email.com.com" },
            });

            fireEvent.change(getByTestId("password-input"), {
              target: { value: "correct123456password" },
            });

            fireEvent.click(getByTestId("signin-btn"));

            await waitForElement(() => getByTestId("signin-btn"));

            expect(mockHistory).toHaveBeenCalledTimes(1);

            expect(mockHistory).toHaveBeenCalledWith("/products");
          });
        });
      });

      describe("On Failure", () => {
        it("Display a message", async () => {
          const { getByTestId } = renderLogin();

          axios.post.mockRejectedValueOnce(new Error("Error Message"));

          fireEvent.change(getByTestId("email-input"), {
            target: { value: "correct@email.com.com" },
          });

          fireEvent.change(getByTestId("password-input"), {
            target: { value: "correct123456password" },
          });

          fireEvent.click(getByTestId("signin-btn"));

          await waitForElement(() => getByTestId("signin-btn"));

          expect(getByTestId("message").style.display).toBe("flex");

          expect(getByTestId("message-text").innerHTML).toBe("Error Message");
        });
      });
    });
  });
});
