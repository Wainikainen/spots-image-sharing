const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg"
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg"
  },
  {
    name: "An outdoor cafe",
    link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg"
  },
  {
    name:"A very long bridge, over the forest and through the trees",
    link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg"
  },
  {
    name:"Tunnel with morning light",
    link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg"
  },
  {
    name:"Mountain house",
    link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg"
  },
];

const profileEditButton = document.querySelector(".profile__edit-button");

const profilePostButton = document.querySelector(".profile__post-button");

const editProfileModal = document.querySelector("#edit-profile-modal");

const newPostModal = document.querySelector("#new-post-modal");

const profileExitButton = editProfileModal.querySelector(".modal__exit");

const postExitButton = newPostModal.querySelector(".modal__exit");

const editProfileFormEl = editProfileModal.querySelector(".modal__form");

const editProfileNameInput = editProfileModal.querySelector("#profile-name-input");

const editProfileDescriptionInput = editProfileModal.querySelector("#profile-description-input");

const  profileNameEl = document.querySelector(".profile__name");

const  profileDescriptionEl = document.querySelector(".profile__description");

const newPostFormEl = newPostModal.querySelector(".modal__form");

const addLinkInput = newPostModal.querySelector("#image-link-input");

const addCaptionInput = newPostModal.querySelector("#caption-link-input");

profileEditButton.addEventListener("click",function(){
  editProfileModal.classList.add("modal_is-opened");
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
});

profilePostButton.addEventListener("click", function(){
newPostModal.classList.add("modal_is-opened");
});

profileExitButton.addEventListener("click", function(){
  editProfileModal.classList.remove("modal_is-opened");
});

postExitButton.addEventListener("click", function(){
newPostModal.classList.remove("modal_is-opened");
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
 profileNameEl.textContent = editProfileNameInput.value;
 profileDescriptionEl.textContent = editProfileDescriptionInput.value;
 editProfileModal.classList.remove("modal_is-opened");
}

editProfileFormEl.addEventListener('submit', handleProfileFormSubmit);

function handleNewPostFormSubmit(evt) {
  evt.preventDefault();
  console.log(addLinkInput);
  console.log(addCaptionInput);
  newPostModal.classList.remove("modal_is-opened");
}

newPostFormEl.addEventListener('submit', handleNewPostFormSubmit);

initialCards.forEach((card) => {
  console.log(card.name);
});