import api from "@/lib/api"
import { extractErrorMessage } from "@/lib/extractErrorMessage";
import { LoginResponse } from "@/types/auth";



export async function loginUser(email: string, password: string) {
    
  try {
    const response = await api.post<LoginResponse>("/login/",{ email, password,});

    return response.data
    
  } catch (error) {
  throw new Error(
    extractErrorMessage(error)
  );
}
}


export async function refreshAccessToken(
  refresh: string
) {

  const response = await api.post(
    "/token/refresh/",
    {
      refresh,
    }
  );

  return response.data;
}