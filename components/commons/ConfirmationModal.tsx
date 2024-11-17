import { Modal, View, StyleSheet } from "react-native";
import { Button } from "./Button";
import { AppText } from "./AppText";
import { theme } from "@/constants/theme";

type ConfirmationModalProps = {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
};

export const ConfirmationModal = ({
  visible,
  onConfirm,
  onCancel,
  message,
}: ConfirmationModalProps) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <AppText style={styles.modalText}>{message}</AppText>
          <View style={styles.buttonContainer}>
            <Button size="sm" variant="ghost" onPress={onCancel}>
              Cancel
            </Button>
            <Button size="sm" onPress={onConfirm}>
              Continue
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.md,
    alignItems: "center",
  },
  modalText: {
    fontSize: theme.typography.fontSize.sm,
    marginBottom: theme.spacing.lg,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    gap: theme.spacing.sm,
  },
});
