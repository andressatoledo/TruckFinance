// FileListViewer.tsx

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Linking,
} from 'react-native';

type Props = {
  files: any[];
  onRemove?: (file: any) => void;
};

export function FileViewer({ files, onRemove }: Props) {
  function open(url: string) {
    Linking.openURL(url);
  }

  return (
    <FlatList
      data={files}
      keyExtractor={(item, i) => i.toString()}
      renderItem={({ item }) => {
        const isImage = item.tipo?.startsWith('image');

        return (
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
              marginBottom: 8,
              backgroundColor: '#1E1E1E',
              borderRadius: 10,
            }}
          >
            {isImage ? (
              <Image
                source={{ uri: item.url }}
                style={{ width: 50, height: 50 }}
              />
            ) : (
              <View>
                <Text style={{ color: '#fff' }}>PDF</Text>
              </View>
            )}

            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={{ color: '#fff' }}>
                {item.nome}
              </Text>
            </View>

            <TouchableOpacity onPress={() => open(item.url)}>
              <Text>⬇️</Text>
            </TouchableOpacity>

            {onRemove && (
              <TouchableOpacity onPress={() => onRemove(item)}>
                <Text>🗑️</Text>
              </TouchableOpacity>
            )}
          </View>
        );
      }}
    />
  );
}