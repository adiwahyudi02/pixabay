import { theme } from "@/constants/theme";
import { ReactNode } from "react";
import { View, StyleSheet, ViewProps } from "react-native";

interface ScreenProps extends ViewProps {
  children: ReactNode;
}

export const Screen = ({ children, ...props }: ScreenProps) => (
  <View style={styles.content} testID="screen-container" {...props}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.white,
  },
});
