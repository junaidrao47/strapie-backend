// src/extensions/upload/config.js
module.exports = {
  provider: 'local',
  providerOptions: {},
  sizeLimit: 10 * 1024 * 1024, // 10MB in bytes
  breakpoints: {
    xlarge: 1920,
    large: 1000,
    medium: 750,
    small: 500,
    thumbnail: 250,
  },
  formats: {
    jpg: { quality: 80 },
    png: { quality: 80 },
    webp: { quality: 80, lossless: false },
    avif: { quality: 65 }
  },
  responsiveDimensions: true,
};