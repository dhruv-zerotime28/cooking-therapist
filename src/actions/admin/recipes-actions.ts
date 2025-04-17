'use client';

import { apiRequest } from '@/lib/axiosClient';
import { IApiResponse } from '@/lib/axiosClient';
import { fileDetails } from '@/Schemas/recipes';
import axios from 'axios';

const path = `admin/dashboard/recipe`;
const tagsPath = `client/tag`;
const categoryPath = `client/category`;

interface IUpload {
  fileName: string;
  url: string;
  file: File;
}

interface IfilteredRecipes {
  search: string;
  page: number;
  sortField: string;
}

export const addRecipe = async (data: any) => {
  try {
    const response: IApiResponse = await apiRequest({
      method: 'POST',
      url: path,
      data: data,
    });
    return response.message;
  } catch (error) {
    return error;
  }
};

export const updateRecipe = async (data: any) => {
  try {
    const response: IApiResponse = await apiRequest({
      method: 'PATCH',
      url: path,
      data: data,
    });
    return response.message;
  } catch (error) {
    return error;
  }
};

export const getAllRecipes = async (queryParams: IfilteredRecipes) => {
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
    return error;
  }
};

export const deleteReciepe = async (id: string) => {
  try {
    const response = await apiRequest({
      method: 'DELETE',
      url: path,
      data: { id },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getFilteredData = async (data: any) => {
  try {
    const response: IApiResponse = await apiRequest({
      method: 'POST',
      url: `${path}/[slugs]`,
      data: data,
    });
    return response.message;
  } catch (error) {
    return error;
  }
}; 

export const getAllTags = async () => {
  try {
    const response: IApiResponse = await apiRequest({
      method: 'GET',
      url: tagsPath,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllCategory = async () => {
  try {
    const response: IApiResponse = await apiRequest({
      method: 'GET',
      url: categoryPath,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPreSignedUrl = async (data: fileDetails[]) => {
  console.log('file presigned data',data)
  try {
    const response: IApiResponse = await apiRequest({
      method: 'POST',
      url: `${path}/presigned-url`,
      data : data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadImage = async (images: IUpload[]) => {
  console.log('img:',images)
  try {
    const responses = await Promise.all(
      images.map(async ({ url, file }) => {
        return axios.put(url, file, {
          headers: {
            'Content-Type': file.type, 
          },
        });
      })
    );
    console.log('api aws res :',responses)
    return responses

  } catch (error) {
    console.log('AWS err while uploading:',error)
    throw new Error('Error while uploading data')
  }
};
