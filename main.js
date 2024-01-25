let frameCount = 0;

document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const video = document.getElementById('myVideo');
    const playButton = document.getElementById('playButton');

    video.addEventListener('loadedmetadata', function() {
        // Set canvas size to match video's resolution
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        playButton.addEventListener('click', function() {
            video.play();
            playButton.style.display = 'none'; // Hide the button after clicking
        });

        video.addEventListener('play', function() {
            const draw = () => {
                if (!video.paused && !video.ended) {
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    apply90sTVEffect(ctx, canvas.width, canvas.height);
                    requestAnimationFrame(draw);
                }
            };
            draw();
        });
    });
});


function apply90sTVEffect(ctx, width, height) {
    let imageData = ctx.getImageData(0, 0, width, height);
    let data = imageData.data;

    // Apply scan lines
    for (let y = 0; y < height; y += 2) {
        for (let x = 0; x < width; x++) {
            let index = (x + y * width) * 4;
            data[index] *= 0.8;     // Reducing the brightness of every second line
            data[index + 1] *= 0.8; // to create a scanline effect
            data[index + 2] *= 0.8;
        }
    }

    ctx.putImageData(imageData, 0, 0);
}


function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}

function hslToRgb(h, s, l) {
    let r, g, b;

    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [r * 255, g * 255, b * 255];
}


function applyFlicker(ctx, canvas) {
    if (Math.random() > 0.9) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

// Optionally, apply subtle distortions
function applyDistortion(ctx, width, height) {
    let imageData = ctx.getImageData(0, 0, width, height);
    let data = imageData.data;

    // distortion code (e.g., shifting pixels, warping, etc.)
    // This would be more complex and is left as an exercise

    ctx.putImageData(imageData, 0, 0);
}



// document.addEventListener("DOMContentLoaded", function() {
//     const canvas = document.getElementById('myCanvas');
//     const ctx = canvas.getContext('2d');
//     const video = document.getElementById('myVideo');
//     const playButton = document.getElementById('playButton');

//     playButton.addEventListener('click', function() {
//         video.play();
//         playButton.style.display = 'none'; // Hide the button after clicking
//     });

//     video.addEventListener('play', function() {
//         const draw = () => {
//             if (!video.paused && !video.ended) {
//                 applyFlicker(ctx, canvas);
//                 ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
//                 applyEffects(ctx, canvas.width, canvas.height);
//                 requestAnimationFrame(draw);
//             }
//         };
//         draw();
//     });
// });

// function applyEffects(ctx, width, height) {
//     let imageData = ctx.getImageData(0, 0, width, height);
//     let data = imageData.data;

//     for (let i = 0; i < data.length; i += 4) {
//         let brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
//         data[i] = data[i + 1] = data[i + 2] = brightness; // grayscale

//         // Intense noise
//         let noise = (Math.random() - 0.5) * 70;
//         data[i] += noise;
//         data[i + 1] += noise;
//         data[i + 2] += noise;
//     }

//     ctx.putImageData(imageData, 0, 0);
// }

// function applyFlicker(ctx, canvas) {
//     if (Math.random() > 0.9) {
//         ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
//         ctx.fillRect(0, 0, canvas.width, canvas.height);
//     }
// }

// // Optionally, apply subtle distortions
// function applyDistortion(ctx, width, height) {
//     let imageData = ctx.getImageData(0, 0, width, height);
//     let data = imageData.data;

//     // distortion code (e.g., shifting pixels, warping, etc.)
//     // This would be more complex and is left as an exercise

//     ctx.putImageData(imageData, 0, 0);
// }



// document.addEventListener("DOMContentLoaded", function() {
//     const canvas = document.getElementById('myCanvas');
//     const ctx = canvas.getContext('2d');
//     const video = document.getElementById('myVideo');
//     const playButton = document.getElementById('playButton');

//     playButton.addEventListener('click', function() {
//         video.play();
//         playButton.style.display = 'none'; // Hide the button after clicking
//     });

//     video.addEventListener('play', function() {
//         const draw = () => {
//             if (!video.paused && !video.ended) {
//                 ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
//                 applyEffects(ctx, canvas.width, canvas.height);
//                 requestAnimationFrame(draw);
//             }
//         };
//         draw();
//     });
// });

// function applyEffects(ctx, width, height) {
//     let imageData = ctx.getImageData(0, 0, width, height);
//     let data = imageData.data;

//     for (let i = 0; i < data.length; i += 4) {
//         let brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
//         data[i] = brightness; // red
//         data[i + 1] = brightness; // green
//         data[i + 2] = brightness; // blue

//         // Add noise
//         let noise = (0.5 - Math.random()) * 30;
//         data[i] += noise;
//         data[i + 1] += noise;
//         data[i + 2] += noise;
//     }

//     ctx.putImageData(imageData, 0, 0);
// }
