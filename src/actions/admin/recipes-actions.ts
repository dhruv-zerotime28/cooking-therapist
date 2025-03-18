'use server';
import axios from 'axios';
import { apiRequest } from '@/lib/axiosClient';
import { IApiResponse } from '@/lib/axiosClient';

export const addRecipe = async (data: any) => {
  try {
    const response: IApiResponse = await apiRequest({
      method: 'POST',
      url: '/admins/recipe',
      data: data
    });
    return response.message;
  } catch (error) {
    return error;
  }
};

export const updateRecipe = async (data : any)=>{
  try {
    const response = await apiRequest({
      method: 'PATCH',
      url: '/admins/recipe',
      data: data,
    });
    return response;
  } catch (error) {
    return error;
  }
}

export const getAllRecipes = async ()=>{
  try {
    const response: IApiResponse = await apiRequest({
      method: 'GET',
      url: '/admins/recipe',
    });

    return response.data;
  } catch (error) {
    return error;
  }
}

export const deleteReciepe = async (id : string)=>{
  try {
    const response = await apiRequest({
      method: 'DELETE',
      url: '/admins/recipe',
      data: {id},
    });
    return response;
  } catch (error) {
    return error;
  }
}