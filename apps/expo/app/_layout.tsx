import { Provider, QueryProvider } from 'app/provider'
import { Stack } from 'expo-router'


export default function Root() {
  return (
    <Provider>
      <QueryProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </QueryProvider>
    </Provider>
  )
}
