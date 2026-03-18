import { View, Text, Switch, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../../theme/themeContext";

type BooleanFieldVariant = "switch" | "radio" | "checkbox";

type BooleanFieldProps = {
  label: string;
  value?: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  error?: string;
  variant?: BooleanFieldVariant;
};

export function BooleanField({
  label,
  value,
  onChange,
  disabled,
  error,
  variant = "switch",
}: BooleanFieldProps) {

  const { theme } = useTheme();
  const styles = createStyles(theme);

  function renderField() {

    if (variant === "switch") {
      return (
        <Switch
          value={value ?? false}
          onValueChange={onChange}
          disabled={disabled}
          trackColor={{
            false: theme.colors.opaco,
            true: theme.colors.primary,
          }}
          thumbColor={value ? theme.colors.text : "#f4f3f4"}
        />
      );
    }

    if (variant === "radio") {
      return (
        <TouchableOpacity
          style={styles.radioContainer}
          onPress={() => onChange(!value)}
          disabled={disabled}
        >
          <View style={[styles.radio, value && styles.radioSelected]} />
          <Text>{value ? "Sim" : "Não"}</Text>
        </TouchableOpacity>
      );
    }

    if (variant === "checkbox") {
      return (
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => onChange(!value)}
          disabled={disabled}
        >
          <View style={[styles.checkbox, value && styles.checkboxSelected]} />
        </TouchableOpacity>
      );
    }

    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      {renderField()}

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

function createStyles(theme: any) {
  return StyleSheet.create({
    container: {
      marginBottom: 16,
      alignItems: "flex-start",
    },

    label: {
      fontSize: 16,
      fontWeight: "500",
      marginBottom: 6,
      color: theme.colors.text,
    },

    error: {
      color: theme.colors.error,
      marginTop: 4,
    },

    radioContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },

    radio: {
      width: 18,
      height: 18,
      borderRadius: 9,
      borderWidth: 2,
      borderColor: theme.colors.primary,
    },

    radioSelected: {
      backgroundColor: theme.colors.primary,
    },

    checkboxContainer: {
      flexDirection: "row",
      alignItems: "center",
    },

    checkbox: {
      width: 18,
      height: 18,
      borderWidth: 2,
      borderColor: theme.colors.primary,
    },

    checkboxSelected: {
      backgroundColor: theme.colors.primary,
    },
  });
}