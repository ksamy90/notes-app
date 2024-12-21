import { type LinksFunction } from '@remix-run/node'
import { LiveReload, Scripts, Links } from '@remix-run/react'
import faviconAssetUrl from './assets/favicon.svg'
import { KCDShop } from './kcdshop.tsx'

// use the LinksFunction type [TYPESCRIPT]
// disable cache favicon
export const links: LinksFunction = () => {
	return [{ rel: 'icon', type: 'image/svg+xml', href: faviconAssetUrl }]
}

export default function App() {
	return (
		<html lang="en">
			<head>
				<Links />
			</head>
			<body>
				<p>Hello World</p>
				<Scripts />
				<KCDShop />
				<LiveReload />
			</body>
		</html>
	)
}
