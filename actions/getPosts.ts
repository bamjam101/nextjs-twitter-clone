import prisma from "@/libs/prismadb";
import getSession from "./getSession";
import getCurrentUser from "./getCurrentUser";

const getPosts = async () => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: true,
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return posts;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default getPosts;
