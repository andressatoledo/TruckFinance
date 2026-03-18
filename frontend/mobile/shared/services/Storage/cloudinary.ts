// // cloudinary.storage.ts

// import { IStorageProvider } from './storage.interface';

// export class CloudinaryStorage implements IStorageProvider {
//   async upload(file: any) {
//     const result = await cloudinary.uploader.upload(file.path);

//     return {
//       url: result.secure_url,
//       nome: result.original_filename,
//       tipo: result.resource_type,
//       tamanho: result.bytes,
//     };
//   }

//   async delete(url: string) {
//     // implementar se quiser
//   }
// }