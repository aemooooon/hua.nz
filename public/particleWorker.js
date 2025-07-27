self.onmessage = (event) => {
    const { imageBitmap, width, height } = event.data;

    const offscreenCanvas = new OffscreenCanvas(width, height);
    const ctx = offscreenCanvas.getContext("2d");

    ctx.drawImage(imageBitmap, 0, 0);

    const imageData = ctx.getImageData(0, 0, width, height);
    const particles = [];
    
    // 大幅减少粒子密度以提升性能 (从4改为8)
    const step = 8; // 增加步长减少粒子数量
    let particleCount = 0;
    const maxParticles = 1500; // 限制最大粒子数量

    for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
            if (particleCount >= maxParticles) break; // 限制粒子数量
            
            const particle = {
                x0: x,
                y0: y,
                x1: width / 2,
                y1: height / 2,
                color: `rgb(${imageData.data[y * step * width + x * 4]}, ${
                    imageData.data[y * step * width + x * 4 + 1]
                }, ${imageData.data[y * step * width + x * 4 + 2]})`,
                speed: Math.random() * 3 + 1.5, // 减少动画时间
            };
            particles.push(particle);
            particleCount++;
        }
        if (particleCount >= maxParticles) break;
    }

    self.postMessage(particles);
};