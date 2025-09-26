import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const LibrasButton = ({ 
  title, 
  onPress, 
  backgroundColor = '#ff6b9d', 
  textColor = '#fff',
  icon = null,
  size = 'large',
  style = {}
}) => {
  const buttonStyle = size === 'large' ? styles.largeButton : styles.mediumButton;
  const textStyle = size === 'large' ? styles.largeText : styles.mediumText;

  return (
    <TouchableOpacity 
      style={[
        buttonStyle, 
        { backgroundColor }, 
        style
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.buttonContent}>
        {icon && (
          <MaterialIcons 
            name={icon} 
            size={size === 'large' ? 28 : 20} 
            color={textColor} 
            style={styles.icon}
          />
        )}
        <Text style={[textStyle, { color: textColor }]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  largeButton: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    minWidth: 200,
  },
  mediumButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: 150,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 8,
  },
  largeText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mediumText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default LibrasButton;