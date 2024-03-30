# Ignite Fleet

## GCP [Google Cloud Platform](https://console.cloud.google.com/) requirements

It requires a account and project created in the GCP.

On the GCP Console follow these steps:

### Oauth consent screen

Project => APIs and services => OAuth consent screen => Publishing status

make sure thats is published.

### Credentials

Project => APIs and services => Credentials

here it will need 3 OAuth 2.0 Clients credentials for each enviroment Android, IOS and Web

- Android
  - Follow the standard creation recommendations, the SHA-1 fingerprint can be found on this [Sha-1 fingerprint](#sha-1-fingerprint).
- IOS
  - Follow the standard creation requirements
- Web
  - Follow the standard creation requirements, this credential will be used by the library `@react-native-google-signin/google-signin`.

Take each OAuth client_id and fill its respective Enviroment Variable following the [Envs](#envs) instructions.

#### Sha-1 fingerprint

```bash
    cd android && ./gradlew signinReport && cd ..
```

## [MongoDB Atlas](https://cloud.mongodb.com/) requirements

Login => Create Project or Select the desired project

- Create a cluster
  - Deployment => Database => Data Services => Build a Database
  - For this project the free tier covers.
  - Continue the process with the defaults options.
  - If there is not a access account registered it will be requested to create
    one. (You can access this late at Security => Quickstart section)
- Create a App Service
  - Deployment => App Services => Create a new App
  - It should identify the previous cluster created.
  - Change the cluster / App Name / App Deployment as your need fits or just following with the defaults.
  - With this process finished follow the next steps.
- Config Custom JWT
  - Deployment => Database => Data Services => open the application created previously
  - Navigate to Authentication => Custom JWT Authentication (row) => Edit
  - Enable the Provider switch
  - Check the option `Use a JWK URI`
  - Fill the JWK URI input with `https://www.googleapis.com/oauth2/v3/certs`
  - Add the following metadata
    | Required | Path | Field Name
    |----------|---------|------------|
    | true | email | email
    | true | name | name
    | true | picture | pictureUrl
  - On the Audience input field, insert the Android, IOS and web GCP client_id separated by commas. And check the options `Any og these audiences`
  - Save the Draft
  - Them click on `REVIEW DRAFT & DEPLOY` => `DEPLOY`

now the `Custom JWT Authentication` should be enabled.

- Network Access

  - Navigate to Data Services => Network Access => `+ ADD IP ADDRESS`
  - Click on `Allow access from anywhere`
  - Confirm

- MongoDB Atlas App Id env
  - Navigate to App Service => open the desired application and the copy the `App ID` value:
  - Then assign it to `REALM_APP_ID` env.

### Cloud DB Sync (Mongo Atlas)

Create the cloud DB and turn on Device sync with Development Mode

- Navigate to App Services => select the project => Build => Device Sync => Start Syncing
- Continue to sync
- Sync type => Flexible
- Enable Development Mode
- Define a Database name
- Enable Sync
- Select the `User can read and write all data` role
- On top notification => Review Draft and Deploy
- Deploy

## Envs

Due my lack of knowledge of the Envs best practices with react-native/expo and the
lack of consistency of the new native support for Envs on Expo and typescript,
I decided to stick to the common solution using the `react-native-dotenv` to have
access to the Envs in the development enviroment from a `.env` file (there is a
sample `.env.example` file with the Envs required on this project), to make it work
with `EAS` just declare the Envs in the eas.json config file to each build profile
needed.
