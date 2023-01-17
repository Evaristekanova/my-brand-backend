import cloudinary from 'cloudinary';
import dotenv from 'dotenv'
dotenv.config()
const { CLOUDINARY_USERNAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =process.env;
cloudinary.config({
  cloud_name: CLOUDINARY_USERNAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
