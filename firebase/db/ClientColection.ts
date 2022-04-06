import { firestoreDb } from '../config'
import firestore, {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore'
import Client from '../../src/core/Client'
import ClientRepository from '../../src/core/ClientRepository'
 
export default class ClientColection implements ClientRepository {
 
  #conversor = {
    toFirestore: (client: Client) => {
      return {
        name: client.name,
        age: client.age,
      }
    },
    fromFirestore: (
      snapshot: firestore.QueryDocumentSnapshot,
      options: firestore.SnapshotOptions,
      ) => {
        const data = snapshot.data(options)
        return new Client(snapshot.id, data.name, data.age)
      },
    }
    
  #clientColection = collection(firestoreDb, 'clients').withConverter(this.#conversor)
 
  async save(client: Client): Promise<Client> {
    if (client?.id) {
      await setDoc(
        doc(firestoreDb, 'clients', client.id).withConverter(this.#conversor),
        client,
      )
      return client
    } else {
      const docRef = await addDoc(
        this.#clientColection,
        client,
      )
      const doc = await getDoc(docRef)
      return doc.data()
    }
  }
 
  async remove(client: Client): Promise<void> {
    return await deleteDoc(doc(firestoreDb, 'clients', client.id))
  }
 
  async getAll(): Promise<Client[]> {
    const clientsCol = this.#clientColection
    const clientsSnapshot = await getDocs(clientsCol)
    const clientsList = clientsSnapshot.docs.map((doc) => doc.data()) ?? []
    return clientsList
  }
}