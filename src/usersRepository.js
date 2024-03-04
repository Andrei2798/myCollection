import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { app } from "../firebase";

export class UsersRepository {
  db = getFirestore(app);
  collectionName = "users";

  async create(params) {
    try {
      const docRef = await addDoc(
        collection(this.db, this.collectionName), // Создание ссылки на коллекцию users в Firestore
        params // Параметры нового пользователя
      );
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async delete(id) {
    try {
      await deleteDoc(doc(this.db, this.collectionName, id));
      console.log("Document successfully deleted!");
    } catch (e) {
      console.error("Error removing document: ", e);
    }
  }

  async deleteMany(ids) {
    try {
      ids.forEach(async (id) => {
        await deleteDoc(doc(this.db, this.collectionName, id));
      });
      console.log("Documents successfully deleted!");
    } catch (e) {
      console.error("Error removing documents: ", e);
    }
  }

  async getAll() {
    const usersSnapshot = await getDocs(
      collection(this.db, this.collectionName)
    );
    const users = [];
    usersSnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    return users;
  }
}

export const usersRepository = new UsersRepository();
