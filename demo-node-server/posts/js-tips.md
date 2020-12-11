---
title: "JS TIPS"
date: "2020-12-03"
---

# JS TIPS

## General

The modern mode, "use strict"
- since es5 (compatibility flag between old and new versions)
- in modern browsers this is no longer needed - with advanced language structure (classes and modules) this is enabled automatically
	
## Variables
- `let` keyword (old `var`)
- case sensitive, all chars

## Data types
- 8 basic data types (dynamically typed)
    - `Number == 12.123, Infinity, -Infinity & NaN`   (both integer and floating point) (2^53-1) (that's 9007199254740991), or less than -(2^53-1)`
    - `BigInt == 1234567890123456789012345678901234567890n` recently added 
    - `String` Backtick (`) are extended functionality quotes for parsing expressions (${...})
    - `Boolean`
    - `null` reference to a non existing value
    - `undefined` value not assigned
    - `Objects`
    - `Symbols` - symbol is used to create unique identifiers 
    - `typeof` operator
## Type Conversions
- Numeric Conversions
	- undefined => NaN
	- null => 0 
	- true/false => 1/0
	- string => "" == 0; "smth" == Nan
- Boolean Conversions 
	- 0, null, undefined, NaN, "" == false
	- any other value == true ("0" === true && " " === true) 
## Basic operators, maths
- % = remainder of the integer division 
- ** = exponentiation 2^3 
- '1' + 2 = 12; 2 + '1' = 21; 2 + 2 + '1' = 41
- (1 + 2, 3 + 4) = 7 => each of values is evaluated but only last is returned
## Operator precedence - from most important to least important 
- `(...); ?. ; ...++ ...--; R->L ! ~ +/- (unary plus/minus) ++... --... typeof; **; L->R * / %; L->R +/-; << >> >>>; < <= >= in instanceof; L->R == != === !===; & ^ | && || ?? ...?...:...; R->L = += -= **= *= /= %=; yield ... yield*; ... , ...`
## Comparisons
- "apple" > "pineapple" does dictionary comparison a is smaller than p result  false
	- Letters with diacritical marks are "out of order":
	- lower case is always bigger than uper case
	- not the best practice
## Conditional branching: if, '?'
`if (x == a)  x = b; else x = c => x == a ? x = b : x = c`
## Logical operators
- || && !
## Nullish coalescing operator '??'
- This is a recent addition to the language. Old browsers may need polyfills.
- `x = a ?? b` equals to `x = (a !== null && a !== undefined) ? a : b;`
## Loops: while and for
```
for (;;) {
		// repeats without limits
	}
```
- The loop below uses continue to output only odd values:
```
for (let i = 0; i < 10; i++) {
	// if true, skip the remaining part of the body
	if (i % 2 == 0) continue;
	alert(i); // 1, then 3, 5, 7, 9
}
```
- `break` with label name:
```
outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    let input = prompt(`Value at coords (${i},${j})`, '');
    // if an empty string or canceled, then break out of both loops
    if (!input) break outer; // (*)
    // do something with the value...
  }
}
alert('Done!');
```
```javascript
while (condition) {
  // code
  // so-called "loop body"
}
```
```javascript
do {
  // loop body
} while (condition);
```

# The "switch" statement
```javascript
switch(x) {
  case 'value1':  // if (x === 'value1')
    ...
    [break]
  ...
  default:
    ...
    [break]
```
# Function expressions
```javascript
let sayHi = function() {
  //this is function expresion
};
```
# Callback functions
```javascript
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}
function showOk() {
  alert( "You agreed." );
}
function showCancel() {
  alert( "You canceled the execution." );
}
ask("Do you agree?", showOk, showCancel); // showOk, showCancel are callbacks (callback functions)
```
# Arrow functions, the basics
```javascript
let sum = (a, b) => a + b;
/* This arrow function is a shorter form of:
let sum = function(a, b) {
  return a + b;
};
*/
alert( sum(1, 2) ); // 3

//another example
let sayHi = () => alert("Hello!"); sayHi();
```
# Coding Style
- Google JavaScript Style Guide
- Airbnb JavaScript Style Guide
- Idiomatic.JS
- StandardJS
- Comments

- use of linters (automatic code styling tools)
- JSLint - one of the first linters.
- JSHint - more settings than JSLint.
- ESLint - probably the newest one.

# Automated testing with Mocha
```javascript
describe("pow", function() { // 

  it("raises to n-th power", function() {
    assert.equal(pow(2, 3), 8);
  });

});
```
- In BDD, the spec goes first, followed by implementation. At the end we have both the spec and the code.

# Polyfills
- Babel, Webpack & Pollyfill all are transpiler. 
	1. It rewrites modern JavaScript code into the previous standard.
	2. Runs a script that updates/adds new functions (called "polyfill"). 
	It "fills in" the gap and adds missing implementations.

# Objects
```javascript
let user = new Object(); // "object constructor" syntax
let user = {};  // "object literal" syntax
```
- Computed properties:
```javascript
let fruit = 'apple';
let bag = {
  [fruit + 'Computers']: 5 // bag.appleComputers = 5
};
```
- Property value shorthand:
```javascript
function makeUser(name, age) {
  return {
    name, // same as name: name
    age,  // same as age: age
    // ...
  };
}
```
- To delete a property: `delete obj.prop`
- To check if a property with the given key exists: `"key" in obj`.
- To iterate over an object: `for (let key in obj)` loop.

# Object copying, references
- "by reference" referes to address in memory it is not the duplicate
- To "shallow" clone the object:
`let clone = Object.assign({}, user)`
- To deep clone the object we do same as above with extra for loop and check if object 
contains object. Or use lodash library
`_.cloneDeep(obj)`
	
# Garbage collection
- The basic garbage collection algorithm is called "mark-and-sweep".

# Object methods, "this"
- simple example 
```javascript
let user = {
  name: "John",
  age: 30
};
user.sayHi = function() {
  alert("Hello!");
};

user.sayHi(); // Hello!
```
- A function that is a property of an object is called its method.
- Arrow functions have no "this"

# Constructor, operator "new"
- we can omit parentheses after new, if it has no arguments

# Optional chaining '?.'
	alert(user.address ? user.address.street ? user.address.street.name : null : null); 
	===
	alert( user?.address?.street ); // undefined (no error)
- `obj?.prop` - returns obj.prop if obj exists, otherwise undefined.
- `obj?.[prop]` - returns obj[prop] if obj exists, otherwise undefined.
- `obj.method?.()` - calls obj.method() if obj.method exists, otherwise returns undefined.

# Symbol type
- `Symbol` is a primitive type for unique identifiers.

# Object to primitive conversion
- All objects are true in a boolean context
- There are 3 types (hints) of it:
	- "string" (for alert and other operations that need a string)
	- "number" (for maths)
	- "default" (few operators)

# Data types
Methods of primitives
- There are 7 primitive types: string, number, bigint, boolean, symbol, null and undefined
- Objects are "heavier" than primitives (memory and processing wise)

# Numbers
- Regular numbers in JavaScript are stored in 64-bit format IEEE-754, also known as "double precision floating point numbers".  
`let billion = 1e9;  // 1 billion, literally: 1 and 9 zeroes`   
`let ms = 1e-6; // six zeroes to the left from 1`  
`alert( 0xFF ); // 255 (the same, case doesn't matter)` - hex numbers  
`let a = 0b11111111; // binary form of 255`   
`let b = 0o377; // octal form of 255`  
`alert( num.toString(16) );  // ff`  
`alert( num.toString(2) );   // 11111111`  
- Please note that two dots in `123456..toString(36)` is not a typo.  
If we want to call a method directly on a number, like toString in the example above, then we need to place two dots .. after it.
- rounding example `alert( num.toFixed(1) ); // "12.3"`
- rounding up/down `Math.floor	Math.ceil	Math.round	Math.trunc`
	- `alert( Math.floor(num * 100) / 100 ); // 1.23456 -> 123.456 -> 123 -> 1.23`
- Imprecise calculations
	- `alert( 0.1 + 0.2 == 0.3 );// false` 
	- `alert( 0.1 + 0.2 ); // 0.30000000000000004`
	- division by powers 10 is guaranteed to work well in the decimal system, but division by 3 is not.
`alert( NaN === NaN ); // false`

# Strings
- we can use backticks `` for string. Has many advantages like enclosing expresion, multi line string ...
`alert( "\u{1F60D}" ); // 😍, a smiling face symbol (another long unicode)`
`alert( `My\n`.length ); // 3` length is a property not a function!
`for (let char of "Hello") {
  alert(char); // H,e,l,l,o (char becomes "H", then "e", then "l" etc)
}`
- Strings are immutable
`alert( "Widget with id".includes("Widget") ); // true`
- `slice(start, end)`	from start to end (not including end)  
allows negatives
- `substring(start, end)`	between start and end,  
negative values mean 0
- `substr(start, length)`	from start get length characters,	
allows negative start
- All strings are encoded using UTF-16.

- There are 3 types of quotes. Backticks allow a string to span multiple lines and embed expressions ${…}.
- Strings in JavaScript are encoded using UTF-16.
- We can use special characters like \n and insert letters by their unicode using \u....
- To get a character, use: `str[]`
- To get a substring, use: `slice` or `substring`.
- To lowercase/uppercase a string, use: `toLowerCase/toUpperCase`.
- To look for a substring, use: `indexOf`, or `includes/startsWith/endsWith` for simple checks.
- To compare strings according to the language, use: `localeCompare`, otherwise they are compared by character codes.
- There are several other helpful methods in strings:

- `str.trim()` - removes ("trims") spaces from the beginning and end of the string.
- `str.repeat(n)` - repeats the string n times.

# Arrays
- `push(...items)` adds items to the end.
- `pop()` removes the element from the end and returns it.
- `shift()` removes the element from the beginning and returns it.
- `unshift(...items)` adds items to the beginning.
- Methods `push/pop` run fast, while `shift/unshift` are slow.

- The ways to misuse an array:
	- Add a non-numeric property like arr.test = 5.
	- Make holes, like: add arr[0] and then arr[1000] (and nothing between them).
	- Fill the array in the reverse order, like arr[1000], arr[999] and so on.

- `for (let i=0; i<arr.length; i++)` - works fastest, old-browser-compatible.
- `for (let item of arr)` - the modern syntax for items only,
- `for (let i in arr)` - never use.
- To compare arrays, don't use the `==` operator (as well as `>`, `<` and others), 
as they have no special treatment for arrays. 
They handle them as any objects, and it's not what we usually want.
Instead, you can use `for..of` loop to compare arrays item-by-item.
- `length` property is writable. If we decrease it, it will truncate array.

# Array methods
- `delete arr[1]; // remove "go"` empties the space in array but does not shift the elements
- To add/remove elements:
	- `push(...items)` - adds items to the end,
	- `pop()` - extracts an item from the end,
	- `shift()` - extracts an item from the beginning,
	- `unshift(...items)` - adds items to the beginning.
	- `splice(pos, deleteCount, ...items)` - at index pos deletes deleteCount elements and inserts items.
	- `slice(start, end)` - creates a new array, copies elements from index start till end (not inclusive) into it.
	- `concat(...items)` - returns a new array: copies all members of the current one and adds items to it. If any of items is an array, then its elements are taken.
- To search among elements:
	- `indexOf/lastIndexOf(item, pos)` - look for item starting from position pos, return the index or -1 if not found.
	- `includes(value)` - returns true if the array has value, otherwise false.
	- `find/filter(func)` - filter elements through the function, return first/all values that make it return true.
	- `findIndex` is like `find`, but returns the index instead of a value.
- To iterate over elements:
	- `forEach(func)` - calls func for every element, does not return anything.
- To transform the array:
	- `map(func)` - creates a new array from results of calling func for every element.
	- `sort(func)` - sorts the array in-place, then returns it.
	- `reverse()` - reverses the array in-place, then returns it.
	- `split/join` - convert a string to array and back.
	- `reduce/reduceRight(func, initial)` - calculate a single value over the array by calling func for each element and passing an intermediate result between the calls.
- Additionally:
	- `Array.isArray(arr)` checks arr for being an array.
- Please note that methods sort, reverse and splice modify the array itself.
- These methods are the most used ones, they cover 99% of use cases. But there are few others:
    - `arr.some(fn)/arr.every(fn)` check the array.
	- The function `fn` is called on each element of the array similar to map. If any/all results are true, returns true, otherwise false.
	- These methods behave sort of like || and && operators: if `fn` returns a truthy value, `arr.some()` immediately returns true and stops iterating over the rest items; if `fn` returns a falsy value, `arr.every()` immediately returns false and stops iterating over the rest items as well.
	- We can use every to compare arrays:
```javascript
function arraysEqual(arr1, arr2) {
  return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
}

alert( arraysEqual([1, 2], [1, 2])); // true
````
- `1`arr.fill(value, tart, end)` fills the array with repeating value from index start to end.
- `arr.copyWithin(target, start, end)` copies its elements from position start till position end into itself, at position target (overwrites existing).
- `arr.flat(depth)/arr.flatMap(fn)` create a new flat array from a multidimensional array.

#Iterables
- Objects that can be used in `for..of` are called iterable.
	- Technically, iterables must implement the method named `Symbol.iterator`.
	- The `Symbol.iterator` method is called automatically by `for..of`, but we also can do it directly.
	- Built-in iterables like strings or arrays, also implement `Symbol.iterator`.
- `Array.from(obj[, mapFn, thisArg])` makes a real Array from an iterable or array-like obj, and we can then use array methods on it.

#Map and Set
- Map - is a collection of keyed values.

- Methods and properties:
	- `new Map([iterable])` - creates the map, with optional iterable (e.g. array) of [key,value] pairs for initialization.
	- `map.set(key, value)` - stores the value by the key.
	- `map.get(key)` - returns the value by the key, undefined if key doesn't exist in map.
	- `map.has(key)` - returns true if the key exists, false otherwise.
	- `map.delete(key)` - removes the value by the key.
	- `map.clear()` - removes everything from the map.
	- `map.size` - returns the current element count.
	
- The differences from a regular Object:
    - Any keys, objects can be keys while Object's can't have another Object as a key.
    - Additional convenient methods, the size property.
- Set - is a collection of unique values.

- Methods and properties:
	- `new Set([iterable])` - creates the set, with optional iterable (e.g. array) of values for initialization.
	- `set.add(value)` - adds a value (does nothing if value exists), returns the set itself.
	- `set.delete(value)` - removes the value, returns true if value existed at the moment of the call, otherwise false.
	- `set.has(value)` - returns true if the value exists in the set, otherwise false.
	- `set.clear()` - removes everything from the set.
	- `set.size` - is the elements count.
- Iteration over Map and Set is always in the insertion order, so we can't say that these collections are unordered, 
but we can't reorder elements or directly get an element by its number.

#WeakMap and WeakSet
- The first difference between Map and WeakMap keys must be objects, not primitive values.
- It's main advantages are that they have weak reference to objects, so they can easily be removed by garbage colector. 
	- That comes at cost of not having support for `clear`, `size`, `keys`, `values`.

#Object.keys, values, entries
- `Object.keys(obj)` - returns an array of keys.  
- `Object.values(obj)` - returns an array of values.
- `Object.entries(obj)` - returns an array of [key, value] pairs.

#Destructuring assignment
- Destructuring assignment allows for instantly mapping an object or array onto many variables.
- Some valid scenarios:
    - `let [firstName, surname] = "some testr".split(' ');` - it is shorter way to write `let firstName = arr[0];let surname = arr[1];`
    - `let [a, b, c] = "abc"; // ["a", "b", "c"]`
    - `let [one, two, three] = new Set([1, 2, 3]);`
    - `for (let [key, value] of Object.entries(user)) {...`
    - `let [name1, name2, ...rest] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
    // default values - default values can be more complex expressions or even function calls
    let [name = "Guest", surname = "Anonymous"] = ["Julius"];`

```javascript
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

let {title, width, height} = options;
```

- also valid case - the position does not matter: 
`let {height, width, title} = { title: "Menu", height: 200, width: 100 }`

- we can also assign a new name to a property:
```javascript
let {width: w, height: h, title} = options;

// width -> w
// height -> h
// title -> title`
```

- valid case with rest:
```javascript
// title = property named title
// rest = object with the rest of properties
let {title, ...rest} = options;

// now title="Menu", rest={height: 200, width: 100}
alert(rest.height);  // 200
alert(rest.width);   // 100`

let title, width, height;

// okay now
({title, width, height} = {title: "Menu", width: 200, height: 100});

alert( title ); // Menu
``` 

- smart function parameters 
`function showMenu(title = "Untitled", width = 200, height = 100, items = []) {
  // ...
}`

#Date and time

- `alert( new Date() ); // shows current date/time: Thu Nov 19 2020 19:44:17 GMT-0300 (Brasilia Standard Time)`
- `new Date(2011, 0, 1, 2, 3, 4, 567)` - Sat Jan 01 2011 02:03:04 GMT-0200 (Brasilia Summer Time)
- `new Date("2017-01-26")` - Wed Jan 25 2017 22:00:00 GMT-0200 (Brasilia Summer Time)

- Months are counted from zero (yes, January is a zero month).
- Days of week in `getDay()` are also counted from zero (that's Sunday).  
`let ms = Date.parse('2012-01-26T13:51:50.417-07:00');` - The string format should be: YYYY-MM-DDTHH:mm:ss.sssZ
- Use `Date.now()` to get the current timestamp in milis fast 

#JSON methods, toJSON
- JSON format needs to have double quotes (in key and value)
- The resulting json string is called a JSON-encoded or serialized or stringified or marshalled object.
- JavaScript provides methods `JSON.stringify` to serialize into JSON and `JSON.parse` to read from JSON.
- JSON supports following data types:
	- `Objects { ... }`
	- `Arrays [ ... ]`
	- Primitives:
	    - strings,
	    - numbers,
	    - boolean values true/false,
	    - null.
```javascript
let meetup = {
  title: "Conference",
  date: new Date(Date.UTC(2017, 0, 1)),
  room
};

alert( JSON.stringify(meetup) );
/*
  {
    "title":"Conference",
    "date":"2017-01-01T00:00:00.000Z",  // (1)
    "room": {"number":23}               // (2)
  }
*/
```

`JSON.parse(JSON.stringify(<javascript object/string>))`

#Advanced working with functions
##Recursion and stack
- To do a nested call, JavaScript remembers the current execution context in the execution context stack.
	- Contexts take memory. In our case, raising to the power of n actually requires the memory for n contexts, for all lower values of n.
	- A for loop-based algorithm is more memory-saving
- Power of recursion is in "shortness" and "easyness" to understand and not in memory optimization so the right approach has to be considered

##Rest parameters and spread syntax
- When we see `...` in the code, it is either rest parameters or the spread syntax.
- There's an easy way to distinguish between them:
    - When `...` is at the end of function parameters, it's "rest parameters" and gathers the rest of the list of arguments into an array.
    - When `...` occurs in a function call or alike, it's called a "spread syntax" and expands an array into a list.

- The rest parameters must be at the end `function showName(firstName, lastName, ...titles) {`
- There is also a special array-like object named `arguments` that contains all `arguments` by their index (old way of doing it - before functions supported parameters)

```javascript
let arr = [3, 5, 1];

alert( Math.max(...arr) ); // 5 (spread turns array into a list of arguments)
```

- spreads can also be used to copy array (or object)
```javascript
let arr = [1, 2, 3];
let arrCopy = [...arr]; // spread the array into a list of parameters
                        // then put the result into a new array
```
                        
#Variable scope, closure
- code blocks
```javascript
{
  // show message
  let message = "Hello";
  alert(message);
}

{
  // show another message
  let message = "Goodbye";
  alert(message);
}
```
		
- In JavaScript, every running function, code block `{...}`, and the script as a whole have an internal (hidden) associated object known as the Lexical Environment.	
	- "Lexical Environment" is a specification object: it only exists "theoretically" in the language specification to describe how things work. We can't get this object in our code and manipulate it directly.
- A closure is a function that remembers its outer variables and can access them. In some languages, that's not possible, or a function should be written in a special way to make it happen. But as explained above, in JavaScript, all functions are naturally closures (there is only one exception, to be covered in The "new Function" syntax).		

- A Lexical Environment object dies when it becomes unreachable (just like any other object). In other words, it exists only while there's at least one nested function referencing it.

- In the code below, after the nested function is removed, its enclosing Lexical Environment (and hence the value) is cleaned from memory:
```javascript
function f() {
  let value = 123;

  return function() {
    alert(value);
  }
}

let g = f(); // while g function exists, the value stays in memory

g = null; // ...and now the memory is cleaned up
```

- JavaScript engines try to optimize that. They analyze variable usage and if it's obvious from the code that an outer variable is not used - it is removed.

##The old "var"
- There are two main differences of var compared to let/const:
	- var variables have no block scope, their visibility is scoped to current function, or global, if declared outside function.
	- var declarations are processed at function start (script start for globals).
- The var declaration is similar to let. Most of the time we can replace let by var or vice-versa and expect things to work
```javascript
if (true) {
  var test = true; // use "var" instead of "let"
}

alert(test); // true, the variable lives after if`

if (true) {
  let test = true; // use "let"
}

alert(test); // Error: test is not defined
```

- var pierces through if, for or other code blocks. That's because a long time ago in JavaScript, blocks had no Lexical Environments, and var is a remnant of that.
- "hoisting" (raising), because all var are "hoisted" (raised) to the top of the function (we can declare var anywhere and it will be accessible)
- "immediately-invoked function expressions" (abbreviated as IIFE) - the code executes right away and has its own private variables
```javascript
(function() {

  var message = "Hello";

  alert(message); // Hello

})();
```

```javascript
// Ways to create IIFE

(function() {
  alert("Parentheses around the function");
})();

(function() {
  alert("Parentheses around the whole thing");
}());

!function() {
  alert("Bitwise NOT operator starts the expression");
}();

+function() {
  alert("Unary plus starts the expression");
}();
```

##Global object
- In a browser it is named `window`, for Node.js it is `global`
- Recently, `globalThis` was added to the language, as a standardized name for a global object
```javascript
if (!window.Promise) {
  window.Promise = ... // custom implementation of the modern language feature with polyfills 
}
```

##Function object, NFE
- Functions are objects.
- Here we covered their properties:
	- `name` - the function name. Usually taken from the function definition, but if there's none, JavaScript tries to guess it from the context (e.g. an assignment).
	- `length` - the number of arguments in the function definition. Rest parameters are not counted.

- NFE (Named Function Expressions)
```javascript
let sayHi = function func(who) {
  alert(`Hello, ${who}`);
};

sayHi("John"); // Hello, John
```
- the name "func" is function-local
- for e.g. the jQuery library creates a function named $

##The "new Function" syntax
`let func = new Function ([arg1, arg2, ...argN], functionBody);`
- useful if we receive the code from a server dynamically
- Functions created with new Function, have [[Environment]] referencing the global Lexical Environment, not the outer one.

##Scheduling: setTimeout and setInterval
- `setTimeout` allows us to run a function once after the interval of time.  
`let timerId = setTimeout(func|code, [delay], [arg1], [arg2], ...)`
```javascript
// wrong!
setTimeout(sayHi(), 1000);
// right!
setTimeout(sayHi, 1000);
```
```javascript
let timerId = setTimeout(...);
clearTimeout(timerId); //clears the timeout
```
- `setInterval` allows us to run a function repeatedly, starting after the interval of time, then repeating continuously at that interval.  
`let timerId = setInterval(func|code, [delay], [arg1], [arg2], ...)`
- To stop further calls, we should call `clearInterval(timerId)`.
- there is also `setImmediate` for Node.js
- Zero delay scheduling with `setTimeout(func, 0)` (the same as `setTimeout(func))` is used to schedule the call "as soon as possible, but after the current script is complete".  
```javascript
setTimeout(() => alert("World"));
alert("Hello");//special use case output will be "Hello World"
```

- The browser limits the minimal delay for five or more nested calls of setTimeout or for setInterval (after 5th call) to 4ms. That's for historical reasons.
- Note that all scheduling methods do not guarantee the exact delay.
	- For example, the in-browser timer may slow down for a lot of reasons: the CPU is overloaded, the browser tab is in the background mode, the laptop is on battery.

##Decorators and forwarding, `call/apply`
- Decorator is a wrapper around a function that alters its behavior. The main job is still carried out by the function.
- Decorators can be seen as "features" or "aspects" that can be added to a function. We can add one or add many. And all this without changing its code!
- To implement cachingDecorator, we studied methods:
	- `func.call(context, arg1, arg2…)` - calls func with given context and arguments.
	- `func.apply(context, args)` - calls func passing context as this and array-like args into a list of arguments.
- The generic call forwarding is usually done with apply:
```javascript
let wrapper = function() {
  return original.apply(this, arguments);
};
```

##Function binding
- Functions provide a built-in method bind that allows to fix this.
	- same can be achieved with the wrapper for e.g.:  
	 `setTimeout(() => user.sayHi(), 1000); // Hello, John!` `let boundFunc = func.bind(context);`
- Method `func.bind(context, ...args)` returns a "bound variant" of function func that fixes the context this and first arguments if given.
- Usually we apply `bind` to fix this for an object method, so that we can pass it somewhere. For example, to `setTimeout`.
- When we fix some arguments of an existing function, the resulting (less universal) function is called partially applied or partial.
- Partials are convenient when we don't want to repeat the same argument over and over again. Like if we have a send(from, to) function, and from should always be the same for our task, we can get a partial and go on with it.
 
##Arrow functions revisited
- Arrow functions have no "this"
- Do not have arguments
- Can't be called with new
- They also don't have super
- That's because they are meant for short pieces of code that do not have their own "context", but rather work in the current one.

#Object properties configuration
##Property flags and descriptors
```javascript
let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
Object.defineProperty(obj, propertyName, descriptor); // to change property
Object.defineProperty(user, "name", {
  writable: false
});
```

#Property getters and setters
- Accessor descriptors:
	- `get` - a function without arguments, that works when a property is read,
	- `set` - a function with one argument, that is called when the property is set,
	- `enumerable` - same as for data properties,
	- `configurable` - same as for data properties.
	
```javascript
let user = {
  get fullName() {
    return `...`;
  }
};

user.fullName = "Test"; // Error (property has only a getter)`
```

#Prototypes, inheritance
##Prototypal inheritance
- In JavaScript, objects have a special hidden property [[Prototype]]
	- The property [[Prototype]] is internal and hidden, but there are many ways to set it. One of them is to use the special name __proto__, like this
```javascript
let animal = {
  eats: true
};
let rabbit = {
  jumps: true
};

rabbit.__proto__ = animal; // (*)

// we can find both properties in rabbit now:
alert( rabbit.eats ); // true (**)
alert( rabbit.jumps ); // true
```

- `this` is not affected by prototypes at all

##F.prototype
```javascript
let animal = {
  eats: true
};

function Rabbit(name) {
  this.name = name;
}

Rabbit.prototype = animal;

let rabbit = new Rabbit("White Rabbit"); //  rabbit.__proto__ == animal

alert( rabbit.eats ); // true
```
- The F.prototype property (don't mistake it for [[Prototype]]) sets [[Prototype]] of new objects when new `F()` is called.

##Native prototypes
`obj = {}` is the same as `obj = new Object()`
```javascript
let obj = {};

alert(obj.__proto__ === Object.prototype); // true
alert(obj.toString === obj.__proto__.toString); //true
alert(obj.toString === Object.prototype.toString); //true
```

- All built-in objects follow the same pattern:
	- The methods are stored in the prototype (`Array.prototype`, `Object.prototype`, `Date.prototype`, etc.)
	- The object itself stores only the data (array items, object properties, the date)
- Primitives also store methods in prototypes of wrapper objects: `Number.prototype`, `String.prototype` and `Boolean.prototype`. 
Only undefined and null do not have wrapper objects.

##Prototype methods, objects without __proto__
- The __proto__ is considered outdated and somewhat deprecated (in browser-only part of the JavaScript standard).
- The modern methods are:
	- `Object.create(proto, [descriptors])` - creates an empty object with given proto as [[Prototype]] and optional property descriptors.
	- `Object.getPrototypeOf(obj)` - returns the [[Prototype]] of obj.
	- `Object.setPrototypeOf(obj, proto)` - sets the [[Prototype]] of obj to proto.
	
- The built-in __proto__ getter/setter is unsafe if we'd want to put user-generated keys into an object. 
Just because a user may enter "__proto__" as the key, and there'll be an error, with hopefully light, but generally unpredictable consequences.
- So we can either use `Object.create(null)` to create a "very plain" object without __proto__, or stick to `Map` objects for that.

- Other methods:
    - `Object.keys(obj) / Object.values(obj) / Object.entries(obj)` - returns an array of enumerable own string property names/values/key-value pairs.
    - `Object.getOwnPropertySymbols(obj)` - returns an array of all own symbolic keys.
    - `Object.getOwnPropertyNames(obj)` - returns an array of all own string keys.
    - `Reflect.ownKeys(obj)` - returns an array of all own keys.
    - `obj.hasOwnProperty(key)` - returns true if obj has its own (not inherited) key named key.

#Classes
##Class basic syntax
- The basic class syntax looks like this:
```javascript
class MyClass {
  prop = value; // property

  constructor(...) { // constructor
    // ...
  }

  method(...) {} // method

  get something(...) {} // getter method
  set something(...) {} // setter method

  [Symbol.iterator]() {} // method with computed name (symbol here)
  // ...
}
```

- `MyClass` is technically a function (the one that we provide as constructor), while methods, getters and setters are written to MyClass.prototype.

```javascript
class User {

  ['say' + 'Hi']() {
    alert("Hello");
  }

}

new User().sayHi(); //example of computed names
```
- Old browsers may need a polyfill

##Class inheritance
- Any expression is allowed after extends
```javascript
function f(phrase) {
  return class {
    sayHi() { alert(phrase); }
  };
}

class User extends f("Hello") {}

new User().sayHi(); // Hello
```

- Arrow functions have no super
- Constructors in inheriting classes must call `super(...)`, and (!) do it before using this. A derived constructor must call super in order to execute its parent (base) constructor, otherwise the object for this won't be created. And we'll get an error.
- We can override not only methods, but also class fields.

- To extend a class: class Child extends Parent:
	- That means `Child.prototype.__proto__` will be `Parent.prototype`, so methods are inherited.
- When overriding a constructor: We must call parent constructor as `super()` in Child constructor before using this.
- When overriding another method: We can use `super.method()` in a Child method to call Parent method.
- Internals: Methods remember their class/object in the internal [[HomeObject]] property. That's how super resolves parent methods.
	- So it's not safe to copy a method with super from one object to another.

##Static properties and methods
- Static methods are used for the functionality that belongs to the class "as a whole". It doesn't relate to a concrete class instance.
- For example, a method for comparison `Article.compare(article1, article2)` or a factory method `Article.createTodays()`.
- They are labeled by the word `static` in class declaration.
- Static properties are used when we'd like to store class-level data, also not bound to an instance.
- The syntax is:
```javascript
class MyClass {
  static property = ...;

  static method() {
    ...
  }
}
```

- Technically, static declaration is the same as assigning to the class itself:
`MyClass.property = ...
MyClass.method = ...`
- Static properties and methods are inherited.
- For class B extends A the prototype of the class B itself points to A: B.[[Prototype]] = A. So if a field is not found in B, the search continues in A.

##Private and protected properties and methods
- In terms of OOP, delimiting of the internal interface from the external one is called encapsulation.
- It gives the following benefits:
	- If we strictly delimit the internal interface, then the developer of the class can freely change its internal properties and methods, even without informing the users.
	- Hiding complexity
	- It's always convenient when implementation details are hidden, and a simple, well-documented external interface is available.

- To hide an internal interface we use either protected or private properties:
	- Protected fields start with `_`. That's a well-known convention, not enforced at the language level. Programmers should only access a field starting with `_` from its class and classes inheriting from it.
	- Private fields start with `#`. JavaScript makes sure we can only access those from inside the class.
	- Right now, private fields are not well-supported among browsers, but can be polyfilled.

##Extending built-in classes
- Built-in classes like `Array`, `Map` and others are extendable also.
- We can add a special static getter `Symbol.species` to the class. If it exists, it should return the constructor that JavaScript will use internally to create new entities in map, filter and so on.


##Class checking: "instanceof"
- The `instanceof` operator allows to check whether an object belongs to a certain class. It also takes inheritance into account.
	- it can be used for building a polymorphic function, the one that treats arguments differently depending on their type.
- Let's summarize the type-checking methods that we know:
```
 			works for						returns
typeof		primitives							string
{}.toString	primitives, built-in objects, objects with Symbol.toStringTag   string
instanceof	objects							        true/false
```

##Mixins
- In JavaScript we can only inherit from a single object. There can be only one [[Prototype]] for an object. And a class may extend only one other class.
- a mixin is a class containing methods that can be used by other classes without a need to inherit from it.
```javascript
// mixin
let sayHiMixin = {
  sayHi() {
    alert(`Hello ${this.name}`);
  },
  sayBye() {
    alert(`Bye ${this.name}`);
  }
};

// usage:
class User {
  constructor(name) {
    this.name = name;
  }
}

// copy the methods
Object.assign(User.prototype, sayHiMixin);

// now User can say hi
new User("Dude").sayHi(); // Hello Dude!
```

#Error handling
##Error handling, "try..catch"
- `try..catch` only works for runtime errors
- `try..catch` works synchronously
```javascript
try {
  setTimeout(function() {
    noSuchVariable; // script will die here
  }, 1000);
} catch (e) {
  alert( "won't work" );
}
```
	
- error object in catch has `name`, `message`, `stack` fields
- A recent addition `... } catch { // <-- without (err) ...`

`throw <error object>`  
```javascript
let error = new Error(message);  
// or
let error = new SyntaxError(message);
let error = new ReferenceError(message);
// ...
```
```javascript
try {
   ... try to execute the code ...
} catch(e) {
   ... handle errors ...
} finally {
   ... execute always ...
}
```

- Variables are local inside `try..catch..finally`
- only `try..finally` is also possible
- Rethrowing is a very important pattern of error handling:  
a catch block usually expects and knows how to handle the particular error type, so it should rethrow errors it doesn't know.
- Even if we don't have try..catch, most environments allow us to setup a "global" error handler to catch errors that "fall out".  
In-browser, that's window.onerror.

##Custom errors, extending Error
```javascript
class MyError extends Error {
  constructor(message) {
    super(message);
    this.name = "MyError"
  }
}
```
```javascript
try {
  ...
  readUser()  // the potential error source
  ...
} catch (err) { // this approach is called wrapping errors
  if (err instanceof ValidationError) {
    // handle validation errors
  } else if (err instanceof SyntaxError) {
    // handle syntax errors
  } else {
    throw err; // unknown error, rethrow it
  }
}
```

#Promises, async/await
##Introduction: callbacks
- The improved error handling callback convention is:
	- the first argument of the callback is reserved for an error if it occurs. Then callback(err) is called.
	- the second argument (and the next ones if needed) are for the successful result. Then callback(null, result1, result2…) is called.
```javascript
loadScript('/my/script.js', function(error, script) { // improved callback with error handling
  if (error) {
    // handle error
  } else {
    // script loaded successfully
  }
});
```

-  "callback hell" or "pyramid of doom" is nesting of too many callbacks 
	- We can try to alleviate the problem by making every action a standalone function, like this (better solution is Promises):
```javascript
loadScript('1.js', step1);
function step1(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', step2);
  }
} ...
```

##Promise
```javascript
let promise = new Promise(function(resolve, reject) {
  // executor (the producing code, "singer")
});
```
- The function passed to new Promise is called the executor. When new Promise is created, the executor runs automatically. It contains the producing code which should eventually produce the result.
- Its arguments resolve and reject are callbacks provided by JavaScript itself. Our code is only inside the executor.
	- `resolve(value)` — if the job finished successfully, with result value.
	- `reject(error)` — if an error occurred, error is the error object.
	- a job done by the executor may have only one result or an error.
		
- promise.then: 
```javascript
promise.then(
  function(result) { /* handle a successful result */ },
  function(error) { /* handle an error */ }
);
```
```javascript
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("done!"), 1000);
});

// resolve runs the first function in .then
promise.then(
  result => alert(result), // shows "done!" after 1 second
  error => alert(error) // doesn't run
);
```
```javascript
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// reject runs the second function in .then
promise.then(
  result => alert(result), // doesn't run
  error => alert(error) // shows "Error: Whoops!" after 1 second
);
```

- promise.catch : 
	- if we're interested only in errors, then we can use `null` as the first argument: `.then(null, errorHandlingFunction)`.  
	Or we can use `.catch(errorHandlingFunction)`, which is exactly the same:
```javascript
let promise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// .catch(f) is the same as promise.then(null, f)
promise.catch(alert); // shows "Error: Whoops!" after 1 second
```

- promise.finally :
	- `finally` is a good handler for performing cleanup, e.g. stopping our loading indicators, as they are not needed anymore, no matter what the outcome is.
```javascript
new Promise((resolve, reject) => {
  setTimeout(() => resolve("result"), 2000)
})
  .finally(() => alert("Promise ready"))
  .then(result => alert(result)); // <-- .then handles the result. In case of error .catch(err => alert(err))
```
  
- Callbacks & Promise example:
	- Callback
```javascript
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}
```
- Promise
```javascript
function loadScript(src) {
  return new Promise(function(resolve, reject) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Script load error for ${src}`));

    document.head.append(script);
  });
}
// usage:
let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");
promise.then(
  script => alert(`${script.src} is loaded!`),
  error => alert(`Error: ${error.message}`)
);

promise.then(script => alert('Another handler...'));
```
  
##Promises chaining
```javascript
new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000);

}).then(function(result) {

  alert(result); // 1

  return new Promise((resolve, reject) => { // (*)
    setTimeout(() => resolve(result * 2), 1000);
  });

}).then(function(result) { // (**)

  alert(result); // 2

  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(result * 2), 1000);
  });

}).then(function(result) {

  alert(result); // 4

});

```

##Error handling with promises
- `.catch` doesn't have to be immediate. It may appear after one or maybe several `.then`
- The code of a promise executor and promise handlers has an "invisible try..catch" around it.
```javascript
// the execution: catch -> then
new Promise((resolve, reject) => {

  throw new Error("Whoops!");

}).catch(function(error) {

  alert("The error is handled, continue normally");

}).then(() => alert("Next successful handler runs"));
```

##Promise API
- There are 5 static methods of Promise class:
	- `Promise.all(promises)` - waits for all promises to resolve and returns an array of their results. If any of the given promises rejects, it becomes the error of Promise.all, and all other results are ignored.
	- `Promise.allSettled(promises)` (recently added method) - waits for all promises to settle and returns their results as an array of objects with:
		- status: "fulfilled" or "rejected"
		- value (if fulfilled) or reason (if rejected).
		- in case browser does not support the new feature we can use polyfill:
```javascript	
		if (!Promise.allSettled) {
		  const rejectHandler = reason => ({ status: 'rejected', reason });
		
		  const resolveHandler = value => ({ status: 'fulfilled', value });
		
		  Promise.allSettled = function (promises) {
		    const convertedPromises = promises.map(p => Promise.resolve(p).then(resolveHandler, rejectHandler));
		    return Promise.all(convertedPromises);
		  };
		}
```
- `Promise.race(promises)` - waits for the first promise to settle, and its result/error becomes the outcome.
- `Promise.any(promises)` - waits for the first promise to fulfill, and its result becomes the outcome. If all of the given promises rejects, it becomes the error of Promise.any.
- `Promise.resolve(value)` - makes a resolved promise with the given value.
- `Promise.reject(error)` - makes a rejected promise with the given error.

##Promisification
- It's the conversion of a function that accepts a callback into a function that returns a promise.
- General util method to transform callback into promise:
```javascript
// promisify(f, true) to get array of results
function promisify(f, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function callback(err, ...results) { // our custom callback for f
        if (err) {
          reject(err);
        } else {
          // resolve with all callback results if manyArgs is specified
          resolve(manyArgs ? results : results[0]);
        }
      }

      args.push(callback);

      f.call(this, ...args);
    });
  };
}

// usage:
f = promisify(f, true);
f(...).then(arrayOfResults => ..., err => ...);
```
##Microtasks
- Promise handling is always asynchronous, as all promise actions pass through the internal "promise jobs" queue, also called "microtask queue" (ES8 term).
- So `.then/catch/finally` handlers are always called after the current code is finished.
- If we need to guarantee that a piece of code is executed after `.then/catch/finally`, we can add it into a chained `.then` call.
- In most Javascript engines, including browsers and Node.js, the concept of microtasks is closely tied with the "event loop" and "macrotasks". 

##Async/await
- The word "async" before a function means one simple thing: a function always returns a promise. Other values are wrapped in a resolved promise automatically.
```javascript
// works only inside async functions
let value = await promise;
```
- in promises we can rewrite `.then` with async/await
	- replace `.then` calls with await
	- we should make the function async for them to work

- we can't use await in the top level code, but we can always wrap it:
```javascript
(async () => {
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();
  ...
})();
```
- error handling in case of async/await it is best done by `try {} catch {}`, or we should still resolve with .catch

#Generators, advanced iteration
##Generators
```javascript
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence();

let one = generator.next();

alert(JSON.stringify(one)); // {value: 1, done: false}
```

- it can be `function* f(…) or function *f(…)`
- generators are iterable.
- we can embed generators inside of generators like (`yield*`): 
```javascript
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

function* generatePasswordCodes() {

  // 0..9
  yield* generateSequence(48, 57);

  // A..Z
  yield* generateSequence(65, 90);

  // a..z
  yield* generateSequence(97, 122);

}
```

- we can also pass in the argument `generator.next(arg)`
- we can also throw an error in generator: `generator.throw(err)`

##Async iterators and generators
```javascript
let range = {
  from: 1,
  to: 5,

  // this line is same as [Symbol.asyncIterator]: async function*() {
  async *[Symbol.asyncIterator]() {
    for(let value = this.from; value <= this.to; value++) {

      // make a pause between values, wait for something
      await new Promise(resolve => setTimeout(resolve, 1000));

      yield value;
    }
  }
};

(async () => {

  for await (let value of range) {
    alert(value); // 1, then 2, then 3, then 4, then 5
  }

})();
```

- Syntax differences between async and regular iterators/Generators:
 	- iterable: `Symbol.iterator`
 	- async iterable: `Symbol.asyncIterator`
 	- generator: `function*`
 	- async generator: `async function*`

#Modules
##Modules, introduction
- A module is just a file. One script is one module.
- `export` keyword labels variables and functions that should be accessible from outside the current module.
- `import` allows the import of functionality from other modules.
- Modules always use strict, by default
- the module is executed only once. Exports are generated, and then they are shared between importers, so if something changes the object in script, other modules will see that.
- Browser-specific features
	- Module scripts are always deferred, same effect as defer
		- downloading external module scripts `<script type="module" src="...">` doesn't block HTML processing, they load in parallel with other resources.
		- module scripts wait until the HTML document is fully ready (even if they are tiny and load faster than HTML), and then run.
		- relative order of scripts is maintained: scripts that go first in the document, execute first
```html
<!-- all dependencies are fetched (analytics.js), and the script runs -->
<!-- doesn't wait for the document or other <script> tags -->
<script async type="module">
```


```html
<script nomodule>
  alert("Modern browsers know both type=module and nomodule, so skip this");
  alert("Old browsers ignore script with unknown type=module, but execute this.");
</script>
```


- modern build tools can: 
	- In the process, other transformations and optimizations may be applied:
	- Unreachable code removed.
	- Unused exports removed ("tree-shaking").
	- Development-specific statements like console and debugger removed.
	- Modern, bleeding-edge JavaScript syntax may be transformed to older one with similar functionality using Babel.
	- The resulting file is minified (spaces removed, variables replaced with shorter names, etc).

##Export and Import
- Static Export:
    - Before declaration of a class/function/…:
    	- `export [default] class/function/variable ...`
    - Standalone export:
    	- `export {x [as y], ...}`
    - Re-export: 
    	- `export {x [as y], ...} from "module"`
    	- `export * from "module"` (doesn't re-export default)
    	- `export {default [as y]} from "module"` (re-export default)
	
- Static Import:
    - Named exports from module:
    	- `import {x [as y], ...} from "module"`
    - Default export:
    	- `import x from "module"`
    	- `import {default as x} from "module"`
    - Everything:
    	- `import * as obj from "module"`
    - Import the module (its code runs), but do not assign it to a variable:
    	- `import "module"`

- We can put import/export statements at the top or at the bottom of a script, that doesn't matter.
- Please note that import/export statements don't work if inside {...}. That can be done with dynamic imports
- Named exports are preferred way since default have some extra strange behaviours around them 

##Dynamic imports
- The `import(module)` expression loads the module and returns a promise that resolves into a module object that contains all its exports. It can be called from any place in the code.

#Miscellaneous
##Proxy and Reflect
- A Proxy object wraps another object and intercepts operations, like reading/writing properties and others, optionally handling them on its own, or transparently allowing the object to handle them.
`let proxy = new Proxy(target, handler)`
	- `target` - is an object to wrap, can be anything, including functions.
	- `handler` - proxy configuration: an object with "traps", methods that intercept operations. - e.g. get trap for reading a property of target, set trap for writing a property into target, and so on.
- We can trap:
	- Reading (get), writing (set), deleting (deleteProperty) a property (even a non-existing one).
	- Calling a function (apply trap).
	- The new operator (construct trap).
	- Many other operations (the full list is at the beginning of the article and in the docs).
- The Reflect API is designed to complement Proxy. For any Proxy trap, there's a Reflect call with same arguments. We should use those to forward calls to target objects.

##Eval: run a code string
- A call to eval(code) runs the string of code and returns the result of the last statement.
	- Rarely used in modern JavaScript, as there's usually no need.
	- Can access outer local variables. That's considered bad practice.
		- In strict mode, eval has its own lexical environment
		- Without use strict, eval doesn't have its own lexical environment  
		`let x = 5; eval("x = 10"); alert(x); // 10, value modified`
	- Instead, to eval the code in the global scope, use window.eval(code).
	- Or, if your code needs some data from the outer scope, use `new Function` and pass it as arguments.

##Currying
- Currying is an advanced technique of working with functions. It's used not only in JavaScript, but in other languages as well.
```javascript
function sum(a, b) {
  return a + b;
}

let curriedSum = _.curry(sum); // using _.curry from lodash library

alert( curriedSum(1, 2) ); // 3, still callable normally
alert( curriedSum(1)(2) ); // 3, called partially
```
- Currying is a transform that makes `f(a,b,c)` callable as `f(a)(b)(c)`. JavaScript implementations usually both keep the function callable normally and return the partial if the arguments count is not enough.
- Currying allows us to easily get partials. After currying the three argument universal function `log(date, importance, message)` gives us partials when called with one argument (like: `let newLog = log(Date.now())`) or two arguments (like: `let messageLog = log(Date.now, 5)`).

##Reference Type
```javascript
let user = {
  name: "John",
  hi() { alert(this.name); }
}

// split getting and calling the method in two lines
let hi = user.hi;
hi(); // Error, because this is undefined
```
- Reference Type is an internal type of the language.
- Reading a property, such as with dot . in `obj.method()` returns not exactly the property value, but a special "reference type" value that stores both the property value and the object it was taken from.
- That's for the subsequent method call () to get the object and set this to it.
- For all other operations, the reference type automatically becomes the property value (a function in our case).
- The whole mechanics is hidden from our eyes. It only matters in subtle cases, such as when a method is obtained dynamically from the object, using an expression.

## BigInt
```javascript
const bigint = 1234567890123456789012345678901234567890n;
const sameBigint = BigInt("1234567890123456789012345678901234567890");
const bigintFromNumber = BigInt(10); // same as 10n
```

- We can't mix bigints and regular numbers, we should convert them: 
```javascript
let bigint = 1n;
let number = 2;

// number to bigint
alert(bigint + BigInt(number)); // 3

// bigint to number
alert(Number(bigint) + number); // 3
```
- The unary plus is not supported on bigints `alert( +bigint ); // error`
