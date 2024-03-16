import { StatusBar } from 'expo-status-bar'

import { SignIn } from './src/screens/SignIn'
import { ThemeProvider } from 'styled-components/native'
import theme from './src/theme'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar />
      <SignIn />
    </ThemeProvider>
  )
}
