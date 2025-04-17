'use client';

import { IApiResponse } from '@/lib/axiosClient';
import { apiRequest } from '@/lib/axiosClient';

interface IfilteredTags {
  search: string;
  page: number;
  sortField: string;
}
const path = `admin/dashboard/tags`;

export const getFilteredTags = async (queryParams: IfilteredTags) => {
  try {
    const response: IApiResponse = await apiRequest({
      method: 'GET',
      params: {
        search: queryParams?.search || '',
        page: queryParams.page,
        sortField: queryParams.sortField,
      },
      url: path,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addNewTag = async (name: string) => {
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

export const updateTag = async (body: { id: string; name: string }) => {
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

export const deleteTag = async (id: string) => {
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
