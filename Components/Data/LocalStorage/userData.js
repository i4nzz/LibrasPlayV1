import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_DATA_KEY = '@LibrasPlay:userData';
const PROGRESS_KEY = '@LibrasPlay:progress';
const SETTINGS_KEY = '@LibrasPlay:settings';

export const UserDataStorage = {
  // Dados do usuário (pontos, nível, medalhas)
  async getUserData() {
    try {
      const userData = await AsyncStorage.getItem(USER_DATA_KEY);
      return userData ? JSON.parse(userData) : {
        points: 0,
        level: 1,
        medals: { bronze: 0, silver: 0, gold: 0 },
        achievements: [],
        lastSeen: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
      return null;
    }
  },

  async saveUserData(userData) {
    try {
      await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
      return true;
    } catch (error) {
      console.error('Erro ao salvar dados do usuário:', error);
      return false;
    }
  },

  async addPoints(points) {
    try {
      const userData = await this.getUserData();
      userData.points += points;
      
      // Verificar se subiu de nível (cada 500 pontos = 1 nível)
      const newLevel = Math.floor(userData.points / 500) + 1;
      if (newLevel > userData.level) {
        userData.level = newLevel;
        // Adicionar medalha por subir de nível
        if (newLevel % 5 === 0) userData.medals.gold++;
        else if (newLevel % 3 === 0) userData.medals.silver++;
        else userData.medals.bronze++;
      }
      
      await this.saveUserData(userData);
      return userData;
    } catch (error) {
      console.error('Erro ao adicionar pontos:', error);
      return null;
    }
  },

  // Progresso das lições (quais letras foram aprendidas/praticadas)
  async getProgress() {
    try {
      const progress = await AsyncStorage.getItem(PROGRESS_KEY);
      return progress ? JSON.parse(progress) : {
        lettersLearned: [],
        lettersPracticed: [],
        numbersLearned: [],
        numbersPracticed: [],
        streakDays: 0,
        lastPracticeDate: null,
      };
    } catch (error) {
      console.error('Erro ao buscar progresso:', error);
      return null;
    }
  },

  async saveProgress(progress) {
    try {
      await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
      return true;
    } catch (error) {
      console.error('Erro ao salvar progresso:', error);
      return false;
    }
  },

  async markLetterLearned(letter) {
    try {
      const progress = await this.getProgress();
      if (!progress.lettersLearned.includes(letter)) {
        progress.lettersLearned.push(letter);
        await this.saveProgress(progress);
        await this.addPoints(10); // 10 pontos por aprender uma letra
      }
      return progress;
    } catch (error) {
      console.error('Erro ao marcar letra como aprendida:', error);
      return null;
    }
  },

  async markLetterPracticed(letter, success = true) {
    try {
      const progress = await this.getProgress();
      const today = new Date().toDateString();
      
      // Verificar streak diário
      if (progress.lastPracticeDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (progress.lastPracticeDate === yesterday.toDateString()) {
          progress.streakDays++;
        } else {
          progress.streakDays = 1;
        }
        progress.lastPracticeDate = today;
      }
      
      if (success && !progress.lettersPracticed.includes(letter)) {
        progress.lettersPracticed.push(letter);
        await this.addPoints(20); // 20 pontos por praticar com sucesso
      } else if (success) {
        await this.addPoints(5); // 5 pontos por prática repetida
      }
      
      await this.saveProgress(progress);
      return progress;
    } catch (error) {
      console.error('Erro ao marcar letra como praticada:', error);
      return null;
    }
  },

  // Configurações do app
  async getSettings() {
    try {
      const settings = await AsyncStorage.getItem(SETTINGS_KEY);
      return settings ? JSON.parse(settings) : {
        language: 'pt',
        soundEnabled: true,
        vibrationEnabled: true,
        firstTime: true,
      };
    } catch (error) {
      console.error('Erro ao buscar configurações:', error);
      return null;
    }
  },

  async saveSettings(settings) {
    try {
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
      return true;
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      return false;
    }
  },

  async resetAllData() {
    try {
      await AsyncStorage.multiRemove([USER_DATA_KEY, PROGRESS_KEY]);
      return true;
    } catch (error) {
      console.error('Erro ao resetar dados:', error);
      return false;
    }
  },

  // Estatísticas úteis
  async getStats() {
    try {
      const userData = await this.getUserData();
      const progress = await this.getProgress();
      
      return {
        totalLettersLearned: progress.lettersLearned.length,
        totalLettersPracticed: progress.lettersPracticed.length,
        totalNumbers: progress.numbersLearned.length,
        currentStreak: progress.streakDays,
        totalPoints: userData.points,
        currentLevel: userData.level,
        progressToNextLevel: (userData.points % 500) / 500 * 100,
        totalMedals: userData.medals.bronze + userData.medals.silver + userData.medals.gold,
      };
    } catch (error) {
      console.error('Erro ao calcular estatísticas:', error);
      return null;
    }
  },
};