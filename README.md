# Pinterest SDET Assessment

<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Project Structure](#project-structure)
  * [Executing tests](#executing-tests)
  * [Issues during implementation](#issues)


<!-- ABOUT THE PROJECT -->
## About The Project

Pinterest UI tests implementation via the [CodeceptJS framework](https://codecept.io/) that makes use of features found in the latest version of the framework such as:

* Custom locators - Custom locators can be defined by defining attributes of elements. One such example is the custom locators plugin:
```
customLocator: {
   enabled: true,
   showActual: true,
   attribute: "data-test-id"
   }
```

* Selenoid - Selenoid is an implementation of the Selenium hub using Docker containers to launch browsers such as Chrome, Firefox, Opera and Edge/IE. 

* Page objects as classes - Page objects can be declared as classes which can be inherited to other page objects.

In this assessment some of the UI tests covered are:

* Moving pins from one board to another
* Adding pins to boards
* Creating new pins
* Creating new boards
* Validations of error messages


<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow the instructions below:

<!-- Prerequisites -->
### Prerequisites

* Java: 
> https://www.java.com/en/download/

* Java SE Development Kit:
> https://www.oracle.com/technetwork/java/javase/downloads/jdk13-downloads-5672538.html

* Node: 
> https://nodejs.org/

* Docker: 
> https://www.docker.com/products/docker-desktop

* Selenoid: 
> https://aerokube.com/selenoid/

> https://aerokube.com/cm/

<!-- Installation -->
### Installation
 
* Clone the repo
```sh
git clone https://github.com/vvarsavv/sdetassessment.git
```
* Install NPM packages
```sh
npm install
```
* Selenoid installation (OPTIONAL)

Follow the steps in the following link in order to install Selenoid:

1.) Start Selenoid: https://aerokube.com/selenoid/latest/#_start_selenoid

2.) Prepare browser configurations: https://aerokube.com/selenoid/latest/#_prepare_configuration

3.) Download the browser images: https://aerokube.com/selenoid/latest/#_browser_images

4.) Configuration manager (optional): https://aerokube.com/cm/latest/#_quick_start_guide

5.) Start GUI (optional): https://aerokube.com/cm/latest/#_starting_selenoid_ui


<!-- PROJECT STRUCTURE -->
## Project Structure
```
sdetassessment
│
├───helpers/ 
│   ├───custom_helper/
│   │   └───myHelper.js
│   ├───data/
│   │   ├───image/
│   │   │   └───valletta-image.jpg
│   │   ├───apiData.js
│   │   ├───domains.js
│   │   └───userData.js
│   └───pages/
│       ├───boards/
│       │   ├───boardsApiCalls.js
│       │   ├───boardsNavigation.js
│       │   ├───createNewBoard.js
│       │   └───editBoard.js
│       └───pins/
│           ├───createNewPin.js
│           ├───pinsNavigation.js
│           └───savePins.js
├───node_modules
├───output/
├───profiles/
│   └───webdriver.conf.js
├───tests/
│   └───ui/
│       ├───pinterestBoardsUI_tests.js
│       └───pinterestPinsUI_tests.js
├───README.md
├───codecept.conf.js
├───jsconfig.json
├───package-lock.json
├───package.json
├───steps.d.ts
├───steps_file.js
└───yourLoginDetails.js
```

Helpers
* custom_helper -> In myHelper.js methods are set with libraries (casual, coolImages, sentencer and chai), and inhereted throughout the tests. An example is: generateDetailsForForm - This method is used to generate valid and invalid details via causal and sentence libraries for pin and board generation forms. 
* data -> The data folder holds info related to the Pinterest's URL (domains.js), Pinterest's API URL and boards, pins and sections calls (apiData.js). The user data which is used for logging to Pinterest, and gathered from yourLoginDetails, is located in userData.js    
* pages──boards -> The boards' page objects are located in this folder. Page objects' methods are separated depending on their use.
* pages──pins -> The pins' page objects are located in this folder. Each of the page objects' methods are found here, depending on their use.

Profiles -> Profiles are found in webdriver.conf.js. Profile config values related to browsers can be changed on the fly, such as:
> windowSize: '1920x1080'

Tests──ui -> Boards and Pins UI tests are located in this folder.

codecept.conf.js -> The project's configuration is set in this file, example: plugins, page object links, and etc.

package.json -> dependencies and scripts are located in this file.

steps_file.js -> Login steps are located in this file. These steps are used by the autoLogin plugin.

yourLoginDetails.js -> Pinterest user account details are located here.

<!-- executing-tests -->
## Executing tests

In order to run tests, first enter your Pinterest account details in the 'yourLoginDetails.js' file.

```
yourUsername: '<username>',
yourPassword: '<password>',
yourName: '<name>',
yourSurname: '<surname>',
yourProfileURL: '<profileURL>',

apiToken: '<apiToken>' (optional - requires a Pinterest APP)
```


![Scripts](https://github.com/vvarsavv/sdetassessment/blob/master/helpers/data/image/scripts-package.png "Scripts in package.json")

Boards tests can be launched with the following script:
```
npm run boards
```

Pins test can be launched with the following script:
 ``` 
npm run pins
 ```
 
Boards or pin tests can be launched on Chrome, Firefox or Opera with Selenoid. Selenoid is a modern way to run Selenium inside Docker containers:
 ```
npm run selenoid
 ```
 
Debugging can be performed via the debug script:
```
 npm run debug
 ```
 
<!-- Issues during implementation -->
### Issues during implementation

Flaky UI Tests:

- Elements not appearing after a number of seconds. The autoDelay plugin was used to minimise such issues.

```
autoDelay: {
   enabled: true,
   delayBefore: 800,
   delayAfter: 900,
   methods: ["click", "fillField", "waitForEnabled", "waitForElement", "waitForVisible", "waitForInvisible"]
   }, 
```

API calls limit:

```
{
  "message": "You have exceeded your rate limit. Try again later.",
  "type": "api"
}
```

ReCaptcha:

A fast login caused ReCaptcha to be shown during tests. The autoDelay plugin was used to minimise issues related to login before test scenarios. 
