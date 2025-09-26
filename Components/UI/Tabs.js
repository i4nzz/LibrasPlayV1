import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const TabButton = ({ icon, label, isActive, onPress, color }) => (
  <TouchableOpacity 
    style={[styles.tabButton, isActive && styles.activeTab]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <MaterialIcons 
      name={icon} 
      size={28} 
      color={isActive ? '#fff' : '#666'} 
    />
    <Text style={[
      styles.tabLabel, 
      { color: isActive ? '#fff' : '#666' }
    ]}>
      {label}
    </Text>
    {isActive && <View style={[styles.activeIndicator, { backgroundColor: color }]} />}
  </TouchableOpacity>
);

const LibrasTabs = ({ activeTab, onTabPress }) => {
  const tabs = [
    { id: 'learn', icon: 'menu-book', label: 'Aprender', color: '#ff6b9d' },
    { id: 'practice', icon: 'camera-alt', label: 'Praticar', color: '#4ecdc4' },
    { id: 'progress', icon: 'emoji-events', label: 'Progresso', color: '#ffe66d' },
    { id: 'settings', icon: 'settings', label: 'Config', color: '#95e1d3' },
  ];

  return (
    <View style={styles.tabContainer}>
      {tabs.map((tab) => (
        <TabButton
          key={tab.id}
          icon={tab.icon}
          label={tab.label}
          color={tab.color}
          isActive={activeTab === tab.id}
          onPress={() => onTabPress(tab.id)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 12,
    margin: 2,
    position: 'relative',
  },
  activeTab: {
    backgroundColor: '#f0f0f0',
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'center',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: '20%',
    right: '20%',
    height: 3,
    borderRadius: 2,
  },
});

export default LibrasTabs;