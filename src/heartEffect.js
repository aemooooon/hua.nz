export class Point {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    clone() {
        return new Point(this.x, this.y);
    }

    length(length) {
        if (typeof length === 'undefined') {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
        this.normalize();
        this.x *= length;
        this.y *= length;
        return this;
    }

    normalize() {
        const length = this.length();
        this.x /= length;
        this.y /= length;
        return this;
    }
}

export class Particle {
    constructor(settings) {
        this.settings = settings;
        this.position = new Point();
        this.velocity = new Point();
        this.acceleration = new Point();
        this.age = 0;
    }

    initialize(x, y, dx, dy) {
        this.position.x = x;
        this.position.y = y;
        this.velocity.x = dx;
        this.velocity.y = dy;
        this.acceleration.x = dx * this.settings.particles.effect;
        this.acceleration.y = dy * this.settings.particles.effect;
        this.age = 0;
    }

    update(deltaTime) {
        this.position.x += this.velocity.x * deltaTime;
        this.position.y += this.velocity.y * deltaTime;
        this.velocity.x += this.acceleration.x * deltaTime;
        this.velocity.y += this.acceleration.y * deltaTime;
        this.age += deltaTime;
    }

    draw(context, image) {
        function ease(t) {
            return (--t) * t * t + 1;
        }

        const size = image.width * ease(this.age / this.settings.particles.duration);
        context.globalAlpha = 1 - this.age / this.settings.particles.duration;
        context.drawImage(image, this.position.x - size / 2, this.position.y - size / 2, size, size);
    }
}

export class ParticlePool {
    constructor(settings) {
        this.settings = settings;
        this.particles = new Array(settings.particles.length);
        this.firstActive = 0;
        this.firstFree = 0;
        this.duration = settings.particles.duration;

        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i] = new Particle(settings);
        }
    }

    add(x, y, dx, dy) {
        this.particles[this.firstFree].initialize(x, y, dx, dy);

        this.firstFree++;
        if (this.firstFree === this.particles.length) this.firstFree = 0;
        if (this.firstActive === this.firstFree) this.firstActive++;
        if (this.firstActive === this.particles.length) this.firstActive = 0;
    }

    update(deltaTime) {
        let i;

        if (this.firstActive < this.firstFree) {
            for (i = this.firstActive; i < this.firstFree; i++) {
                this.particles[i].update(deltaTime);
            }
        }

        if (this.firstFree < this.firstActive) {
            for (i = this.firstActive; i < this.particles.length; i++) {
                this.particles[i].update(deltaTime);
            }
            for (i = 0; i < this.firstFree; i++) {
                this.particles[i].update(deltaTime);
            }
        }

        while (this.particles[this.firstActive].age >= this.duration && this.firstActive !== this.firstFree) {
            this.firstActive++;
            if (this.firstActive === this.particles.length) this.firstActive = 0;
        }
    }

    draw(context, image) {
        if (this.firstActive < this.firstFree) {
            for (let i = this.firstActive; i < this.firstFree; i++) {
                this.particles[i].draw(context, image);
            }
        }

        if (this.firstFree < this.firstActive) {
            for (let i = this.firstActive; i < this.particles.length; i++) {
                this.particles[i].draw(context, image);
            }
            for (let i = 0; i < this.firstFree; i++) {
                this.particles[i].draw(context, image);
            }
        }
    }
}

export class HeartEffect {
    constructor(width = 180, height = 130, color = '#ea80b0') {
        this.width = width;
        this.height = height;
        this.color = color;
        this.settings = {
            particles: {
                length: 500, // maximum amount of particles
                duration: 2, // particle duration in sec
                velocity: 100, // particle velocity in pixels/sec
                effect: -0.75, // play with this for a nice effect
                size: 30, // particle size in pixels
            },
        };
        this.particles = new ParticlePool(this.settings);
        this.particleRate = this.settings.particles.length / this.settings.particles.duration;
        this.time = null;
        this.canvas = null;
        this.context = null;
        this.animationFrameId = null;
        this.boundOnResize = this.onResize.bind(this);
    }

    createHeartCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'heartCanvas';
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '50%';
        this.canvas.style.left = '50%';
        this.canvas.style.transform = 'translate(-50%, -50%)';
        this.canvas.style.zIndex = '2';
        document.body.appendChild(this.canvas);
        this.context = this.canvas.getContext('2d');

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.image = this.createHeartImage();

        window.addEventListener('resize', this.boundOnResize);
    }

    createHeartImage() {
        const canvas_inner = document.createElement('canvas');
        const context_inner = canvas_inner.getContext('2d');
        canvas_inner.width = this.settings.particles.size;
        canvas_inner.height = this.settings.particles.size;

        const to = (t) => {
            const point = this.pointOnHeart(t);
            point.x = this.settings.particles.size / 2 + point.x * this.settings.particles.size / this.width;
            point.y = this.settings.particles.size / 2 - point.y * this.settings.particles.size / this.height;
            return point;
        };

        context_inner.beginPath();
        let t = -Math.PI;
        let point = to(t);
        context_inner.moveTo(point.x, point.y);
        while (t < Math.PI) {
            t += 0.01;
            point = to(t);
            context_inner.lineTo(point.x, point.y);
        }
        context_inner.closePath();

        context_inner.fillStyle = this.color;
        context_inner.fill();

        const image = new Image();
        image.src = canvas_inner.toDataURL();
        return image;
    }

    start() {
        this.createHeartCanvas();
        this.render();
    }

    onResize() {
        if (this.canvas) {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
    }

    render() {
        if (!this.context) return;
        this.animationFrameId = requestAnimationFrame(this.render.bind(this));

        // Update time
        const newTime = new Date().getTime() / 1000;
        const deltaTime = newTime - (this.time || newTime);
        this.time = newTime;

        // Clear canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Create new particles
        const amount = this.particleRate * deltaTime;
        for (let i = 0; i < amount; i++) {
            const pos = this.pointOnHeart(Math.PI - 2 * Math.PI * Math.random());
            const dir = pos.clone().length(this.settings.particles.velocity);
            this.particles.add(this.canvas.width / 2 + pos.x, this.canvas.height / 2 - pos.y, dir.x, -dir.y);
        }

        // Update and draw particles
        this.particles.update(deltaTime);
        this.particles.draw(this.context, this.image);
    }

    stop() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId); // Stop the animation
            this.animationFrameId = null;
        }
        if (this.canvas && document.body.contains(this.canvas)) {
            document.body.removeChild(this.canvas); // Remove the canvas from the document
            this.canvas = null;
            this.context = null;
        }
        window.removeEventListener('resize', this.boundOnResize); // Remove resize listener
    }

    pointOnHeart(t) {
        return new Point(
            this.width * Math.pow(Math.sin(t), 3),
            this.height * Math.cos(t) - 50 * Math.cos(2 * t) - 20 * Math.cos(3 * t) - 10 * Math.cos(4 * t) + 25
        );
    }
}
