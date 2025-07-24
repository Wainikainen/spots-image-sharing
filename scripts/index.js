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


const openModal = modal => modal.classList.add("modal_is-opened");
const closeModal = modal => modal.classList.remove("modal_is-opened");

profileEditButton.addEventListener("click",() => {
  openModal(editProfileModal);
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
});

profilePostButton.addEventListener("click",() => openModal(newPostModal));

profileExitButton.addEventListener("click",() => closeModal(editProfileModal));

postExitButton.addEventListener("click",() => closeModal(newPostModal));

const handleProfileFormSubmit = evt => {
  evt.preventDefault();
 profileNameEl.textContent = editProfileNameInput.value;
 profileDescriptionEl.textContent = editProfileDescriptionInput.value;
 closeModal(editProfileModal);
};

editProfileFormEl.addEventListener('submit', handleProfileFormSubmit);

const handleNewPostFormSubmit = evt => {
  evt.preventDefault();
  console.log(addLinkInput.value);
  console.log(addCaptionInput.value);
  closeModal(newPostModal);
};

newPostFormEl.addEventListener('submit', handleNewPostFormSubmit);

initialCards.forEach((card) => {
  console.log(card.name);
});