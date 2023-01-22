```
Full stack developer for customer facing website (req79330)

Task statement
Create a simple "contact list" web application that allows:
     Listing people (name and photo)
     Searching by name
     Paging
Initial list should be one-time populated with people.csv attached. Contact 
addition/removal/edit is out of scope of this task.


Technical clarification
     Spring Boot
     Any build system
     Consider it as an enterprise-grade application (it will stay there for years, will 
    be extended and maintained)
     As a result it should be DB-ready, meaning it should be little-to-zero effort to 
    make this implementation use some enterprise DB (e.g. Oracle)
     For frontend you can use any technology
     Do not care about page design

Expected outcome
A repository at your GitHub account/local KN Git from where you can clone and run 
the web app with little-to-zero efforts
```

## Quick start using docker-compose :
- "docker-compose.yml" is provided in the project.
- Prerequisites : 
  - Docker must be installed.
  - Docker compose must be installed and added to system PATH variable if the command is not accesible.
  - To bring up all the services, the following command needs to be run the project directory :
    - `docker-compose up`
      - this will start the angular web application on port 80 
      - and listens to the backend service which runs on port 8080
      - runs the MySQL database on port 3306
  - docker-compose.yml can be modified based on the requirements.


## Development :
- contact-list-angular-app is a Angular web application.
- NodeJS, npm must be installed
- run `npm install` in the project directory
- This project can be imported into the IDE as Angular project.
- `ng serve` will run the webapp in port 4200 and can be accessible in the browser by visiting `http://localhost:4200`


- ### **Environment variables and configuration :**
  - BASEURL : This environment variable can be set in Docker compose to set the base url of the API endpoints

- ### **Building the angular dist folder for production distribution :**
  - Run the following command `ng build`, which will build the project and generate the dist directory.


## To Build Docker image :
  - First follow the steps for `Building the angular dist folder for production distribution`
  - Run the following command to build docker image from the project directory :
    - `docker build -t anthonyvk/contact-list-angular-app-kuehne-nagel:latest .`


## To run the Docker image :
`docker run -p 80:80 -e BASEURL='http\:\/\/service\/api' anthonyvk/contact-list-angular-app-kuehne-nagel:latest
`
