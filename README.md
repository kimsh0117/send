# Sendsay
Sendsay front-end test.

## Sendsay Javascript Client
[Official Sendsay API Documentation (Russian)](https://github.com/sendsay-ru/sendsay-api-js)

## Tech Stack
- [React](https://reactjs.org/)
- [Redux](https://www.npmjs.com/package/redux)
- [Redux-saga](https://www.npmjs.com/package/redux-saga)

## Requirements
1. Создайте форму отправки сообщения с полями.
    * [X] тема письма.
    * [X] имя отправителя.
    * [X] email отправителя.
    * [X] имя получателя.
    * [X] email получателя.
    * [X] сообщение.

2. Сделайте возможность прикреплять файлы к письму.
    * [X] не больше 5 МБ в одном файле.
    * [X] не больше 20 МБ на одно письмо.

3. [X] будете использовать React и Redux

4. [X] напишете его используя JS ES6.

5. [X] опишите стили по БЭМ или SUIT CSS.

6. [X] используете библиотеку-коннектор для нашего API. 

7. [X] сделаете валидацию полей. 

8. [X] реализуете прикрепление файлов через drag and drop

9. [X] отобразите список отправленных сообщений со статусом







## Deploy
Deployed on Netlify<br>
[Send](https://sandsay.netlify.app/) <- click here


## Start Application
### You must specify the SendsayAPI key for the application to work properly

1. Create .env.development.local or .env in root directory

2. Specify a key in the line.
````
REACT_APP_SENDSAY_ID=SENDSAY_ID
REACT_APP_SENDSAY_PASSWORD=SENDSAY_PASSWORD
````

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.