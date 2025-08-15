import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { app } from "../firebase";

const db = getFirestore(app);

/**
 * Log wallet connection errors to Firebase
 * @param {Object} errorData - Error information
 * @param {string} errorData.message - Error message
 * @param {string} errorData.walletType - Wallet type (trust, coinbase, etc.)
 * @param {Object} [errorData.error] - Original error object
 * @param {Object} [errorData.metadata] - Additional metadata
 * @returns {Promise<string|null>} - Document ID or null if failed
 */
export const logWalletError = async (errorData) => {
  try {
    const errorCollection = collection(db, "walletErrors");

    const errorDoc = {
      message: errorData.message || "Unknown error",
      walletType: errorData.walletType || "unknown",
      userAgent: navigator.userAgent,
      isMobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
      // Only include these fields if they exist
      ...(errorData.error?.code !== undefined && {
        errorCode: errorData.error.code,
      }),
      ...(errorData.error?.name && { errorName: errorData.error.name }),
      ...(errorData.error?.message && {
        errorMessage: errorData.error.message,
      }),
      metadata: errorData.metadata || {},
      timestamp: serverTimestamp(),
    };

    const docRef = await addDoc(errorCollection, errorDoc);
    return docRef.id;
  } catch (error) {
    console.error("Failed to log wallet error:", error);
    return null;
  }
};

/**
 * Detect wallet type from window.ethereum provider
 * @returns {string} Wallet type identifier
 */
export const detectWalletType = () => {
  if (!window.ethereum) return "unknown";

  if (window.ethereum.isTrust) return "trust";
  if (window.ethereum.isCoinbaseWallet) return "coinbase";
  if (window.ethereum.isMetaMask) return "metamask";
  if (window.ethereum.isPhantom) return "phantom";

  return "unknown";
};
