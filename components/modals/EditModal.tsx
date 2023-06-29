"use client";

import { useState, useEffect, useCallback } from "react";

import axios from "axios";
import { User } from "@prisma/client";
import { toast } from "react-hot-toast";

import Modal from "./Modal";
import Input from "../input/Input";
import Upload from "../input/Upload";

import useEditModal from "@/app/hooks/useEditModal";
interface EditModalProps {
  currentUser: User;
}

const EditModal: React.FC<EditModalProps> = ({ currentUser }) => {
  const editModal = useEditModal();

  const [profileImage, setProfileImage] = useState<string | undefined>("");
  const [coverImage, setCoverImage] = useState<string | undefined>("");
  const [name, setName] = useState<string | undefined>("");
  const [username, setUsername] = useState<string | undefined>("");
  const [bio, setBio] = useState<string | undefined>("");

  useEffect(() => {
    setProfileImage(currentUser?.profileImage || undefined);
    setCoverImage(currentUser?.coverImage || undefined);
    setName(currentUser?.name || undefined);
    setUsername(currentUser?.username || undefined);
    setBio(currentUser?.bio || undefined);
  }, [
    currentUser?.profileImage,
    currentUser?.coverImage,
    currentUser?.name,
    currentUser?.username,
    currentUser?.bio,
  ]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.patch("/api/edit", {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      });
      toast.success("Profile updated successfully.");
      editModal.onClose();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }, [name, username, bio, profileImage, coverImage, editModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Upload
        value={profileImage}
        disabled={isLoading}
        onChange={(image) => setProfileImage(image)}
        label="Upload New Profile"
      />
      <Upload
        value={coverImage}
        disabled={isLoading}
        onChange={(image) => setCoverImage(image)}
        label="Upload New Cover Photo"
      />
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder="Bio"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        disabled={isLoading}
      />
    </div>
  );
  return (
    <Modal
      title="Edit Your Profile"
      disabled={isLoading}
      isOpen={editModal.isOpen}
      actionLabel="Save"
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default EditModal;
