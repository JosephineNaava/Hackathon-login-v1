// Select The Elements
var toggle_btn;
var big_wrapper;
var nav_menu;

function declare() {
  toggle_btn = document.querySelector(".toggle-btn");
  big_wrapper = document.querySelector(".big-wrapper");
  nav_menu = document.querySelector(".nav-menu");
}

const main = document.querySelector("main");
declare();
// ++++++++++++++++++++++++++++++++++++++++++++++++
// overlay
const modal = document.querySelector(".modal");
const btnCloseModal = document.querySelector(".close-modal");
const overlay = document.querySelector(".overlay");

const btnOpenModal = document.querySelectorAll(".show-modal");
console.log(btnOpenModal);

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  // we do not use the dot when calling class "hidden"
};

for (let i = 0; i < btnOpenModal.length; i++) {
  btnOpenModal[i].addEventListener("click", openModal);
}

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  //in order to figure out which key was pressed we givr the funn a parameter say'e'
  //console.log('A key was pressed');
  console.log(e.key);

  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// let dark = false;

// function toggleAnimation() {
//   // Clone the wrapper
//   dark = !dark;
//   let clone = big_wrapper.cloneNode(true);
//   if (dark) {
//     clone.classList.remove("light");
//     clone.classList.add("dark");
//   } else {
//     clone.classList.remove("dark");
//     clone.classList.add("light");
//   }
//   clone.classList.add("copy");
//   main.appendChild(clone);

//   document.body.classList.add("stop-scrolling");

//   clone.addEventListener("animationend", () => {
//     document.body.classList.remove("stop-scrolling");
//     big_wrapper.remove();
//     clone.classList.remove("copy");
//     // Reset Variables
//     declare();
//     events();
//   });
// }

function events() {
  toggle_btn.addEventListener("click", toggleAnimation);
  nav_menu.addEventListener("click", () => {
    big_wrapper.classList.toggle("active");
  });
}

events();
