[ ] Fix being unable to view sessions while one is active
[ ] Fix crashing if deleting a listener while someone is talking to it
[x] Fix db.getSessions from needing to retrieve all of the session logs just to get session runid and name info
[ ] Fix all instances of people talking to a listener being saved in the same session
[ ] Fix default session names being very useless
[ ] Fix updating endianness not redrawing values
[ ] Fix UI scaling on viewing message hex dumps having the options at the bottom cut off on smaller screens
[ ] Add prettier UI for listener adding
[ ] Fix whatever is going on with live websocket viewing of sessions
[ ] Allow for chunked log loading because it uses a lot of memory to load them all at once and is generally bad
