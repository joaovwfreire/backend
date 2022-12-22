import '../styles/globals.css'
import type { AppProps } from 'next/app'

// Thirweb
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';
import { SessionProvider } from 'next-auth/react';

// Polygon Mumbai
const activeChainId = ChainId.Mumbai;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider desiredChainId={activeChainId}>
      <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
      </SessionProvider>
      
    </ThirdwebProvider>
  )
}

export default MyApp
