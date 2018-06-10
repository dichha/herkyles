# 'Herkyles' is a project made during Software Engineering Project class - Spring 2018

 [![Codacy Badge](https://api.codacy.com/project/badge/Grade/f620b5e1ebb447f1b56cf6bc57bf38c1)](https://www.codacy.com/app/dichha/herkyles?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=dichha/herkyles&amp;utm_campaign=Badge_Grade) [![Codacy Badge](https://api.codacy.com/project/badge/Coverage/f620b5e1ebb447f1b56cf6bc57bf38c1)](https://www.codacy.com/app/dichha/herkyles?utm_source=github.com&utm_medium=referral&utm_content=dichha/herkyles&utm_campaign=Badge_Coverage)

## The project [demo](https://www.youtube.com/watch?v=alTRDsHim8w&t=104s)


## Project structure

* All React components are in the `~/app/components` directory. Each component directory contains a self-named `Component_Name.js` file. Each component has its own `index.js` and `styles.js` files. eg

    > ~/app/components/Spinner/Spinner.js <br>
    > ~/app/components/Spinner/index.js <br>
    > ~/app/components/Spinner/styles.js <br>

* App pages are in the `~/app/screens` directory. eg

    > ~/app/screens/Home.js <br>

* The database configuration is in the  `~/db/DbConfig.js` file.

* `~/app/index.js` is the entry point for all components in the `~/app` directory. It acts as a bridge between the `~/app` directory and the `App.js` file.

* The test is divided into 2 parts: components & screens based on their behaviour.` ~/__tests__/` is the main folder for our testing unit tests. 
    > ~/__tests__/components/Spinner.test.js 
    > ~/__tests__/screens/Home.test.js

* This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).You can use the link for setting up enviornment. 

### Available Scripts

If Yarn was installed when the project was initialized, then dependencies will have been installed via Yarn, and you should probably use it to run these commands as well. Unlike dependency installation, command running syntax is identical for Yarn and NPM at the time of this writing.

### `yarn start`

Runs your app in development mode.

Open it in the [Expo app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```
npm start -- --reset-cache
# or
yarn start -- --reset-cache
```

#### `yarn test`

Runs the [jest](https://github.com/facebook/jest) test runner on your tests.
