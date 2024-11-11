import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: {
            backgroundColor: "#fff"
        },
        headerTintColor: '#1E3A8A',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="index" options={{headerShown: false}} />
      <Stack.Screen name="(tabs)" options={{headerShown: false}} />
      <Stack.Screen name="login" options={{headerShown: false}}/>
      <Stack.Screen name="cadastro" options={{headerShown: false}}/>
      <Stack.Screen name="searchCompany" options={{headerShown: false}}/>
    </Stack>
  );
}