import multer from "multer";
import path from "path"

const destinationPath = path.resolve('temp')

const storage = multer.diskStorage({
    destination: destinationPath,
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })

  const limits = 5 * 1024 *1024

const upload = multer({
    storage,
    limits,
});

export default upload;
