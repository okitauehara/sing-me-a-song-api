<h1 align="center">
   🎵 <a href="#"> Sing Me A Song API </a>
</h1>

<h3 align="center">
    Have you ever asked someone for a music recommendation? 
</h3>

<h4 align="center"> 
	 Status: Finished
</h4>

<p align="center">
 <a href="#about">About</a> •
 <a href="#database">Database</a> • 
 <a href="#how-it-works">How It Works</a> • 
 <a href="#pre-requisites">Pre-requisites</a> • 
 <a href="#tech-stack">Tech Stack</a> • 
 <a href="#how-to-contribute">How to contribute</a> • 
 <a href="#author">Author</a>
</p>


## About

Sing me a song is an API for anomalous music recommendation. The more people like a recommendation, the greater the chance that it will be recommended to others 🙂 .

---


## Database


The database was designed at https://www.dbdesigner.net/ for PostgreSQL.

``` postgresql

/* In your psql terminal */
CREATE DATABASE singme;

/* Access the database */
\c singme

```
Now, just run the commands listed in <a href="https://github.com/okitauehara/sing-me-a-song-api/blob/main/dump.sql">dump.sql</a>

---

## How It Works

### POST /recommendations

``` jsx
POST /recommendations
```

#### Expected Body

``` jsx
{
  "name": String, required,
  "youtubeLink": String, must be a valid youtube link, required,
}
```

#### Possible Response Status

``` jsx
400: 'The request body contains invalid elements';
200: 'Successfully created!';
409: 'Link already registered';
500: 'Error on Recommendations: Unable to post recommendation - (error message here)'
```

---

### POST /recommendations/:id/upvote

``` jsx
POST /recommendations/:id/upvote
```

#### Expected Body

``` jsx
None
```

#### Possible Response Status

``` jsx
400: 'Id is invalid';
200: 'Successfully updated! +1';
404: 'Recommendation not found';
500: 'Error on Recommendations: Unable to update recommendation - (error message here)'
```

---

### POST /recommendations/:id/downvote

``` jsx
POST /recommendations/:id/downvote
```

#### Expected Body

``` jsx
None
```

#### Possible Response Status

``` jsx
400: 'Id is invalid';
200: 'Successfully updated! -1';
404: 'Recommendation not found';
500: 'Error on Recommendations: Unable to update recommendation - (error message here)'
```

---

### GET recommendations/random

``` jsx
GET recommendations/random
```

#### Expect to receive

``` jsx
// 70% chance
{
	"id": 1,
	"name": "Chitãozinho E Xororó - Evidências",
	"youtubeLink": "https://www.youtube.com/watch?v=ePjtnSPFWK8&ab_channel=CHXVEVO",
	"score": Good score ( > 10 )
}

// 30% chance
{
	"id": 1,
	"name": "Chitãozinho E Xororó - Evidências",
	"youtubeLink": "https://www.youtube.com/watch?v=ePjtnSPFWK8&ab_channel=CHXVEVO",
	"score": Bad score ( <= 10 )
}
```

#### Possible Response Status

``` jsx
400: 'Id is invalid';
200: 'Object with expected body'
404: 'No recommendations yet';
500: 'Error on Recommendations: Unable to get recommendation - (error message here)'
```

---

### GET recommendations/top/:amount

``` jsx
GET recommendations/top/:amount
```

#### Expect to receive

``` jsx
[
  {
    "id": 1,
    "name": "Chitãozinho E Xororó - Evidências",
    "youtubeLink": "https://www.youtube.com/watch?v=ePjtnSPFWK8&ab_channel=CHXVEVO",
    "score": 250
  },
  {
    "id": 2,
    "name": "Chitãozinho E Xororó ft. Marília Mendonça - Página de Amigos",
    "youtubeLink": "https://www.youtube.com/watch?v=Etvt6Cme8u0&ab_channel=CHXVEVO",
    "score": 220
  },
  {
    "id": 3,
    "name": "Chitãozinho E Xororó - Fio de Cabelo",
    "youtubeLink": "https://www.youtube.com/watch?v=48kf5eG5yeY&ab_channel=ClassicoVEVO",
    "score": 200
  }
]
```

#### Possible Response Status

``` jsx
400: 'Invalid amount';
200: 'Object with expected body'
404: 'No recommendations yet';
500: 'Error on Recommendations: Unable to get top recommendations - (error message here)'
```

---

## Pre-requisites

Before you begin, you will need to have the following tools installed on your machine:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [VSCode](https://code.visualstudio.com/).

### Running the Backend (server)

``` jsx

// Clone this repository
$ git clone git@github.com:okitauehara/sing-me-a-song-api.git

// Access the project folder cmd/terminal
$ cd sing-me-a-song-api

// Install the dependencies
$ npm install

// Create a .env.dev file and fill it using your environment variables following the .env.example

// Run the application in development mode
$ ntl -> start:dev

// The server will start at port: 4000

```
You can find the .env.example <a href="https://github.com/okitauehara/sing-me-a-song-api/blob/main/.env.example">here</a>

---

## Tech Stack

The following tools were used in the construction of the project-api:

**Server**  ([NodeJS](https://nodejs.org/en/))

-   **[Express](https://expressjs.com/)**
-   **[CORS](https://expressjs.com/en/resources/middleware/cors.html)**
-   **[NTL](https://github.com/ruyadorno/ntl)**
-   **[Pg](https://github.com/brianc/node-postgres)**
-   **[DotENV](https://github.com/motdotla/dotenv)**
-   **[Joi](https://github.com/hapijs/joi)**
-   **[Jest](https://github.com/facebook/jest)**
-   **[Eslint - Airbnb](https://github.com/airbnb/javascript)**

> See the file  [package.json](https://github.com/okitauehara/sing-me-a-song-api/blob/main/package.json)

**Utilitários**

-   Editor:  **[Visual Studio Code](https://code.visualstudio.com/)**
-   API Test:  **[Insomnia](https://insomnia.rest/)**


---


## How to contribute

1. Fork the project.
2. Create a new branch with your changes: `git checkout -b feat/myFeatureName`
3. For each feature implemented, make a commit specifying what was done
4. Submit your changes: `git push -u origin feat/myFeatureName`

---

## Author

Developed by Marcos Okita Uehara.
