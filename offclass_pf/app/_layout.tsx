// app/_layout.tsx
import { Slot } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { ProfileProvider } from '../context/ProfileContext';
import 'react-native-gesture-handler';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

enableScreens();

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ProfileProvider>
        <Slot />
      </ProfileProvider>
    </GestureHandlerRootView>
  );
}
