const fs = require("fs");

const MAX_TIME = 10000;

const t = Math.floor(Math.random() * MAX_TIME);

//This is the c function passed to isEqual(a,b,c) in the first exercise
function cFunc(p) {
  if (p) {
    console.log("The result is true");
  } else {
    console.log("The result is false");
  }
}

//Sleeps for some time and returns a promise
function sleepPromise(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

//Compare 2 elements and returns a promise
const isEqualWithPromise = (a, b) => {
  return new Promise((resolve, reject) => {
    if (a === b) resolve(true);
    if (a !== b) resolve(false);
    reject("Something went wrong!");
  });
};

/*
Given the following comparison function `isEqual` that takes 2 values
and return the result asynchronously using callbacks,
re-implement it using promises
*/
const isEqual = (a, b, c) =>
  setTimeout(
    () => (a === b ? c(true) : c(false)),
    Math.floor(Math.random() * MAX_TIME)
  ); // Between 1 y 10 secs

//Sleeps t time, then compares the values, then executes function cFunc
const isEqual2 = (a, b, func) => {
  const time = Math.floor(Math.random() * MAX_TIME);
  console.log(time);
  sleepPromise(time)
    .then(result => {
      console.log(t + " ms passed!");
      isEqualWithPromise(a, b);
    })
    .then(result => {
      console.log("The comparison has finished!");
      func(result);
    })
    .catch(err => {
      console.log(err);
    });
};

//isEqual2(1, 2, cFunc);

/*
`searchById` takes an array with objects that have property id (only)
and if it finds it, it calls the callback with the result.
After implementing `isEqual` re-code this function using promises.
*/

const searchById = (data, id, c) => {
  data.forEach(element => {
    isEqualWithPromise(element.id, id)
      .then(result => {
        if (result) c(element);
      })
      .catch(err => {
        console.log(err);
      });
  });
  return false;
};

/*
 * Test data
 */
const people = [
  { id: 1, name: "1", dni: "1" },
  { id: 2, name: "2", dni: "1" },
  { id: 3, name: "3", dni: "3" },
  { id: 4, name: "4", dni: "4" },
  { id: 5, name: "5", dni: "5" },
  { id: 6, name: "6", dni: "6" },
  { id: 7, name: "7", dni: "7" },
  { id: 8, name: "8", dni: "8" },
  { id: 9, name: "9", dni: "9" },
  { id: 0, name: "0", dni: "0" }
];

/* Test cases samples */
searchById(people, 0, x =>
  console.log("Callback: " + JSON.stringify(x) + " found")
);

/********************************************************************************
Additional questions
---------------------------------------------------------------------------------

1. How would you implement it with events and listener? (not code it, but describe how it would
work)

I would define and dispatch a new custom event (e.g. "searchByIdEvent") at some place. Maybe it can be when 
somebody click on a button. This can be done through a listener on the click event.
Then I would subscribe (through a listener) to that custom event and implement the search in the
function that is called through this listener.

2. How would you implement the promise to throw an error in the event if it takes more than 5
seconds.
*/
const promiseTimeout = function(ms, promise) {
  // Create a promise that rejects in <ms> milliseconds
  let timeout = new Promise((resolve, reject) => {
    let id = setTimeout(() => {
      clearTimeout(id);
      reject("Timed out in " + ms + "ms.");
    }, ms);
  });

  // Returns a race between my timeout promise and the passed in promise
  return Promise.race([promise, timeout]);
};

// Apply a timeout of 5 seconds to isEqualWithPromise(1,1)
let isEqualRace = promiseTimeout(5000, isEqualWithPromise(1,1));

// Wait for the promise to get resolved
isEqualRace
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
    //throw error; // and catch it in the event
  });
