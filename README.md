# Pinterest SDET Assesment

<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Project Structure](#project-structure)
  * [Executing tests](#executing-tests)
  * [Issues during implementation](#issues)
* [License](#license)



<!-- ABOUT THE PROJECT -->
## About The Project

Pinterest UI tests implementation via the [CodeceptJS framework](https://codecept.io/) which covers functionalities such as:
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

* Node: 
> https://nodejs.org/

* Docker: 
> https://www.docker.com/products/docker-desktop

* Selenoid: 
> https://aerokube.com/selenoid/latest/
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
* custom_helper -> In myHelpers.js 
* data -> The data folder holds info related to the Pinterest's URL (domains.js), Pinterest's API URL and boards, pins and sections calls (apiData.js). The user data which is used for logging to Pinterest, and gathered from yourLoginDetails, is located in userData.js    
* pages──boards -> The boards' page objects are located in this folder. Page objects' methods are separated depending on their use.
* pages──pins -> The pins' page objects are located in this folder. Each of hte page objects' methods are found here, depending on their use.

Profiles -> Profiles are found in webdriver.conf.js. Profile config values related to browsers can be changed on the fly, such as:
> windowSize: '1920x1080'

Tests──ui -> Boards and Pins UI tests are located in this folder.

codecept.conf.js -> The project's configuration is set in this file, example: plugins, page object links, and etc.

package.json -> dependencies and scripts are located in this file.

steps_file.js -> login steps are located in this file.

yourLoginDetails -> Pinterest user account details are located here.

<!-- executing-tests -->
## Executing tests

In order to run tests, first enter your Pinterest account details in the 'yourLoginDetails.js' file.


<!-- issues -->
### Issues during implementation

Flaky UI Tests:

- Element not appearing after a number of seconds:
 ```
 element ([class="gridCentered"]) still not enabled after 5 sec
 ```

API calls limit:

```
{
  "message": "You have exceeded your rate limit. Try again later.",
  "type": "api"
}
```

ReCaptcha:

Login caused issues related to login

<!-- LICENSE -->
## License

Distributed under the MIT License.
