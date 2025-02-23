Hello, my name is Samson. I'm here to show you about the awesome notes
application, please get oriented with the repo as it's a full stack web app
built in Remix and to give you an overview of how to build solid data fetching
and routing application different from the traditional Single Page setup with
client side React only. I'm going to get a new project for note taking off the
ground. We want people to write Epic Notes

Users in this app have profile pages and can make notes. So, we want to have the
following as example routes:

`Please note that samson should be a dynamic value for any user, as for me I'm using my name Samson(👨‍💼👨), he's awesome, haha 😂😂`

1.  `/users/samson` - Samson's profile page
2.  `/users/samson/notes` - Samson's list of notes
3.  `/users/samson/notes/some-note-id` - A specific note

From a layout perspective, we want the profile page to take up the full screen.
The notes page should also take up the full screen, but the specific note should
be nested inside the notes page.
