document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('neural-network-bg');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];
    const numParticles = 50; // Reduced for better performance and visibility
    const connectionDistance = 150; // Increased to create more connections

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
            ctx.fillStyle = 'rgba(0, 243, 255, 0.5)'; // More visible particles
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
    }

    function init() {
        particles.length = 0;
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }
    }

    function connectParticles() {
        let connectionsDrawn = 0;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    const opacity = 1 - (distance / connectionDistance);
                    ctx.strokeStyle = `rgba(157, 0, 255, ${opacity * 0.5})`; // More visible lines
                    ctx.lineWidth = 0.6;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                    connectionsDrawn++;
                }
            }
        }
        // Debugging information
        console.log(`Connections drawn: ${connectionsDrawn}`);
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        connectParticles();
        requestAnimationFrame(animate);
    }

    init();
    animate();

    // Debugging information
    console.log(`Canvas dimensions: ${canvas.width}x${canvas.height}`);
    console.log(`Number of particles: ${particles.length}`);

    // Card animation logic
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Toggle the 'expanded' class to expand or collapse the card
            card.classList.toggle('expanded');

            // Adjust height dynamically for expanded state
            if (card.classList.contains('expanded')) {
                card.style.height = `${card.scrollHeight}px`; // Adjust to fit content
            } else {
                card.style.height = '85px'; // Reset to initial height
            }

            // Close other cards when one is expanded
            cards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('expanded');
                    otherCard.style.height = '85px'; // Reset height of other cards
                }
            });
        });
    });
});

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('expanded');
    });
});
