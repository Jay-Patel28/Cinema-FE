import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-test-renderer";
import { LoginReq } from "../commonFunctions/loginService";
import LoginDialog from "../components/login";

jest.mock("../commonFunctions/loginService", () => ({
  LoginReq: jest.fn(),
}));

describe("Login Page tests", () => {
  beforeEach(async () => {
    jest.resetAllMocks;
    const AllTheProviders = ({ children }: any) => {
      return (
        <BrowserRouter>
          <SnackbarProvider>{children}</SnackbarProvider>
        </BrowserRouter>
      );
    };

    await act(async () => {
      render(<LoginDialog />, { wrapper: AllTheProviders });
    });
  });

  test("Check login status as success after typing correct credentials ", async () => {
    const responseData = {
      token: "12345",
      expiration: "2145",
    };

    const data = {
      data: "responseData",
      status: 200,
    };
    (LoginReq as jest.Mock).mockResolvedValue(data);

    const LoginTitle = screen.getByTestId("Login_title");
    const Email_Input = screen
      .getByTestId("email_input")
      .querySelector("input");
    const pass_input = screen.getByTestId("pass_input").querySelector("input");
    const Login_Button = screen.getByTestId("login_button");
    expect(LoginTitle).toBeInTheDocument();
    expect(Email_Input).toBeInTheDocument();
    expect(pass_input).toBeInTheDocument();
    expect(Login_Button).toBeInTheDocument();

    if (Email_Input)
      fireEvent.change(Email_Input, { target: { value: "Jay" } });
    if (pass_input)
      fireEvent.change(pass_input, { target: { value: "Jay@28101998" } });

    await act(async () => {
      fireEvent.click(Login_Button);
    });

    await waitFor(() => {
      const Login_success = screen.getByText(/You are logged in!/i);
      expect(Login_success).toBeInTheDocument();
    });
  });

  test("Check login failure after typing incorrect credentials ", async () => {
    const data = {
      data: "failed",
      status: 401,
    };
    (LoginReq as jest.Mock).mockResolvedValue(data);

    const Email_Input = screen
      .getByTestId("email_input")
      .querySelector("input");
    const pass_input = screen.getByTestId("pass_input").querySelector("input");
    const Login_Button = screen.getByTestId("login_button");

    expect(Email_Input).toBeInTheDocument();
    expect(pass_input).toBeInTheDocument();
    expect(Login_Button).toBeInTheDocument();

    if (Email_Input)
      fireEvent.change(Email_Input, { target: { value: "Jay" } });
    if (pass_input)
      fireEvent.change(pass_input, { target: { value: "Wrong Password" } });

    await act(async () => {
      fireEvent.click(Login_Button);
    });

    expect(LoginReq).toBeCalledWith({
      password: "Wrong Password",
      username: "Jay",
    });

    await waitFor(() => {
      const Login_failed = screen.getByText(/Username or Password Invalid!/i);
      expect(Login_failed).toBeInTheDocument();
    });
  });
  test("on clicking camcel button, dialog should be closed ", () => {
    const cancel = screen.getByText(/Cancel/i);
    expect(cancel).toBeInTheDocument();
    userEvent.click(cancel);
    expect(window.location.pathname).toBe("/");
  });
});
