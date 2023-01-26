import multer from 'multer';
import path from 'path';

// Multer config
export default multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    // let ext = path.extname(file.originalname);
    cb(null, true);
  },
});
