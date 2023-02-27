import { Amplify } from 'aws-amplify'
import '@aws-amplify/ui-react/styles.css'
import type { AppProps } from 'next/app'
import config from '../src/aws-exports'
import { ThemeProvider } from '@aws-amplify/ui-react'

Amplify.configure(config)
export default function App({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider>
			<Component {...pageProps} />
		</ThemeProvider>
	)
}
