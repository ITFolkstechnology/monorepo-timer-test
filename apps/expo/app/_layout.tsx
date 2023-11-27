import { Provider, QueryProvider } from 'app/provider'
import reactotron from "config/reactotron"
import { Stack } from 'expo-router'

if(__DEV__) reactotron.connect()


export default function Root() {
  return (
    <Provider>
      <QueryProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </QueryProvider>
    </Provider>
  )
}
