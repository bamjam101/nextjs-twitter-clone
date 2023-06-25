// import prisma from "@/libs/prismadb";
// import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//   try {
//     const users = await prisma.user.findMany({
//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     return NextResponse.json(users);
//   } catch (error) {
//     console.log(error, "ERROR_USERS");
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }
