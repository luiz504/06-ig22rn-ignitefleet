import { ThemeProvider } from 'styled-components/native'
import { StatusBar } from 'react-native'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { QueryClientProvider } from '@tanstack/react-query'
import { AppProvider, UserProvider } from '@realm/react'
import { REALM_APP_ID } from '@env'

import { theme } from '~/theme'

import { queryClient } from '~/services/queryClient'

import { Loading } from '~/components/Loading'

import { SignIn } from '~/screens/SignIn'

import { Routes } from '~/routes'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { RealmProvider } from '~/libs/realm'

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  return (
    <AppProvider id={REALM_APP_ID}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <SafeAreaProvider>
            <StatusBar
              barStyle={'light-content'}
              backgroundColor={'transparent'}
              translucent
            />

            {!fontsLoaded && <Loading />}
            {fontsLoaded && (
              <UserProvider fallback={<SignIn />}>
                <RealmProvider>
                  <Routes />
                </RealmProvider>
              </UserProvider>
            )}
          </SafeAreaProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </AppProvider>
  )
}
