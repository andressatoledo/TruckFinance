import React, { useState } from 'react';
import { View, Text, TouchableOpacity, NativeModules, Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';

import { useUpload } from '../../hooks/Upload/useUpload';

const { IntentLauncher } = NativeModules;

export function Upload({ onUploaded }: any) {
  const [error, setError] = useState<string | null>(null);
  const { upload, uploading, progress } = useUpload();

  // 📂 Selecionar qualquer arquivo (Android via Intent)
  async function pickFile() {
    try {
      setError(null);

      if (Platform.OS !== 'android') {
        setError('Seleção de arquivos disponível apenas no Android aqui');
        return;
      }

      const result = await IntentLauncher.startActivity({
        action: 'android.intent.action.GET_CONTENT',
        type: '*/*',
      });

      if (!result?.data) return;

      const uri = result.data;

      // opcional: copiar arquivo para pasta local
      const fileName = `file_${Date.now()}`;
      const destPath = `${RNFS.CachesDirectoryPath}/${fileName}`;

      await RNFS.copyFile(uri, destPath);

      const file = {
        uri: 'file://' + destPath,
        nome: fileName,
        tipo: 'application/octet-stream',
      };

      
      const uploaded = await upload(file);

      onUploaded(uploaded);

    } catch (err) {
      setError(`Erro ao enviar arquivo: ${err}`);
    }
  }

  // 🖼️ Selecionar imagem
  async function pickImage() {
    try {
      setError(null);

      const res = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
      });

      if (!res.assets?.length) return;

      const asset = res.assets[0];

      const file = {
        uri: asset.uri!,
        nome: asset.fileName || `image_${Date.now()}.jpg`,
        tipo: asset.type || 'image/jpeg',
      };

      const uploaded = await upload(file);

      onUploaded(uploaded);

    } catch (err) {
      console.error('Erro ao enviar imagem:', err);
      setError(`Erro ao enviar arquivo: ${err}`);
    }
  }

  return (
    <View>
      <TouchableOpacity onPress={pickImage}>
        <Text>Selecionar imagem</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={pickFile}>
        <Text>Selecionar arquivo</Text>
      </TouchableOpacity>

      {uploading && (
        <Text>Enviando... {progress}%</Text>
      )}

      {error && (
        <Text style={{ color: 'red' }}>{error}</Text>
      )}
    </View>
  );
}