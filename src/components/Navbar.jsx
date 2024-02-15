import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { BsFillPencilFill } from 'react-icons/bs';
import { MdOutlineShoppingCart } from 'react-icons/md';
import Button from './Button';
import User from './User';
import { useAuthContext } from './context/AuthContext';

export default function Navbar() {
  const { user, login, logout } = useAuthContext();

  return (
    <header className="flex justify-between border-b border-gray-300 p-2 font-semibold">
      <Link to="/" className="flex items-center text-4xl text-brand">
        <FiShoppingBag />
        <h1>Shoppy</h1>
      </Link>
      <nav className="flex items-center gap-4">
        <Link to="/products">Products</Link>
        <Link to="/carts">
          <MdOutlineShoppingCart className="text-2xl" />
        </Link>
        {user?.isAdmin && (
          <Link to="/products/new" className="text-2xl">
            <BsFillPencilFill />
          </Link>
        )}
        {user && <User user={user} />}
        {!user && <Button onClick={login} text={'Login'}></Button>}
        {user && <Button onClick={logout} text={'Logout'}></Button>}
      </nav>
    </header>
  );
}
