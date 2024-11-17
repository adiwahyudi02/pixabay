import { Button } from "@/components/commons/Button";
import { ConfirmationModal } from "@/components/commons/ConfirmationModal";
import { theme } from "@/constants/theme";
import { AppDispatch } from "@/store";
import { logout } from "@/store/slices/auth";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

export const LogoutButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    setModalVisible(false);
    dispatch(logout());
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Button
        variant="ghost"
        size="xs"
        style={styles.logoutButton}
        onPress={() => setModalVisible(true)}
      >
        Logout
      </Button>

      <ConfirmationModal
        visible={modalVisible}
        onConfirm={handleLogout}
        onCancel={handleCancel}
        message="Are you sure you want to log out?"
      />
    </>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    marginRight: theme.spacing.sm,
  },
});
