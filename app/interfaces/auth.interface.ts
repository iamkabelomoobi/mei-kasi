interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

interface ForgotPasswordRequest {
  email: string;
}

export { LoginRequest, RegisterRequest, ForgotPasswordRequest };
