# Quick Start Guide

Get started with the Canvas Animation Framework in minutes!

## 1. View the Demo

Simply open `index.html` in your web browser:

```bash
# Option 1: Double-click index.html
# Option 2: Use a local server
python3 -m http.server 8080
# Then open http://localhost:8080 in your browser
```

## 2. Interact with the Animation

- **Move your mouse**: Elements will respond with spring physics
- **Click/tap anywhere**: Create new animated particles
- **Watch**: Elements rotate, float, and connect dynamically

## 3. Customize Your Animation

Edit `app.js` to customize:

```javascript
// Change the number of particles
const count = 20; // Change from 15 to 20

// Add different emojis
const emojis = ['🚀', '⚡', '🎯', '💎'];

// Modify physics
const particle = new Particle(x, y, {
    gravity: 0.5,      // Add gravity
    friction: 0.95,    // Change friction
    maxSpeed: 10       // Increase speed
});
```

## 4. Create Your Own Elements

### Add a Floating Text

```javascript
const text = new Particle(400, 300, {
    type: 'text',
    text: 'HELLO',
    size: 60,
    color: '#ff6b6b'
});
framework.add(text);
```

### Add a Shape

```javascript
const shape = new Particle(200, 200, {
    type: 'star',      // circle, square, triangle, star
    size: 40,
    color: '#4ecdc4',
    rotationSpeed: 0.05
});
framework.add(shape);
```

### Connect Particles

```javascript
const particles = [particle1, particle2, particle3];
const connection = new Connection(particles, {
    maxDistance: 200
});
framework.add(connection);
```

## 5. Customize Appearance

Edit `styles.css`:

```css
/* Change background color */
body {
    background: #1a1a2e; /* Dark blue */
}

/* Change text gradient */
.info h1 {
    background: linear-gradient(45deg, #your, #colors);
}
```

## 6. Learn More

- See `FRAMEWORK.md` for complete API documentation
- See `EXAMPLES.md` for 10+ example implementations
- See `README.md` for project overview

## Common Customizations

### Make Elements Bigger
```javascript
size: 50  // Increase from default 20-30
```

### Make More Responsive to Mouse
```javascript
springStrength: 0.02  // Increase from default 0.01
```

### Add More Elements
```javascript
for (let i = 0; i < 50; i++) {  // Increase count
    // Create particles
}
```

### Change Colors
```javascript
color: '#your-hex-color'
// Or use the random color generator
```

### Adjust Speed
```javascript
friction: 0.95,  // Lower = faster slowdown
maxSpeed: 10     // Higher = faster particles
```

## Troubleshooting

**Problem**: Animations are slow
- **Solution**: Reduce particle count or connection distance

**Problem**: Elements don't respond to mouse
- **Solution**: Increase `springStrength` value

**Problem**: Elements move too fast
- **Solution**: Increase `friction` (closer to 1.0)

**Problem**: Page is blank
- **Solution**: Check browser console for errors, ensure all files are loaded

## Next Steps

1. Experiment with different particle types
2. Try the examples in `EXAMPLES.md`
3. Combine multiple effects
4. Create your own custom animations
5. Share your creations!

## Support

For questions or issues, check:
- `FRAMEWORK.md` - Complete API reference
- `EXAMPLES.md` - Working examples
- Browser console - Error messages

Happy animating! 🎨✨
