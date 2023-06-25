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

  const [profileImage, setProfileImage] = useState<string | null>("");
  const [coverImage, setCoverImage] = useState<string | null>("");
  const [name, setName] = useState<string | null>("");
  const [username, setUsername] = useState<string | null>("");
  const [bio, setBio] = useState<string | null>("");

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
        value={profileImage || "Profile Image"}
        disabled={isLoading}
        onChange={(image) => setProfileImage(image)}
        label="Upload profile image"
      />
      <Upload
        value={coverImage || "Profile Image"}
        disabled={isLoading}
        onChange={(image) => setCoverImage(image)}
        label="Upload cover image"
      />
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name || "Name"}
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username || "Username"}
        disabled={isLoading}
      />
      <Input
        placeholder="Bio"
        onChange={(e) => setBio(e.target.value)}
        value={bio || "Bio"}
        disabled={isLoading}
      />
    </div>
  );
  return (
    <Modal
      title="Update Your Profile"
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
