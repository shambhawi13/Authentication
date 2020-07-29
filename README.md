# Authentication
This application focuses on creating the authentication flow using passport npm package and express-session. The project code is present in Develop folder where you can find list of files like:
- server.js : initializes the server
- config folder with files related to database configuration and authentication middleware which prevent unauthorised access of application.
- models folder that contains description on how user table should be designed. It also contains all validation logic.
- public folder that contains static contents like html,css,client side javascript logic
- routes folder that contains server-side and client-side routes.
- package.json : contains project configuration detail along with dependent packages.

## Application flow

```
Here is the flow of application :
```
![employee](./Assets/final.png)

### Description
- Server is initialised using port number set by environment variable after the database is synced with model and tables are created.
- To find the database configuration, refer to file "config.json" under config folder. It contains details on database in each environment like development,test and production.
- Config folder also contains configuration details on authentication mechanism used for this application. We use passport and passport-local package to authenticate the user. This authentication is validated by retrieving email and password from models(here user model)
- Models folder contains index.js file that initializes further data models(Here we have only one model which is User model) and stores in "db" variable which is used by api-routes to retrieve data from database.
- routes section is divided into server-side routes(api-routes.js) and client-side routes(html-routes.js).
- server-side routes create api and sends back json response required by client to render the content. It retrieves data from user model.
- client-side routes creates url route which when hit on browser renders some html page(in this application, we have three html pages)
- signup.html renders form for user to sign up and register in database.
- login.html renders form to login after the user has registered.