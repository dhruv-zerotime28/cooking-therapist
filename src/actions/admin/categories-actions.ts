'use client';

import { apiRequest } from '@/lib/axiosClient';
import { IApiResponse } from '@/lib/axiosClient';

const path = `admin/dashboard/category`;

export const getAllCategories = async () => {
  try {
    const response: IApiResponse = await apiRequest({
      method: 'GET',
      url: path,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addNewCategory = async (name: string) => {
  try {
    const response = await apiRequest({
      method: 'POST',
      url: path,
      data: { name },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const updatedCategory = async (body: { id: string; name: string }) => {
  try {
    const response = await apiRequest({
      method: 'PATCH',
      url: path,
      data: body,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const response = await apiRequest({
      method: 'DELETE',
      url: path,
      data: { id },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
