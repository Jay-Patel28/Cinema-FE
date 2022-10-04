import axios from "axios";
import { RegistrationRequestDTO } from "../DTOs/registerRequestDTO";

export const RegReq = async (data: RegistrationRequestDTO) => {
  try {
    const response = await axios.post(
      "https://localhost:7114/api/Authenticate/register",
      data,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response;
  } catch (err: any) {
    return err;
  }
};
