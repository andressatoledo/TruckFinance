import { useState } from 'react';
import axios from 'axios';
import { api } from '../../../shared/services/api';

export function useUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  async function upload(file: any): Promise<any> {
    try {
      setUploading(true);
      setProgress(0);

      const formData = new FormData();

      formData.append('file', {
        uri: file.uri,
        name: file.nome,
        type: file.tipo,
      } as any);

      console.log('api.defaults.baseURL',api.defaults.baseURL)
      const response = await axios.post(
        api.defaults.baseURL + '/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (event) => {
            const percent = Math.round(
              (event.loaded * 100) / (event.total || 1)
            );
            setProgress(percent);
          },
        }
      );

      return response.data;
    } catch (err) {
        throw new Error(`Erro ao enviar arquivo: ${err}`); ;
    } finally {
      setUploading(false);
    }
  }

  return {
    upload,
    uploading,
    progress,
  };
}