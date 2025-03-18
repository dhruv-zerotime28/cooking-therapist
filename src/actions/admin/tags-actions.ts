import { tagType } from '@/Schemas/tags';
import axios from 'axios';
import { IApiResponse } from '@/lib/axiosClient';
import { apiRequest } from '@/lib/axiosClient';

export const getAllTags = async () => {
  try {
    const response: IApiResponse = await apiRequest({
      method: 'GET',
      url: '/admins/tags',
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const addNewTag = async (name: string) => {
  try {
    const response = await apiRequest({
      method: 'POST',
      url: '/admins/tags',
      data: { name },
    });
    return response;
  } catch (error) {
    return error;
  }
};
export const updateTag = async (body: { id: string; name: string }) => {
  try {
    const response = await apiRequest({
      method: 'PATCH',
      url: '/admins/tags',
      data: body,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteTag = async (id: string) => {
  try {
    const response = await apiRequest({
      method: 'DELETE',
      url: '/admins/tags',
      data: { id },
    });
    return response;
  } catch (error) {
    return error;
  }
};
