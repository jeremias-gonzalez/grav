import { useState, useContext, useEffect, lazy, Suspense } from 'react';
import Navbar from '../Navbar/Navbar';
import { DataContext } from '../Context/DataContext';
import Footer from '../Footer/Footer';
import SliderDetail from '../SliderDetail/SliderDetail';
import Skeleton from '../Skeleton/Skeleton'; 
import './animate.css';
import { Link } from 'react-router-dom';
import Loader from '../ui/loader';

const Products = lazy(() => import('../Products/Products')); 

const Home = () => {
  const [countProducts, setCountProducts] = useState(0);
  const [visibleProducts, setVisibleProducts] = useState(4); // Número inicial de productos visibles
  const [isLoading, setIsLoading] = useState(true); 
  const [loadingMore, setLoadingMore] = useState(false); // Estado para el loader al cargar más productos
  const { data } = useContext(DataContext);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      setFilteredProducts(data); // Actualiza con los productos filtrados según la lógica
    }
  }, [data]);

  // Simular un tiempo de carga inicial de 2.5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); 
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Función para cargar más productos
  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleProducts(prevVisible => prevVisible + 8); // Cargar 8 productos adicionales
      setLoadingMore(false);
    }, 1500); // Simula un retardo de 1.5 segundos
  };

  return (
    <div>
      <Navbar />
      <SliderDetail />
      <div>
        <div className="flex flex-col md:flex-row justify-center items-center p-4 bg-white">
          <div className="flex flex-col items-center mb-4 md:mb-0">
            <div className="flex items-center justify-center mb-2">
              <svg width="10%" height="40%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* SVG Icon */}
              </svg>
            </div>
            <h3 className="text-md montserrat text-gray-800">ENVIAMOS TU COMPRA</h3>
            <p className="text-gray-600 montserrat text-xs">Entregas a todo el país</p>
          </div>

          <div className="flex flex-col items-center mb-4 md:mb-0">
            <div className="flex items-center justify-center mb-2">
              <svg width="10%" height="40%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* SVG Icon */}
              </svg>
            </div>
            <h3 className="text-md montserrat text-gray-900">PAGÁ CON: </h3>
            <p className="text-gray-600 montserrat text-xs">TRANSFERENCIA BANCARIA</p>
          </div>
        </div>

        <div className='text-center mt-10'>
          <h1 className='font-kelsi text-3xl uppercase'>Bienvenidos a <span className='text-custom-blue font-kelsi2'>Grav</span></h1>
          <p className='mt-3 text-md montserrat mx-20 text-gray-400'>Te invitamos a explorar todo lo mejor que tenemos para vos!</p>
          <Link to="/categories">
          <div className='flex my-10 justify-center  '>
             <p className='underline  text-custom-blue montserrat '>Ver todo en Productos</p>
             <svg width="3%" height="3%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-custom-blue svg-hover mt-1.5 mx-1 md:w-5 md:my-1 md:ml-[-.1rem]">
  <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>        
          </div>
          </Link>

          {/* Suspense y Skeleton para Products */}
          <Suspense fallback={<Skeleton />}>
            {!isLoading ? (
              <Products filteredProducts={filteredProducts.slice(0, visibleProducts)} />
            ) : (
              <Skeleton />
            )}
          </Suspense>
          {loadingMore && <Skeleton />} {/* Segundo skeleton mientras se carga más contenido */}
        </div>
        {visibleProducts < filteredProducts.length && (
          <div className="flex justify-center mt-4">
            <button
              onClick={handleLoadMore}
              className="text-custom-blue my-10 underline montserrat rounded-md"
            >
              {loadingMore ? <Loader /> : 'Ver más'}
            </button>
          </div>
        )}
        </div>
        <Link to="/categories">
          <div className='flex my-16 justify-center  '>
             <p className='underline  text-custom-blue montserrat '>Ver todo en Productos</p>
             <svg width="3%" height="3%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-custom-blue svg-hover mt-1.5 mx-1 md:w-5 md:my-1 md:ml-[-.1rem]">
  <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>        
          </div>
          </Link>
        <Footer />
      </div>
    
  );
};

export default Home;
