import axios from "axios";
import { loginRequestDTO } from "../DTOs/loginRequestDTO";

interface responseData {
  token: string;
  expiration: string;
}

export interface loginResponseDTO {
  status: number;
  data: responseData | any;
}

export const LoginReq = async (data: loginRequestDTO) => {
  try {
    const response: any = await axios.post(
      `https://localhost:7114/api/Authenticate/login`,
      data,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.data !== null) {
      localStorage.setItem("jwt", response.data.token.toString());
      return { status: response.status, data: response.data };
    }
  } catch (err:any) {
    return { status: err.status, data: err };
  }
};
