import axios from "axios";
import { baseUrl } from "../constants/global";
import { RegistrationRequestDTO } from "../DTOs/registerRequestDTO";

export const RegReq = async (data: RegistrationRequestDTO) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/Authenticate/register`,
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
