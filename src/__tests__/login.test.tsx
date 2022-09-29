import "@testing-library/jest-dom/extend-expect";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import { SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom";
import Login from "../components/login";
import { loginRequestDTO } from "../DTOs/loginRequestDTO";
import axios from "axios";
import mockAxios from "jest-mock-axios";


const axios1 = jest.mock("axios");

const AllTheProviders = ({ children }: any) => {
  return (
    <SnackbarProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </SnackbarProvider>
  );
};

describe("Login Page tests", () => {
  beforeEach(() => {
    render(<Login />, { wrapper: AllTheProviders });
  });
  test.only("Login", async () => {
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
    fireEvent.click(Login_Button);

    const mockLoginCreds: loginRequestDTO = {
      username: "Jay",
      password: "Jay@28108",
    };
    const mockData :any = [{ status:200, data: { token: 12345 } }];
    // axios.mockResolvedValue(mockData);
    // mock
    //   .onPost(`https://localhost:7114/api/Authenticate/login`)
    //   .reply(200, "ok");

    // await waitFor(() => {
      // mockAxios.mockResponseFor({url: 'https://localhost:7114/api/Authenticate/login'}, {data: "test"});
      // expect(mockAxios.post).toHaveBeenCalledWith(
      //   "https://localhost:7114/api/Authenticate/login",
      //   { data: { username: "Jay", password: "Jay@28101998" } }
      // );
      // const error_unauth = screen.getByText(/logged/i);
      // expect(error_unauth).toBeInTheDocument();
      expect(window.location.pathname).toEqual('/');
    // });
  });
});
