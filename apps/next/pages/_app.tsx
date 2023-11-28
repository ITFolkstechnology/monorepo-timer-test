import 'raf/polyfill'
import 'setimmediate'

import { Provider, QueryProvider } from 'app/provider'
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
        <QueryProvider>
          <Component {...pageProps} />
        </QueryProvider>
      </Provider>
    </>
  )
}

export default MyApp
