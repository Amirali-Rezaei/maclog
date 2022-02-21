const photoEdit = document.querySelector("#photoEdit");
const photoEditBtn = document.querySelector("#photoEditBtn");
const photo_file = document.querySelector("#photo_file");

photoEdit.addEventListener("click", () => {
  photo_file.removeAttribute("hidden");
  photoEditBtn.classList.remove("d-none");
});
