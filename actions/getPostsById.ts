import prisma from "@/libs/prismadb";
import getSession from "./getSession";
import getCurrentUser from "./getCurrentUser";

const getPostsById = async () => {
  try {
    const currentUser = await getCurrentUser();

    const postsById = await prisma.post.findMany({
      where: {
        userId: currentUser?.id,
      },
      include: {
        user: true,
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return postsById;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default getPostsById;
