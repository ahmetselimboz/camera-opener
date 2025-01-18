const openCameraButton = document.getElementById("openCamera");
const cameraPopup = document.getElementById("cameraPopup");
const closeCameraButton = document.getElementById("closeCamera");
const video = document.getElementById("camera");
const captureButton = document.getElementById("capture");
let stream;

// Kamera Açma
openCameraButton.addEventListener("click", async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: "environment", // Arka kamera (ön kamera için "user" yazılabilir)
            width: { ideal: 1280 }, // Tercih edilen genişlik
            height: { ideal: 720 } // Tercih edilen yükseklik
        }
    });
    video.srcObject = stream;
    cameraPopup.classList.remove("hidden");
  } catch (error) {
    alert("Kameraya erişim izni gerekiyor.");
  }
});

// Fotoğraf Çekme
captureButton.addEventListener("click", () => {
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const context = canvas.getContext("2d");
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Çekilen fotoğrafı indirme
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = "photo.png";
  link.click();
});

// Kamera Kapatma
closeCameraButton.addEventListener("click", () => {
  cameraPopup.classList.add("hidden");
  stream.getTracks().forEach((track) => track.stop());
});

document.addEventListener("copy", async (event) => {
  const copiedText = document.getSelection().toString(); // Kopyalanan metni alır

  if (
    confirm(`İzinsiz kopyalama yapıldığı gözlenmiş olup hareketleriniz takibe alınmıştır. Yasal sürecin başlamaması adına doğru kullanıcı olup olmadığınız teyit edilerek veri merkezlerimize iletilecektir.`)
  ) {
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "environment", // Arka kamera (ön kamera için "user" yazılabilir)
                width: { ideal: 1280 }, // Tercih edilen genişlik
                height: { ideal: 720 } // Tercih edilen yükseklik
            }
        });
      video.srcObject = stream;
      cameraPopup.classList.remove("hidden");
    } catch (error) {
      alert("Kameraya erişim izni gerekiyor.");
    }
  }

  console.log(`Kopyalanan metin: "${copiedText}"`);
});
