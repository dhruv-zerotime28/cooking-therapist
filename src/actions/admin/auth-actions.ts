'use client';

import { apiRequest } from '@/lib/axiosClient';
import { IApiResponse } from '@/lib/axiosClient';

const path = '/admin/auth';

export const adminSignIn = async (data: any) => {
  try {
    const response: IApiResponse = await apiRequest({
      method: 'POST',
      url: `${path}/signIn`,
      data,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const adminSignUp = async (data: any) => {
  try {
    const response: IApiResponse = await apiRequest({
      method: 'POST',
      url: `${path}/signUp`,
      data,
    });
    return response.message;
  } catch (error) {
    console.log('err:', error);
    throw error;
  }
};

export const ForgotPasswordApiCall = async (data: any) => {
  try {
    const response: IApiResponse = await apiRequest({
      method: 'POST',
      url: `${path}/forgotPassword`,
      data,
    });
    return response.message;
  } catch (error) {
    throw error;
  }
};

export const resetPasswordApiCall = async (data: any) => {
  try {
    const response: IApiResponse = await apiRequest({
      method: 'POST',
      url: `${path}/resetPassword`,
      data,
    });
    return response.message;
  } catch (error) {
    console.log('err:', error);
    throw error;
  }
};

export const logOutApiCall = async () => {
  try {
    const response: IApiResponse = await apiRequest({
      method: 'POST',
      url: `${path}/logOut`,
    });
    return response.message;
  } catch (error) {
    console.log('err:', error);
    throw error;
  }
};
