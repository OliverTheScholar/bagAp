const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureBtn = document.getElementById('capture-btn');
const ctx = canvas.getContext('2d');

// Get user's camera stream
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(error => {
    console.error(`Error accessing camera: ${error}`);
  });

// Draw video stream on canvas
function drawVideo() {
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  requestAnimationFrame(drawVideo);
}
drawVideo();

// Capture photo and send email
captureBtn.addEventListener('click', () => {
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  const dataURL = canvas.toDataURL('image/jpeg');
  console.log(`Captured photo: ${dataURL}`);
  
  // Send the captured photo to the server
  fetch('/sendemail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ dataURL })
  })
  .then(response => {
    if (response.ok) {
      console.log('Email sent successfully');
    } else {
      console.error('Error sending email');
    }
  })
  .catch(error => {
    console.error('Error sending email', error);
  });
});







