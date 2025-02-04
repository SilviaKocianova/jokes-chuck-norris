# Chuckles with Chuck

## Features    
- Random Joke: Displays a random Chuck Norris joke when the page loads.
- Next Joke: Allows users to get a new random joke by clicking a button.
- Category Selector: Users can choose jokes from different categories (e.g., programming, animals, etc.).
- Search by Keyword: Users can search for jokes containing specific keywords (must type at least 3 characters to search).
- Speech Synthesis: The app can read the joke out loud using speech synthesis.


## Technologies Used

- React
- Redux Toolkit: State management for handling jokes and API interactions.
- React Three Fiber & Drei: For rendering Chuck Norris' talking head with animations.
- Material-UI: For UI components such as buttons, text fields, and grids.
- SpeechSynthesis API: To read jokes out loud for users.
- Chuck Norris API: API for fetching jokes in different categories and by search query.

    Folder Structure

    /src
    Contains the main source code for the app.

    /components
    Contains UI components such as buttons, headers, and search bars.

    /features
    Contains Redux slices for handling the state of jokes.

    /styles
    Contains global styles for the app.

## Components

- Home.js: The main page that displays the random joke, category selector, and buttons for interacting with jokes.
- SearchBar.js: Allows users to search for jokes by a given keyword.
- CategorySelector.js: Dropdown for selecting jokes based on different categories.
- JokeDisplay.js: Displays the joke and Chuck Norris' animated head.


## API Endpoints Used

    GET https://api.chucknorris.io/jokes/random: Fetches a random joke.
    GET https://api.chucknorris.io/jokes/random?category={category}: Fetches a random joke from a specified category.
    GET https://api.chucknorris.io/jokes/search?query={query}: Searches for jokes containing a specific keyword.

