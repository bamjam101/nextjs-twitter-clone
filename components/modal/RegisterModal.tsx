"use client";

import useRegisterModal from "@/hooks/useRegisterModal";

import { useState, useCallback } from "react";
import Input from "../input/Input";
import Modal from "./Modal";
import useLoginModal from "@/hooks/useLoginModal";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }

    registerModal.onClose();
    loginModal.onOpen();
  }, [isLoading, registerModal, loginModal]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      // Sign Up and Log In
      await axios.post("/api/register", {
        email,
        password,
        username,
        name,
      });
      toast.success("Account created.");

      signIn("credentials", {
        email,
        password,
      });

      registerModal.onClose();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }, [registerModal, name, email, password, username]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Name"
        onChange={(event) => setName(event.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        onChange={(event) => setUsername(event.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder="Email"
        onChange={(event) => setEmail(event.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder="Password"
        onChange={(event) => setPassword(event.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <div className="text-base">
        Already have an account?{" "}
        <span
          onClick={onToggle}
          className="text-white cursor-pointer hover:underline"
        >
          Sign In
        </span>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Create an account"
      actionLabel="Register"
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
