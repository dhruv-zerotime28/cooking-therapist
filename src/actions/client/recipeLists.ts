'use client';

import { apiRequest } from '@/lib/axiosClient';
import { IApiResponse } from '@/lib/axiosClient';

const recipePath = `client/recipe`;
const tagPath = `client/tag`;
const categoryPath = `client/category`;

interface IrecipeQueryParams {
  search?:string,
  tags?:Array<string>,
  categories?:Array<string>,
  page? : number
}

export const getAllRecipesList = async (data?: IrecipeQueryParams) => {
  try {
    const response: IApiResponse = await apiRequest({
      method: 'GET',
      url: recipePath,
      params: {
        search: data?.search || '',
        page: data?.page || 1,
        tags : data?.tags || [],
        categories : data?.categories || []
      }, 
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getAllTagsList = async () => {
  try {
    const response: IApiResponse = await apiRequest({
      method: 'GET',
      url: tagPath,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllCategoryList = async () => {
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

export const getRecipeById = async (id:string) => {
    try {
      const response: IApiResponse = await apiRequest({
        method: 'GET',
        url: `${recipePath}/${id}`,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const getRelatedRecipes = async (id:string,tags:string[]) => {
    try {
      const response: IApiResponse = await apiRequest({
        method: 'POST',
        url: `${recipePath}/${id}`,
        data:tags
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };