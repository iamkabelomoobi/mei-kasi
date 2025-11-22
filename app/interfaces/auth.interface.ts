interface LoginResponse {
  access_token: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

export { LoginRequest, LoginResponse };
