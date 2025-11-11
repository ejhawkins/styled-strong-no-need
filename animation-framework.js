/**
 * Canvas Animation Framework
 * A flexible framework for creating canvas-based animations
 */

class CanvasAnimationFramework {
    constructor(canvasId, options = {}) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.elements = [];
        this.mouse = { x: 0, y: 0 };
        this.animationId = null;
        
        // Options
        this.options = {
            backgroundColor: options.backgroundColor || '#0a0a0a',
            fps: options.fps || 60,
            ...options
        };
        
        this.init();
    }
    
    init() {
        this.resize();
        this.setupEventListeners();
        this.start();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }
    
    setupEventListeners() {
        window.addEventListener('resize', () => this.resize());
        
        this.canvas.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            this.mouse.x = touch.clientX;
            this.mouse.y = touch.clientY;
        });
    }
    
    add(element) {
        this.elements.push(element);
        return element;
    }
    
    remove(element) {
        const index = this.elements.indexOf(element);
        if (index > -1) {
            this.elements.splice(index, 1);
        }
    }
    
    clear() {
        this.ctx.fillStyle = this.options.backgroundColor;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
    
    update() {
        this.elements.forEach(element => {
            if (element.update) {
                element.update(this.mouse);
            }
        });
    }
    
    draw() {
        this.elements.forEach(element => {
            if (element.draw) {
                element.draw(this.ctx);
            }
        });
    }
    
    animate() {
        this.clear();
        this.update();
        this.draw();
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    start() {
        if (!this.animationId) {
            this.animate();
        }
    }
    
    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
}

/**
 * Particle class for creating animated elements
 */
class Particle {
    constructor(x, y, options = {}) {
        this.x = x;
        this.y = y;
        this.vx = options.vx || (Math.random() - 0.5) * 2;
        this.vy = options.vy || (Math.random() - 0.5) * 2;
        this.size = options.size || Math.random() * 20 + 10;
        this.color = options.color || this.randomColor();
        this.friction = options.friction || 0.98;
        this.gravity = options.gravity || 0;
        this.rotation = options.rotation || Math.random() * Math.PI * 2;
        this.rotationSpeed = options.rotationSpeed || (Math.random() - 0.5) * 0.1;
        this.type = options.type || 'circle';
        this.text = options.text || '';
        this.springStrength = options.springStrength || 0.01;
        this.maxSpeed = options.maxSpeed || 5;
    }
    
    randomColor() {
        const colors = [
            '#ff6b6b', '#4ecdc4', '#45b7d1', '#f7b731', 
            '#5f27cd', '#00d2d3', '#ff9ff3', '#feca57'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    update(mouse) {
        // Mouse interaction - spring effect
        if (mouse) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                // Repel from mouse
                const force = (150 - distance) / 150;
                this.vx -= (dx / distance) * force * 2;
                this.vy -= (dy / distance) * force * 2;
            } else if (distance < 300) {
                // Attract to mouse (subtle)
                this.vx += dx * this.springStrength;
                this.vy += dy * this.springStrength;
            }
        }
        
        // Apply physics
        this.vy += this.gravity;
        this.vx *= this.friction;
        this.vy *= this.friction;
        
        // Limit speed
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed > this.maxSpeed) {
            this.vx = (this.vx / speed) * this.maxSpeed;
            this.vy = (this.vy / speed) * this.maxSpeed;
        }
        
        // Update position
        this.x += this.vx;
        this.y += this.vy;
        
        // Rotation
        this.rotation += this.rotationSpeed;
        
        // Bounce off edges
        const canvas = document.getElementById('canvas');
        if (this.x < this.size || this.x > canvas.width - this.size) {
            this.vx *= -0.8;
            this.x = Math.max(this.size, Math.min(canvas.width - this.size, this.x));
        }
        if (this.y < this.size || this.y > canvas.height - this.size) {
            this.vy *= -0.8;
            this.y = Math.max(this.size, Math.min(canvas.height - this.size, this.y));
        }
    }
    
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        switch (this.type) {
            case 'circle':
                this.drawCircle(ctx);
                break;
            case 'square':
                this.drawSquare(ctx);
                break;
            case 'triangle':
                this.drawTriangle(ctx);
                break;
            case 'star':
                this.drawStar(ctx);
                break;
            case 'text':
                this.drawText(ctx);
                break;
            default:
                this.drawCircle(ctx);
        }
        
        ctx.restore();
    }
    
    drawCircle(ctx) {
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    
    drawSquare(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size, -this.size, this.size * 2, this.size * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.strokeRect(-this.size, -this.size, this.size * 2, this.size * 2);
    }
    
    drawTriangle(ctx) {
        ctx.beginPath();
        ctx.moveTo(0, -this.size);
        ctx.lineTo(this.size, this.size);
        ctx.lineTo(-this.size, this.size);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    
    drawStar(ctx) {
        const spikes = 5;
        const outerRadius = this.size;
        const innerRadius = this.size / 2;
        
        ctx.beginPath();
        for (let i = 0; i < spikes * 2; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const angle = (Math.PI / spikes) * i;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    
    drawText(ctx) {
        ctx.font = `bold ${this.size}px Arial`;
        ctx.fillStyle = this.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.text, 0, 0);
        
        // Add glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fillText(this.text, 0, 0);
        ctx.shadowBlur = 0;
    }
}

/**
 * Connection class for creating lines between particles
 */
class Connection {
    constructor(particles, options = {}) {
        this.particles = particles;
        this.maxDistance = options.maxDistance || 150;
        this.color = options.color || 'rgba(255, 255, 255, 0.1)';
        this.lineWidth = options.lineWidth || 1;
    }
    
    update() {
        // Connections don't need updates
    }
    
    draw(ctx) {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const p1 = this.particles[i];
                const p2 = this.particles[j];
                
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.maxDistance) {
                    const opacity = 1 - (distance / this.maxDistance);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }
    }
}
