import closeWithGrace from 'close-with-grace'
import { passthrough, http } from 'msw'
import { setupServer } from 'msw/node'
// import { handlers as githubHandlers } from './github.ts'
import { handlers as resendHandlers } from './resend.ts'

const miscHandlers = [
	process.env.REMIX_DEV_ORIGIN
		? http.post(`${process.env.REMIX_DEV_ORIGIN}ping`, passthrough)
		: null,
].filter(Boolean)

export const server = setupServer(...miscHandlers, ...resendHandlers)

server.listen({ onUnhandledRequest: 'warn' })

console.info('🔶 Mock server installed')

closeWithGrace(() => {
	server.close()
})
