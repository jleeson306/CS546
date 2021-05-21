When starting WaterB💧y you might want to run "npm run populate" to fill out the database with some example information, be careful though as this will overwrite your current database, so privously made accounts and their data will no longer be their after population. You may also run "npm run cleanup" to wipe the database. Whenever you're ready fun "npm start" to start the website.

Going to http://localhost:3000 will bring you to the sign in/signup home page, should you have been logged in previously it will instead bring you to your profile. From here you can either sign in with a pre-created account or sign up for your own. Several features are also available without being logged in should you wish, search, workout videos, and calorie calculator are all available to anyone. Upon logging in or signing up you will be brought to your profile.

Your profile will show several statistics, your information, and your comment board. Should you or any other users type out a comment and post it will be displayed underneath your profile, with the date and the poster. You make click a posters name to be brought to their profile page. You hit the edit button on your profile to the left to be able to edit the information. You may either change this or make it blank to display no information. You can also change the clan field here to change clans, join no clan(blank), or create a new clan should the name you type in not exist yet.

If you then go to the profile page (using the navbar) you will see a log of your various health activities, if you chose a user who had daily activities already set up (such as bowser, username: bowser, password: kart>kidnapping) than you will see them displayed here. You may also enter in the fields to create a new entry. Calories Consumed, steps taken, and water consumed is all cumulative for each individual day and will sum up under each date. Type, Duration, and calories burned will together make their own entry under specific dates. You can also hit the graph button in the top middle to instead see information displayed as a graph. by clicking the different colors at the top of the graph you can change which data is being displayed.

Going over to search (once again through nav bar) you will be presented with a search bar. This simply allows for you to search for users or clan, this uses display name and clan name. After searching the results will appear and you can click on them. Users will bring them to your profile, where clans will bring them to their clan page. (example search kingdom to see two clans, or bowser to see two users) Clicking on a clan name will bring you to their page, here you will be able to see the collective stats of that clan, its members, and its enemy clans. There is also the option to join/leave the clan here.

Workout video s tab will bring you to a list of links to good workout videos for various types of exercise.

Calorie Calculator brings you to a search bar that will allow you to search for food from nutritionix's food API. (currently only have free version so only two endpoint users are allowed, I hope this doesn't cause any issues) Searching a food will bring you that terms best match and display various nutrition facts about that food.

WaterB💧y is a website focused on documenting the many aspects of a healthy lifestyle, including various physical activities, but with a large focus on water and hydration. This website's goal will be to help a user log and track their various health stats and allow a user to read that information in a simple and easy fashion. As it is often easy to forget, it will help users make sure their water consumption is up to snuff with the rest of their activity. Users can also view leaderboards to see how their water consumption fairs compared to other users and join clans to build camaraderie and meet fellow water enthusiasts.

The logins for example users:
Username                  Password
masterdetective123        elementarymydearwatson
lemon                     damnyoujackdonaghy
theboywholived            quidditch
america                   oil
hitchhiker1337            life=42
redplumber                manthewingcapstarssucked
greenplumber              luigismansionwassick
theprincess               stitchfaceop
bowser                    kart>kidnapping
bowser_jr                 mansunshineisslepton

You may need to run "npm i" to install needed files

This was a collaborative team project done by James Leeson, Cassie Ball, Leo Ouyang, Nick Quidas
