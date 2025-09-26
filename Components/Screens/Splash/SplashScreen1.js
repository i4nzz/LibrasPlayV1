import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Animated, 
  Dimensions 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { LibrasButton } from '../../UI';

const { width, height } = Dimensions.get('window');

const SplashScreen1 = ({ onStart }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animação de entrada
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(bounceAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    // Animação contínua da mãozinha
    const startHandAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: 1.1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    const timer = setTimeout(startHandAnimation, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={['#ff6b9d', '#4ecdc4', '#ffe66d']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.content}>
        {/* Logo do App */}
        <Animated.View 
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <Text style={styles.logoText}>LibrasPlay</Text>
          <Text style={styles.subtitleText}>Aprenda Libras Brincando!</Text>
        </Animated.View>

        {/* Mascote - Mãozinha Sorridente */}
        <Animated.View 
          style={[
            styles.mascotContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: bounceAnim }]
            }
          ]}
        >
          <View style={styles.handContainer}>
            <MaterialIcons 
              name="back-hand" 
              size={120} 
              color="#fff" 
            />
            {/* Rostinho sorridente na mão */}
            <View style={styles.faceContainer}>
              <View style={styles.eye} />
              <View style={styles.eye} />
              <View style={styles.smile} />
            </View>
          </View>
        </Animated.View>

        {/* Botão Começar */}
        <Animated.View 
          style={[
            styles.buttonContainer,
            { opacity: fadeAnim }
          ]}
        >
          <LibrasButton
            title="COMEÇAR!"
            backgroundColor="#fff"
            textColor="#ff6b9d"
            icon="play-arrow"
            onPress={onStart}
            style={styles.startButton}
          />
        </Animated.View>

        {/* Elementos decorativos */}
        <Animated.View 
          style={[
            styles.decorativeElements,
            { opacity: fadeAnim }
          ]}
        >
          <MaterialIcons name="star" size={30} color="#fff" style={styles.star1} />
          <MaterialIcons name="star" size={20} color="#fff" style={styles.star2} />
          <MaterialIcons name="star" size={25} color="#fff" style={styles.star3} />
        </Animated.View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 2,
  },
  subtitleText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 8,
    fontWeight: '600',
    textAlign: 'center',
  },
  mascotContainer: {
    marginBottom: 60,
  },
  handContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  faceContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eye: {
    width: 8,
    height: 8,
    backgroundColor: '#333',
    borderRadius: 4,
    marginBottom: 2,
  },
  smile: {
    width: 20,
    height: 10,
    borderBottomWidth: 3,
    borderColor: '#333',
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    marginBottom: 40,
  },
  startButton: {
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  decorativeElements: {
    position: 'absolute',
    width: width,
    height: height,
  },
  star1: {
    position: 'absolute',
    top: height * 0.15,
    left: width * 0.1,
  },
  star2: {
    position: 'absolute',
    top: height * 0.25,
    right: width * 0.15,
  },
  star3: {
    position: 'absolute',
    bottom: height * 0.2,
    left: width * 0.2,
  },
});

export default SplashScreen1;