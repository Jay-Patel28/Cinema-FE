import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-test-renderer";
import { RegReq } from "../commonFunctions/registerService";
import Register from "../components/register";

jest.mock("../commonFunctions/registerService", () => ({
  RegReq: jest.fn(),
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
      render(<Register />, { wrapper: AllTheProviders });
    });
  });

  test("Check if all registration fields are available.", () => {
    const reg_username = screen.getByTestId("reg_username");
    const reg_email = screen.getByTestId("reg_email");
    const reg_password = screen.getByTestId("reg_password");

    expect(reg_username).toBeInTheDocument();
    expect(reg_email).toBeInTheDocument();
    expect(reg_password).toBeInTheDocument();
  });

  test("Check if registration succedes when given proper inputs.", async () => {
    const data = {
      data: "ExampleData",
      status: 200,
    };
    (RegReq as jest.Mock).mockResolvedValue(data);

    const reg_username = screen
      .getByTestId("reg_username")
      .querySelector("input");
    const reg_email = screen.getByTestId("reg_email").querySelector("input");
    const reg_password = screen
      .getByTestId("reg_password")
      .querySelector("input");
    const reg_submit = screen.getByTestId("reg_submit");

    if (reg_username) userEvent.type(reg_username, "JayPatel");
    if (reg_email) userEvent.type(reg_email, "Jay@Patel.com");
    if (reg_password) userEvent.type(reg_password, "JayPatel@1234565");

    await act(async () => {
      fireEvent.click(reg_submit);
    });

    await waitFor(() => {
      const reg_succeded = screen.getByText(/Registered successfully!/i);
      expect(reg_succeded).toBeInTheDocument();
      expect(window.location.pathname).toBe("/login");
    });
  });

  test("Check if registration fails when given improper inputs.", async () => {
    const failuredata = {
      data: "ExampleData",
      status: 401,
    };
    (RegReq as jest.Mock).mockResolvedValue(failuredata);

    const reg_username = screen
      .getByTestId("reg_username")
      .querySelector("input");
    const reg_email = screen.getByTestId("reg_email").querySelector("input");
    const reg_password = screen
      .getByTestId("reg_password")
      .querySelector("input");
    const reg_submit = screen.getByTestId("reg_submit");

    if (reg_username) userEvent.type(reg_username, "JayPatel");
    if (reg_email) userEvent.type(reg_email, "J");
    if (reg_password) userEvent.type(reg_password, "34565");

    await act(async () => {
      fireEvent.click(reg_submit);
    });

    await waitFor(() => {
      const reg_failed = screen.getByText(/Error!/i);
      expect(reg_failed).toBeInTheDocument();
      expect(window.location.pathname).toBe("/login");
    });
  });
  
  test("on clicking cancel button, dialog should be closed ", () => {
    const cancel = screen.getByText(/Cancel/i);
    expect(cancel).toBeInTheDocument();
    userEvent.click(cancel);
    expect(window.location.pathname).not.toBe("/register");
  });
});
