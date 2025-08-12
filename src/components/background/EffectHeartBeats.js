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
        // 设置60%透明度基础上再应用粒子年龄透明度
        context.globalAlpha = (1 - this.age / this.settings.particles.duration) * 0.6;
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

export default class EffectHeartBeats {
    constructor(canvas, params = {}) {
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        this.width = params.width || 180;
        this.height = params.height || 130;
        
        // 使用动态主题色替代硬编码颜色
        this.color = params.color || this.getThemeColor();
        
        this.settings = {
            particles: {
                length: params.particles?.length || 500, // maximum amount of particles
                duration: params.particles?.duration || 2, // particle duration in sec
                velocity: params.particles?.velocity || 100, // particle velocity in pixels/sec
                effect: params.particles?.effect || -0.75, // play with this for a nice effect
                size: params.particles?.size || 30, // particle size in pixels
            },
        };
        this.particles = new ParticlePool(this.settings);
        this.particleRate = this.settings.particles.length / this.settings.particles.duration;
        this.time = null;
        this.animationFrameId = null;

        // Resize event handling
        this.boundOnResize = this.onResize.bind(this);
        window.addEventListener("resize", this.boundOnResize);

        this.initializeCanvas();
        this.image = this.createHeartImage();
    }

    /**
     * 从CSS变量获取主题色
     */
    getThemeColor() {
        const computedStyle = getComputedStyle(document.documentElement);
        const primaryColor = computedStyle.getPropertyValue('--theme-primary').trim();
        return primaryColor || "#10B981"; // 默认使用绿色主题
    }

    /**
     * 更新主题色
     */
    updateThemeColors() {
        this.color = this.getThemeColor();
        // 重新创建心形图像以应用新颜色
        this.image = this.createHeartImage();
    }

    initializeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context.fillStyle = "#000000";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    createHeartImage() {
        const canvasInner = document.createElement("canvas");
        const contextInner = canvasInner.getContext("2d");
        canvasInner.width = this.settings.particles.size;
        canvasInner.height = this.settings.particles.size;

        const to = (t) => {
            const point = this.pointOnHeart(t);
            point.x = this.settings.particles.size / 2 + point.x * this.settings.particles.size / this.width;
            point.y = this.settings.particles.size / 2 - point.y * this.settings.particles.size / this.height;
            return point;
        };

        contextInner.beginPath();
        let t = -Math.PI;
        let point = to(t);
        contextInner.moveTo(point.x, point.y);
        while (t < Math.PI) {
            t += 0.01;
            point = to(t);
            contextInner.lineTo(point.x, point.y);
        }
        contextInner.closePath();

        contextInner.fillStyle = this.color;
        contextInner.fill();

        const image = new Image();
        image.src = canvasInner.toDataURL();
        return image;
    }

    pointOnHeart(t) {
        return new Point(
            this.width * Math.pow(Math.sin(t), 3),
            this.height * Math.cos(t) -
            50 * Math.cos(2 * t) -
            20 * Math.cos(3 * t) -
            10 * Math.cos(4 * t) +
            25
        );
    }

    start() {
        this.render();
    }

    onResize() {
        this.initializeCanvas();
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
        this.context.fillStyle = "black";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);


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
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
        if (this.canvas) {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        window.removeEventListener("resize", this.boundOnResize);
    }
}
