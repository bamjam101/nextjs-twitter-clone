"use client";

import { useState, useEffect, useCallback } from "react";

import axios from "axios";
import { toast } from "react-hot-toast";
import { User } from "@prisma/client";

import Avatar from "@/components/avatar/Avatar";
import Button from "@/components/button/Button";

import useLoginModal from "../hooks/useLoginModal";
import useRegisterModal from "../hooks/useRegisterModal";

interface FormStateProps {
  currentUser?: User;
  placeholder: string;
}

const FormState: React.FC<FormStateProps> = ({ currentUser, placeholder }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.post("api/posts", {
        body,
      });
      setBody("");
      toast.success("Tweet created.");
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }, [body]);
  return (
    <>
      {currentUser ? (
        <div className="flex flex-row gap-4">
          <div className="">
            <Avatar userId={currentUser?.id} />
          </div>
          <div className="w-full">
            <input
              disabled={isLoading}
              type="text"
              className="disabled:opacity-80 mt-3 w-full bg-black ring-0 outline-none text-[20px] placeholder-neutral-500 text-white"
              onChange={(e) => setBody(e.target.value)}
              placeholder={placeholder}
            />
            <hr className="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition" />
            <div className="mt-4 flex flex-row justify-end">
              <Button
                disabled={isLoading}
                onClick={() => onSubmit()}
                label="Tweet"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="text-white text-2xl text-center mb-4 font-bold">
            Welcome to Twitter
          </h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Login" onClick={loginModal.onOpen} />
            <Button label="Register" onClick={registerModal.onOpen} secondary />
          </div>
        </div>
      )}
    </>
  );
};

export default FormState;
