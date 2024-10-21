// asyncBreeds.js
const fs = require("fs");

const breedDetailsFromFile = function (breed) {
  console.log("breedDetailsFromFile: Calling readFile...");

  // This function triggers the reading of a file asynchronously.
  // The fs.readFile function takes in the file path, encoding, and a callback.
  // The callback will be executed once the file reading is completed.
  fs.readFile(`./data/${breed}.txt`, "utf8", (error, data) => {
    console.log("In readFile's Callback: it has the data.");

    // ISSUE: 
    // Returning from *inner* callback function, not breedDetailsFromFile.
    // This `if` block checks if there's no error and tries to return the `data` inside the callback.
    // However, this return statement is inside the asynchronous callback.
    // The breedDetailsFromFile function itself will return *before* this callback is executed because
    // the file reading is asynchronous and takes time.
    // The return value of the callback doesn't affect the outer function.
    if (!error) return data;
    if (!error) return data;
  });
  // ISSUE: 
  // Attempting to return data out here will also not work.
  // Currently not returning anything from here, so breedDetailsFromFile function returns undefined.

  // The function continues to execute after calling fs.readFile, even before the file reading finishes.
  // By the time the function gets here, it hasn't waited for the callback to finish.
  // So, no data is available yet, and this function doesn't return anything (undefined).
  // Attempting to return data at this point doesn't work because the readFile's callback hasn't executed yet.
};

// we try to get the return value
// This will log 'undefined' because breedDetailsFromFile returned undefined as it didn't wait
// for the fs.readFile callback to complete.
const bombay = breedDetailsFromFile("Bombay");
console.log("Return Value: ", bombay); // => will NOT print out details, instead we will see undefined!
