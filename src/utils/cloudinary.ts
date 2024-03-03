import { v2 as cloudinary } from 'cloudinary';

const config = cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

const params = {
  folder: "events",
  allowedFormats: ["jpg", "png", "jpeg"],
  public_id: (req: any, file: any) => {
    let { eventName } = req?.params

    if (eventName && eventName.length) {
      eventName.replace(/[/\\\s]/g, "_")

    }
  }
}

// const uploadImage = async (file: any) => {
//   await cloudinary.uploader.upload(file, (error, result) => {
//     if (error) {
//       reject(error);
//     }
//     resolve(result);
//   });
// };

// const deleteImage = (publicId: string) => {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.destroy(publicId, (error, result) => {
//       if (error) {
//         reject(error);
//       }
//       resolve(result);
//     });
//   });
// }
