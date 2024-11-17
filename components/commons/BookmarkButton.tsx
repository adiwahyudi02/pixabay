import { theme } from "@/constants/theme";
import { MaterialIcons } from "@expo/vector-icons";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
  View,
} from "react-native";

interface BookmarkButtonProps extends TouchableOpacityProps {
  isActive?: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const BookmarkButton = ({
  isActive = false,
  onPress,
  style,
  ...props
}: BookmarkButtonProps) => {
  return (
    <TouchableOpacity
      testID="bookmark-button"
      onPress={onPress}
      style={[styles.button, style]}
      {...props}
    >
      <View testID="bookmark-icon">
        <MaterialIcons
          name={isActive ? "favorite" : "favorite-border"}
          size={28}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: theme.spacing.sm,
  },
});
