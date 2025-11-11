/**
 * Main Application
 * Demonstrates the Canvas Animation Framework with interactive stickers and posters
 */

// Initialize the framework
const framework = new CanvasAnimationFramework('canvas', {
    backgroundColor: '#0a0a0a'
});

// Create particles array for connections
const particles = [];

// Create different types of animated elements (stickers/posters)
function createStickers() {
    const types = ['circle', 'square', 'triangle', 'star', 'text'];
    const emojis = ['🎨', '✨', '🌟', '💫', '🎭', '🎪', '🎨', '🖼️'];
    const count = 15;
    
    for (let i = 0; i < count; i++) {
        const x = Math.random() * framework.width;
        const y = Math.random() * framework.height;
        const type = types[Math.floor(Math.random() * types.length)];
        
        let particle;
        if (type === 'text') {
            const emoji = emojis[Math.floor(Math.random() * emojis.length)];
            particle = new Particle(x, y, {
                type: 'text',
                text: emoji,
                size: 30 + Math.random() * 20,
                rotationSpeed: (Math.random() - 0.5) * 0.05,
                springStrength: 0.005
            });
        } else {
            particle = new Particle(x, y, {
                type: type,
                size: 20 + Math.random() * 30,
                rotationSpeed: (Math.random() - 0.5) * 0.08,
                springStrength: 0.008,
                friction: 0.95
            });
        }
        
        particles.push(particle);
        framework.add(particle);
    }
}

// Add connections between particles
const connection = new Connection(particles, {
    maxDistance: 200,
    lineWidth: 1
});

// Create the scene
createStickers();
framework.add(connection);

// Add some floating text elements
const floatingTexts = [
    { text: 'CREATIVE', size: 40, color: '#ff6b6b' },
    { text: 'DESIGN', size: 40, color: '#4ecdc4' },
    { text: 'STUDIO', size: 40, color: '#f7b731' }
];

floatingTexts.forEach((config, index) => {
    const x = (framework.width / 4) * (index + 1);
    const y = framework.height / 4 + (index % 2) * (framework.height / 2);
    
    const textParticle = new Particle(x, y, {
        type: 'text',
        text: config.text,
        size: config.size,
        color: config.color,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        springStrength: 0.003,
        friction: 0.98,
        maxSpeed: 2
    });
    
    framework.add(textParticle);
});

// Add click interaction to create new particles
framework.canvas.addEventListener('click', (e) => {
    const types = ['circle', 'square', 'triangle', 'star'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    const particle = new Particle(e.clientX, e.clientY, {
        type: type,
        size: 15 + Math.random() * 25,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        rotationSpeed: (Math.random() - 0.5) * 0.1,
        springStrength: 0.01
    });
    
    particles.push(particle);
    framework.add(particle);
    
    // Remove old particles if too many
    if (particles.length > 30) {
        const removed = particles.shift();
        framework.remove(removed);
    }
});

// Add touch support for mobile
framework.canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const types = ['circle', 'square', 'triangle', 'star'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    const particle = new Particle(touch.clientX, touch.clientY, {
        type: type,
        size: 15 + Math.random() * 25,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        rotationSpeed: (Math.random() - 0.5) * 0.1,
        springStrength: 0.01
    });
    
    particles.push(particle);
    framework.add(particle);
    
    if (particles.length > 30) {
        const removed = particles.shift();
        framework.remove(removed);
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    // Reposition particles proportionally
    particles.forEach(particle => {
        particle.x = (particle.x / framework.canvas.width) * window.innerWidth;
        particle.y = (particle.y / framework.canvas.height) * window.innerHeight;
    });
});

console.log('Canvas Animation Framework initialized!');
console.log('Click or tap to create new animated elements');
