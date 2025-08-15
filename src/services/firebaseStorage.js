import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { app } from "../firebase";

const storage = getStorage(app);
const auth = getAuth(app);

export const uploadImage = async (
  file,
  folder = "blog-images",
  progressCallback = null
) => {
  if (!file) throw new Error("No file provided");

  try {
    const fileExtension = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const storageRef = ref(storage, `${folder}/${fileName}`);

    const metadata = {};
    if (auth.currentUser) {
      metadata.customMetadata = {
        userId: auth.currentUser.uid,
      };
    }

    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (progressCallback) {
            progressCallback(progress);
          }
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              reject(new Error("You don't have permission to upload files"));
              break;
            case "storage/canceled":
              reject(new Error("Upload was canceled"));
              break;
            case "storage/unknown":
              reject(new Error("An unknown error occurred during upload"));
              break;
            default:
              reject(error);
          }
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  } catch (error) {
    console.error("Error preparing upload:", error);
    throw error;
  }
};

export const deleteImage = async (imageUrl) => {
  if (!imageUrl || !imageUrl.includes("firebasestorage.googleapis.com")) {
    throw new Error("Invalid Firebase Storage URL");
  }

  try {
    const urlParts = imageUrl.split("/o/");
    if (urlParts.length < 2) throw new Error("Invalid storage URL format");

    let storagePath = urlParts[1];
    storagePath = storagePath.split("?")[0];
    storagePath = decodeURIComponent(storagePath);

    const imageRef = ref(storage, storagePath);
    await deleteObject(imageRef);
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};

export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);

  const handleFileUpload = async (file, folder = "blog-images") => {
    if (!file) return null;

    try {
      setIsUploading(true);
      setUploadError(null);
      setUploadProgress(0);

      const url = await uploadImage(file, folder, (progress) => {
        setUploadProgress(progress);
      });

      return url;
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadError(error.message || "Failed to upload image");
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    handleFileUpload,
    isUploading,
    uploadProgress,
    uploadError,
    resetUploadState: () => {
      setIsUploading(false);
      setUploadProgress(0);
      setUploadError(null);
    },
  };
};

export default {
  uploadImage,
  deleteImage,
  useImageUpload,
};
