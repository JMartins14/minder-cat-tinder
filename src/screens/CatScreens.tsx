import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useCatTinder } from '../hooks/useCatTinder';
import SwipeCard from '../components/SwipeCard';

const CatScreens = () => {
  const {
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
  } = useCatTinder();

  if (breedsLoading || imagesLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#4ecdc4" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (breedsError || imagesError) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.errorText}>Something went wrong.</Text>
        <TouchableOpacity
          onPress={() => {
            refetchBreeds();
          }}
          style={styles.retryButton}
        >
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!currentImage || !currentBreed) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.errorText}>No cats available right now.</Text>
        <TouchableOpacity
          onPress={() => {
            refetchBreeds();
          }}
          style={styles.retryButton}
        >
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.cardsWrapper}>
          {nextImage && nextBreed && (
            <View style={styles.nextCardWrapper} pointerEvents="none">
              <SwipeCard
                key={nextImage.id}
                cat={{
                  id: nextImage.id,
                  name: nextBreed.name,
                  imageUrl: nextImage.url,
                  temperament: nextBreed.temperament,
                  age: nextBreed.life_span,
                }}
                onSwipeLeft={() => {}}
                onSwipeRight={() => {}}
              />
            </View>
          )}
          {currentImage && currentBreed && (
            <View style={styles.currentCardWrapper}>
              <SwipeCard
                key={currentImage.id}
                cat={{
                  id: currentImage.id,
                  name: currentBreed.name,
                  imageUrl: currentImage.url,
                  temperament: currentBreed.temperament,
                  age: currentBreed.life_span,
                }}
                onSwipeLeft={handleDislike}
                onSwipeRight={handleLike}
              />
            </View>
          )}
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.dislikeButton, voteLoading && styles.disabled]}
          onPress={handleDislike}
          disabled={voteLoading}
        >
          <Text style={styles.dislikeIcon}>✕</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.likeButton, voteLoading && styles.disabled]}
          onPress={handleLike}
          disabled={voteLoading}
        >
          <Text style={styles.likeIcon}>♥</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  cardsWrapper: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
  },
  nextCardWrapper: {
    zIndex: 1,
  },
  currentCardWrapper: {
    position: 'absolute',
    top: 0,
    zIndex: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    gap: 40,
  },
  dislikeButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  likeButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  dislikeIcon: {
    fontSize: 24,
    color: '#ff6b6b',
    fontWeight: 'bold',
  },
  likeIcon: {
    fontSize: 24,
    color: '#4ecdc4',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
    marginTop: 16,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 20,
    color: '#ff6b6b',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  errorSubtext: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.6,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default CatScreens;
