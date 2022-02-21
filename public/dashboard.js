const editBtn = document.querySelector("#editBtn");
const inputs = document.querySelectorAll('input[type="text"]');
const saveBtn = document.querySelector("#saveBtn");
const photoEdit = document.querySelector("#photoEdit");
const photoEditBtn = document.querySelector("#photoEditBtn");
const photo_file = document.querySelector("#photo_file");

editBtn.addEventListener("click", () => {
  inputs.forEach((input) => {
    input.removeAttribute("disabled");
  });

  saveBtn.classList.remove("d-none");
});

photoEdit.addEventListener("click", () => {
  photo_file.removeAttribute("hidden");
  photoEditBtn.classList.remove("d-none");
});
