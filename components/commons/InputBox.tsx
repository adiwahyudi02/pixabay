import {
  View,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
} from "react-native";
import { Label } from "./Label";
import { ErrorMessage } from "./ErrorMessage";
import { theme } from "@/constants/theme";

interface InputBoxProps extends TextInputProps {
  label?: string;
  error?: string;
  isPassword?: boolean;
  isRequired?: boolean;
}

export const InputBox = ({
  label,
  error,
  isRequired = false,
  isPassword = false,
  style,
  ...props
}: InputBoxProps) => {
  return (
    <View style={styles.container}>
      {label && (
        <Label label={label} isRequired={isRequired} isError={!!error} />
      )}
      <TextInput
        placeholderTextColor={theme.colors.gray}
        style={[styles.input, error && styles.inputError, style] as TextStyle[]}
        secureTextEntry={isPassword}
        testID="input-box"
        {...props}
      />
      {error && <ErrorMessage error={error} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.sm,
  },
  input: {
    height: 40,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.black,
    backgroundColor: theme.colors.white,
    marginTop: theme.spacing.sm,
  },
  inputError: {
    borderColor: theme.colors.danger,
  },
});
