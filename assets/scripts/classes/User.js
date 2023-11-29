"use strict";

/*
* Create a web page with the following components: a header with 3 elements (see example),
* a form with a textarea, an input to upload image files and a ‘Post’ button, a section to display 
* the posts, and a pop-up modal to display user account info.
* Users can post text messages, photos, or both.
* Posts display a ‘header’ with profile pic, user’s full name, and date (check popular social 
* networks for examples).
* Implement two classes: User (the base/parent class) and Subscriber (the derived/child class).
* User contains 4 properties: id, name, userName, and email.
* Subscriber contains 3 properties: pages, groups, and canMonetize.
* Both classes have private properties, constructor, and getters.
* User and Subscriber contain a method called getInfo(), which will return information about 
*the user account. The Subscriber class uses the base class method as part of its own 
* implementation.
* Use ES modules and a server, so your classes and utility functions can be placed in separated 
* files.
* Create a new Subscriber, providing data for all properties (groups and pages are arrays, 
* canMonetize is a Boolean). You can enter the data manually.
* The data to populate the pop-up modal comes from the getInfo() method.
* Add a README file to your repository on GitHub with a link to your application (the web page).
• Responsive design is optional

*/

class User {
  #id = "";
  #name = "";
  #userName = "";
  #email = "";

  constructor(id, name, userName, email) {
    this.#id = id;
    this.#name = name;
    this.#userName = userName;
    this.#email = email;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get userName() {
    return this.#userName;
  }

  get email() {
    return this.#email;
  }

  set id(id) {
    if (typeof id !== "string") {
      throw new TypeError("id must be a string");
    } else {
      this.#id = id;
    }
  }

  set name(name) {
    if (typeof name !== "string") {
      throw new TypeError("name must be a string");
    } else {
      this.#name = name;
    }
  }

  set userName(userName) {
    if (typeof userName !== "string") {
      throw new TypeError("userName must be a string");
    } else {
      this.#userName = userName;
    }
  }

  set email(email) {
    if (typeof email !== "string") {
      throw new TypeError("email must be a string");
    } else {
      this.#email = email;
    }
  }

  getInfo() {
    return {
      id: this.#id,
      name: this.#name,
      userName: this.#userName,
      email: this.#email,
    };
  }
}

class Subscriber extends User {
  #pages = [];
  #groups = [];
  #canMonetize = false;

  constructor(id, name, userName, email, pages, groups, canMonetize) {
    super(id, name, userName, email);
    this.#pages = pages;
    this.#groups = groups;
    this.#canMonetize = canMonetize;
  }

  get pages() {
    return this.#pages;
  }

  get groups() {
    return this.#groups;
  }

  get canMonetize() {
    return this.#canMonetize;
  }

  set pages(pages) {
    if (!Array.isArray(pages)) {
      throw new TypeError("pages must be an array");
    } else {
      this.#pages = pages;
    }
  }

  set groups(groups) {
    if (!Array.isArray(groups)) {
      throw new TypeError("groups must be an array");
    } else {
      this.#groups = groups;
    }
  }

  set canMonetize(canMonetize) {
    if (typeof canMonetize !== "boolean") {
      throw new TypeError("canMonetize must be a boolean");
    } else {
      this.#canMonetize = canMonetize;
    }
  }

  getInfo() {
    return {
      id: this.id,
      name: this.name,
      userName: this.userName,
      email: this.email,
      pages: this.#pages,
      groups: this.#groups,
      canMonetize: this.#canMonetize,
    };
  }
}

export default Subscriber;

const user = new Subscriber(
  "4210",
  "John Smith",
  "jsmith",
  "jsmith@example.com",
  ["Codezilla", "Bug Whisperer", "Null Pointer Exceptional", "Infinite Loopers", "404 Found"], // páginas que o usuário segue
  ["The Semicolonoscopy", "The Heisenbugs", "The Git Pushers", "The Runtime Terrors"], // grupos que o usuário participa
  true
);

export { user };
