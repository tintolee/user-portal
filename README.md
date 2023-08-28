# Sprint Frontend

User (front-end) app for Sprint [app.sendsprint.com](https://app.sendsprint.com)

## 🚨 Before you start: setup a Gitlab access token to use private packages

This project uses some private NPM modules published on Gitlab. To be able to access
them, you need to set your npm access token so that it's picked up by this project.

```shell
export SENDSPRINT_NPM_TOKEN=your_token_goes_here
```

To avoid running the command above everytime you work on the project, you can save it to your terminal's run command file e.g. `~/.bashrc` or `~/.zshrc`.

> To create your own access tokens, go to [access tokens page on Gitlab](https://gitlab.com/-/profile/personal_access_tokens) to create your token. You need a minimum access **read_api**. If you also publish to the npm registry then get the **api** access.

## Setting up this project

Clone this repository to your computer. In the terminal, run `yarn install` from the root folder to install dependencies.

> If you have any issues with the installing dependencies, please make sure that your access token is properly set up.

### Environment Variables

To run this application you also need to setup environment variables. Environment variables to make it easier to deploy the same code in multiple contexts/environments.\
In the project directory, you will find a `.env` file that defines all the possible environment variable names (as empty strings), along with an explanation for each one. You should create another environment file to override `.env` with final values for the environment you will be developing/deploying to. Please see [this](https://create-react-app.dev/docs/adding-custom-environment-variables/#what-other-env-files-can-be-used) for a list of possible names for your custom environment file.

> Please speak to a fellow developer to get the environment variable values for the different environments.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

## Learn More

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

## Important Notes

- Try to maintain the packages versions in the package.json. For instance, using the latest version of @headless-ui/react might introduce bugs because, the sendsprint's NPM library wasnt built on that version.

- Instead of using the useLocation hook, you can use the useAppLocation hook in the hooks folder because of types.

## Unit Tests

The aim to to attain the highest possible test coverage

> To fix for window.matchMedia, add the `mockMatchMedia` util in the beforeAll jest function

### Fixes

- The issue of 'Jest unexpected token' was fixed by this article: [https://dev.to/bytebodger/how-i-fixed-the-unexpected-token-error-in-jest-4o1j]
- The issue of window.matchMedia was fixed by this stack overflow link and Jest documentation: [https://stackoverflow.com/a/76412579] [https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom].
