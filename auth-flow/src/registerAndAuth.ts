import axios, { AxiosError } from "axios";
import { 
  RegistrationRequest, 
  RegistrationResponse, 
  AuthRequest, 
  AuthResponse, 
  WorkflowResult 
} from "./types";

const BASE_URL = "http://20.207.122.201/evaluation-service";

export class AuthService {
  /**
   * Registers the user with the evaluation service.
   */
  async register(data: RegistrationRequest): Promise<RegistrationResponse> {
    try {
      const response = await axios.post(`${BASE_URL}/register`, data);
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError, "Registration");
    }
  }

  /**
   * Authenticates the user to get the access token.
   */
  async authenticate(data: AuthRequest): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${BASE_URL}/auth`, data);
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError, "Authentication");
    }
  }

  /**
   * Centralized error handler for API requests.
   */
  private handleError(error: AxiosError, context: string): never {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data as any;
      
      if (status === 409) {
        throw new Error(`[${context}] Error: Duplicate registration. User already exists.`);
      }
      if (status === 401 || status === 403) {
        throw new Error(`[${context}] Error: Invalid access code or credentials.`);
      }
      
      throw new Error(`[${context}] API Error (${status}): ${data.message || JSON.stringify(data)}`);
    } else if (error.request) {
      throw new Error(`[${context}] Network Error: No response received from server.`);
    } else {
      throw new Error(`[${context}] Setup Error: ${error.message}`);
    }
  }
}

/**
 * Executes the full registration and auth workflow.
 */
export async function runAuthWorkflow(config: RegistrationRequest): Promise<WorkflowResult> {
  const service = new AuthService();

  // 1. Register
  const regResponse = await service.register(config);

  // 2. Auth using reg response
  const authResponse = await service.authenticate({
    email: config.email,
    name: config.name,
    rollNo: config.rollNo,
    accessCode: config.accessCode,
    clientID: regResponse.clientID,
    clientSecret: regResponse.clientSecret
  });

  return {
    registration: regResponse,
    auth: authResponse
  };
}
