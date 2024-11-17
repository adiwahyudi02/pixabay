import { useEffect } from "react";
import { ImageList } from "@/components/pages/images/ImageList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  deleteBookmark,
  initializeBookmarks,
  saveBookmark,
} from "@/store/slices/bookmarks";
import { Screen } from "@/components/commons/Screen";

export default function Bookmarks() {
  const dispatch = useDispatch<AppDispatch>();
  const bookmarks = useSelector((state: RootState) => state.bookmarks.images);

  const isBookmarked = (id: number) =>
    bookmarks.some((image) => image.id === id);

  const toggleBookmark = (image: any) => {
    if (isBookmarked(image.id)) {
      dispatch(deleteBookmark(image.id));
    } else {
      dispatch(saveBookmark(image));
    }
  };

  useEffect(() => {
    dispatch(initializeBookmarks());
  }, [dispatch]);

  return (
    <Screen>
      <ImageList
        data={bookmarks || []}
        isBookmarked={isBookmarked}
        toogleBookmark={toggleBookmark}
      />
    </Screen>
  );
}
