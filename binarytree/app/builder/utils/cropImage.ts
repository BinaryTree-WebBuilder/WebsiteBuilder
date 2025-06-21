export default function getCroppedImg(
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number },
  outputSize?: { width: number; height: number }
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = imageSrc;

    image.onload = () => {
      const canvas = document.createElement('canvas');

      // If not specified, use cropped area's width/height
      const targetWidth = outputSize?.width || pixelCrop.width;
      const targetHeight = outputSize?.height || pixelCrop.height;

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) return reject('Canvas context error');

      ctx.clearRect(0, 0, targetWidth, targetHeight);

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        targetWidth,
        targetHeight
      );

      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject('Cropping failed.')),
        'image/png',
        1.0
      );
    };

    image.onerror = (e) => reject(e);
  });
}
