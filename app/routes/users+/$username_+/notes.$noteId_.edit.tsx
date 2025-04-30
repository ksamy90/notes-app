import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { requireUser } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { invariantResponse } from '#app/utils/misc.tsx'
import { NoteEditor, action } from './__note-editor.tsx'

export { action }

export async function loader({ request, params }: LoaderFunctionArgs) {
	const user = await requireUser(request)
	invariantResponse(user.username === params.username, 'Not authorized', {
		status: 403,
	})
	const note = await prisma.note.findFirst({
		select: {
			id: true,
			title: true,
			content: true,
			images: {
				select: {
					id: true,
					altText: true,
				},
			},
		},
		where: {
			id: params.noteId,
			// 🐨 you can switch this to: "ownerId: user.id" which should make the
			// query more efficient.
			owner: { username: params.username },
		},
	})
	invariantResponse(note, 'Not found', { status: 404 })
	return json({ note })
}

export default function NoteEdit() {
	const data = useLoaderData<typeof loader>()

	return <NoteEditor note={data.note} />
}
