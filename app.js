const captureBtn = document.querySelector('#capture-btn');
const preview = document.querySelector('#preview');

captureBtn.addEventListener('click', () => {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            const video = document.createElement('video');
            video.srcObject = stream;
            video.play();
            preview.appendChild(video);
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL();
            // do something with the dataUrl, such as upload it to a server

            
        })
        .catch(err => console.error(err));
});