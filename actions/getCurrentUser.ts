import prisma from "@/libs/prismadb";

import getSession from "./getSession";

const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    // const followersCount = await prisma.user.count({
    //   where: {
    //     followingIds: {
    //       has: currentUser.id,
    //     },
    //   },
    // });

    return currentUser;
  } catch (error) {
    return null;
  }
};

export default getCurrentUser;
