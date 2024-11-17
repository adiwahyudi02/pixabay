import { theme } from "@/constants/theme";
import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TouchableOpacityProps,
} from "react-native";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "info"
  | "ghost"
  | "outlined";
export type ButtonSize = "xs" | "sm" | "md" | "lg";

interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  children: React.ReactNode;
  isLoading?: boolean;
  isRoundedFull?: boolean;
  size?: ButtonSize;
  onPress?: () => void;
  style?: ViewStyle;
}

export const Button = ({
  variant = "primary",
  size = "md",
  children,
  isLoading,
  isRoundedFull,
  onPress,
  style,
  ...props
}: ButtonProps) => {
  // Type assertion to tell TypeScript that variant is a key of theme.colors
  const buttonBackgroundColor =
    variant === "outlined" || variant === "ghost"
      ? theme.colors.outlined
      : theme.colors[variant as keyof typeof theme.colors] ||
        theme.colors.primary;

  // Define text color based on variant
  const buttonTextColor =
    variant === "outlined" || variant === "ghost"
      ? theme.colors.primary
      : theme.colors.white;

  const buttonStyle = [
    styles.button,
    { backgroundColor: buttonBackgroundColor },
    styles[size],
    isRoundedFull && styles.roundedFull,
    style, // Allow custom styles to be passed
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={isLoading}
      testID="button"
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={
            variant === "outlined" ? theme.colors.primary : theme.colors.white
          }
          testID="loading-indicator"
        />
      ) : (
        <Text style={[{ color: buttonTextColor }]}>{children}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.radius.md,
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
  },
  danger: {
    backgroundColor: theme.colors.danger,
  },
  info: {
    backgroundColor: theme.colors.info,
  },
  outlined: {
    backgroundColor: theme.colors.outlined,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  ghost: {
    backgroundColor: theme.colors.outlined,
  },
  xs: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.xs,
    fontSize: theme.typography.fontSize.xs,
  },
  sm: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
    fontSize: theme.typography.fontSize.sm,
  },
  md: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    fontSize: theme.typography.fontSize.md,
  },
  lg: {
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    fontSize: theme.typography.fontSize.lg,
  },
  roundedFull: {
    borderRadius: theme.radius.lg,
    width: 56,
    height: 56,
    padding: 0,
    margin: 0,
  },
});
