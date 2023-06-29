import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";

const getUserById = async (userId: string) => {
  const session = await getSession();

  if (!session?.user?.email) {
    return null;
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return null;
    }

    // const followersCount = await prisma.user.count({
    //   where: {
    //     followingIds: {
    //       has: userId,
    //     },
    //   },
    // });

    return user;
  } catch (error) {
    return null;
  }
};

export default getUserById;
