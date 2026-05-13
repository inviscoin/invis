export async function stripMetadata(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                // Redimensionamento inteligente para performance (Máx 1080p)
                let width = img.width;
                let height = img.height;
                const max = 1080;
                if (width > height && width > max) { height *= max / width; width = max; }
                else if (height > max) { width *= max / height; height = max; }
                
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);
                
                // Exporta como WebP (sem EXIF/GPS)
                canvas.toBlob((blob) => {
                    resolve(new File([blob], file.name, { type: 'image/webp' }));
                }, 'image/webp', 0.8);
            };
        };
    });
}