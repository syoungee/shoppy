import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { BsFillPencilFill } from 'react-icons/bs';
import { login, logout, onUserStateChange } from '../auth/firebaseAuth';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [user, setUser] = useState();

  useEffect(() => {
    // login session check!
    onUserStateChange((user) => {
      console.log(user);
      // user info or null
      setUser(user);
    });
  });
  const handleLogin = () => {
    login().then(setUser);
  };

  const handleLogout = () => {
    logout().then(setUser);
  };

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
        <div>{user ? <img src={user.reloadUserInfo.photoUrl}></img> : null}</div>
        {!user && <button onClick={handleLogin}>Login</button>}
        {user && <button onClick={handleLogout}>Logout</button>}
      </nav>
    </header>
  );
}
