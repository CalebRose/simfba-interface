## SimFBA Repo Guide

-   Clone the repo
-   Clone the simfba-api repo
-   Run npm install on both repos
-   Run npm run start on the simfba-api repo
-   Any changes in the interface repo need to have the following commands input:
    -   export NODE_OPTIONS=--openssl-legacy-provider (run once, should last until you shut off your computer)
    -   npm run webpack (changes will be built into the build.js file)

## Purpose
The SimFBA interface application is a personal project for building a CRUD-application to manage data for a sports simulation. The intent of this project is for academic and personal purpose to practice my skill set so that I may use them in a professional setting. This project is open-sourced and will remain open-sourced with no intention of making a profit.

## Tech Stack
- React.js Frontend hosted by node application
- Golang APIs to handle Football and Basketball Logic
- Docker image used to host site on Azure
- Node.js discord bot to allow users to receive data related to their team and its players.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
