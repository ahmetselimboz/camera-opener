const openCameraButton = document.getElementById("openCamera");
const cameraPopup = document.getElementById("cameraPopup");
const closeCameraButton = document.getElementById("closeCamera");
const video = document.getElementById("camera");
const captureButton = document.getElementById("capture");
const canvas = document.getElementById("photoCanvas");
const context = canvas.getContext("2d");
const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");
let stream;

// Kamera Açma
// openCameraButton.addEventListener("click", async () => {
//   try {
//     stream = await navigator.mediaDevices.getUserMedia({
//       video: { facingMode: "user" },
//     });
//     video.srcObject = stream;
//     cameraPopup.classList.remove("hidden");
//   } catch (error) {
//     alert("Kameraya erişim izni gerekiyor.");
//   }
// });

// Fotoğraf Çekme
captureButton.addEventListener("click", () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Çekilen fotoğrafı indirme
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = "photo.png";
  link.click();
  window.location.reload();
});

// // Kamera Kapatma
// closeCameraButton.addEventListener("click", () => {
//   cameraPopup.classList.add("hidden");
//   stream.getTracks().forEach((track) => track.stop());
//   window.location.reload();
// });

document.addEventListener("copy", async (event) => {
  event.preventDefault();

  const copiedText = "Bu metin kopyalanamaz!";
  event.clipboardData.setData("text/plain", copiedText);
  popup.classList.remove("hidden");
});

closePopup.addEventListener("click", async () => {
  popup.classList.add("hidden");
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" },
    });
    video.srcObject = stream;
    cameraPopup.classList.remove("hidden");
  } catch (error) {
    alert("Kameraya erişim izni gerekiyor.");
  }
});

document.addEventListener("keydown", async (event) => {
  if (
    (event.ctrlKey && event.key === "p") ||
    (event.metaKey && event.shiftKey && event.key === "4")
  ) {
    alert(
      `İzinsiz ekran görüntüsü alındığı gözlenmiş olup hareketleriniz takibe alınmıştır. Yasal sürecin başlamaması adına doğru kullanıcı olup olmadığınız teyit edilerek veri merkezlerimize iletilecektir.`
    );
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      video.srcObject = stream;
      cameraPopup.classList.remove("hidden");
    } catch (error) {
      alert("Kameraya erişim izni gerekiyor.");
    }
  }
});
