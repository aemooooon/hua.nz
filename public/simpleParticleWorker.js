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
                x0: x,
                y0: y,
                x1: width / 2,
                y1: height / 2,
                color: `rgb(${imageData.data[y * 4 * width + x * 4]}, ${
                    imageData.data[y * 4 * width + x * 4 + 1]
                }, ${imageData.data[y * 4 * width + x * 4 + 2]})`,
                speed: Math.random() * 4 + 2,
            };
            particles.push(particle);
        }
    }

    self.postMessage(particles);
};
