import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useCatTinder } from '../hooks/useCatTinder';

const { width, height } = Dimensions.get('window');

const CatScreens = () => {
  const {
    currentBreed,
    currentImage,
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
        <View style={styles.card}>
          <Image
            source={{ uri: currentImage.url }}
            style={styles.catImage}
            resizeMode="cover"
          />

          <View style={styles.catInfo}>
            <View style={styles.catDetails}>
              <Text style={styles.breedName}>{currentBreed.name}</Text>
              <Text style={styles.catDescription}>
                {currentBreed.temperament?.split(',').slice(0, 3).join(' • ') ||
                  'Friendly • Loving'}
              </Text>
            </View>
            <Text style={styles.ageText}>{currentBreed?.life_span}</Text>
          </View>
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
  card: {
    width: width - 40,
    height: height * 0.6,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    overflow: 'hidden',
  },
  catImage: {
    width: '100%',
    height: '100%',
  },
  catInfo: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  catDetails: {
    flex: 1,
  },
  breedName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  catDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#999',
  },
  ageText: {
    fontSize: 20,
    color: '#666',
    fontWeight: '500',
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
