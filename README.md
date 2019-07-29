# Job-Viewer Sidekicker Coding Challenge

> A job board to view all job listing and make a new job post

## Setting up database

Pre-requisite:
1. Ensure that you have MySql installed in your device
2. Create a new database to be used for this project

Setting up .env file:
1. Open *.env* file located at backend folder
2. Set the database name (DB_DATABASE), username(DB_USERNAME) and the password(DB_PASSWORD) to the one that you are using
3. Navigate to backend folder and run database migration:
```
php artisan migrate
```


## Backend

To start the backend server:
```
php -S localhost:8000 -t public
```


## Frontend

First, ensure backend server is already running, then navigate to the frontend folder

Install all dependencies:
```
npm install
```

To start the frontend server:
```
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## Testing

To run the all the test, navigate to the frontend folder and run:
```
npm test
```