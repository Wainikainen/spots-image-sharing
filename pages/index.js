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
