import { View, Text, ScrollView } from 'react-native';
import { styles } from './styles';
import { useTheme } from '../../theme/themeContext';

interface TagProps {
  textColor: string;
  backgroundColor: string;
  value: string;
}


export function Tag(TagProps: TagProps) {
  const { theme } = useTheme();
  const stylesTag = styles(theme);

  return (
    <ScrollView>
      <View style={[stylesTag.tag, { backgroundColor: TagProps.backgroundColor  + '20' , borderColor: TagProps.backgroundColor }]}>
        <Text style={[stylesTag.label, {color: TagProps.textColor}]}>
          {TagProps.value}
        </Text>
      </View>
    </ScrollView>
  );
}
