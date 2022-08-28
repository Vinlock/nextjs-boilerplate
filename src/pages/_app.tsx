import type { AppType } from 'next/dist/shared/lib/utils'
import Head from 'next/head'
import { UserProvider } from '@auth0/nextjs-auth0'
import '../styles/globals.css'
import '../icons'

const App: AppType = (props) => {
	return (
		<>
			<Head>
				<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
			</Head>
			<UserProvider>
				<div className="flex flex-col flex-grow">
					<props.Component {...props.pageProps} />
				</div>
			</UserProvider>
		</>
	)
}

export default App
