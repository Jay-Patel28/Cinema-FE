import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SnackbarProvider } from "notistack";
import { BrowserRouter } from 'react-router-dom';
import Login from "../components/login";


const AllTheProviders = ({children}:any) => {
    return (
      <SnackbarProvider >
        <BrowserRouter >
          {children}
        </BrowserRouter>
      </SnackbarProvider>
    )
  }

describe("Login Page tests", () => {
  beforeEach(() => {
    render(<Login />,{wrapper:AllTheProviders});
  });
  test.only("Login", () => {
    const LoginTitle = screen.getByTestId("Login_title");
    const Email_Input = screen.getByTestId("email_input");
    const pass_input = screen.getByTestId("pass_input");
    const Login_Button = screen.getByTestId("login_button");
    expect(LoginTitle).toBeInTheDocument();
    expect(Email_Input).toBeInTheDocument();
    expect(pass_input).toBeInTheDocument();
    expect(Login_Button).toBeInTheDocument();

let spy = 

    userEvent.click(Login_Button);



  });

});
