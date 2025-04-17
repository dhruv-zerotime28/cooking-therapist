import axios, { AxiosRequestConfig, Method } from "axios";
import { cookies } from "next/headers";

export interface IApiResponse {
    success: boolean;
    data?: any;
    message: string;
  }

  export interface IApiError {
    status: number;
    message: string;
    details?: any; 
  }

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, 
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});


axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError: IApiError = {
      status: error.response?.status || 500,
      message: error.response?.data?.message || "An unknown error occurred",
      details: error.response?.data || null,
    };

    console.log("API Error:", apiError);
    return Promise.reject(apiError);
  }
);


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
    const apiError: IApiError = {
      status: error.status || 500,
      message: error.message || "API request failed",
      details: error.details || null,
    };

    console.log(`API Error [${method} ${url}]:`, apiError);
    throw apiError.message;
  }
}

export default axiosClient;
