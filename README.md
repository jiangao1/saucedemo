# saucedemo

**Pre requirements:**
Make sure to have git installed already (https://git-scm.com/download)
Make sure to have node and npm installed already (https://nodejs.org/en/download/)

**Getting the source code / project contents:**
Clone this repo
> git clone https://github.com/linuxkidvoid/saucedemo.git

**Install packages:**
Type below commands from the root of the folder
> npm install

> npx cypress install

**Run in cypress GUI:** 
Run command from root of the folder and select either all tests or an individual test to run. Note the npx is pre-bundled with npm, so it should be included with npm, should work right out of the box.

> npx cypress open (if you have npx install already)

  or

> npm run cypress open

**Some design considerations:**
- When locating dom elements, used 'data-test' attribute when possible for future front-end change proof.
- Each tests are independent of each other for stability, and tests are parallellation ready.
- Page Objects pattern will make locator and method re-use and makes maintainess easier.
- Username and password information are stored in **cypress.env.json** file and it is usually should not be pushed to repo, however, those are public information on demo site in this case. I'm pushing it to repo just for demo to run out of box.
- Used fixture folder for storing test data, therefore the tests are future ready in terms of scale (6, 60, or 600 inventories). The changing of test data will not require tests to be modified if future test data changes.
- Some tests have helper functions in its file. If more tests are to be written, they can be refactored to outside the test file, but for this demo, that's enough.
- Loops are applied, for example during the sorting of names tests and sorting of prices tests.
