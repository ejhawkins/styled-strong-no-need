# Canvas Animation Framework

A lightweight, flexible JavaScript framework for creating interactive canvas-based animations with smooth interactions and effects.

## Features

- 🎨 **Multiple Shape Types**: Circles, squares, triangles, stars, and text elements
- 🖱️ **Mouse/Touch Interaction**: Elements respond to cursor movement with spring physics
- ✨ **Particle System**: Create and animate multiple elements with physics
- 🔗 **Connections**: Draw dynamic lines between particles
- 📱 **Responsive**: Works on desktop and mobile devices
- ⚡ **Performance**: Optimized for smooth 60fps animations
- 🎯 **Easy to Use**: Simple API for creating custom animations

## Usage

### Basic Setup

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <canvas id="canvas"></canvas>
    <script src="animation-framework.js"></script>
    <script src="app.js"></script>
</body>
</html>
```

### Initialize the Framework

```javascript
const framework = new CanvasAnimationFramework('canvas', {
    backgroundColor: '#0a0a0a'
});
```

### Create Particles

```javascript
const particle = new Particle(x, y, {
    type: 'circle',        // 'circle', 'square', 'triangle', 'star', 'text'
    size: 30,              // Size of the particle
    color: '#ff6b6b',      // Color
    vx: 2,                 // Velocity X
    vy: 2,                 // Velocity Y
    friction: 0.98,        // Friction (0-1)
    gravity: 0,            // Gravity force
    rotation: 0,           // Initial rotation
    rotationSpeed: 0.05,   // Rotation speed
    springStrength: 0.01,  // Mouse interaction strength
    maxSpeed: 5            // Maximum velocity
});

framework.add(particle);
```

### Create Text Elements

```javascript
const textParticle = new Particle(x, y, {
    type: 'text',
    text: '✨',            // Text or emoji
    size: 40,
    color: '#4ecdc4'
});

framework.add(textParticle);
```

### Add Connections

```javascript
const particles = [particle1, particle2, particle3];
const connection = new Connection(particles, {
    maxDistance: 200,      // Maximum distance to draw lines
    lineWidth: 1
});

framework.add(connection);
```

## API Reference

### CanvasAnimationFramework

The main class for managing canvas animations.

#### Constructor

```javascript
new CanvasAnimationFramework(canvasId, options)
```

**Parameters:**
- `canvasId` (string): ID of the canvas element
- `options` (object): Configuration options
  - `backgroundColor` (string): Background color (default: '#0a0a0a')
  - `fps` (number): Target frames per second (default: 60)

#### Methods

- `add(element)`: Add an element to the animation
- `remove(element)`: Remove an element from the animation
- `start()`: Start the animation loop
- `stop()`: Stop the animation loop
- `clear()`: Clear the canvas

### Particle

A class for creating animated particles.

#### Constructor

```javascript
new Particle(x, y, options)
```

**Parameters:**
- `x` (number): Initial X position
- `y` (number): Initial Y position
- `options` (object): Configuration options
  - `type` (string): Shape type - 'circle', 'square', 'triangle', 'star', 'text'
  - `size` (number): Size of the particle
  - `color` (string): Color (default: random)
  - `vx` (number): X velocity
  - `vy` (number): Y velocity
  - `friction` (number): Friction coefficient (0-1)
  - `gravity` (number): Gravity force
  - `rotation` (number): Initial rotation
  - `rotationSpeed` (number): Rotation speed
  - `text` (string): Text content (for 'text' type)
  - `springStrength` (number): Mouse interaction strength
  - `maxSpeed` (number): Maximum velocity

### Connection

A class for drawing lines between particles.

#### Constructor

```javascript
new Connection(particles, options)
```

**Parameters:**
- `particles` (array): Array of Particle objects
- `options` (object): Configuration options
  - `maxDistance` (number): Maximum distance to draw connections
  - `color` (string): Line color
  - `lineWidth` (number): Line width

## Interactions

### Mouse Interaction

Particles automatically respond to mouse movement:
- **Close range (< 150px)**: Particles are repelled
- **Medium range (150-300px)**: Subtle attraction
- **Far range (> 300px)**: No interaction

### Click/Tap Interaction

Click or tap on the canvas to create new particles at that location.

## Physics

The framework includes realistic physics:
- **Velocity**: Particles move with velocity
- **Friction**: Velocity decreases over time
- **Gravity**: Optional downward force
- **Bounce**: Particles bounce off canvas edges
- **Spring**: Smooth mouse interaction

## Examples

### Create a Sticker Gallery

```javascript
const emojis = ['🎨', '✨', '🌟', '💫'];

emojis.forEach((emoji, i) => {
    const particle = new Particle(
        (i + 1) * 100,
        100,
        {
            type: 'text',
            text: emoji,
            size: 50,
            rotationSpeed: 0.02
        }
    );
    framework.add(particle);
});
```

### Create Floating Shapes

```javascript
for (let i = 0; i < 20; i++) {
    const particle = new Particle(
        Math.random() * width,
        Math.random() * height,
        {
            type: ['circle', 'square', 'triangle'][i % 3],
            size: 20 + Math.random() * 30,
            springStrength: 0.01
        }
    );
    framework.add(particle);
}
```

## Customization

### Custom Colors

```javascript
const particle = new Particle(x, y, {
    color: '#ff6b6b'  // Red
});
```

### Custom Physics

```javascript
const particle = new Particle(x, y, {
    gravity: 0.5,        // Add gravity
    friction: 0.99,      // Less friction
    maxSpeed: 10         // Higher max speed
});
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Tips

1. Limit the number of particles (recommended: < 50)
2. Reduce connection maxDistance for better performance
3. Use simpler shapes (circle, square) for more particles
4. Adjust friction to reduce unnecessary calculations

## License

MIT License - Feel free to use in your projects!

## Credits

Created as a flexible framework for interactive canvas animations, inspired by modern web design and particle systems.
