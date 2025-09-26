require('dotenv').config({ path: '.env.local' });
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadVideo() {
  try {
    const videoPath = path.join(__dirname, 'public', 'video3.mp4');
    
    // Check if file exists
    if (!fs.existsSync(videoPath)) {
      console.error('Video file not found:', videoPath);
      return;
    }

    console.log('Uploading video3.mp4 to Cloudinary...');
    
    const result = await cloudinary.uploader.upload_large(videoPath, {
      resource_type: 'video',
      public_id: 'video3',
      folder: 'company-videos',
      overwrite: true,
      chunk_size: 6000000, // 6MB chunks
      eager: [
        { streaming_profile: 'full_hd', format: 'm3u8' },
        { quality: 'auto', format: 'mp4' }
      ],
      eager_async: true,
      eager_notification_url: 'https://example.com/notify'
    });

    console.log('Upload successful!');
    console.log('Video URL:', result.secure_url);
    console.log('Video ID:', result.public_id);
    console.log('All results:', JSON.stringify(result, null, 2));

    // Create a .env.local file with the video URL
    const envContent = `NEXT_PUBLIC_VIDEO3_URL="${result.secure_url}"\n`;
    fs.appendFileSync(path.join(__dirname, '.env.local'), envContent);
    
    console.log('Video URL added to .env.local file');

  } catch (error) {
    console.error('Error uploading video:', error);
  }
}

uploadVideo();
