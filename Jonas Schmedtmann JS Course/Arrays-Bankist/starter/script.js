'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [
    [200,'2019-11-18T21:31:17.178Z'], 
    [450,'2019-12-23T07:42:02.383Z'], 
    [-400, '2020-01-28T09:15:04.904Z'], 
    [3000, '2020-04-01T10:17:24.185Z'], 
    [-650, '2020-05-08T14:11:59.604Z'], 
    [-130, '2020-05-27T17:01:17.194Z'], 
    [70, '2024-11-10T23:36:17.929Z'], 
    [1300, '2024-11-12T10:51:36.790Z']
  ],
  interestRate: 1.2, // %
  pin: 1111,

  // movementsDates: [
  //   '2019-11-18T21:31:17.178Z',
  //   '2019-12-23T07:42:02.383Z',
  //   '2020-01-28T09:15:04.904Z',
  //   '2020-04-01T10:17:24.185Z',
  //   '2020-05-08T14:11:59.604Z',
  //   '2020-05-27T17:01:17.194Z',
  //   '2024-11-10T23:36:17.929Z',
  //   '2024-11-12T10:51:36.790Z',
  // ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [
    [5000, '2019-11-01T13:15:33.035Z'], 
    [3400, '2019-11-30T09:48:16.867Z'], 
    [-150, '2019-12-25T06:04:23.907Z'], 
    [-790, '2020-01-25T14:18:46.235Z'], 
    [-3210, '2020-02-05T16:33:06.386Z'], 
    [-1000, '2020-04-10T14:43:26.374Z'], 
    [8500, '2020-06-25T18:49:59.371Z'], 
    [-30, '2020-07-26T12:01:20.894Z']
  ],
  interestRate: 1.5,
  pin: 2222,

  // movementsDates: [
  //   '2019-11-01T13:15:33.035Z',
  //   '2019-11-30T09:48:16.867Z',
  //   '2019-12-25T06:04:23.907Z',
  //   '2020-01-25T14:18:46.235Z',
  //   '2020-02-05T16:33:06.386Z',
  //   '2020-04-10T14:43:26.374Z',
  //   '2020-06-25T18:49:59.371Z',
  //   '2020-07-26T12:01:20.894Z',
  // ],
  currency: 'USD',
  locale: 'en-US', // de-DE
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [
   [200, '2020-01-10T13:15:33.035Z'], 
   [-200, '2020-02-10T11:48:16.867Z'], 
   [340, '2020-03-10T12:04:23.907Z'], 
   [-300, '2020-04-10T14:18:46.235Z'], 
   [-20, '2020-05-10T16:33:06.386Z'], 
   [50, '2020-06-10T14:43:26.374Z'], 
   [400, '2020-07-10T14:49:59.371Z'], 
   [-460, '2020-08-10T12:01:20.894Z']
  ],
  interestRate: 0.7,
  pin: 3333,

  // movementsDates: [
  //   '2020-01-10T13:15:33.035Z',
  //   '2020-02-10T11:48:16.867Z',
  //   '2020-03-10T12:04:23.907Z',
  //   '2020-04-10T14:18:46.235Z',
  //   '2020-05-10T16:33:06.386Z',
  //   '2020-06-10T14:43:26.374Z',
  //   '2020-07-10T14:49:59.371Z',
  //   '2020-08-10T12:01:20.894Z',
  // ],

  currency: 'PLN',
  locale: 'pl-PL', // de-DE
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [
    [430, '2019-11-11T13:15:33.035Z'], 
    [1000, '2019-12-31T09:48:16.867Z'], 
    [700, '2020-01-05T06:04:23.907Z'], 
    [50, '2020-01-15T14:18:46.235Z',], 
    [90, '2020-02-01T16:33:06.386Z',]
  ],
  interestRate: 1,
  pin: 4444,

  // movementsDates: [
  //   '2019-11-11T13:15:33.035Z',
  //   '2019-12-31T09:48:16.867Z',
  //   '2020-01-05T06:04:23.907Z',
  //   '2020-01-15T14:18:46.235Z',
  //   '2020-02-01T16:33:06.386Z',
  //   ],

    currency: 'GBP',
    locale: 'en-GB',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

let currentAccount, timeInterval; 

const displayDates = function(date) {
  const calcTimePassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000*60*60*24));
  
  const daysPassed = calcTimePassed(new Date(), date);
  
  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  
  // const movDay = `${date.getDate()}`.padStart(2,0);
  // const movMonth =`${date.getMonth() + 1}`.padStart(2,0);
  // const movYear = `${date.getFullYear()}`
  const options = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  };
  return new Intl.DateTimeFormat(currentAccount.locale, options).format(date);
};

const displayMovements = function(movements) {
  containerMovements.innerHTML = '';
  
  movements.forEach(function(mov, i) {
    // const options = {
      //   day: 'numeric',
      //   month: 'numeric',
      //   year: 'numeric',
      // }
      const movDate = new Date(movements[i][1]);
      const computedDate = displayDates(movDate);
      // console.log(mov[0])
      const type = mov[0] > 0 ? 'deposit' : 'withdrawal';
      
      const html = `<div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__date">${computedDate}</div>
      <div class="movements__value">${(formatMoney(mov[0],currentAccount.locale,currentAccount.currency))}</div>
      </div>`
      
      containerMovements.insertAdjacentHTML("afterbegin", html) 
    });
  };
  
  const computingLogins = function(accs) {
    accs.forEach(function(acc){
      acc.login = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('');
    });
  };
  
  const formatMoney = (value,locale,cur) => new Intl.NumberFormat(locale, {style: "currency", currency: cur,}).format(value);
  
  const calcDisplaySummary = function(mov, int) {
    
    labelSumIn.textContent = formatMoney(mov.filter(mov => mov[0] > 0).reduce((accu, mov) => accu + mov[0],0),currentAccount.locale, currentAccount.currency); 
    labelSumOut.textContent = formatMoney(mov.filter(mov => mov[0] < 0).reduce((accu, mov) => accu + mov[0],0),currentAccount.locale, currentAccount.currency); 
    labelSumInterest.textContent = formatMoney(mov.filter(mov => mov[0] > 0).map(mov => mov[0] * int/100).filter(mov => mov >= 1).reduce((accu, mov) => accu + mov, 0),currentAccount.locale, currentAccount.currency);
  };
  
  const calcBalance = function(acc){
    acc.balance = acc.movements.reduce((accu, value) => accu + value[0], 0);
    labelBalance.textContent = formatMoney(acc.balance,currentAccount.locale,currentAccount.currency);
  };
  

  const timeRefresh = function () {
    const currentDateAndTime = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      // second: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'long',
    }
    // const currentMonth = `${currentDateAndTime.getDate()}`.padStart(2,0);
    // const currentDay = `${currentDateAndTime.getMonth() + 1}`.padStart(2,0);
    // const currentMinute = `${currentDateAndTime.getMinutes()}`.padStart(2,0);
    // labelDate.textContent = `${currentDay}/${currentMonth}/${currentDateAndTime.getFullYear()}, ${currentDateAndTime.getHours()}:${currentMinute}`;
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(currentDateAndTime);
    return currentDateAndTime;
  };
  
  
  const functionsRefresh = function (acc) {
    displayMovements(acc.movements, acc.movementsDates);
    calcBalance(acc);
    calcDisplaySummary(acc.movements, acc.interestRate);
    clearInterval(timeInterval);
    logOutTimer();
  };
  
  const logOutTimer = function() {
    let time = 300;
    const tick = function() {
      const min = String(Math.floor(time/60)).padStart(2,0);
      const sec = String(time % 60).padStart(2,0);
      labelTimer.textContent = `${min}:${sec}`
      if (time === 0) {
        clearInterval(timeInterval);
        labelWelcome.textContent = "Log in to get started";
        containerApp.style.opacity = 0;
        currentAccount = {};
      };
      time--;
    }
    tick();
    timeInterval = setInterval(() => {tick(); timeRefresh()} ,1000);
    console.log(timeInterval);
    return timeInterval;
  };

  
  btnLogin.addEventListener('click', function (e){
    e.preventDefault();
    
  currentAccount = accounts.find(acc => acc.login === inputLoginUsername.value);
  
  if(currentAccount?.pin === +inputLoginPin.value) {
    labelWelcome.textContent = `Welcome Back, ${currentAccount.owner.split(' ')[0]}!`
    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = '';
    timeRefresh();
    functionsRefresh(currentAccount);
    inputLoginPin.blur();
    inputLoginUsername.blur();
  }
});

btnTransfer.addEventListener('click', function(e){
  e.preventDefault();

  const transferAmout = +inputTransferAmount.value;
  const transferLogin = inputTransferTo.value;
  const receiverAccount = accounts.find(acc => acc.login === transferLogin);
  // console.log(receiverAccount, currentAccount)
  if (transferAmout > 0 && receiverAccount && receiverAccount !== currentAccount && currentAccount.balance >= transferAmout) {
    currentAccount.movements.push([-transferAmout,new Date().toISOString()]); 
    // currentAccount.movementsDates.push(new Date().toISOString());
    receiverAccount.movements.push([transferAmout,new Date().toISOString()]);
    // receiverAccount.movementsDates.push(new Date().toISOString());
    functionsRefresh(currentAccount);
  }
  inputTransferTo.value = inputTransferAmount.value = '';
  inputTransferTo.blur();
  inputTransferAmount.blur();
});

btnLoan.addEventListener('click', function(e) {
  e.preventDefault();

  const loanAmount = +inputLoanAmount.value;
  const depositMovementCheck = currentAccount.movements.some(mov => mov[0] >= (loanAmount * 0.1));
  
  if (loanAmount > 0 && depositMovementCheck) {
    setTimeout(() => {
      currentAccount.movements.push([Math.floor(loanAmount),new Date().toISOString()]);
    // currentAccount.movementsDates.push(new Date().toISOString());
    functionsRefresh(currentAccount);
  }, 3500);
  }

  inputLoanAmount.value = '';
  inputLoanAmount.blur();
})

btnClose.addEventListener('click', function(e) {
  e.preventDefault();
  const closeLogin = inputCloseUsername.value;
  const closePin = inputClosePin.value; 
  if(closeLogin === currentAccount.login && +closePin === currentAccount.pin) {
    const index = accounts.findIndex(acc => acc.login === currentAccount.login);
    accounts.splice(index,1);
    containerApp.style.opacity = 0;
  }
  inputClosePin.value = '';
  inputCloseUsername.value = '';
})

let sortIndex = 1;

btnSort.addEventListener('click', function(){
  if(sortIndex === 0) {displayMovements(currentAccount.movements); sortIndex++}
  else if(sortIndex === 1) {displayMovements(currentAccount.movements.slice().sort((a,b) => a[0] - b[0])); sortIndex++}
  else if(sortIndex === 2) {displayMovements(currentAccount.movements.slice().sort((a,b) => b[0] - a[0])); sortIndex = 0};
})
computingLogins(accounts);
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const deposits = movements.filter(mov => mov > 0);

const withdrawals = movements.filter(mov => mov < 0).map(mov => Math.abs(mov));

// console.log(deposits);
// console.log(withdrawals);
/////////////////////////////////////////////////
/////////////////////////////////////////////////

//Arrays Practice 

const bankDepositSum = accounts.flatMap(acc => acc.movements).filter(mov => mov > 0).reduce((accu, mov) => accu + mov, 0);
// console.log(`${bankDepositSum}€`)

// const bankDepositSum2 = accounts.flatMap(acc => acc.movements).filter(mov => mov >= 1000).length
// or
const bankDepositSum2 = accounts.flatMap(acc => acc.movements).reduce((count, cur) => cur >= 1000 ? ++count : count,0)
// console.log(bankDepositSum2)

const bankSums = accounts.flatMap(acc => acc.movements).reduce((sum, value) => {
  value > 0 ? (sum.deposits += value) : sum.withdrawals += value;
  return sum;
},{deposits: 0, withdrawals: 0})
// console.log(bankSums)

const {deposits1, withdrawals1} = accounts.flatMap(acc => acc.movements).reduce((sum, value) => {
  // value > 0 ? (sum.deposits1 += value) : sum.withdrawals1 += value;
  sum[value > 0 ? 'deposits1' : 'withdrawals1'] += value;
  return sum;
},{deposits1: 0, withdrawals1: 0})
// console.log(deposits1, withdrawals1)

const convertTitleCase = function(title) {
  const capitalizeString = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'the', 'but','and', 'or', 'on','in','with'];
  const formattedTitle = title.toLowerCase().split(' ').map(word => exceptions.includes(word) ? word : capitalizeString(word)).join(' ');

  return capitalizeString(formattedTitle);
  

}
// console.log(convertTitleCase('and i own an apple and something else'))

// CHALLENGES

//Display the highest value

const highestValue = movements.reduce((acc, cur) => acc = acc>cur ? acc : cur, movements[0])
// console.log(highestValue)

const dogsJulia1 = [3,5,2,12,7];
const dogsKate1 = [4,1,15,8,3];
const dogsJulia2 = [9,16,6,8,3];
const dogsKate2 = [10,5,6,1,4];

const checkDogs = function(arr1, arr2) {
  const correctedJuliaArray = arr1.slice(1,-2);

  const connectedArray = correctedJuliaArray.concat(arr2);

  connectedArray.forEach(function(age, i) {
   const output = age >= 3 ? `Dog ${i + 1} is an adult, and is ${age} years old!` : `Dog ${i + 1} is still a puppy!` ;
   console.log(output);
  });
};

// checkDogs(dogsJulia1, dogsKate1);
// checkDogs(dogsJulia2, dogsKate2);

const ages1 = [5,2,4,1,15,8,3];
const ages2 = [16,6,10,5,6,1,4];

// const calculateDogYearsToHumanYears = function(arr) {
//   return arr.map(function(age) {
//    return age <= 2 ? 2 * age : 16 + age * 4;
//   }).filter(age => age > 18)
//   .reduce((accu, cur, i, arr) => (i + 1) == arr.length ? (accu + cur) / arr.length : accu + cur, 0);
// }

// console.log(calculateDogYearsToHumanYears(ages1));
// console.log(calculateDogYearsToHumanYears(ages2));

const calculateDogYearsToHumanYears = (arr) => arr.map((age) => age <= 2 ? 2 * age : 16 + age * 4
  ).filter(age => age > 18)
  .reduce((accu, cur, i, arr) => accu + cur / arr.length, 0);


  // console.log(calculateDogYearsToHumanYears(ages1));
  // console.log(calculateDogYearsToHumanYears(ages2));

  //all movements calculation

  const allMovementsArray = accounts
    .map(acc => acc.movements)
    .flat()
    .reduce((accu ,mov) => accu + mov, 0);
  // console.log(allMovementsArray);

  const allMovementsArrayFlatMap = accounts
    .flatMap(acc => acc.movements)
    .reduce((accu, mov) => accu + mov, 0);
  // console.log(allMovementsArrayFlatMap);


  // a > b: smallest to highest
  // b > a: highest to smallest
  const copyOfMovements = movements.slice();
  copyOfMovements.sort((a,b) =>  a > b ? 1 : -1)
  // console.log(movements);
  copyOfMovements.sort((a,b)=> a - b);
  // console.log(copyOfMovements);
  copyOfMovements.sort((a,b)=> b - a);
  // console.log(copyOfMovements);

  const diceRolls = Array.from({ length: 100 },(_,i) => Math.trunc(Math.random() * 6) + 1)
  // console.log(diceRolls)

  // Array.from({length}, built in map function)

  // Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
// Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
// Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

// 1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. 
// Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
// 2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
// 3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
// 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
// 5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
// 6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
// 7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
// 8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

// HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
// HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

// TEST DATA:
// const dogs = [
//   { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
//   { weight: 8, curFood: 200, owners: ['Matilda'] },
//   { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
//   { weight: 32, curFood: 340, owners: ['Michael'] }
// ];

// const calcFoodRecomendation = function(obj) {
//   const ownersEatTooMuch = [];
//   const ownersEatTooLittle = [];
//   const ownersEatOkayAmount = []
  // obj.forEach(obj => {
    // obj.recomendedFood = Math.trunc(obj.weight ** 0.75 * 28);
//     obj.owners.includes('Sarah') ? console.log(obj.curFood >= (obj.recomendedFood * 0.90) && obj.curFood <= (obj.recomendedFood * 1.1) ? "Sarah dog eats okay amount" : (obj.curFood >= (obj.recomendedFood * 0.90) ? "Sarah Dog eats too much" : "Sarah dog eats too little" )): 0;
//     obj.curFood >= (obj.recomendedFood * 0.90) && obj.curFood <= (obj.recomendedFood * 1.1) ? ownersEatOkayAmount.push(obj.owners) : obj.curFood >= (obj.recomendedFood * 0.90) ? ownersEatTooMuch.push(obj.owners) : ownersEatTooLittle.push(obj.owners);
//     obj.curFood === obj.recomendedFood ? console.log(true) : 0;
  // })
//   console.log(ownersEatTooLittle, ownersEatTooMuch, ownersEatOkayAmount)
  
//   // console.log(ownersEatOkayAmount)

//   const dogCopy = dogs.slice().sort((a,b) => a.recomendedFood - b.recomendedFood);
//   console.log(dogs)
//   console.log(dogCopy)
// }
// calcFoodRecomendation(dogs)
// console.log(dogs)

// alternative solution

// const ownersEatTooMuch = dogs.filter(dog => dog.curFood > dog.recomendedFood).flatMap(dog => dog.owners);
// const ownersEatTooLittle = dogs.filter(dog => dog.curFood < dog.recomendedFood).flatMap(dog => dog.owners);
// console.log(ownersEatTooMuch)
// console.log(`${ownersEatTooMuch.join(' and ')}'s Dogs eats too much`)
// console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eats too little`)
// console.log(dogs.some(dog => dog.curFood === dog.recomendedFood));
// console.log(dogs.some(dog => dog.curFood > (dog.recomendedFood * 0.9) && dog.curFood < (dog.recomendedFood * 1.1)));
// const ownersEatOkay = dogs.filter(dog => dog.curFood > (dog.recomendedFood * 0.9) && dog.curFood < (dog.recomendedFood * 1.1)).flatMap(dog => dog.owners);
// console.log(ownersEatOkay)

labelBalance.addEventListener('click', () => {clearInterval(timeInterval); console.log(timeInterval)});
