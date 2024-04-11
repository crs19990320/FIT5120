// map2.js
import { setupCurrentMapState, clearCurrentMapState } from './currentMapState.js';
/*import { setupNextTenYearsMapState } from './nextTenYearsMapState.js';*/


document.getElementById('current').addEventListener('click', () => {
    clearCurrentMapState(); // Clears the previous state
    setupCurrentMapState(); // Sets up the current state
});

//document.getElementById('nextTenYears').addEventListener('click', () => {
//    clearCurrentMapState(); // Clears the current state
//    setupNextTenYearsMapState(); // Sets up the next ten years state
//});


// Call one of the setup functions on page load if needed
window.onload = () => {
  setupCurrentMapState();
};


