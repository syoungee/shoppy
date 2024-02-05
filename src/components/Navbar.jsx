import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { BsFillPencilFill } from 'react-icons/bs';
import { auth } from '../auth/firebaseAuth';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useState } from 'react';

export default function Navbar() {
  const [userData, setUserData] = useState(null);

  function handleGoogleLogin() {
    const provider = new GoogleAuthProvider(); // provider 구글 설정
    signInWithPopup(auth, provider) // 팝업창 띄워서 로그인
      .then((data) => {
        console.log('성공적으로 로그인!');
        setUserData(data.user); // user data 설정
        console.log(data); // console에 UserCredentialImpl 출력
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleGoogleLogout() {
    const provider = new GoogleAuthProvider();
    signOut(auth, provider)
      .then((data) => {
        console.log('성공적으로 로그아웃!');
        console.log(data);
        setUserData(null);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <header class="flex justify-between border-b border-gray-300 p-2 font-semibold">
      <Link to="/" class="flex items-center text-4xl text-brand">
        <FiShoppingBag />
        <h1>Shoppy</h1>
      </Link>
      <nav class="flex items-center gap-4">
        <Link to="/products">Products</Link>
        <Link to="/carts">Carts</Link>
        <Link to="/products/new" class="text-2xl">
          <BsFillPencilFill />
        </Link>
        <div>{userData ? <img src={userData.reloadUserInfo.photoUrl}></img> : null}</div>
        <button onClick={handleGoogleLogin}>Login</button>
        <button onClick={handleGoogleLogout}>Logout</button>
      </nav>
    </header>
  );
}
