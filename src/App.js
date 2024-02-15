import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthContextProvider from './components/context/AuthContext';
import CartContextProvider from './components/context/CartContext';
import Navbar from './components/Navbar';

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <CartContextProvider>
          <Navbar />
          <Outlet />
        </CartContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
