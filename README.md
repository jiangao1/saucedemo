# saucedemo

**Pre requirements:**
Make sure to have git installed already (https://git-scm.com/download)
Make sure to have node and npm installed already (https://nodejs.org/en/download/)

**Getting the contents:**
Clone this repo
> git clone https://github.com/linuxkidvoid/saucedemo.git

**Install packages:**
Type below command from the root of the folder
> npm install

**Run in cypress GUI:** 
Run command from root of the folder and select either all tests or an individual test to run

> npx cypress open (if you have npx install already)

  or

> npm run cypress open


**Some design considerations:**
- When locating dom elements, try to use 'data-test' attribute when possible for future front-end change proof.
- Each tests are independent of each other for stability and parallellation.
- Page Objects pattern will make locator and method re-use and makes maintainess easier.
- Usually, username and password information are to store in a .env type of file and not to pushed to repo, however, those are public information on demo site in this case.  