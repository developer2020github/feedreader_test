##Project title
Jasmine tests demo

##Overview 
This project was done by developer2020 as a part of Udacity front-end nano-degree. 
The purpose was to develop tests, using Jasmine test framework 
that would cover functionality of Udacity provided application Udacity feed reader. 
Code written by developer2020 can be found in feedreader.js.

###Contact information
e-mail:  dev276236@gmail.com

###Built with
* jQuery 
* Jasmine 
* Gulp

###Installing and building  the application.
Application utilizes Gulp for builds.  Note all test code is removed during the build process.
There are two main subfolders: 
src - sources with all libraries 
dist - built application.

To ensure all the required components are installed: 

0. Ensure you have node. js and npm installed. 
Refer to https://docs.npmjs.com/getting-started/installing-node for installation instructions. 
1. Get project from GitHub. 
2. In the main directory (one level up of src and dist) run command 
"npm install"
This will download and install all the gulp packages required for builds. 
To re-build the application: 
1) start command line in main directory.
2) execute command 
"gulp build"
This will clean up files in dist directory and rebuild the application. 

###Running application.
To check results of Jasmine tests: 
Please open index.html, located in src directory,  in a browser. Wait for Jasmine tests to complete.
Scroll down to the bottom of the page and verify that all tests passed. 
All tests developed can be found in the feedreader.js file of jasmine\spec folder

To check functionality of release version of the application: 
Please open open index.html, located in dist directory,  in a browser.

You also may use  local server:
This procedure applies to Python 3, for Python 2 please google corresponding command for step 2:  
1. Run local server: 
cd /path/to/project-folder/dist
python -m http.server 8080

2. Open a browser and visit localhost:8080


