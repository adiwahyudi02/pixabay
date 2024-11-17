import { theme } from "@/constants/theme";
import { Text, TextProps } from "react-native";

interface AppTextProps extends TextProps {
  children: React.ReactNode;
  style?: object;
}

export const AppText = ({ children, style, ...rest }: AppTextProps) => {
  // Configure the font-family
  const getFontFamily = () => {
    if (style && typeof style === "object" && "fontWeight" in style) {
      switch (style.fontWeight) {
        case "bold":
          return theme.typography.fontFamily.poppins.bold;
        case "medium":
          return theme.typography.fontFamily.poppins.medium;
        default:
          return theme.typography.fontFamily.poppins.regular;
      }
    }
    return theme.typography.fontFamily.poppins.regular;
  };

  return (
    <Text style={[{ fontFamily: getFontFamily() }, style]} {...rest}>
      {children}
    </Text>
  );
};
