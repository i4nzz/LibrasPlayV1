import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  Dimensions,
  Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { LibrasButton } from '../../UI';

const { width } = Dimensions.get('window');

const LearnDetail = ({ route, navigation }) => {
  const { letter, backgroundColor = '#4ecdc4' } = route?.params || { letter: 'A' };

  const handlePractice = () => {
    navigation.navigate('Practice', { letter });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <LinearGradient
      colors={[backgroundColor, '#fff']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header com botão voltar */}
        <View style={styles.header}>
          <LibrasButton
            title=""
            icon="arrow-back"
            backgroundColor="rgba(255,255,255,0.3)"
            textColor="#fff"
            size="medium"
            onPress={handleBack}
            style={styles.backButton}
          />
          <Text style={styles.headerTitle}>Letra {letter}</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Carta da letra */}
        <View style={styles.letterCard}>
          <Text style={styles.bigLetter}>{letter}</Text>
          <Text style={styles.letterDescription}>
            Esta é a letra "{letter}" em Libras
          </Text>
        </View>

        {/* Área da imagem/ilustração do gesto */}
        <View style={styles.gestureContainer}>
          <View style={styles.gestureImagePlaceholder}>
            <MaterialIcons 
              name="back-hand" 
              size={150} 
              color={backgroundColor} 
            />
            <Text style={styles.gestureLabel}>
              Gesto para a letra {letter}
            </Text>
          </View>
          
          {/* Dica visual */}
          <View style={styles.tipContainer}>
            <MaterialIcons name="lightbulb" size={24} color="#ffa726" />
            <Text style={styles.tipText}>
              Observe bem a posição da mão e dos dedos!
            </Text>
          </View>
        </View>

        {/* Mascote incentivando */}
        <View style={styles.mascotContainer}>
          <View style={styles.mascotBubble}>
            <Text style={styles.mascotText}>
              Ótima escolha! Agora que você aprendeu, que tal praticar?
            </Text>
          </View>
          <MaterialIcons 
            name="back-hand" 
            size={60} 
            color="#ff6b9d" 
            style={styles.mascotHand}
          />
        </View>

        {/* Botão para praticar */}
        <View style={styles.practiceSection}>
          <LibrasButton
            title="PRATICAR ESTE GESTO"
            backgroundColor="#ff6b9d"
            textColor="#fff"
            icon="camera-alt"
            onPress={handlePractice}
            style={styles.practiceButton}
          />
          
          <Text style={styles.practiceHint}>
            Use a câmera para mostrar o gesto!
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    minWidth: 50,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  placeholder: {
    width: 50,
  },
  letterCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginBottom: 30,
  },
  bigLetter: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#333',
  },
  letterDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
  gestureContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  gestureImagePlaceholder: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginBottom: 20,
  },
  gestureLabel: {
    fontSize: 16,
    color: '#333',
    marginTop: 15,
    fontWeight: '600',
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginHorizontal: 20,
  },
  tipText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
    flex: 1,
    fontWeight: '500',
  },
  mascotContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginHorizontal: 20,
    marginBottom: 30,
  },
  mascotBubble: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    flex: 1,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mascotText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  mascotHand: {
    marginBottom: 10,
  },
  practiceSection: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  practiceButton: {
    marginBottom: 15,
  },
  practiceHint: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default LearnDetail;