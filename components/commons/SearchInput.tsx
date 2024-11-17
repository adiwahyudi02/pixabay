import React, { useRef, useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { theme } from "@/constants/theme";

interface SearchInputProps {
  onChange: (input: string) => void;
  value: string;
}

export const SearchInput = ({ value, onChange }: SearchInputProps) => {
  const [search, setSearch] = useState(value);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const handleReset = () => {
    handleSearch("");
  };

  const handleSearchDebounce = (value: string) => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    timeoutId.current = setTimeout(() => {
      onChange(value);
    }, 700);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    handleSearchDebounce(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Search..."
          placeholderTextColor={theme.colors.gray}
          style={[styles.input]}
          onChangeText={handleSearch}
          value={search}
          testID="search-input"
        />

        {search && (
          <TouchableOpacity
            onPress={handleReset}
            style={styles.resetButton}
            testID="reset-button"
          >
            <AntDesign name="close" size={20} color={theme.colors.gray} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.gray,
    borderRadius: theme.radius.md,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 12,
    borderRadius: theme.radius.md,
    fontFamily: theme.typography.fontFamily.poppins.regular,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.black,
  },
  resetButton: {
    marginHorizontal: 8,
  },
});
