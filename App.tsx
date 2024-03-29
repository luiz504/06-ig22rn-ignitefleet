import 'react-native-get-random-values'
import { useCallback, useEffect } from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from 'styled-components/native'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import * as SplashScreen from 'expo-splash-screen'
import { QueryClientProvider } from '@tanstack/react-query'
import { AppProvider, UserProvider } from '@realm/react'
import { REALM_APP_ID } from '@env'

import { theme } from '~/theme'
import { queryClient } from '~/libs/react-query/queryClient'
import { RealmProvider } from '~/libs/realm'

import { SignIn } from '~/screens/auth/SignIn'

import { Routes } from '~/routes'

SplashScreen.preventAutoHideAsync()
export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  useEffect(() => {
    onLayoutRootView()
  }, [onLayoutRootView])

  if (!fontsLoaded) return null

  return (
    <AppProvider id={REALM_APP_ID}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <SafeAreaProvider
            style={{ flex: 1, backgroundColor: theme.COLORS.GRAY_800 }}
          >
            <StatusBar
              barStyle={'light-content'}
              backgroundColor={'transparent'}
              translucent
            />

            <UserProvider fallback={<SignIn />}>
              <RealmProvider>
                <Routes />
              </RealmProvider>
            </UserProvider>
          </SafeAreaProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </AppProvider>
  )
}
