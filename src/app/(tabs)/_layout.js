import Feather from '@expo/vector-icons/Feather';
import { Tabs } from 'expo-router';


export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: 'white',
      headerShown: false,
      tabBarStyle: { backgroundColor: '#1E3A8A' } // Define a cor de fundo da tab bar
    }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Feather name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="catalog"
        options={{
          title: 'Pesquisa',
          tabBarIcon: ({ color }) => <Feather name="search" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <Feather name="menu" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="searchCompany"
        options={{
          tabBarButton: () => null,
        }}
      />
    </Tabs>
  );
}