import '../styles/globals.css'
import type { AppProps } from 'next/app'

// Thirweb
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';

// Polygon Mumbai
const activeChainId = ChainId.Mumbai;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider desiredChainId={activeChainId}>
        <Component {...pageProps} />
    </ThirdwebProvider>
  )
}

export default MyApp
