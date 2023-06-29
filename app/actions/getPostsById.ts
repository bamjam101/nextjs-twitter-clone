import prisma from "@/app/libs/prismadb";

const getPostsById = async ({ userId }: { userId: string }) => {
  try {
    const postsById = await prisma.post.findMany({
      where: {
        userId: userId,
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
