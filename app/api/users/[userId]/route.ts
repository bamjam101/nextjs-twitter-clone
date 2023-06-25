import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  userId?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  try {
    const { userId } = params;

    if (!userId) {
      return new NextResponse("Invalid Id", { status: 404 });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!existingUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const followersCount = await prisma.user.count({
      where: {
        followingIds: {
          has: userId,
        },
      },
    });

    return NextResponse.json({ ...existingUser, followersCount });
  } catch (error) {
    console.log(error, "ERROR_SPECIFIC_USER");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
