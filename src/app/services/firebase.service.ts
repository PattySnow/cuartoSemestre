import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  query,
  getDocs,
  where,
  addDoc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { doc } from "firebase/firestore";

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firestore: Firestore) {}

  // Obtener una colección de documentos
  async getDocuments(collectionName: string) {
    const q = query(collection(this.firestore, collectionName));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
  }
  
  // Agregar un documento a una colección
  async addDocument(collectionName: string, data: any) {
    const docRef = await addDoc(collection(this.firestore, collectionName), data);
    return docRef.id;
  }

  // Actualizar un documento en una colección
  async updateDocument(collectionName: string, documentId: string, data: any) {
    const docRef = doc(this.firestore, `${collectionName}/${documentId}`);
    await updateDoc(docRef, data);
  }

  // Eliminar un documento de una colección
  async deleteDocument(collectionName: string, documentId: string) {
    const docRef = doc(this.firestore, `${collectionName}/${documentId}`);
    await deleteDoc(docRef);
  }

  // Filtrar documentos en una colección con una condición
  async getDocumentsWithCondition(
    collectionName: string,
    field: string,
    operator: any,
    value: any
  ) {
    const q = query(
      collection(this.firestore, collectionName),
      where(field, operator, value)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
  }
}
