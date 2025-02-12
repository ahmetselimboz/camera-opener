const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");

document.addEventListener("copy", async (event) => {
  event.preventDefault();
  const copiedText = "Bu metin kopyalanamaz!";
  event.clipboardData.setData("text/plain", copiedText);
  popup.classList.remove("hidden");
});

closePopup.addEventListener("click", async () => {
  popup.classList.add("hidden");
  
});
