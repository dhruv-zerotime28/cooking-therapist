'use client';

import { apiRequest } from '@/lib/axiosClient';
import { IApiResponse } from '@/lib/axiosClient';
import { ContatctUsFormSchema } from '@/Schemas/contactUs';



export const ContactUsApiCall = async (data:any) => {
    console.log(data)
    try {
      const response: IApiResponse = await apiRequest({
        method: 'POST',
        url: `client/contact`,
        data
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };