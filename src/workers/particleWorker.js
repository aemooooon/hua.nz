self.onmessage = (event) => {
    const { imageBitmap, width, height } = event.data;

    const offscreenCanvas = new OffscreenCanvas(width, height);
    const ctx = offscreenCanvas.getContext("2d");

    ctx.drawImage(imageBitmap, 0, 0);

    const imageData = ctx.getImageData(0, 0, width, height);
    const particles = [];

    for (let y = 0; y < height; y += 4) {
        for (let x = 0; x < width; x += 4) {
            const particle = {
                x0: x,  // 目标位置（最终位置）
                y0: y,  // 目标位置（最终位置）
                x1: width / 2,  // 初始位置（从中心开始，但会被重置为12点钟方向）
                y1: -height * 0.3,  // 初始位置（12点钟方向，稍微上方开始）
                color: `rgb(${imageData.data[y * 4 * width + x * 4]}, ${
                    imageData.data[y * 4 * width + x * 4 + 1]
                }, ${imageData.data[y * 4 * width + x * 4 + 2]})`,
                speed: Math.random() * 2 + 1.5,  // 稍微慢一点，动画更优雅
            };
            particles.push(particle);
        }
    }

    self.postMessage(particles);
};