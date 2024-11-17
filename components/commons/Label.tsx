import { TextProps, StyleSheet } from "react-native";
import { AppText } from "./AppText";
import { theme } from "@/constants/theme";

interface LabelProps extends TextProps {
  label: string;
  isError?: boolean;
  isRequired?: boolean;
}

export const Label = ({
  label,
  isError,
  isRequired = false,
  style,
  ...props
}: LabelProps) => {
  return (
    <AppText style={[styles.label, isError && styles.error, style]} {...props}>
      {label}
      {isRequired && <AppText style={styles.asterisk}> *</AppText>}
    </AppText>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.black,
  },
  error: {
    color: theme.colors.danger,
  },
  asterisk: {
    color: theme.colors.danger,
  },
});
