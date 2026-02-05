import { View } from 'react-native';
import { InputField } from '../Form/InputField';
import { Button } from '../Form/Button';

interface Props {
  searchValue: string;
  onSearchChange: (text: string) => void;
  onFilterPress: () => void;
  onAddPress: () => void;
  placeholder?: string;
}

export function CarteiraHeader({
  searchValue,
  onSearchChange,
  onFilterPress,
  onAddPress,
  placeholder = 'Buscar...',
}: Props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
        
      }}
    >
     
      <View style={{ flex: 1 }}>
        <InputField
          label=''
          placeholder={placeholder}
          value={searchValue}
          onChangeText={onSearchChange}
          icon="magnify"
          iconPosition = 'inside'
          marginBottom={-10}
          
        />
      </View>

      <Button
        icon="filter-variant"
        onPress={onFilterPress}
         label=''
         borderRadius={50}
         paddingHorizontal={15}
         marginTop={10}
      />

      <Button
        icon="plus"
        onPress={onAddPress}
        label=''
        borderRadius={50}
         paddingHorizontal={15}
         marginTop={10}
      />
    </View>
  );
}
