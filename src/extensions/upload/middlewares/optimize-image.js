// src/extensions/upload/middlewares/optimize-image.js
const sharp = require('sharp');

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    await next();
    
    if (ctx.request.files && ctx.response.status === 200) {
      const { files } = ctx.request;
      
      for (const fileKey in files) {
        const file = files[fileKey];
        
        // Only process images
        if (!file.type.includes('image')) continue;
        
        try {
          // Get buffer from file
          const buffer = await sharp(file.path)
            .resize({
              width: 1920,
              height: 1080,
              fit: 'inside',
              withoutEnlargement: true
            })
            .toFormat('webp', { 
              quality: 80,
              effort: 6
            })
            .toBuffer();
            
          // Replace file buffer with optimized one
          await require('fs').promises.writeFile(file.path, buffer);
          
          // Update file details
          file.size = buffer.length;
          file.type = 'image/webp';
          
          // Update filename if it's not already webp
          if (!file.name.endsWith('.webp')) {
            const nameParts = file.name.split('.');
            nameParts.pop(); // Remove extension
            file.name = `${nameParts.join('.')}.webp`;
          }
        } catch (e) {
          strapi.log.error(`Could not optimize image: ${e.message}`);
        }
      }
    }
  };
};