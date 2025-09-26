// Simulação de API para o LibrasPlay
// Em um app real, essas funções fariam chamadas HTTP para um servidor

export const LibrasAPI = {
  // Dados das letras e gestos (simulação)
  getAlphabet() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const alphabet = [];
        for (let i = 65; i <= 90; i++) {
          const letter = String.fromCharCode(i);
          alphabet.push({
            id: letter,
            letter: letter,
            name: `Letra ${letter}`,
            description: `Aprenda a fazer a letra ${letter} em Libras`,
            difficulty: Math.ceil(Math.random() * 3), // 1-3
            gestureImage: `gesture_${letter.toLowerCase()}.png`, // Placeholder
            colors: [
              '#ff6b9d', '#4ecdc4', '#ffe66d', '#95e1d3', 
              '#ffa726', '#b19cd9'
            ][Math.floor(Math.random() * 6)],
          });
        }
        resolve(alphabet);
      }, 500);
    });
  },

  // Dados dos números (simulação)
  getNumbers() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const numbers = [];
        for (let i = 0; i <= 9; i++) {
          numbers.push({
            id: i.toString(),
            number: i,
            name: `Número ${i}`,
            description: `Aprenda a fazer o número ${i} em Libras`,
            difficulty: i === 0 ? 1 : Math.ceil(i / 3), // 0 é fácil, depois vai aumentando
            gestureImage: `gesture_${i}.png`, // Placeholder
            colors: [
              '#ff6b9d', '#4ecdc4', '#ffe66d', '#95e1d3', 
              '#ffa726', '#b19cd9'
            ][i % 6],
          });
        }
        resolve(numbers);
      }, 500);
    });
  },

  // Simulação de validação de gesto (MVP)
  async validateGesture(imageUri, expectedSymbol) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulação: 70% de chance de acerto aleatório para o MVP
        const success = Math.random() > 0.3;
        const confidence = success ? 
          0.7 + Math.random() * 0.3 : // 70-100% se correto
          Math.random() * 0.6; // 0-60% se incorreto
        
        resolve({
          success,
          confidence: Math.round(confidence * 100),
          expectedSymbol,
          detectedSymbol: success ? expectedSymbol : 'desconhecido',
          feedback: success ? 
            [
              'Perfeito! Continue assim! 🎉',
              'Excelente! Você acertou! ⭐',
              'Muito bem! Gesto correto! 👏',
              'Parabéns! Você é incrível! 🌟'
            ][Math.floor(Math.random() * 4)] :
            [
              'Quase lá! Tente novamente! 💪',
              'Não foi dessa vez, mas continue tentando! 🔄',
              'Vamos treinar mais um pouco! 📚',
              'Não desista! Você consegue! 🚀'
            ][Math.floor(Math.random() * 4)],
          tips: success ? [] : [
            'Certifique-se de que sua mão está bem visível',
            'Mantenha os dedos na posição correta',
            'Tente com uma iluminação melhor',
            'Revise o gesto na tela de aprender'
          ]
        });
      }, 1500); // Simula tempo de processamento
    });
  },

  // Buscar conquistas disponíveis
  getAchievements() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'first_letter',
            title: 'Primeira Letra!',
            description: 'Aprendeu sua primeira letra em Libras',
            icon: 'star',
            color: '#ffd700',
            requirement: 'learn_1_letter',
          },
          {
            id: 'alphabet_master',
            title: 'Mestre do Alfabeto',
            description: 'Aprendeu todas as 26 letras',
            icon: 'emoji-events',
            color: '#ffd700',
            requirement: 'learn_26_letters',
          },
          {
            id: 'number_master',
            title: 'Mestre dos Números',
            description: 'Dominou todos os números de 0 a 9',
            icon: 'format-list-numbered',
            color: '#4caf50',
            requirement: 'learn_10_numbers',
          },
          {
            id: 'dedicated',
            title: 'Dedicado',
            description: 'Praticou por 5 dias seguidos',
            icon: 'calendar-today',
            color: '#ff6b9d',
            requirement: 'streak_5_days',
          },
          {
            id: 'practice_champion',
            title: 'Campeão da Prática',
            description: 'Praticou 50 gestos com sucesso',
            icon: 'fitness-center',
            color: '#4ecdc4',
            requirement: 'practice_50_gestures',
          },
          {
            id: 'point_collector',
            title: 'Colecionador de Pontos',
            description: 'Acumulou 1000 pontos',
            icon: 'attach-money',
            color: '#ffe66d',
            requirement: 'earn_1000_points',
          },
        ]);
      }, 300);
    });
  },

  // Buscar dicas diárias
  getDailyTip() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tips = [
          'Pratique um pouco todos os dias para melhores resultados!',
          'Libras é uma língua visual-espacial completa!',
          'Use expressões faciais - elas são parte importante da comunicação!',
          'Pratique na frente do espelho para ver seus gestos!',
          'A repetição é a chave para memorizar os gestos!',
          'Libras tem sua própria gramática, diferente do português!',
          'Tente praticar com amigos ou família!',
          'Assistir vídeos de pessoas surdas ajuda muito no aprendizado!',
        ];
        
        resolve({
          tip: tips[Math.floor(Math.random() * tips.length)],
          date: new Date().toISOString(),
        });
      }, 200);
    });
  },

  // Simulação de envio de feedback
  async sendFeedback(feedback) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Feedback enviado:', feedback);
        resolve({ success: true, message: 'Obrigado pelo seu feedback!' });
      }, 1000);
    });
  },

  // Estatísticas globais (simulação)
  getGlobalStats() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalUsers: 15847,
          totalPractices: 892456,
          totalLettersLearned: 156234,
          averageProgress: 68,
        });
      }, 800);
    });
  },
};