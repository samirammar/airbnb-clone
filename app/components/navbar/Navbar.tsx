"use client";
import { User } from "@prisma/client";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

type Props = {
  currentUser?: User | null;
};

const Navbar: React.FC<Props> = ({ currentUser }) => {
  return (
    <div className="w-full fixed bg-white shadow-sm z-10">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
