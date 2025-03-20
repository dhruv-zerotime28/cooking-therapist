import axios, { AxiosRequestConfig, Method } from "axios";

export interface IApiResponse {
    success: boolean;
    data?: any;
    message: string;
  }
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Use NEXT_PUBLIC for client-side access
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response Interceptor for Better Error Handling
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Define the API request parameters type
interface ApiRequestParams {
  method: Method;
  url: string;
  data?: Record<string, any> | null;
  params?: Record<string, any>;
  headers?: Record<string, string>;
}

/**
 * Dynamic function to make API requests
 * @param {Method} method - HTTP method: "GET", "POST", "PUT", "PATCH", "DELETE"
 * @param {string} url - API endpoint
 * @param {Object} [data] - Request body (for POST, PUT, PATCH)
 * @param {Object} [params] - Query parameters
 * @param {Object} [headers] - Additional headers
 * @returns {Promise<any>} - API response data
 */
export async function apiRequest<T>({
  method,
  url,
  data = null,
  params = {},
  headers = {},
}: ApiRequestParams): Promise<T> {
  try {
    const config: AxiosRequestConfig = {
      method,
      url,
      data,
      params,
      headers,
    };
   
    const response = await axiosClient(config);
    return response.data as T;
  } catch (error: any) {
    console.error(`API Error [${method} ${url}]:`, error.response?.data || error);
    throw new Error(error.response?.data?.message || "API request failed");
  }
}

export default axiosClient;
