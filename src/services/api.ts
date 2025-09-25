import axios from 'axios';
import { CatBreed, CatImage, VoteRequest, VoteResponse } from '../types';

const BASE_URL = 'https://api.thecatapi.com/v1';

const catApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'x-api-key': 'ylX4blBYT9FaoVd6OhvR',
  },
});

export const fetchCatBreeds = async (
  page: number = 0,
  limit: number = 10,
): Promise<CatBreed[]> => {
  const response = await catApi.get(`/breeds`, {
    params: {
      limit,
      page,
    },
  });
  return response.data;
};

export const fetchCatImages = async (
  breed_ids: string,
  limit: number = 10,
): Promise<CatImage[]> => {
  const response = await catApi.get(`/images/search`, {
    params: {
      limit,
      breed_ids,
      has_breeds: 1,
      size: 'med',
    },
  });
  return response.data;
};

export const voteCat = async (voteData: VoteRequest): Promise<VoteResponse> => {
  const response = await catApi.post('/votes', voteData);
  return response.data;
};
