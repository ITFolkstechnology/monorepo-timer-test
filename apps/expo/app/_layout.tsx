import { Provider } from 'app/provider'
import QueryClientProvider from 'app/provider/query-client-provider'
import { Stack } from 'expo-router'


export default function Root() {
  return (
    <Provider>
      <QueryClientProvider>
        <Stack />
      </QueryClientProvider>
    </Provider>
  )
}
