import { Stack } from 'expo-router/stack';

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
      }}
      initialRouteName="login" // Defina aqui a rota inicial desejada
    >
      <Stack.Screen name="index" options={{headerShown: false}} />
      <Stack.Screen name="(tabs)" options={{headerShown: false}} />
      <Stack.Screen name="login" options={{headerShown: false}}/>
      <Stack.Screen name="cadastro" options={{headerShown: false}}/>
      <Stack.Screen name="enviarProposta" options={{headerShown: false}}/>
      <Stack.Screen name="detailsProperty" options={{headerShown: false}}/>
      <Stack.Screen name="comments" options={{headerShown: false}}/>
      <Stack.Screen name="profile" options={{headerShown: false}}/>
    </Stack>
  );
}