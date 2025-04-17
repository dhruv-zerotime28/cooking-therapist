'use client';

import { apiRequest } from '@/lib/axiosClient';
import { IApiResponse } from '@/lib/axiosClient';


const path = `admin/dashboard/contact`;

interface IfilteredAdmins {
  search: string;
  page: number;
  sortField: string;
}

export const getAllMessages = async (queryParams : IfilteredAdmins) => {
  try {
    const response: IApiResponse = await apiRequest({
      method: 'GET',
      url: path,
      params: {
        search: queryParams?.search || '',
        page: queryParams.page,
        sortField: queryParams.sortField,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const replyUserApi = async (data:any) => {
    try {
      const response: IApiResponse = await apiRequest({
        method: 'PATCH',
        url: path,
        data
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const deleteMessageApi = async (id:any) => {
    try {
      const response: IApiResponse = await apiRequest({
        method: 'DELETE',
        url: path,
        data : id
      });
      return response.message;
    } catch (error) {
      throw error;
    }
  };