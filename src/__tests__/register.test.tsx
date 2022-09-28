import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom";
import Register from "../components/register";

const AllTheProviders = ({ children }: any) => {
  return (
    <SnackbarProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </SnackbarProvider>
  );
};

describe("Register Page tests", () => {
  beforeEach(() => {
    render(<Register />, { wrapper: AllTheProviders });
  });
  test("should have all login attributes", () => {
    const Username_Input = screen.getByTestId("reg_username");
    const Email_Input = screen.getByTestId("reg_email");
    const pass_input = screen.getByTestId("reg_password");
    const Register_Button = screen.getByTestId("reg_submit");

    expect(Username_Input).toBeInTheDocument();
    expect(Email_Input).toBeInTheDocument();
    expect(pass_input).toBeInTheDocument();
    expect(Register_Button).toBeInTheDocument();

    const Cancel = screen.getByText(/Cancel/i);
    expect(Cancel).toBeInTheDocument();
  });
});
