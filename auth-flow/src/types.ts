export interface RegistrationRequest {
  email: string;
  name: string;
  mobileNo: string;
  githubUsername: string;
  rollNo: string;
  accessCode: string;
}

export interface RegistrationResponse {
  clientID: string;
  clientSecret: string;
}

export interface AuthRequest {
  email: string;
  name: string;
  rollNo: string;
  accessCode: string;
  clientID: string;
  clientSecret: string;
}

export interface AuthResponse {
  token_type: string;
  access_token: string;
  expires_in: number;
}

export interface WorkflowResult {
  registration: RegistrationResponse;
  auth: AuthResponse;
}
