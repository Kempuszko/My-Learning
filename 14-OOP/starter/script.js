'use strict';

const Person = function(firstName, birthYear, lastName) {
    this.firstName = firstName;
    this.birthYear = birthYear;
    this.lastName = lastName;
};
const bartek = new Person('Bartek', 2003, 'Pastuszko');
// console.log(bartek);
const oliwia = new Person('Oliwia', 2012,'Pastuszko');
const klaudia = new Person('Klaudia',1994,'Pastuszko');
// console.log(oliwia,  klaudia);

Person.prototype.calcAge = function() {
    // console.log(2024 - this.birthYear);
};

bartek.calcAge();

// console.log(bartek.__proto__)


// console.log(bartek.__proto__ === Person.prototype);

// console.log(Person.prototype.isPrototypeOf(bartek)); //true
// console.log(Person.prototype.isPrototypeOf(oliwia)); //true 
// console.log(Person.prototype.isPrototypeOf(Person)); //false

Person.prototype.species = 'Homo Sapiens';
// console.log(bartek, oliwia);

// console.log(bartek.hasOwnProperty('firstName'));
// console.log(bartek.hasOwnProperty('species'));

//adding method to prototypes (not a good practice)
Array.prototype.unique = function() {
    return [...new Set(this)];
};

const arr = [5,5,1,6,4,2,5,5,6,6,4,3,2,1,4,5,6,7,8,9];

Person.hey = function() {
    // console.log("Hey there!");
    // console.log(this);
};

//static function, only Person can use this becausae prototype isnt included
Person.hey();
// jonas.hey();

// console.log(arr.unique().sort((a,b) => a - b));

class PersonCl {
    constructor(fullName, birthYear){
        this.fullName = fullName;
        this.birthYear = birthYear;
    };


    //instances methods (will be added to prototype)
    calcAge(){
        console.log(2024 - this.birthYear);
    }

    greet() {
        console.log(`Hey ${this.fullName}`);
    }

    get age() {
        return 2024 - this.birthYear;
    }
    // setting a property that already exists
    set fullName(name) {
        // console.log(name)
        if(name.includes(' ')) this._fullName = name;
        else alert(`${name} isn't a full name!`)
    }

    get fullName() {
        return this._fullName;
    }

    //static methods isnt added to prototype
    static hey() {
        console.log("Hey there!");
        console.log(this);
    }
};


// PersonCl.prototype.greet = function() {
    //     console.log(`Hey ${this.firstName}`);
    // };
    
    
    const jessica = new PersonCl('Jessica Davis', 1999);
    // console.log(jessica);
    // jessica.calcAge();
    // jessica.greet();
    // console.log(jessica.age);
    // console.log(jessica.fullName);

    const walter = new PersonCl('Walter White', 1924);
    
    const account = {
        owner: 'Jonas',
        movements: [100,200,300,500],
    
        get latest() {
            return this.movements.slice(-1).pop();
        },

        set latest(mov) {
            this.movements.push(mov);
        },
    };
// console.log(account.latest);
// PersonCl.hey();

const PersonProto = {
    calcAge(){
        console.log(2024 - this.birthYear);
    },

    init(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    }
};

const steven = Object.create(PersonProto);
steven.name = 'Steven';
steven.birthYear = 2000;
// steven.calcAge();

// console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init("Sarah", 1999);
// sarah.calcAge();

const Student = function(firstName, birthYear, course) {
    Person.call(this, firstName, birthYear);
    this.course = course;
};
//need to build connection between prototype and instance in first place!
Student.prototype = Object.create(PersonCl.prototype);

Student.prototype.introduce = function() {
    console.log(`My name is ${this.firstName} and i study ${this.course}!`);
};

Student.prototype.constructor = Student;

const mike = new Student('Mike', 2010, 'Programming');
console.log(mike);
mike.introduce();
mike.calcAge();


///////////////////////////////// CHALLENGES ////////////////////////////////////

const Car = function(make, speed) {
    this.make = make;
    this.speed = speed;
};

Car.prototype.acceleration = function() {
    console.log(`${this.make} accelerates to ${this.speed += 10}`);
};

Car.prototype.brake = function(){
    console.log(`${this.make} brakes to ${this.speed -= 5}`);
};

const bmw = new Car('BMW',120);

const mercedes = new Car('Mercedes',95);

//child of Car
const EV = function(make, speed, charge) {
    Car.call(this, make, speed);
    this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);

// EV.prototype.constructor = EV;

EV.prototype.chargeBattery = function(chargeTo) {
    this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
    this.speed += 20;
    this.charge -= 1;
    console.log(`${this.make} is going ${this.speed} km/h, with a charge of ${this.charge}`)
};

const tesla = new EV("Tesla", 120, 23);
console.log(tesla);
tesla.chargeBattery(100);
console.log(tesla);
tesla.accelerate();
tesla.accelerate();
tesla.accelerate();
tesla.accelerate();
tesla.brake()

// console.log(BMW)

// bmw.acceleration();
// bmw.brake();
// bmw.brake();
// bmw.acceleration();

// mercedes.brake()
// mercedes.acceleration();
// mercedes.brake();

class Car2 {
    constructor(make,speed){
        this.make = make;
        this.speed = speed;
    }

    brake() {
        this.speed -= 5;
        console.log(`${this.make} brakes to ${this.speed}`);
    }

    accelerate() {
        this.speed += 10;
        console.log(`${this.make} accelerates to ${this.speed}`)
    }

    get speedUS() {
        return `${this.speed / 1.6} mi/h`
    }

    set speedUS(speed) {
        this.speed = speed * 1.6
    }
}

const opel = new Car2('Opel', 100);
const fiat = new Car2('Fiat', 50);
const skoda =  new Car2('Skoda', 150);

// opel.brake();
// opel.accelerate();
// console.log(opel.speedUS);
// fiat.brake();
// fiat.accelerate();
// console.log(fiat.speedUS);
// skoda.brake();
// skoda.accelerate();
// console.log(skoda.speedUS);

// opel.speedUS = 30;
// fiat.speedUS = 100;
// skoda.speedUS = 75;
// console.log(opel);
// console.log(fiat);
// console.log(skoda);