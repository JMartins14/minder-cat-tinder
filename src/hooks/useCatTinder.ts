import { useState, useCallback, useMemo } from 'react';
import { useCatBreeds } from './useCatBreeds';
import { useCatImages } from './useCatImages';
import { useCatVote } from './useCatVote';

export const useCatTinder = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const {
    breeds,
    loading: breedsLoading,
    error: breedsError,
    refetch: refetchBreeds,
  } = useCatBreeds(0, 25);

  const {
    images: images,
    loading: imagesLoading,
    error: imagesError,
  } = useCatImages(breeds);

  const { likeCat, dislikeCat, loading: voteLoading } = useCatVote();

  const currentImage = useMemo(() => {
    return images[currentIndex] || null;
  }, [images, currentIndex]);

  const currentBreed = useMemo(() => {
    return breeds[currentIndex] || null;
  }, [breeds, currentIndex]);

  const nextImage = useMemo(() => {
    return images[currentIndex + 1] || null;
  }, [images, currentIndex]);

  const nextBreed = useMemo(() => {
    return breeds[currentIndex + 1] || null;
  }, [breeds, currentIndex]);

  const nextCat = useCallback(() => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
      refetchBreeds();
    }
  }, [currentIndex, images, refetchBreeds]);

  const handleLike = useCallback(async () => {
    if (currentImage && !voteLoading) {
      await likeCat(currentImage.id);
      nextCat();
    }
  }, [currentImage, voteLoading, likeCat, nextCat]);

  const handleDislike = useCallback(async () => {
    if (currentImage && !voteLoading) {
      await dislikeCat(currentImage.id);
      nextCat();
    }
  }, [currentImage, voteLoading, dislikeCat, nextCat]);

  return {
    currentBreed,
    currentImage,
    nextBreed,
    nextImage,
    breedsLoading,
    imagesLoading,
    voteLoading,
    breedsError,
    imagesError,
    handleLike,
    handleDislike,
    refetchBreeds,
    nextCat,
  };
};
