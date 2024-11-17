import { View, StyleSheet } from "react-native";
import { AppText } from "@/components/commons/AppText";
import { Image } from "expo-image";
import { BookmarkButton } from "@/components/commons/BookmarkButton";
import { theme } from "@/constants/theme";

interface ImageCardProps {
  id?: number;
  tags: string;
  previewURL: string;
  user: string;
  userImageURL: string;
  isBookmarked: boolean;
  toggleBookmark: () => void;
}

export const ImageCard = ({
  id,
  previewURL,
  tags,
  userImageURL,
  user,
  isBookmarked,
  toggleBookmark,
}: ImageCardProps) => {
  const bookmarkTestID = id ? `bookmark-button-${id}` : "bookmark-button";
  const imageCardTestID = id ? `image-card-${id}` : "image-card";

  return (
    <View style={styles.card} testID={imageCardTestID}>
      <View testID="preview-image">
        <Image source={previewURL} contentFit="cover" style={styles.image} />
      </View>
      <View style={styles.info}>
        <View style={styles.identity}>
          <AppText style={styles.tags} testID="tags-text">
            {tags}
          </AppText>
          <View style={styles.user} testID="user-info">
            <View testID="user-image">
              <Image source={userImageURL} style={styles.userImage} />
            </View>
            <AppText style={styles.username} testID="username-text">
              {user}
            </AppText>
          </View>
        </View>
        <BookmarkButton
          isActive={isBookmarked}
          onPress={toggleBookmark}
          testID={bookmarkTestID}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.md,
    overflow: "hidden",
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  image: {
    width: "100%",
    height: 300,
  },
  info: {
    padding: theme.spacing.sm,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  identity: {
    maxWidth: "90%",
  },
  tags: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.poppins.bold,
    marginBottom: theme.spacing.sm,
    color: theme.colors.black,
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: theme.spacing.sm,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.full,
    marginRight: theme.spacing.sm,
  },
  username: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.poppins.regular,
  },
});
