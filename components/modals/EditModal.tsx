"use client";

import { User } from "@prisma/client";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import Modal from "./Modal";
import useEditModal from "@/hooks/useEditModal";
import Input from "../input/Input";
import Upload from "../input/Upload";

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
    setProfileImage(currentUser?.profileImage);
    setCoverImage(currentUser?.coverImage);
    setName(currentUser?.name);
    setUsername(currentUser?.username);
    setBio(currentUser?.bio);
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
