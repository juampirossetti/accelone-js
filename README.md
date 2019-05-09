# accelone-js

## Instructions 

run node exercise.js
## AccelOne challenge exercises  

#### Exercise 1
Given the following comparison function `isEqual` that takes 2 values
and return the result asynchronously using callbacks, 
re-implement it using promises  

```
const isEqual = (a, b, c) => (
	setTimeout(() => (a===b)? c(true) : c(false)
	, Math.floor(Math.random()*MAX_TIME)) // Btween 1 y 10 secs
)
```

#### Exercise 2
`searchById` takes an array with objects that have property id (only)
and if it finds it, it calls the callback with the result.
After implementing `isEqual` re-code this function using promises.
  ```
const searchById = (data, id, c) => (
)
```

##### Test Data
```
const people = [
	{ id:1, name: '1', dni:'1'}, { id:2, name: '2', dni:'1'},
	{ id:3, name: '3', dni:'3'}, { id:4, name: '4', dni:'4'},
	{ id:5, name: '5', dni:'5'}, { id:6, name: '6', dni:'6'},
	{ id:7, name: '7', dni:'7'}, { id:8, name: '8', dni:'8'},
	{ id:9, name: '9', dni:'9'}, { id:0, name: '0', dni:'0'},
]
```
##### Test cases samples
```
searchById(
	people, 
	7, 
	x => console.log("Callback: "+JSON.stringify(x)+" found")
)
```
#### Additional questions
1. How would you implement it with events and listener? (not code it, but describe how it would work)
2. How would you implement the promise to throw an error in the event if it takes more than 5 seconds.