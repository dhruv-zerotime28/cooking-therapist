'use server';

import { apiRequest } from '@/lib/axiosClient';
import { IApiResponse } from '@/lib/axiosClient';

export const getAllCategories = async () => {
  try {
    const response: IApiResponse = await apiRequest({
      method: 'GET',
      url: '/admins/category',
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const addNewCategory = async (name: string) => {
  try {
    const response = await apiRequest({
      method: 'POST',
      url: '/admins/category',
      data: { name },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const updatedCategory = async (body: { id: string; name: string }) => {
  try {
    const response = await apiRequest({
      method: 'PATCH',
      url: '/admins/category',
      data: body,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const response = await apiRequest({
      method: 'DELETE',
      url: '/admins/category',
      data: { id },
    });
    return response;
  } catch (error) {
    return error;
  }
};
