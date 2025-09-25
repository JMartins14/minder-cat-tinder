import { useState, useEffect, useCallback } from 'react';
import { CatBreed } from '../types';
import { fetchCatBreeds } from '../services/api';

export const useCatBreeds = (page: number = 0, limit: number = 10) => {
  const [breeds, setBreeds] = useState<CatBreed[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadBreeds = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchCatBreeds(page, limit);
      console.log('Fetched breeds:', response);
      setBreeds(response);
    } catch (e) {
      setError('Failed to fetch breeds');
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    loadBreeds();
  }, [loadBreeds]);

  const refetch = useCallback(() => {
    loadBreeds();
  }, [loadBreeds]);

  return {
    breeds,
    loading,
    error,
    refetch,
  };
};
