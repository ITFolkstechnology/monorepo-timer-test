import 'raf/polyfill'
import 'setimmediate'

import { Provider } from 'app/provider'
import QueryClientProvider from 'app/provider/query-client-provider'
import Head from 'next/head'

import { AppProps } from 'next/app'
import '../global.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Monorepo Timer Test</title>
        <meta
          name="description"
          content="Expo + Next.js with Solito. By Fernando Rojo."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider>
        <QueryClientProvider>
          <Component {...pageProps} />
        </QueryClientProvider>
      </Provider>
    </>
  )
}

export default MyApp
