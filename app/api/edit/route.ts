import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { name, username, bio, profileImage, coverImage } = body;

    if (!name || !username) {
      return new NextResponse("Missing Fields", { status: 400 });
    }

    const updatedUser = await prisma?.user.update({
      where: {
        id: currentUser?.id,
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error, "ERROR_EDIT");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
