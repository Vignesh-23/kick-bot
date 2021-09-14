# kick-bot
A discord.js bot to disconnect/mute/deafen an annoying friend for fun. (Vaathi if you are reading this piss off)

Currently locally hosted feel free to invite: https://discord.com/api/oauth2/authorize?client_id=885236771800100925&permissions=8&scope=bot%20applications.commands

Currently in the Has 3 commands: <br>
/mute [@user]:{*required*} [seconds]: {optional, min: 0, max: 120, default: 60} == keeps the specified user server muted for specified number of seconds <br>
/deafen [@user]:{*required*} [seconds]: {optional, min: 0, max: 120, default: 60} == keeps the specified user server deafened for specified number of seconds <br>
/disconnect [@user]:{*required*} [seconds]: {optional, min: 0, max: 120, default: 60} == keeps the specified user disconnected for specified number of seconds <br>
/spam [@user]:{*required*} [seconds]: {optional, min: 0, max: 20, default: 10} == spams the user by mentioning them for specified number of seconds and thendeletes the messages<br>
/ocrstart [#Text-channel]:{*required*}:  == starts the ocr session on specified text channel and responds with each <image/*> with text from the image<br>