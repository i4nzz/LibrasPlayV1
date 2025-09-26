import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const CardLesson = ({ 
  letter, 
  onPress, 
  backgroundColor = '#4ecdc4',
  completed = false
}) => {
  return (
    <TouchableOpacity 
      style={[
        styles.card, 
        { backgroundColor },
        completed && styles.completedCard
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.cardContent}>
        {/* Ícone de mão representando o gesto */}
        <View style={styles.handIconContainer}>
          <MaterialIcons 
            name="back-hand" 
            size={40} 
            color="#fff" 
          />
        </View>
        
        {/* Letra/Número */}
        <Text style={styles.letterText}>{letter}</Text>
        
        {/* Indicador de progresso */}
        {completed && (
          <View style={styles.completedIndicator}>
            <MaterialIcons 
              name="check-circle" 
              size={20} 
              color="#4caf50" 
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 120,
    height: 140,
    borderRadius: 20,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  completedCard: {
    borderWidth: 3,
    borderColor: '#4caf50',
  },
  cardContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  handIconContainer: {
    marginBottom: 8,
  },
  letterText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  completedIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 2,
  },
});

export default CardLesson;