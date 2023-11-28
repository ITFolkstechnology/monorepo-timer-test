import QueryClientProvider from './query-client-provider'
import { SafeArea } from './safe-area'

export function Provider({ children }: { children: React.ReactNode }) {
  return <SafeArea>{children}</SafeArea>
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider>{children}</QueryClientProvider>
}
