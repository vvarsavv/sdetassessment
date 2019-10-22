# Pinterest SDET Assesment

## Table of Contents
- Installation
- Issues during implementation

### Installation

### Issues during implementation

<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
  * [Issues during implementation](#issues)
* [License](#license)



<!-- ABOUT THE PROJECT -->
## About The Project



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow the instructions below:

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


### Installation
 
* Clone the repo
```sh
git clone https://github.com/vvarsavv/sdetassessment.git
```
* Install NPM packages
```sh
npm install
```

<!-- USAGE -->
## Usage

Project Structure:
```
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

In order to run tests, first enter your Pinterest account details in the 'yourLoginDetails.js' file.

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

## Executing tests


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
