"use client";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";

type Props = {
  currentUser?: User | null;
};

const UserMenu: React.FC<Props> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const afterEvent: any = (fun: () => void) => {
    return () => {
      setIsOpen((v) => !v);
      fun();
    };
  };

  const onRent = useCallback(() => {
    if (!currentUser) return loginModal.onOpen();

    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full transition cursor-pointer hover:bg-neutral-100"
          onClick={onRent}
        >
          Airbnb your home
        </div>
        <div
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
          onClick={toggleOpen}
        >
          <AiOutlineMenu />
          <Avatar src={currentUser?.image} />
        </div>
      </div>
      {isOpen && (
        <div className="rounded-xl shadow-lg absolute right-0 top-12 w-[40vw] md:w-3/4 bg-white overflow-hidden text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  label="My trips"
                  onClick={() => router.push("/trips")}
                />
                <MenuItem
                  label="My favorites"
                  onClick={() => router.push("favorites")}
                />
                <MenuItem
                  label="My reservations"
                  onClick={() => router.push("reservations")}
                />
                <MenuItem
                  label="My Properties"
                  onClick={() => router.push("properties")}
                />
                <MenuItem
                  label="Airbnb my home"
                  onClick={afterEvent(rentModal.onOpen)}
                />
                <hr />
                <MenuItem label="Logout" onClick={() => signOut()} />
              </>
            ) : (
              <>
                <MenuItem
                  label="Login"
                  onClick={afterEvent(loginModal.onOpen)}
                />
                <MenuItem
                  label="Register"
                  onClick={afterEvent(registerModal.onOpen)}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
