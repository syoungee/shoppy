// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
// import { getDatabase } from 'firebase/database';
import { getDatabase, ref, child, get, set, remove } from 'firebase/database';
// import { push } from 'firebase/database';
import { v4 as uuid } from 'uuid';
// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);
// const database = getDatabase();

export function login() {
  signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
  signOut(auth).catch(console.error);
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}

const database = ref(getDatabase());

// admin user 여부 판단 함수
async function adminUser(user) {
  return await get(child(database, 'admins')) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        console.log(admins);
        const isAdmin = admins.includes(user.uid);
        return { ...user, isAdmin };
      }
      return user;
    })
    .catch((error) => {
      console.error(error);
    });
}

// products에 data upload & push해주는 함수
export async function writeUserData(productData) {
  const id = uuid();

  return set(child(database, `products/${id}`), {
    id,
    title: productData.title,
    price: parseInt(productData.price),
    image: productData.image,
    category: productData.category,
    description: productData.description,
    options: productData.options.split(','),
  });
}

// products 데이터 가져오는 함수
export async function readProductData() {
  return await get(child(database, 'products')) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const products = snapshot.val();
        console.log('products', Object.values(products));
        return Object.values(products);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

// carts 데이터 추가 함수
export async function addCartData(productData) {
  await get(child(database, `carts/${productData.id}`)) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log(data, '존재!!');
        set(child(database, `carts/${productData.id}`), {
          id: productData.id,
          title: productData.title,
          price: parseInt(productData.price),
          image: productData.image,
          category: productData.category,
          description: productData.description,
          option: productData.option,
          quantity: data.quantity + 1,
        });
      } else {
        set(child(database, `carts/${productData.id}`), {
          id: productData.id,
          title: productData.title,
          price: parseInt(productData.price),
          image: productData.image,
          category: productData.category,
          description: productData.description,
          option: productData.option,
          quantity: 1,
        });
      }
    });
}

// cart data 가져오기
export async function readCartData() {
  return await get(child(database, 'carts')) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const carts = snapshot.val();
        // console.log('carts', Object.values(carts));
        return Object.values(carts);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function getCart(userId) {
  return get(child(database, `carts/${userId}`)) //
    .then((snapshot) => {
      const items = snapshot.val() || {};
      return Object.values(items);
    });
}

export async function addOrUpdateToCart(userId, product) {
  return set(child(database, `carts/${userId}/${product.id}`), product);
}

export async function removeFromCart(userId, productId) {
  return remove(child(database, `carts/${userId}/${productId}`));
}
