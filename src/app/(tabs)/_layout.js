import Feather from '@expo/vector-icons/Feather';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#1E3A8A' , headerShown: false}}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Feather name="home" size={24} color={ color } />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Pesquisa',
          tabBarIcon: ({ color }) => <Feather name="search" size={24} color={ color } />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <Feather name="menu" size={24} color={ color } />,
        }}
      />
    </Tabs>
  );
}