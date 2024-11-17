import { StyleSheet } from "react-native";
import { AppText } from "./AppText";
import { theme } from "@/constants/theme";

interface ErrorMessageProps {
  error?: string;
}

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return error ? <AppText style={styles.errorText}>{error}</AppText> : null;
};

const styles = StyleSheet.create({
  errorText: {
    color: theme.colors.danger,
    fontSize: theme.typography.fontSize.sm,
    marginTop: theme.spacing.sm,
  },
});
