import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import useLoginModal from "./useLoginModal";
import { useCallback, useMemo } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

interface IUseFavorite {
  listingId: string;
  currentUser?: User | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  // check listingId
  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  // toggle favorite
  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      // not authntecated
      if (!currentUser) return loginModal.onOpen();

      try {
        let req;

        if (!hasFavorited) {
          req = () => axios.post(`/api/favorites/${listingId}`);
        } else {
          req = () => axios.delete(`/api/favorites/${listingId}`);
        }

        await req();
        router.refresh();
        toast.success("Success");
      } catch (error) {
        toast.error("something went wrong.");
      }
    },
    [currentUser, loginModal, hasFavorited, listingId, router]
  );

  return { hasFavorited, toggleFavorite };
};

export default useFavorite;
