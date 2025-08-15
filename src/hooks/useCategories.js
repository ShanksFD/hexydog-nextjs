import { useState, useEffect, useCallback } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

import { app } from "../firebase";

const db = getFirestore(app);

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const categoriesRef = collection(db, "categories");
      const q = query(categoriesRef, orderBy("name"));
      const querySnapshot = await getDocs(q);

      const categoriesList = [];
      querySnapshot.forEach((doc) => {
        categoriesList.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setCategories(categoriesList);
    } catch (err) {
      setError(err.message || "Failed to fetch categories");
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addCategory = async (name, slug = "") => {
    setLoading(true);
    setError(null);

    try {
      const finalSlug =
        slug ||
        name
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-");

      const categoriesRef = collection(db, "categories");
      const newCategory = {
        name,
        slug: finalSlug,
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(categoriesRef, newCategory);

      setCategories([...categories, { id: docRef.id, ...newCategory }]);

      return { id: docRef.id, ...newCategory };
    } catch (err) {
      setError(err.message || "Failed to add category");
      console.error("Error adding category:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const categoryRef = doc(db, "categories", id);
      await deleteDoc(categoryRef);

      setCategories(categories.filter((category) => category.id !== id));

      return id;
    } catch (err) {
      setError(err.message || "Failed to delete category");
      console.error("Error deleting category:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    error,
    fetchCategories,
    addCategory,
    deleteCategory,
  };
};

export default useCategories;
