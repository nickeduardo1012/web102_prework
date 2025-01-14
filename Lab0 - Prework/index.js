/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// importing the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// creating a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// removing all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grabbing the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// creating a function that adds all data from the games array to the page
function addGamesToPage(games) {
    // Looping over each game in the array
    for (let game of games) {
        // Creating a new div element for the game card
        const gameCard = document.createElement("div");

        // Adding the class 'game-card' to the div
        gameCard.classList.add("game-card");

        // Setting the inner HTML using a template literal to include game info
        gameCard.innerHTML = `
            <img src="${game.img}" alt="${game.name}" class="game-img" />
            <h3>${game.name}</h3>
            <p>${game.description}</p>
        `;

        // Appending the game card to the games-container element in the DOM
        gamesContainer.appendChild(gameCard);
    }
}

// Calling the function with the correct variable to add games to the page
addGamesToPage(GAMES_JSON);

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// Grabbing the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// Using reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((sum, game) => sum + game.backers, 0);

// Setting the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = totalContributions.toLocaleString();

// Grabbing the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// Setting inner HTML using template literal
// Using reduce() to calculate the total amount of money pledged
const totalPledged = GAMES_JSON.reduce((sum, game) => sum + game.pledged, 0);

// Setting the inner HTML of raisedCard to display the total pledged amount with a dollar sign
raisedCard.innerHTML = `$${totalPledged.toLocaleString()}`;

// Grabbing number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

// Calculating the total number of games
const totalGames = GAMES_JSON.length;

// Setting the inner HTML of gamesCard to display the total number of games
gamesCard.innerHTML = totalGames.toLocaleString();


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// Showing only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // Using filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    
     // Logging the number of unfunded games for verification
     console.log("Number of unfunded games:", unfundedGames.length);

    // Using the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}

// Showing only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // Using filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);


    // Using the function we previously created to add unfunded games to the DOM
    console.log("Number of funded games:", fundedGames.length);

     // Using addGamesToPage to display the funded games
     addGamesToPage(fundedGames);
}

// Showing all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // Adding all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// Selecting each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// Adding event listeners with the correct functions to each button
unfundedBtn.addEventListener('click', filterUnfundedOnly);
fundedBtn.addEventListener('click', filterFundedOnly);
allBtn.addEventListener('click', showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// Assume descriptionContainer is already selected, e.g.:
const descriptionContainer = document.getElementById('description-container');

// Calculating the total amount raised
const totalRaised = GAMES_JSON.reduce((sum, game) => sum + game.pledged, 0);

// Renaming totalGames to avoid conflicts
const gamesCount = GAMES_JSON.length;

// Calculating the total sum of unfunded games
const unfundedGamesCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// Creating the template string
const displayStr = `
    A total of $${totalRaised.toLocaleString()} has been raised for ${gamesCount} games. 
    Currently, ${unfundedGamesCount} game${unfundedGamesCount === 1 ? '' : 's'} 
    remain${unfundedGamesCount === 1 ? 's' : ''} unfunded. 
    We need your help to fund these amazing games!
`;

// Creating a new paragraph element
const paragraph = document.createElement('p');
paragraph.textContent = displayStr;

// Adding the paragraph to the descriptionContainer
descriptionContainer.appendChild(paragraph);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// Using destructuring and the spread operator to grab the first and second games
const [topGame, runnerUpGame, ...rest] = sortedGames;
// Creating a new element to hold the name of the top pledge game, then append it to the correct element
const topGameElement = document.createElement('div');
topGameElement.textContent = `Top Game: ${topGame.name}`;
firstGameContainer.appendChild(topGameElement);
// Doing the same for the runner up item
const runnerUpGameElement = document.createElement('div');
runnerUpGameElement.textContent = `Runner-Up: ${runnerUpGame.name}`;
secondGameContainer.appendChild(runnerUpGameElement);