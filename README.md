# capacitor-nfc-demo

⚡️ Simple Ionic Angular app to demonstrate the use of the [Capacitor NFC plugin](https://github.com/capawesome-team/capacitor-nfc).

## Plugins

The following plugins are included:

- [capawesome-team/capacitor-nfc](https://capawesome.io/plugins/nfc/)

## Development 💻

### Prerequisites

- Install [Node.js](https://nodejs.org) which includes [Node Package Manager](https://www.npmjs.com/get-npm)
- Android development: Install [Android Studio](https://developer.android.com/studio)
- iOS development: Install [XCode](https://apps.apple.com/de/app/xcode/id497799835?mt=12)
- You must have access to the Capawesome Sponsorware ([Read more](https://capawesome.io/insiders/))

### Getting Started

```bash
# Clone this repository
$ git clone https://github.com/capawesome-team/capacitor-nfc-demo.git

# Change to the root directory of the project
$ cd capacitor-nfc-demo

# Install all dependencies
$ npm i

# Run the web app
$ npm run start

# Run the Android app
$ npm run build
$ npx cap sync android
$ npx cap run android

# Run the iOS app
$ npm run build
$ npx cap sync ios
$ npx cap run ios
```

This project uses [Ionic](https://ionicframework.com/) as app development platform.

### Commands

- `npm run start` - Start the app
- `npm run build` - Build the app
- `npm run lint` - Lint the project
- `npm run fmt` - Format the project
- `npm run test` - Run unit tests

### Folder Structure

```
.
└── root
    └── src
        ├── app
        │   ├── config - Configuration files with consistent configurations across all environments
        │   ├── core - The core module that includes singleton services and other features with only one instance per application
        │   ├── modules - Modules that deliver a user experience dedicated to a particular feature or application domain
        │   └── shared - Modules that make a component, directive, or pipe available to external modules.
        ├── assets
        ├── environments
        └── tests
```
