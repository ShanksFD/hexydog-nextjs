import { app } from "@/firebase";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

const db = getFirestore(app);

export async function getBlogPosts(pageSize = 6) {
  try {
    const blogsRef = collection(db, "blogs");
    const q = query(
      blogsRef,
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      limit(pageSize)
    );

    const querySnapshot = await getDocs(q);
    const blogs = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      blogs.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      });
    });

    return blogs;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export async function getBlogPost(slug) {
  try {
    const blogsRef = collection(db, "blogs");
    const q = query(
      blogsRef,
      where("slug", "==", slug),
      where("published", "==", true),
      limit(1)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      };
    }

    const docRef = doc(db, "blogs", slug);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists() && docSnap.data().published) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      };
    }

    return null;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

export async function getRelatedPosts(currentBlog) {
  if (!currentBlog || !currentBlog.tags || currentBlog.tags.length === 0) {
    return [];
  }

  try {
    const blogsRef = collection(db, "blogs");
    const q = query(
      blogsRef,
      where("published", "==", true),
      where("tags", "array-contains-any", currentBlog.tags.slice(0, 10)),
      limit(4)
    );

    const querySnapshot = await getDocs(q);
    const related = [];

    querySnapshot.forEach((doc) => {
      if (doc.id !== currentBlog.id) {
        const data = doc.data();
        related.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        });
      }
    });

    return related.slice(0, 3);
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }
}
