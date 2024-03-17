import { ThemeProvider } from 'styled-components/native'
import { StatusBar } from 'react-native'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { QueryClientProvider } from '@tanstack/react-query'

import { SignIn } from './src/screens/SignIn'

import { theme } from '~/theme'
import { Loading } from '~/components/Loading'

import { queryClient } from '~/services/queryClient'

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={'transparent'}
          translucent
        />

        {fontsLoaded ? <SignIn /> : <Loading />}
      </ThemeProvider>
    </QueryClientProvider>
  )
}
