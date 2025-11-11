# Canvas Animation Examples

This file contains various examples of how to use the Canvas Animation Framework to create different effects.

## Example 1: Basic Particle System

```javascript
// Initialize the framework
const framework = new CanvasAnimationFramework('canvas');

// Create a simple particle
const particle = new Particle(400, 300, {
    type: 'circle',
    size: 30,
    color: '#ff6b6b'
});

framework.add(particle);
```

## Example 2: Emoji Stickers

```javascript
const emojis = ['🎨', '✨', '🌟', '💫', '🎭', '🎪'];

emojis.forEach((emoji, i) => {
    const particle = new Particle(
        100 + i * 100,
        200,
        {
            type: 'text',
            text: emoji,
            size: 50,
            rotationSpeed: 0.03,
            springStrength: 0.01
        }
    );
    framework.add(particle);
});
```

## Example 3: Gravity Effect

```javascript
// Create particles that fall with gravity
for (let i = 0; i < 10; i++) {
    const particle = new Particle(
        Math.random() * window.innerWidth,
        0,
        {
            type: 'circle',
            size: 20,
            gravity: 0.3,
            friction: 0.99,
            color: '#4ecdc4'
        }
    );
    framework.add(particle);
}
```

## Example 4: Particle Network

```javascript
const particles = [];

// Create particles
for (let i = 0; i < 20; i++) {
    const particle = new Particle(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight,
        {
            type: 'circle',
            size: 10,
            springStrength: 0.005
        }
    );
    particles.push(particle);
    framework.add(particle);
}

// Connect them
const connection = new Connection(particles, {
    maxDistance: 200
});
framework.add(connection);
```

## Example 5: Text Banner

```javascript
const words = ['CREATIVE', 'DESIGN', 'STUDIO'];

words.forEach((word, i) => {
    const particle = new Particle(
        window.innerWidth / 2,
        100 + i * 100,
        {
            type: 'text',
            text: word,
            size: 60,
            color: ['#ff6b6b', '#4ecdc4', '#f7b731'][i],
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            rotationSpeed: 0.01,
            springStrength: 0.005
        }
    );
    framework.add(particle);
});
```

## Example 6: Shape Explosion

```javascript
function createExplosion(x, y) {
    const shapes = ['circle', 'square', 'triangle', 'star'];
    
    for (let i = 0; i < 10; i++) {
        const angle = (Math.PI * 2 / 10) * i;
        const speed = 5;
        
        const particle = new Particle(x, y, {
            type: shapes[i % shapes.length],
            size: 15 + Math.random() * 15,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            rotationSpeed: (Math.random() - 0.5) * 0.2,
            friction: 0.98
        });
        
        framework.add(particle);
    }
}

// Create explosion on click
canvas.addEventListener('click', (e) => {
    createExplosion(e.clientX, e.clientY);
});
```

## Example 7: Orbit Effect

```javascript
const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2;
const particles = [];

for (let i = 0; i < 8; i++) {
    const angle = (Math.PI * 2 / 8) * i;
    const radius = 150;
    
    const particle = new Particle(
        centerX + Math.cos(angle) * radius,
        centerY + Math.sin(angle) * radius,
        {
            type: 'star',
            size: 25,
            color: '#feca57',
            rotationSpeed: 0.05
        }
    );
    
    // Custom update for orbit
    const originalUpdate = particle.update.bind(particle);
    let orbitAngle = angle;
    
    particle.update = function(mouse) {
        orbitAngle += 0.02;
        this.x = centerX + Math.cos(orbitAngle) * radius;
        this.y = centerY + Math.sin(orbitAngle) * radius;
        this.rotation += this.rotationSpeed;
    };
    
    framework.add(particle);
}
```

## Example 8: Responsive Grid

```javascript
function createGrid() {
    const cols = 5;
    const rows = 3;
    const spacing = 100;
    
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const particle = new Particle(
                100 + i * spacing,
                100 + j * spacing,
                {
                    type: ['circle', 'square', 'triangle', 'star'][Math.floor(Math.random() * 4)],
                    size: 30,
                    springStrength: 0.02,
                    rotationSpeed: (Math.random() - 0.5) * 0.1
                }
            );
            framework.add(particle);
        }
    }
}

createGrid();
```

## Example 9: Custom Colors

```javascript
const gradientColors = [
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#f7b731',
    '#5f27cd', '#00d2d3', '#ff9ff3', '#feca57'
];

gradientColors.forEach((color, i) => {
    const particle = new Particle(
        (i + 1) * 150,
        300,
        {
            type: 'circle',
            size: 40,
            color: color,
            rotationSpeed: 0.02
        }
    );
    framework.add(particle);
});
```

## Example 10: Interactive Trail

```javascript
let lastX = 0;
let lastY = 0;

canvas.addEventListener('mousemove', (e) => {
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > 20) {
        const particle = new Particle(e.clientX, e.clientY, {
            type: 'circle',
            size: 5,
            color: '#4ecdc4',
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            friction: 0.95
        });
        
        framework.add(particle);
        
        // Remove after 2 seconds
        setTimeout(() => {
            framework.remove(particle);
        }, 2000);
        
        lastX = e.clientX;
        lastY = e.clientY;
    }
});
```

## Tips

1. **Performance**: Keep particle count under 50 for smooth animations
2. **Interaction**: Lower springStrength for subtle effects (0.001-0.01)
3. **Physics**: Use friction 0.95-0.99 for realistic movement
4. **Visual**: Combine different shapes and colors for variety
5. **Responsive**: Handle window resize to reposition particles

## Customization Ideas

- Create particle systems that react to music
- Add different blend modes for visual effects
- Implement particle trails
- Create shape morphing animations
- Add keyboard controls
- Implement collision detection between particles
- Create particle emitters
- Add custom particle shapes with paths
