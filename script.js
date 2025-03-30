const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const music = document.getElementById("music");

let angle = 0;
let isPlaying = false;
let rotationSpeed = 0.02;
let notes = [];
let record = {};

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    record = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: Math.min(canvas.width, canvas.height) * 0.25
    };
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function drawRecord() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.save();
    ctx.translate(record.x, record.y);
    ctx.rotate(angle);
    
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(0, 0, record.radius, 0, Math.PI * 2);
    ctx.fill();

    let lightX = Math.cos(angle * 2) * record.radius * 0.6;
    let lightY = Math.sin(angle * 2) * record.radius * 0.6;
    let lightGradient = ctx.createRadialGradient(lightX, lightY, 10, lightX, lightY, record.radius);
    lightGradient.addColorStop(0, "rgba(255, 255, 255, 0.3)");
    lightGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    
    ctx.fillStyle = lightGradient;
    ctx.beginPath();
    ctx.arc(0, 0, record.radius, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.strokeStyle = "rgba(200, 200, 200, 0.3)";
    ctx.lineWidth = 1;
    for (let i = 0.6; i < 1; i += 0.1) {
        ctx.beginPath();
        ctx.arc(0, 0, record.radius * i, 0, Math.PI * 2);
        ctx.stroke();
    }
    
    ctx.fillStyle = "#68AEB8";
    ctx.beginPath();
    ctx.arc(0, 0, record.radius * 0.4, 0, Math.PI * 2);
    ctx.fill();
    
    let gradient = ctx.createRadialGradient(0, 0, 1, 0, 0, record.radius * 0.05);
    gradient.addColorStop(0, "#EAE7DB");
    gradient.addColorStop(1, "lightgray");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, record.radius * 0.05, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    ctx.font = `bold ${record.radius * 0.13}px Poppins`;
    ctx.fillText("BLUE", 0, -record.radius * 0.15);
    ctx.font = `${record.radius * 0.05}px Poppins`;
    ctx.fillText("BY YUNG KAI", 0, record.radius * 0.15);
    
    ctx.restore();
    drawNotes();
}

function drawNotes() {
    for (let i = 0; i < notes.length; i++) {
        let note = notes[i];
        ctx.globalAlpha = note.opacity;
        ctx.fillStyle = "black";
        ctx.font = `${record.radius * 0.1}px Arial`;
        ctx.fillText("♪", note.x, note.y);
        ctx.globalAlpha = 1;
        
        note.y -= note.speed;
        note.opacity -= 0.01;
    }
    notes = notes.filter(note => note.opacity > 0);
}

function createNote() {
    if (isPlaying) {
        notes.push({
            x: record.x + (Math.random() * record.radius - record.radius / 2),
            y: record.y - record.radius - 10,
            speed: Math.random() * 2 + 1,
            opacity: 1
        });
    }
}

function animate() {
    if (isPlaying) {
        angle += rotationSpeed;
        if (Math.random() < 0.1) createNote();
    }
    drawRecord();
    requestAnimationFrame(animate);
}

canvas.addEventListener("click", () => {
    isPlaying = !isPlaying;
    if (isPlaying) {
        music.play();
    } else {
        music.pause();
    }
});

animate();
