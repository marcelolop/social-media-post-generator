"use strict";

/*
!------------------------------------------
!              IMPORTS
!------------------------------------------*/

import { onEvent, getElement, select, selectAll } from "./utils/general.js";
// importing the subscriber user created in the classes folder
import { Subscriber } from "./classes/User.js";


/*
!------------------------------------------
!             USER INFO
!------------------------------------------*/

const user = new Subscriber(
  "4210",
  "John Smith",
  "jsmith",
  "jsmith@example.com",
  ["Codezilla", "Bug Whisperer", "Null Pointer Exceptional", "Infinite Loopers", "404 Found"], 
  ["The Hackers", "The Heisenbugs", "The Git Pushers", "The Runtime Terrors"], 
  true
);

/*
!------------------------------------------
!             DOM ELEMENTS
!------------------------------------------*/

const postForm = select(".post-area form");
const postArea = getElement("post-area");
const imageInput = getElement("image-input");
const fileName = getElement("file-name");
const postButton = select(".post-button");
let selectedFile;

/* 
*------------------------------------------
*              MODAL ELEMENTS
*------------------------------------------*/

const idElement = getElement('id');
const nameElement = getElement('name');
const usernameElement = getElement('username');
const emailElement = getElement('email');
const pagesElement = getElement('pages');
const groupsElement = getElement('groups');
const canMonetizeElement = getElement('can-monetize');
const userIconImg = select('.user-icon-img');
const modal = getElement('modal');
const closeModal = select('.close-modal');

/*
!------------------------------------------
!              MODAL POP-UP
!------------------------------------------*/

const info = user.getInfo();

idElement.textContent = info.id;
nameElement.textContent = info.name;
usernameElement.textContent = info.userName;
emailElement.textContent = info.email;
pagesElement.textContent = info.pages.join(', ');
groupsElement.textContent = info.groups.join(', ');
canMonetizeElement.textContent = info.canMonetize ? 'Yes' : 'No';

onEvent('click', userIconImg, () => {
  modal.style.display = 'block';
});

onEvent('click', closeModal, () => {
  modal.style.display = 'none';
});

onEvent('click', window, (event) => {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
});

/*
!------------------------------------------
!              POST GENERATION
!------------------------------------------*/

//function to change the file name in the label when the user selects a file
function changeFileName() {
  if (imageInput.files.length > 0) {
    fileName.textContent = imageInput.files[0].name;
    selectedFile = imageInput.files[0];
  }
}

onEvent("change", imageInput, changeFileName);

//function to check the post input and create a new post when the form is submitted
function checkAndCreatePost(event) {
  event.preventDefault();

  if (imageInput.value === "" && postArea.value === "") {
    postButton.setAttribute("disabled", true);
  } else {
    postButton.removeAttribute("disabled");

    const postText = postArea.value;
    const postDate = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    // Create a new post element
    const newPost = document.createElement("div");
    newPost.classList.add("post-display");
    newPost.classList.add("container");

    // Add the post header
    const postHeader = document.createElement("div");
    postHeader.classList.add("post-header");

    const userIconName = document.createElement("div");
    userIconName.classList.add("user-icon-name");

    const profilePic = document.createElement("img");
    profilePic.src = "./assets/media/images/user-image.jpg";
    profilePic.alt = "Profile Pic";
    profilePic.classList.add("profile-pic");

    const userName = document.createElement("span");
    userName.classList.add("user-name");
    userName.textContent = user.name;

    userIconName.appendChild(profilePic);
    userIconName.appendChild(userName);

    const userInfo = document.createElement("div");
    userInfo.classList.add("user-info");

    const postDateElement = document.createElement("span");
    postDateElement.classList.add("post-date");
    postDateElement.textContent = postDate;

    userInfo.appendChild(postDateElement);

    postHeader.appendChild(userIconName);
    postHeader.appendChild(userInfo);

    // Add the post content
    const postContent = document.createElement("div");
    postContent.classList.add("post-content");

    const postTextElement = document.createElement("p");
    postTextElement.classList.add("post-text");
    postTextElement.textContent = postText;

    postContent.appendChild(postTextElement);

    // Create a new like button element
const likeButton = document.createElement("button");
likeButton.classList.add("like-button");
likeButton.textContent = "❤";

newPost.appendChild(postHeader);
newPost.appendChild(postContent);

// Add the post image if one was selected
if (selectedFile) {
  const postMediaContainer = document.createElement("div");
  postMediaContainer.classList.add("post-media-container");

  if (selectedFile.type.startsWith("image/")) {
    const postImage = document.createElement("img");
    postImage.src = URL.createObjectURL(selectedFile);
    postImage.alt = "Post Image";
    postImage.classList.add("post-media");

    postMediaContainer.appendChild(postImage);
  } else if (selectedFile.type.startsWith("video/")) {
    const postVideo = document.createElement("video");
    postVideo.src = URL.createObjectURL(selectedFile);
    postVideo.classList.add("post-media");
    postVideo.controls = true;

    postMediaContainer.appendChild(postVideo);
  }

  newPost.appendChild(postMediaContainer);
}

// Add the like button to the new post
newPost.appendChild(likeButton);

// Add the new post to the page
select(".posts-container").appendChild(newPost);

// Reset the form
postForm.reset();
fileName.textContent = "";
selectedFile = null;
  }
}

onEvent("submit", postForm, checkAndCreatePost);

//function to like a post and input the class liked to the like button

document.addEventListener('click', function(event) {
  if (event.target.matches('.like-button')) {
    event.target.classList.toggle('liked');
  }
});

