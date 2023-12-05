import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SafeArea } from './safe-area'

const queryClient = new QueryClient()

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeArea>{children}</SafeArea>
    </QueryClientProvider>
  )
}
