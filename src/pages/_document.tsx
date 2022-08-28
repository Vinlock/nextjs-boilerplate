import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

class Document extends NextDocument {
	render() {
		return (
			<Html lang="en">
				<Head>
					<meta name="viewport" content="width=device-width, initial-scale=1" />

					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
					<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap" rel="stylesheet" />
				</Head>
				<body className="h-full antialiased font-sans">
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default Document
