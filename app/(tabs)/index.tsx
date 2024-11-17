import { SearchInput } from "@/components/commons/SearchInput";
import { useState, useRef } from "react";
import { ImageList } from "@/components/pages/images/ImageList";
import { useFetchImagesQuery } from "@/store/api/images";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { deleteBookmark, saveBookmark } from "@/store/slices/bookmarks";
import { Image } from "@/types/images";
import { selectPixabayKey } from "@/store/slices/auth";
import { Screen } from "@/components/commons/Screen";

export default function Pixabay() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const key = useSelector(selectPixabayKey);

  // Reference for ImageList scroll
  const imageListRef = useRef<any>(null);

  const { data, isLoading, isFetching } = useFetchImagesQuery({
    key,
    page,
    perPage: 10,
    query: search,
  });

  const handleLoadMore = () => {
    if (!isFetching && !isLoading && data?.hits?.length) {
      setPage((prev) => prev + 1);
    }
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    setPage(1);

    // Scroll to top when search query changes
    if (imageListRef.current) {
      imageListRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  };

  const dispatch = useDispatch<AppDispatch>();
  const bookmarks = useSelector((state: RootState) => state.bookmarks.images);

  const isBookmarked = (id: number) =>
    bookmarks.some((image) => image.id === id);

  const toggleBookmark = (image: Image) => {
    if (isBookmarked(image.id)) {
      dispatch(deleteBookmark(image.id));
    } else {
      dispatch(saveBookmark(image));
    }
  };

  return (
    <Screen>
      <SearchInput onChange={handleSearch} value={search} />
      <ImageList
        ref={imageListRef}
        data={data?.hits || []}
        fetchNextPage={handleLoadMore}
        isLoading={isLoading || isFetching}
        isBookmarked={isBookmarked}
        toogleBookmark={toggleBookmark}
      />
    </Screen>
  );
}
