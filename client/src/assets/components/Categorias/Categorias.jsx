import React, { useState, useEffect, useContext } from "react";
import { FaSearch } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Products from "../Products/Products";
import Skeleton from "../Skeleton/Skeleton";
import { Link } from "react-router-dom";
import { DataContext } from '../Context/DataContext'; // Importa tu contexto

const Categorias = () => {
  const { data } = useContext(DataContext); // Obtiene los datos del contexto
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // Inicializa como arreglo vacío
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("popularity");
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga

  const [filters, setFilters] = useState({
    brand: "",
    priceRange: "",
    sizes: "",
    color: "",
  });

  const productsPerPage = 4;

  // Estado para controlar la cantidad de productos a mostrar
  const [displayedProducts, setDisplayedProducts] = useState(productsPerPage);

  useEffect(() => {
    setProducts(data);  // Usa los datos directamente desde el contexto
    setFilteredProducts(data); // Inicializa los productos filtrados
  }, [data]);

  useEffect(() => {
    let result = [...products];

    // Filtro por marca
    if (filters.brand) {
      result = result.filter((product) => product.brand === filters.brand);
    }

    // Filtro por rango de precios
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-");
      result = result.filter(
        (product) => product.price >= Number(min) && product.price <= Number(max)
      );
    }

    // Filtro por talle (si el producto tiene varias tallas)
    if (filters.sizes) {
      result = result.filter((product) =>
        product.sizes.some((size) => size.name === filters.sizes && size.inStock)
      );
    }

    // Filtro por color
    if (filters.color) {
      result = result.filter((product) => product.color === filters.color);
    }

    // Aplicar búsqueda
    if (searchTerm) {
      result = result.filter((product) =>
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.model.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenar resultados
    switch (sortOption) {
      case "price-low-high":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "popularity":
        result.sort((a, b) => b.popularity - a.popularity);
        break;
      default:
        break;
    }

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [products, filters, searchTerm, sortOption]);

  const indexOfLastProduct = currentPage * displayedProducts;
  const indexOfFirstProduct = indexOfLastProduct - displayedProducts;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Función para cargar más productos
  const loadMoreProducts = () => {
    setDisplayedProducts((prev) => prev + productsPerPage);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Cambia el estado a false después de 2 segundos
    }, 2000);

    // Limpiar el timer si el componente se desmonta
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-10 py-8">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl mt-[-1rem] ml-[-1.5rem] mb-[2rem] items-center space-x-2 px-1 sm:px-6 lg:max-w-7xl lg:px-8">
            <li>
              <div className="flex items-center">
                <Link to="/"><a href="#" className="mr-2 text-xs montserrat text-gray-900">Inicio</a></Link>
                <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" className="h-5 w-4 text-gray-300">
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <a href="#" className="mr-2 text-xs montserrat text-gray-900">Productos</a>
                <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" className="h-5 w-4 text-gray-300">
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-1">
            <div className="flex">
              <input
                type="text"
                className="border border-gray-300 rounded-lg p-2"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={handleSearch}
              />
              <button className="ml-2 p-2 bg-gray-700 text-white rounded-lg">
                <FaSearch />
              </button>
            </div>

            {/* Filtros de productos */}
            <div className="mt-4">
              <label className="block">Filtrar por marca:</label>
              <select
                name="brand"
                value={filters.brand}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              >
                <option value="">Todas las marcas</option>
                <option value="Nike">Nike</option>
                <option value="Adidas">Adidas</option>
                <option value="Puma">Puma</option>
                <option value="Reebok">Reebok</option>
              </select>
            </div>

            <div className="mt-4">
              <label className="block">Filtrar por precio:</label>
              <select
                name="priceRange"
                value={filters.priceRange}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              >
                <option value="">Todos los precios</option>
                <option value="0-50">$0 - $50</option>
                <option value="50-100">$50 - $100</option>
                <option value="100-200">$100 - $200</option>
              </select>
            </div>

            {/* Select para ordenar productos */}
            <div className="mt-4">
              <label className="block">Ordenar por:</label>
              <select
                value={sortOption}
                onChange={handleSortChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              >
                <option value="popularity">Popularidad</option>
                <option value="price-low-high">Precio: Bajo a Alto</option>
                <option value="price-high-low">Precio: Alto a Bajo</option>
              </select>
            </div>
          </div>

          <div className="col-span-2">
            {isLoading ? (
              <Skeleton />
            ) : (
              <>
                <Products filteredProducts={currentProducts} /> {/* Asegúrate de pasar filteredProducts aquí */}
                <div className="mt-4 text-center">
                  {currentPage < Math.ceil(filteredProducts.length / displayedProducts) && (
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                      onClick={loadMoreProducts}
                    >
                      Cargar más productos
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Categorias;
