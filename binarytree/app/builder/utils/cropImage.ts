// utils/cropImage.ts
export default function getCroppedImg(imageSrc: string, pixelCrop: any): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous'; // Needed for CORS if image is external
    image.src = imageSrc;

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const size = 300;
      canvas.width = size;
      canvas.height = size;

      const ctx = canvas.getContext('2d');
      if (!ctx) return reject('Canvas context error');

      // Fill with transparent background (default for PNG)
      ctx.clearRect(0, 0, size, size);

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        size,
        size
      );

      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject('Cropping failed.')),
        'image/png', // preserve transparency
        1.0
      );
    };

    image.onerror = (e) => reject(e);
  });
}
