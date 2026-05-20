import axios from "axios";

export function extractErrorMessage(
  error: unknown
): string {

  if (axios.isAxiosError(error)) {

    const data = error.response?.data;

    if (!data) {
      return "Request failed";
    }

    if (typeof data.detail === "string") {
      return data.detail;
    }

    if (typeof data.message === "string") {
      return data.message;
    }

    // Handle DRF field errors
    const firstError = Object.values(data)[0];

    if (
      Array.isArray(firstError) &&
      typeof firstError[0] === "string"
    ) {
      return firstError[0];
    }

    return "Request failed";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unexpected error";
}