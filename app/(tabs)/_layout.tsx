import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { View, StyleSheet, Platform } from 'react-native';
import { Colors } from '../../constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.onPrimary,
        tabBarInactiveTintColor: Colors.onSurfaceVariant,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: 1.2,
        },
        tabBarStyle: {
          backgroundColor: 'rgba(250, 248, 255, 0.92)',
          borderTopWidth: 0,
          height: Platform.OS === 'ios' ? 88 : 72,
          paddingBottom: Platform.OS === 'ios' ? 28 : 12,
          paddingTop: 8,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          position: 'absolute',
          elevation: 20,
          shadowColor: Colors.onSurface,
          shadowOffset: { width: 0, height: -12 },
          shadowOpacity: 0.06,
          shadowRadius: 40,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabIcon name="home" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="customers"
        options={{
          title: 'Customers',
          tabBarIcon: ({ focused }) => (
            <TabIcon name="group" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="photos"
        options={{
          title: 'Photos',
          tabBarIcon: ({ focused }) => (
            <TabIcon name="photo-library" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="notes"
        options={{
          title: 'Notes',
          tabBarIcon: ({ focused }) => (
            <TabIcon name="description" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused }) => (
            <TabIcon name="settings" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

function TabIcon({ name, focused }: { name: keyof typeof MaterialIcons.glyphMap; focused: boolean }) {
  if (focused) {
    return (
      <View style={styles.activeTab}>
        <MaterialIcons name={name} size={22} color={Colors.onPrimary} />
      </View>
    );
  }
  return <MaterialIcons name={name} size={24} color={Colors.onSurfaceVariant} />;
}

const styles = StyleSheet.create({
  activeTab: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: -2,
  },
});
