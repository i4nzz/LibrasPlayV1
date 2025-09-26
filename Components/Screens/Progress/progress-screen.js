import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  Dimensions,
  Animated
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const ProgressScreen = () => {
  const [progress, setProgress] = useState(65); // Exemplo: 65% de progresso
  const [points, setPoints] = useState(1250); // Pontos acumulados
  const [level, setLevel] = useState(3); // Nível atual
  const [medals, setMedals] = useState({ bronze: 5, silver: 2, gold: 1 });
  
  const progressAnim = new Animated.Value(0);

  useEffect(() => {
    // Animação da barra de progresso
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  const Medal = ({ type, count, color, icon }) => (
    <View style={styles.medalContainer}>
      <View style={[styles.medalCircle, { backgroundColor: color }]}>
        <MaterialIcons name={icon} size={30} color="#fff" />
      </View>
      <Text style={styles.medalCount}>{count}</Text>
      <Text style={styles.medalType}>{type}</Text>
    </View>
  );

  const Achievement = ({ title, description, completed }) => (
    <View style={[
      styles.achievementCard,
      completed && styles.achievementCompleted
    ]}>
      <MaterialIcons 
        name={completed ? "check-circle" : "radio-button-unchecked"} 
        size={24} 
        color={completed ? "#4caf50" : "#ccc"}
      />
      <View style={styles.achievementText}>
        <Text style={[
          styles.achievementTitle,
          completed && styles.achievementTitleCompleted
        ]}>
          {title}
        </Text>
        <Text style={styles.achievementDescription}>
          {description}
        </Text>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={['#ffe66d', '#fff']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Meu Progresso</Text>
          <MaterialIcons 
            name="back-hand" 
            size={40} 
            color="#ff6b9d" 
            style={styles.mascotHeader}
          />
        </View>

        {/* Pontos e Nível */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <MaterialIcons name="star" size={40} color="#ffa726" />
            <Text style={styles.statNumber}>{points}</Text>
            <Text style={styles.statLabel}>Pontos</Text>
          </View>
          
          <View style={styles.statCard}>
            <MaterialIcons name="trending-up" size={40} color="#4caf50" />
            <Text style={styles.statNumber}>Nível {level}</Text>
            <Text style={styles.statLabel}>Atual</Text>
          </View>
        </View>

        {/* Barra de Progresso para o próximo nível */}
        <View style={styles.progressSection}>
          <Text style={styles.progressTitle}>Progresso para o Nível {level + 1}</Text>
          <View style={styles.progressBarContainer}>
            <Animated.View 
              style={[
                styles.progressBar,
                { width: progressWidth }
              ]}
            />
          </View>
          <Text style={styles.progressText}>{progress}% concluído</Text>
        </View>

        {/* Medalhas */}
        <View style={styles.medalsSection}>
          <Text style={styles.sectionTitle}>Suas Medalhas</Text>
          <View style={styles.medalsContainer}>
            <Medal 
              type="Ouro" 
              count={medals.gold} 
              color="#ffd700" 
              icon="emoji-events"
            />
            <Medal 
              type="Prata" 
              count={medals.silver} 
              color="#c0c0c0" 
              icon="emoji-events"
            />
            <Medal 
              type="Bronze" 
              count={medals.bronze} 
              color="#cd7f32" 
              icon="emoji-events"
            />
          </View>
        </View>

        {/* Conquistas */}
        <View style={styles.achievementsSection}>
          <Text style={styles.sectionTitle}>Conquistas</Text>
          
          <Achievement
            title="Primeira Letra!"
            description="Aprendeu sua primeira letra em Libras"
            completed={true}
          />
          
          <Achievement
            title="Dedicado"
            description="Pratique por 5 dias seguidos"
            completed={true}
          />
          
          <Achievement
            title="Alfabeto Completo"
            description="Aprenda todas as 26 letras"
            completed={false}
          />
          
          <Achievement
            title="Mestre dos Números"
            description="Domine todos os números de 0 a 9"
            completed={false}
          />
        </View>

        {/* Mensagem motivacional do mascote */}
        <View style={styles.motivationContainer}>
          <View style={styles.motivationBubble}>
            <Text style={styles.motivationText}>
              Parabéns pelo seu progresso! Continue assim e logo será um expert em Libras! 🌟
            </Text>
          </View>
          <MaterialIcons 
            name="back-hand" 
            size={60} 
            color="#ff6b9d" 
            style={styles.mascotMotivation}
          />
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
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  mascotHeader: {
    transform: [{ rotate: '15deg' }],
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 30,
    gap: 15,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  progressSection: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4caf50',
    borderRadius: 6,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  medalsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  medalsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
  },
  medalContainer: {
    alignItems: 'center',
  },
  medalCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  medalCount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  medalType: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  achievementsSection: {
    marginBottom: 30,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  achievementCompleted: {
    backgroundColor: '#f0f8f0',
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50',
  },
  achievementText: {
    flex: 1,
    marginLeft: 15,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  achievementTitleCompleted: {
    color: '#4caf50',
  },
  achievementDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  motivationContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginHorizontal: 20,
  },
  motivationBubble: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    flex: 1,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  motivationText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    textAlign: 'center',
  },
  mascotMotivation: {
    marginBottom: 10,
    transform: [{ rotate: '-10deg' }],
  },
});

export default ProgressScreen;