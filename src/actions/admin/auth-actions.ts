"use server";

import { apiRequest } from '@/lib/axiosClient';
import { IApiResponse } from '@/lib/axiosClient';

export const adminLogin = async (data: any) => {
    try {
      const response: IApiResponse = await apiRequest({
        method: 'POST',
        url: '/admins/auth',
        data: {
            action:"login",
            credential : data
        }
      });
      return response.message;
    } catch (error) {
      console.log("err:",error)  
      return error;
    }
  };

  export const adminLogOut = async (data: any) => {
    try {
      const response: IApiResponse = await apiRequest({
        method: 'POST',
        url: '/admins/auth',
        data: {
            action:"logout",
            credential : data
        }
      });
      return response.message;
    } catch (error) {
      console.log("err:",error)
      return error;
    }
  };