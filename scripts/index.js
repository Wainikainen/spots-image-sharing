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

const editProfilemodal = document.querySelector("#edit-profile-modal");
const newPostModal = document.querySelector("#new-post-modal");

const profileExitButton = editProfilemodal.querySelector(".modal__exit");
const postExitButton = newPostModal.querySelector(".modal__exit");

profileEditButton.addEventListener("click",function(){
  editProfilemodal.classList.add("modal_is-opened");
});
profilePostButton.addEventListener("click", function(){
newPostModal.classList.add("modal_is-opened");
});

profileExitButton.addEventListener("click", function(){
  editProfilemodal.classList.remove("modal_is-opened");
});
postExitButton.addEventListener("click", function(){
newPostModal.classList.remove("modal_is-opened");
});

initialCards.forEach((card) => {
  console.log(card.name);
});