class Address {
  constructor(city, street) {
    this.city = city;
    this.street = street;
  }
}

class Person {
  constructor(name, age, address) {
    this.name = name;
    this.age = age;
    this.address = address;
  }

  greet() {
    console.log(
      `Hello, my name is ${this.name} and I am ${this.age} years old.`
    );
  }
}

// Create nested instances
const address = new Address("New York", "123 Main St");
const person = new Person("John", 30, address);

// Serialize the object to JSON string
const jsonString = JSON.stringify(person);
console.log(jsonString);
// Output: {"name":"John","age":30,"address":{"city":"New York","street":"123 Main St"}}

// Deserialize JSON string back into an object
function revivePerson(key, value) {
  if (
    key === "address" &&
    typeof value === "object" &&
    value !== null &&
    "city" in value &&
    "street" in value
  ) {
    return new Address(value.city, value.street);
  }
  if (
    typeof value === "object" &&
    value !== null &&
    "name" in value &&
    "age" in value
  ) {
    return new Person(value.name, value.age, value.address);
  }
  return value;
}

const personInstance = JSON.parse(jsonString, revivePerson);
//console.log(personInstance);
// Output:
// Person {
//   name: 'John',
//   age: 30,
//   address: Address { city: 'New York', street: '123 Main St' }
// }

personInstance.greet(); // Output: Hello, my name is John and I am 30 years old.
