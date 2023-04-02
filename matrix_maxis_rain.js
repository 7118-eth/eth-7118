// Matrix Digital Rain with PNG Images
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
const imageCount = 25;
const fontSize = 20;
const columns = canvas.width / fontSize;

let drops = [];
let images = [];

for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

function loadImage(index) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = `images/${index}.png`;
        img.width = fontSize;
        img.height = fontSize;
        img.onload = () => resolve(img);
        img.onerror = (error) => reject(error);
    });
}

async function loadImages() {
    for (let i = 1; i <= imageCount; i++) {
        try {
            const image = await loadImage(i);
            images.push(image);
        } catch (error) {
            console.error(`Error loading image ${i}:`, error);
        }
    }
}

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < drops.length; i++) {
        const img = images[Math.floor(Math.random() * images.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.drawImage(img, x, y, fontSize, fontSize);
        if (y >= canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

loadImages().then(() => {
    setInterval(draw, 25);
});
