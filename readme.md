# Schedu Mobile Application

## Documents
- [Schedu APIs Document](https://documenter.getpostman.com/view/14200523/UVC3j81n)

## Project Initialization
- Using Firebase and 3 Databases (2 MongoDB & 1 MySQL)
- Import data from directory `/databases/` for IT-Calendar (MongoDB) and KMITL-Registrar (MySQL) database.
- Leave the Schedu Database blank with 5 collection
- Define environments as .env file both in directory `/backend/` and `/frontend/`. (Same place with `.env.example`)
- Install packages with `yarn install` in root directory, `'backend/`, and `/frontend/`. (All packages were listed in `package.json` of each directory)
- Run backend server using `nodemon server.js` in backend directory.
- Run mobile application using `expo start` in frontend directory.

### Frontend Environment
```
// Get from Web Initialization of Firebase Project in Firebase Website
API_KEY=
AUTH_DOMAIN=
PROJECT_ID=
STORAGE_BUCKET=
MESSAGIN_SENDER_ID=
APP_ID=
MEASUREMENT_ID=

// Get it from .plist in Firebase Project. Can download from Firebase Website
IOS_CLIENT_ID=

// Hostname and Port of your backend server. (Example: http://localhost:3000) <= No '/' at the end
API_SERVER_DOMAIN=
```
**.plist File with IOS_CLIENT_ID inside.**
![.plist File Download](https://firebasestorage.googleapis.com/v0/b/schedu-f727e.appspot.com/o/Screenshot%202021-11-09%20143454.png?alt=media&token=f0995f08-83d2-495a-9543-1181e602ba87)
**Firebase Initialization Values**
![Firebase Initialization](https://firebasestorage.googleapis.com/v0/b/schedu-f727e.appspot.com/o/Screenshot%202021-11-09%20143518.png?alt=media&token=8432273d-e7a1-43ff-8ff0-357c4604cd6d)
### Backend Environment
```
// Port of your server
PORT=

// Your MySQL Database User and Password
MYSQL_DB_HOST=
MYSQL_DB_USER=
MYSQL_DB_PASS=

// Name of the MongoDB Database
IT_CALENDAR_DB_NAME=
SCHEDU_DB_NAME=

// Name of the MongoDB collections
EVENTS_COLLECTION=

AUTH_COLLECTION=
APPOINTMENTS_COLLECTION=
NOTIFICATIONS_COLLECTION=
ACCOUNTS_COLLECTION=
SCHEDULE_COLLECTION=
```
## List of Packages
### Root Packages
- dayjs
### Frontend Packages
- @react-native-community/datetimepicker
- @react-native-picker/picker
- @react-navigation/bottom-tabs
- @react-navigation/native
- @react-navigation/native-stack
- axios
- dotenv
- expo
- expo-constants
- expo-google-app-auth
- expo-secure-store
- expo-status-bar
- expo-web-browser
- firebase
- react
- react-dom
- react-native
- react-native-calendars
- react-native-elements
- react-native-safe-area-context
- react-native-screens
- react-native-web
- react-native-woodpicker
- react-redux
- redux
- expo-linear-gradient
- @babel/core
### Backend Packages
- axios
- dayjs
- dotenv
- express
- mongoose
- morgan
- mysql2
- node-schedule
- uuid
- nodemon

## Color Palette
- `#001e6a` Blue
- `#005295` Light Blue
- `#4f89c4` Ligher Blue
- `#ffaa54` Yellow
- RoyalBlue
