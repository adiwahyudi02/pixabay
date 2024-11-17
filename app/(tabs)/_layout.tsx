import { LogoutButton } from "@/components/pages/auth/LogoutButton";
import { theme } from "@/constants/theme";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: styles.title,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Images",
          title: "Images",
          tabBarIcon: ({ color }) => (
            <Ionicons name="images-outline" size={24} color={color} />
          ),
          headerRight: () => <LogoutButton />,
        }}
      />
      <Tabs.Screen
        name="bookmarks/index"
        options={{
          headerTitle: "Bookmarks",
          title: "Bookmarks",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="favorite" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: "bold",
  },
  tabLabel: {
    fontSize: 12,
  },
});
