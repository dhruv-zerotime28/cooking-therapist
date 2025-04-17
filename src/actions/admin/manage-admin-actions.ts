'use client';

import { apiRequest } from '@/lib/axiosClient';
import { IApiResponse } from '@/lib/axiosClient';
import { authForm,changePasswordType } from '@/Schemas/auth';
import { addEditAdminType } from '@/Schemas/admin';
const path = `admin/dashboard/manage-admins`;

interface IfilteredAdmins {
  search: string;
  page: number;
  sortField: string;
}

export const getAllAdmins = async (queryParams : IfilteredAdmins) => {
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

export const addNewAdmin = async (data :addEditAdminType) => {
  try {
    const response : IApiResponse = await apiRequest({
      method: 'POST',
      url: path,
      data,
    });
    console.log('in action',response)
    return response.message
  } catch (error) {
    throw error;
  }
};

export const changePasswordApiCall = async (data : changePasswordType) => {
  try {
    const response: IApiResponse  = await apiRequest({
      method: 'PATCH',
      url: path,
      data
    });
    return response;
  } catch (error) {
    throw error;
  }
};
