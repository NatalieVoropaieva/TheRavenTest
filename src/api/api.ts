import { initializeApp } from 'firebase/app'
import { addDoc, collection, doc, getDoc, getDocs, getFirestore } from 'firebase/firestore'
import type { ProductModel } from '../models/ProductModel.ts'
import type { OrderModel } from '../models/OrderModel.ts'

export const firebaseConfig = {
  apiKey: 'AIzaSyAx2x43M4QFSFDUHPlTKtsfL_p5dxI0ync',
  authDomain: 'raventest-e75fe.firebaseapp.com',
  projectId: 'raventest-e75fe',
  storageBucket: 'raventest-e75fe.appspot.com',
  messagingSenderId: '668281338797',
  appId: '1:668281338797:web:00d4c29ca8c5babba0bf24',
}

let app = initializeApp(firebaseConfig)

const PRODUCTS_COLLECTION = 'products'
export const getAllProducts = async (): Promise<ProductModel[]> => {
  try {
    const db = getFirestore(app)
    const res: ProductModel[] = []
    const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION))
    querySnapshot.forEach((doc) => {
      const product = doc.data() as ProductModel
      product.id = doc.id
      res.push(product)
    })
    return res
  } catch (e) {
    console.log('e', e)
    throw e
  }
}
export const getProductById = async (id: string): Promise<ProductModel | null> => {
  try {
    const db = getFirestore(app)
    const docRef = doc(db, PRODUCTS_COLLECTION, id)
    const docSnap = await getDoc(docRef)
    return docSnap.exists() ? (docSnap.data() as ProductModel) : null
  } catch (e) {
    console.log('e', e)
    throw e
  }
}
export const createOrder = async (order: OrderModel): Promise<void> => {
  try {
    const db = getFirestore(app)
    await addDoc(collection(db, 'order'), {
      ...order,
    })
  } catch (e) {
    console.log('e', e)
    throw e
  }
}
