// 💰 bring in useRouteLoaderData from '@remix-run/react'
import { useRouteLoaderData } from '@remix-run/react'

// 🦺 you can make this type safe by importing the root loader type like this:
// import { type loader as rootLoader } from '#app/root.tsx'
import { type loader as rootLoader } from '#app/root.tsx'

// 🐨 create a useOptionalUser function which get's the root loader data and
// returns the user if it exists, otherwise return null.
export function useOptionalUser() {
	const data = useRouteLoaderData<typeof rootLoader>('root')
	return data?.user ?? null
}

// 🐨 create a useUser function which calls useOptionalUser and if the user
// does not exist, throws an error with an informative error message. Otherwise
// return the user
export function useUser() {
	const maybeUser = useOptionalUser()
	if (!maybeUser) {
		throw new Error(
			'No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead.',
		)
	}
	return maybeUser
}
