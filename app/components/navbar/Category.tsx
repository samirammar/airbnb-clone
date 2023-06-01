import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

type Props = {
  icon: IconType;
  label: string;
  selected?: boolean;
};

const Category: React.FC<Props> = ({ icon: Icon, label, selected }) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentquery = {};
    if (params) {
      currentquery = qs.parse(params.toString());
    }

    // Selection this category
    const updateQuery: any = {
      ...currentquery,
      category: label,
    };

    // Deselection the category
    if (params?.get("category") === label) {
      delete updateQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updateQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer
        ${
          selected
            ? "border-b-neutral-800 text-neutral-800"
            : "border-b-transparent text-neutral-500"
        }
      `}
    >
      <Icon size={26} />
      <h4 className="font-medium text-sm">{label}</h4>
    </div>
  );
};

export default Category;
