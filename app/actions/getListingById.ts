import prisma from "@/app/libs/prismadb";

export async function getListingById(listingId?: string) {
  try {
    const listing = prisma.listing.findUnique({
      where: { id: listingId },
      include: { user: true },
    });

    if (!listing) return null;

    return listing;
  } catch (error: any) {
    throw new Error(error);
  }
}
