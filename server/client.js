const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureBtn = document.getElementById('capture-btn');
const ctx = canvas.getContext('2d');

// Get user's camera stream
// Check if device is mobile
function isMobileDevice() {
  return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

// Set facing mode based on device type
var constraints = {
  audio: false,
  video: {
    facingMode: (isMobileDevice() ? { exact: "environment" } : "user"),
    width: { ideal: 640 },
    height: { ideal: 480 }
  }
};

// Get video stream
navigator.mediaDevices.getUserMedia(constraints)
  .then(function(stream) {
    var video = document.querySelector('#video');
    video.srcObject = stream;
    video.play();
  })
  .catch(function(err) {
    console.log(err);
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
  fetch('https://0e8e-2600-6c65-737f-da5c-9569-ac6d-4294-da88.ngrok-free.app/sendemail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ dataURL })
  })
  .then(response => {
    if (response.ok) {
      console.log('Email sent successfully');
      window.location.href = 'success.html';
    } else {
      console.error('Error sending email');
    }
  })
  .catch(error => {
    console.error('Error sending email', error);
  });
});







