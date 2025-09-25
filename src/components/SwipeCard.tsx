import React, { useEffect, useImperativeHandle, forwardRef } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
  withSpring,
  interpolate,
  withTiming,
  Extrapolation,
} from 'react-native-reanimated';
import { Gesture } from 'react-native-gesture-handler';
import { Cat } from '../types';

const { width, height } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.25;

export interface SwipeCardRef {
  swipeLeft: () => void;
  swipeRight: () => void;
}

interface SwipeCardProps {
  cat: Cat;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

const SwipeCard = forwardRef<SwipeCardRef, SwipeCardProps>(
  ({ cat, onSwipeLeft, onSwipeRight }, ref) => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const scale = useSharedValue(1);

    useEffect(() => {
      translateX.value = 0;
      translateY.value = 0;
      scale.value = 1;
    }, [cat.id, translateX, translateY, scale]);

    useImperativeHandle(ref, () => ({
      swipeLeft: () => {
        translateX.value = withTiming(-width * 1.5, { duration: 300 });
        runOnJS(onSwipeLeft)();
      },
      swipeRight: () => {
        translateX.value = withTiming(width * 1.5, { duration: 300 });
        runOnJS(onSwipeRight)();
      },
    }));

    const panGesture = Gesture.Pan()
      .onUpdate(event => {
        translateX.value = event.translationX;
        translateY.value = event.translationY;

        scale.value = interpolate(
          Math.abs(translateX.value),
          [0, 100],
          [1, 0.95],
          Extrapolation.CLAMP,
        );
      })
      .onEnd(() => {
        const shouldSwipeRight = translateX.value > SWIPE_THRESHOLD;
        const shouldSwipeLeft = translateX.value < -SWIPE_THRESHOLD;

        if (shouldSwipeRight) {
          translateX.value = withTiming(width * 1.5, { duration: 200 });
          runOnJS(onSwipeRight)();
        } else if (shouldSwipeLeft) {
          translateX.value = withTiming(-width * 1.5, { duration: 200 });
          runOnJS(onSwipeLeft)();
        } else {
          translateX.value = withSpring(0);
          translateY.value = withSpring(0);
          scale.value = withSpring(1);
        }
      });

    const cardStyle = useAnimatedStyle(() => {
      const rotate = interpolate(
        translateX.value,
        [-width / 2, 0, width / 2],
        [-30, 0, 30],
        Extrapolation.CLAMP,
      );
      return {
        transform: [
          { translateX: translateX.value },
          { translateY: translateY.value },
          { rotate: `${rotate}deg` },
          { scale: scale.value },
        ],
      };
    });

    const nopeOpacityStyle = useAnimatedStyle(() => ({
      opacity: interpolate(
        translateX.value,
        [-SWIPE_THRESHOLD, 0],
        [1, 0],
        Extrapolation.CLAMP,
      ),
    }));

    const likeOpacityStyle = useAnimatedStyle(() => ({
      opacity: interpolate(
        translateX.value,
        [0, SWIPE_THRESHOLD],
        [0, 1],
        Extrapolation.CLAMP,
      ),
    }));

    return (
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.container, cardStyle]}>
          <View style={styles.card}>
            <Image
              source={{
                uri: cat.imageUrl,
              }}
              style={styles.catImage}
              resizeMode="cover"
            />

            <Animated.View style={[styles.likeLabel, likeOpacityStyle]}>
              <Text style={styles.likeLabelText}>LIKE</Text>
            </Animated.View>

            <Animated.View style={[styles.nopeLabel, nopeOpacityStyle]}>
              <Text style={styles.nopeLabelText}>NOPE</Text>
            </Animated.View>

            <View style={styles.catInfo}>
              <View style={styles.catDetails}>
                <Text style={styles.breedName}>{cat.name}</Text>
                <Text style={styles.catDescription}>
                  {cat.temperament?.split(',').slice(0, 3).join(' • ') ||
                    'Friendly • Loving'}
                </Text>
              </View>
              <Text style={styles.ageText}>{cat.age || '2-4'}</Text>
            </View>
          </View>
        </Animated.View>
      </GestureDetector>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: width - 40,
    height: height * 0.6,
  },
  card: {
    flex: 1,
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
  likeLabel: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(76, 217, 100, 0.9)',
    paddingHorizontal: 35,
    paddingVertical: 15,
    borderRadius: 12,
    transform: [{ rotate: '15deg' }],
  },
  likeLabelText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  nopeLabel: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(255, 59, 48, 0.9)',
    paddingHorizontal: 35,
    paddingVertical: 15,
    borderRadius: 12,
    transform: [{ rotate: '-15deg' }],
  },
  nopeLabelText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 2,
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
  ageText: {
    fontSize: 20,
    color: '#666',
    fontWeight: '500',
  },
});

export default SwipeCard;
