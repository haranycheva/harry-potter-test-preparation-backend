import { cloudinary} from "./index.js";
import fs from "fs/promises";

const folders = {
  user: "zno-preparing-user",
  task: "task-pictures"
};

const addPicture = async (req, folder) => {
  const image = await cloudinary.uploader.upload(req.file.path, {
    folder: folders[folder],
  });
  await fs.unlink(req.file.path);
  return image.secure_url;
};

export default addPicture;
