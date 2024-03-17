import { ThemeProvider } from 'styled-components/native'
import { StatusBar } from 'react-native'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { QueryClientProvider } from '@tanstack/react-query'
import { AppProvider, UserProvider } from '@realm/react'

import { theme } from '~/theme'

import { queryClient } from '~/services/queryClient'
import { REACT_APP_ID } from '@env'

import { Loading } from '~/components/Loading'

import { Home } from '~/screens/Home'
import { SignIn } from '~/screens/SignIn'

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })
  console.log('dd', fontsLoaded)
  return (
    <AppProvider id={REACT_APP_ID}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <StatusBar
            barStyle={'light-content'}
            backgroundColor={'transparent'}
            translucent
          />
          {!fontsLoaded && <Loading />}
          {fontsLoaded && (
            <UserProvider fallback={<SignIn />}>
              <Home />
            </UserProvider>
          )}
        </ThemeProvider>
      </QueryClientProvider>
    </AppProvider>
  )
}
