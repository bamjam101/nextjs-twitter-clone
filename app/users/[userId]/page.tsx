import React from "react";

import Header from "@/components/header/Header";
import UserHero from "../components/UserHero";
import UserBio from "../components/UserBio";

import { ClipLoader } from "react-spinners";

import { User } from "@prisma/client";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getUserById from "@/app/actions/getUserById";

interface IParams {
  userId: string;
}

const UserView = async ({ params }: { params: IParams }) => {
  const currentUser = await getCurrentUser();
  const user = await getUserById(params.userId);

  if (!user) {
    return (
      <section className="flex-w-full min-h-screen flex-col">
        <Header showBackArrow label="User Profile" />
        <div className="flex mt-20 justify-center items-center">
          <ClipLoader size={50} color={"lightblue"} />
        </div>
      </section>
    );
  }
  return (
    <>
      <Header showBackArrow label={user?.name} />
      <UserHero
        coverImage={user?.coverImage}
        profileImage={user?.profileImage}
      />
      <UserBio
        user={user as User}
        currentUser={currentUser as User}
        // count={user.followersCount.toString()}
      />
    </>
  );
};

export default UserView;
