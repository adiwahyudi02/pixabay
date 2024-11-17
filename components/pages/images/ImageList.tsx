import { memo, forwardRef } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { AppText } from "@/components/commons/AppText";
import { Image, Images } from "@/types/images";
import { ImageCard } from "./ImageCard";
import { theme } from "@/constants/theme";

interface ImageListProps {
  data: Images;
  isLoading?: boolean;
  fetchNextPage?: () => void;
  isBookmarked: (id: number) => boolean;
  toogleBookmark: (image: Image) => void;
}

const ImageListComponent = (
  {
    data,
    isLoading,
    fetchNextPage,
    isBookmarked,
    toogleBookmark,
  }: ImageListProps,
  ref: React.Ref<any>
) => {
  const itShouldFetchData = fetchNextPage && !isLoading;

  return (
    <FlatList
      ref={ref}
      testID="image-list"
      data={data}
      style={styles.list}
      showsVerticalScrollIndicator={false}
      keyExtractor={(_, index) => index.toString()}
      onEndReached={() => itShouldFetchData && fetchNextPage()}
      onEndReachedThreshold={0.5}
      renderItem={({ item }) => (
        <ImageCard
          key={item.id}
          id={item.id}
          previewURL={item.previewURL}
          tags={item.tags}
          userImageURL={item.userImageURL}
          user={item.user}
          isBookmarked={isBookmarked(item.id)}
          toggleBookmark={() => toogleBookmark(item)}
        />
      )}
      ListFooterComponent={() =>
        isLoading && (
          <ActivityIndicator
            size="large"
            style={styles.loading}
            testID="loading-indicator"
          />
        )
      }
      ListEmptyComponent={() =>
        !isLoading && (
          <View style={styles.emptyContainer}>
            <AppText style={styles.emptyText}>There is no Image.</AppText>
          </View>
        )
      }
    />
  );
};

// Forward the ref to the component
export const ImageList = memo(forwardRef(ImageListComponent));
ImageList.displayName = "ImageList";

const styles = StyleSheet.create({
  list: {
    flex: 1,
    marginTop: theme.spacing.md,
  },
  loading: {
    margin: theme.spacing.lg,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.poppins.regular,
    color: theme.colors.gray,
  },
});
