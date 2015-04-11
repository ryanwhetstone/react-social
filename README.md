##React Social 
###If you have feedback please send my way.

This is a little app to help me learn ReactJS.  It allows you to create users, and shows a user page with social data having to do with the hashtag associated with that user.  With this app I wanted to explore the page transition capabilities of React and learn about how React manages the state of an application.

#####To use:
* Clone the repository
* Rename config_sample.js to config.js and populate with your own API Keys
* From the terminal, run `npm install`
* From the terminal, run `npm start`. This runs `nodemon server.js`. Switch this, in the package.json file, to `node server.js` if you would like.
* In you browser navigate to http://localhost:3000/
* This will show you the sweet home page with an awesome color scheme generated with a parametric mixin found in _assets/less/mixins
* Next click the Create link, notice how the background "transitions" to the create page, very cool!
* Now create a user with name, hashtag and choose a color scheme.  When you click create, this user will be saved and you will transition to a user page that will show you content from Instagram, Youtube and Twitter having to do with the hashtag you entered.
* The data is polled every eight seconds, so if you choose a popular hashtag new content will be brought in at the bottom of each section.  This is set to only poll 5 times, so we aren't abusing the apis.  This of course can be changed in the code.

You need MongoDB to be running on your machine. This will create a new MongoDB database

#####DevOps
* From terminal run `gulp`
