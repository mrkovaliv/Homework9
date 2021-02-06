"use strict";
//1
class Call {
  static #count = 0;
  callMe() {
    Call.#count += 1;
  }
  static callCount() {
    return Call.#count;
  }
}
//2
class PersonGenderError extends Error {
  constructor(message = "Default gender error") {
    super(message);
  }
  toString() {
    return `${this.name} ${this.message}`;
  }
}
class PersonNameError extends Error {
  constructor(message = "Default name error") {
    super(message);
  }
  toString() {
    return `${this.name} ${this.message}`;
  }
}

class Person {
  static GENDER = {
    NOT_DEFINED: 0,
    MAN: 1,
    WOMAN: 2,
  };
  static isValidGender(value) {
    if (
      value === Person.GENDER.NOT_DEFINED ||
      value === Person.GENDER.MAN ||
      value === Person.GENDER.WOMAN
    ) {
      return true;
    } else {
      return false;
    }
  }
  #name = "NoName";
  #gender = Person.GENDER.NOT_DEFINED;
  constructor(name, gender) {
    try {
      if (typeof name === "string" || name instanceof String) {
        this.#name = name;
      } else {
        throw new PersonNameError("No corect type of name");
      }
    } catch (error) {
      console.error(error.message);
    }
    try {
      if (Person.isValidGender(gender)) {
        this.#gender = gender;
      } else {
        throw new PersonGenderError("No corect type of gender");
      }
    } catch (error) {
      console.error(error.message);
    }
  }
  set gender(gender) {
    try {
      if (Person.isValidGender(gender)) {
        this.#gender = gender;
      } else {
        throw new PersonGenderError("No corect type of gender ");
      }
    } catch (error) {
      console.error(error.message);
    }
  }
  get gender() {
    return this.#gender;
  }
  set name(name) {
    try {
      if (typeof name === "string" || name instanceof String) {
        this.#name = name;
      } else {
        throw new PersonNameError("No corect type of name");
      }
    } catch (error) {
      console.error(error.message);
    }
  }
  get name() {
    return this.#name;
  }
}
let user = new Person("Andrew", 0);
user.gender = Person.GENDER.MAN;
user.gender = 45;
user.name = "Volodymyr";
user.name = undefined;
console.log(user.gender, user.name);
//3
class PersonLog extends Person {
  #logs = [];
  constructor(name, gender) {
    super(name, gender);
    this.#logs.push(`name: NoName ${this.name}`);
    this.#logs.push(`gender: ${Person.GENDER.NOT_DEFINED} ${this.gender}`);
    Object.freeze(this);
  }
  set gender(gender) {
    try {
      if (Person.isValidGender(gender)) {
        let oldGender = super.gender;
        super.gender = gender;
        this.#logs.push(`gender: ${oldGender} ${super.gender}`);
      } else {
        throw new PersonGenderError("No corect type of gender");
      }
    } catch (error) {
      console.error(error.message);
    }
  }
  get gender() {
    return super.gender;
  }
  set name(name) {
    try {
      if (typeof name === "string" || name instanceof String) {
        let oldName = super.name;
        super.name = name;
        this.#logs.push(`name: ${oldName} ${super.name}`);
      } else {
        throw new PersonNameError("No corect type of name");
      }
    } catch (error) {
      console.error(error.message);
    }
  }
  get name() {
    return super.name;
  }
  set logs(value) {}
  get logs() {
    return this.#logs;
  }
}

let user2 = new PersonLog('Nastya', 1);
user2.gender = 2;
user2.gender = 1222;
user2.name = 15;
user2.name = 'Maria';
console.log(user2.logs);
