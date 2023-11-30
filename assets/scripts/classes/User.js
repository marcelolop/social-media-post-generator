"use strict";

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

export default class Subscriber extends User {
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
    const parentInfo = super.getInfo()
      return {
        ...parentInfo,
        pages: this.#pages,
        groups: this.#groups,
        canMonetize: this.#canMonetize
    };
  }
}


export { Subscriber };
