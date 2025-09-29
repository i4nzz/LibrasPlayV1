import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  FlatList,
  Alert
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

// compontentes
import { LibrasButton, CardLesson, LibrasTabs } from './Components/UI';
import SplashScreen1 from './Components/Screens/Splash/SplashScreen1';
import LoginScreen from './Components/Screens/Auth/LoginScreen';
import LearnDetail from './Components/Screens/Learn/learn-detail';
import ProgressScreen from './Components/Screens/Progress/progress-screen';

import { LibrasAPI } from './Components/Data/API/user';
import { UserDataStorage } from './Components/Data/LocalStorage/userData';

const { width } = Dimensions.get('window');

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [activeTab, setActiveTab] = useState('learn');
  const [alphabetData, setAlphabetData] = useState([]);
  const [userProgress, setUserProgress] = useState(null);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      
      const alphabet = await LibrasAPI.getAlphabet();
      setAlphabetData(alphabet);

      const progress = await UserDataStorage.getProgress();
      setUserProgress(progress);

      setIsLoading(false);
    } catch (error) {
      console.error('Erro ao inicializar app:', error);
      setIsLoading(false);
    }
  };

  const handleStartApp = () => {
    setCurrentScreen('login');
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentScreen('main');
  };

  const handleSkipLogin = () => {
    setUser({ name: 'Visitante', isGuest: true });
    setCurrentScreen('main');
  };

  const handleTabPress = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'practice') {
      handlePracticeMode();
    }
  };

  const handleLearnLetter = (letter, backgroundColor) => {
    setSelectedLetter({ letter, backgroundColor });
    setCurrentScreen('learnDetail');
  };

  const handlePracticeMode = () => {
    // Simulação da câmera para MVP
    Alert.alert(
      '📷 Modo Prática',
      'No MVP, esta seria a tela da câmera onde você mostraria o gesto em Libras para validação.',
      [
        {
          text: 'Simular Acerto ✅',
          onPress: () => simulatePracticeSuccess(),
        },
        {
          text: 'Simular Erro ❌',
          onPress: () => simulatePracticeError(),
        },
        {
          text: 'Voltar',
          style: 'cancel',
        },
      ]
    );
  };

  const simulatePracticeSuccess = async () => {
    const randomLetter = alphabetData[Math.floor(Math.random() * alphabetData.length)]?.letter || 'A';
    await UserDataStorage.markLetterPracticed(randomLetter, true);
    
    Alert.alert(
      '🎉 Parabéns!',
      `Você acertou o gesto da letra ${randomLetter}! +20 pontos!`,
      [{ text: 'Continuar', onPress: () => setActiveTab('progress') }]
    );
  };

  const simulatePracticeError = () => {
    Alert.alert(
      '💪 Quase lá!',
      'Não foi dessa vez, mas continue tentando! Use a tela "Aprender" para revisar o gesto.',
      [{ text: 'Tentar Novamente', onPress: handlePracticeMode }]
    );
  };

  const handleBackToMain = () => {
    setCurrentScreen('main');
  };

  // Tela de Splash
  if (currentScreen === 'splash') {
    return (
      <>
        <SplashScreen1 onStart={handleStartApp} />
        <StatusBar style="light" />
      </>
    );
  }

  // Tela de Login
  if (currentScreen === 'login') {
    return (
      <>
        <LoginScreen onLogin={handleLogin} onSkip={handleSkipLogin} />
        <StatusBar style="light" />
      </>
    );
  }


  if (currentScreen === 'learnDetail' && selectedLetter) {
    return (
      <>
        <LearnDetail 
          route={{ params: selectedLetter }}
          navigation={{ 
            goBack: handleBackToMain,
            navigate: (screen, params) => {
              if (screen === 'Practice') {
                handlePracticeMode();
              }
            }
          }}
        />
        <StatusBar style="light" />
      </>
    );
  }

  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Conteúdo principal baseado na aba ativa */}
      {activeTab === 'learn' && (
        <LearnScreen 
          alphabetData={alphabetData}
          onLearnLetter={handleLearnLetter}
          userProgress={userProgress}
          user={user}
        />
      )}

      {activeTab === 'practice' && (
        <PracticeScreen onPractice={handlePracticeMode} />
      )}

      {activeTab === 'progress' && <ProgressScreen />}

      {activeTab === 'settings' && <SettingsScreen user={user} onLogout={() => {
        setUser(null);
        setCurrentScreen('login');
      }} />}

      {/* Navegação inferior */}
      <LibrasTabs 
        activeTab={activeTab}
        onTabPress={handleTabPress}
      />
    </View>
  );
}

// Tela Aprender
const LearnScreen = ({ alphabetData, onLearnLetter, userProgress, user }) => (
  <LinearGradient
    colors={['#ff6b9d', '#fff']}
    style={styles.screenContainer}
    start={{ x: 0, y: 0 }}
    end={{ x: 0, y: 1 }}
  >
    <ScrollView contentContainerStyle={styles.scrollContent}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Aprender Libras</Text>
        <MaterialIcons 
          name="back-hand" 
          size={40} 
          color="#fff" 
          style={styles.mascotHeader}
        />
      </View>

      {/* Seção de boas-vindas */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>
          Olá, {user?.name || 'Visitante'}! 🌟
        </Text>
        <Text style={styles.welcomeSubtext}>
          {user?.isGuest ? 
            'Você está no modo visitante. Faça login para salvar seu progresso!' :
            'Escolha uma letra para começar a aprender!'
          }
        </Text>
      </View>

      {/* Grid de letras */}
      <View style={styles.letterGrid}>
        <FlatList
          data={alphabetData}
          numColumns={3}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.gridContent}
          renderItem={({ item }) => (
            <CardLesson
              letter={item.letter}
              backgroundColor={item.colors}
              completed={userProgress?.lettersLearned.includes(item.letter)}
              onPress={() => onLearnLetter(item.letter, item.colors)}
            />
          )}
        />
      </View>
    </ScrollView>
  </LinearGradient>
);

// Tela Prática (placeholder)
const PracticeScreen = ({ onPractice }) => (
  <LinearGradient
    colors={['#4ecdc4', '#fff']}
    style={styles.screenContainer}
    start={{ x: 0, y: 0 }}
    end={{ x: 0, y: 1 }}
  >
    <View style={styles.centerContent}>
      <MaterialIcons name="camera-alt" size={100} color="#fff" />
      <Text style={styles.practiceTitle}>Modo Prática</Text>
      <Text style={styles.practiceSubtitle}>
        Use a câmera para mostrar seus gestos em Libras!
      </Text>
      
      <LibrasButton
        title="ABRIR CÂMERA"
        icon="camera-alt"
        backgroundColor="#fff"
        textColor="#4ecdc4"
        onPress={onPractice}
        style={styles.cameraButton}
      />
    </View>
  </LinearGradient>
);

// Tela Configurações
const SettingsScreen = ({ user, onLogout }) => (
  <LinearGradient
    colors={['#95e1d3', '#fff']}
    style={styles.screenContainer}
    start={{ x: 0, y: 0 }}
    end={{ x: 0, y: 1 }}
  >
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Configurações</Text>
        <MaterialIcons name="settings" size={40} color="#fff" />
      </View>

      <View style={styles.settingsContainer}>
        {/* Informações do usuário */}
        {user && (
          <View style={styles.userInfoCard}>
            <MaterialIcons 
              name={user.isGuest ? "person" : "account-circle"} 
              size={40} 
              color="#95e1d3" 
            />
            <View style={styles.userInfoText}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userStatus}>
                {user.isGuest ? 'Modo Visitante' : 'Usuário Logado'}
              </Text>
            </View>
          </View>
        )}

        <SettingItem
          icon="language"
          title="Idioma"
          subtitle="Português"
          onPress={() => Alert.alert('Configurações', 'Seleção de idioma em breve!')}
        />
        
        <SettingItem
          icon="volume-up"
          title="Sons"
          subtitle="Ativado"
          onPress={() => Alert.alert('Configurações', 'Configuração de sons em breve!')}
        />
        
        <SettingItem
          icon="vibration"
          title="Vibração"
          subtitle="Ativada"
          onPress={() => Alert.alert('Configurações', 'Configuração de vibração em breve!')}
        />
        
        <SettingItem
          icon="refresh"
          title="Resetar Progresso"
          subtitle="Apagar todos os dados"
          onPress={() => {
            Alert.alert(
              'Resetar Progresso',
              'Tem certeza? Todos os seus dados serão perdidos!',
              [
                { text: 'Cancelar', style: 'cancel' },
                { 
                  text: 'Resetar', 
                  style: 'destructive',
                  onPress: async () => {
                    await UserDataStorage.resetAllData();
                    Alert.alert('Sucesso', 'Dados resetados com sucesso!');
                  }
                },
              ]
            );
          }}
        />
        
        <SettingItem
          icon="info"
          title="Sobre o App"
          subtitle="LibrasPlay v1.0.0"
          onPress={() => Alert.alert(
            'Sobre o LibrasPlay',
            'LibrasPlay é um aplicativo educativo para ensinar Libras de forma divertida para crianças.\n\nDesenvolvido com ❤️ para inclusão e acessibilidade.'
          )}
        />

        {/* Botão de Logout */}
        {user && (
          <SettingItem
            icon={user.isGuest ? "login" : "logout"}
            title={user.isGuest ? "Fazer Login" : "Sair"}
            subtitle={user.isGuest ? "Entre para salvar seu progresso" : "Voltar para tela de login"}
            onPress={() => {
              Alert.alert(
                user.isGuest ? 'Fazer Login' : 'Sair',
                user.isGuest ? 
                  'Deseja fazer login para salvar seu progresso?' :
                  'Tem certeza que deseja sair?',
                [
                  { text: 'Cancelar', style: 'cancel' },
                  { text: user.isGuest ? 'Login' : 'Sair', onPress: onLogout }
                ]
              );
            }}
          />
        )}
      </View>
    </ScrollView>
  </LinearGradient>
);

const SettingItem = ({ icon, title, subtitle, onPress }) => (
  <LibrasButton
    title=""
    backgroundColor="#fff"
    textColor="#333"
    onPress={onPress}
    style={styles.settingButton}
  >
    <View style={styles.settingContent}>
      <MaterialIcons name={icon} size={24} color="#95e1d3" />
      <View style={styles.settingText}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingSubtitle}>{subtitle}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="#ccc" />
    </View>
  </LibrasButton>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  screenContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
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
    color: '#fff',
  },
  mascotHeader: {
    transform: [{ rotate: '15deg' }],
  },
  welcomeSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  welcomeSubtext: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
  },
  letterGrid: {
    flex: 1,
    paddingHorizontal: 10,
  },
  gridContent: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  practiceTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
  },
  practiceSubtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
    opacity: 0.9,
  },
  cameraButton: {
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  settingsContainer: {
    paddingHorizontal: 20,
  },
  settingButton: {
    marginBottom: 15,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  settingText: {
    flex: 1,
    marginLeft: 15,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  userInfoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  userInfoText: {
    flex: 1,
    marginLeft: 15,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  userStatus: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
});
