import { useState, useEffect, useCallback } from 'react';
import { CatImage, CatBreed } from '../types';
import { fetchCatImages } from '../services/api';

export const useCatImages = (breedIds: string | CatBreed[]) => {
  const [images, setImages] = useState<CatImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadImages = useCallback(async (breeds: CatBreed[]) => {
    try {
      setLoading(true);
      setError(null);

      const imagePromises = breeds.map(async breed => {
        const response = await fetchCatImages(breed.id, 1);
        return response[0] || null;
      });

      const imageResults = await Promise.all(imagePromises);
      setImages(imageResults);
    } catch (e) {
      setError('Failed to fetch images for breeds');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (Array.isArray(breedIds) && breedIds.length > 0) {
      loadImages(breedIds);
    }
  }, [breedIds, loadImages]);

  const refetch = useCallback(() => {
    if (Array.isArray(breedIds) && breedIds.length > 0) {
      loadImages(breedIds);
    }
  }, [breedIds, loadImages]);

  const loadMore = useCallback(async () => {
    if (!loading && Array.isArray(breedIds) && breedIds.length > 0) {
      loadImages(breedIds);
    }
  }, [loading, breedIds, loadImages]);

  return {
    images,
    loading,
    error,
    refetch,
    loadMore,
  };
};
