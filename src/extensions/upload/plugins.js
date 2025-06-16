// config/plugins.js
module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'local',
      providerOptions: {},
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
      sizeLimit: 10 * 1024 * 1024, // 10MB
      breakpoints: {
        xlarge: 1920,
        large: 1000, 
        medium: 750,
        small: 500,
        thumbnail: 250
      },
    },
  },
});