import multer from 'multer';
import path from 'path';

// Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    // let ext = path.extname(file.originalname);
    cb(null, true);
  },
});
