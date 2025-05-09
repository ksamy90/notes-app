import { createCookieSessionStorage } from '@remix-run/node'

export const sessionStorage = createCookieSessionStorage({
	cookie: {
		name: 'en_session',
		sameSite: 'lax',
		path: '/',
		httpOnly: true,
		secrets: process.env.SESSION_SECRET.split(','),
		secure: process.env.NODE_ENV === 'production',
	},
})

// 🐨 save the sessionStorage.commitSession in a variable so you can call it later
// 🐨 override the sessionStorage.commitSession using Object.defineProperty
// 🐨 if the options.expires is provided, use session.set('expires') to store it
// 🐨 if the options.maxAge is provided, calculate the expires value and store it in 'expires'
// 🐨 get the expires value from the session
// 🐨 call the originalCommitSession function
// 🐨 be sure to set the expires option to the value you got from the session
// 🐨 return the setCookieHeader

// we have to do this because every time you commit the session you overwrite it
// so we store the expiration time in the cookie and reset it every time we commit
const originalCommitSession = sessionStorage.commitSession

Object.defineProperty(sessionStorage, 'commitSession', {
	value: async function commitSession(
		...args: Parameters<typeof originalCommitSession>
	) {
		const [session, options] = args
		if (options?.expires) {
			session.set('expires', options.expires)
		}
		if (options?.maxAge) {
			session.set('expires', new Date(Date.now() + options.maxAge * 1000))
		}
		const expires = session.has('expires')
			? new Date(session.get('expires'))
			: undefined
		const setCookieHeader = await originalCommitSession(session, {
			...options,
			expires,
		})
		return setCookieHeader
	},
})
