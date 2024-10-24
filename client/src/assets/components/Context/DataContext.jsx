import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Crear el contexto
export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderForm, setOrderForm] = useState([]);
  const [filters, setFilters] = useState({
    brand: '',
    priceRange: [0, 1000],
    size: '',
    color: '',
  });

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/sheet-data");
        // console.log(res.data); // Para verificar los datos
    
        // Asumiendo que cada producto es un arreglo con las columnas en el orden: id, brand, model, price, image
        const formattedData = res.data.map(product => ({
          id: product[0],                     // id
          brand: product[1],                  // brand
          model: product[2],                  // model
          price: parseFloat(product[3].replace('.', '').replace(',', '.')) || null, // Limpieza del precio
          image: product[4],               // image
        }));
    
        setData(formattedData); // Guarda los datos transformados
      } catch (error) {
        console.error("Error al cargar los datos", error);
      }
    };
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data, cart, setCart, selectedProduct, setSelectedProduct, isCartOpen, toggleCart, filters, setFilters ,
      orderForm,    // Exponemos el estado del formulario de pedido
      setOrderForm  // Exponemos la función para modificar el estado del formulario de pedido
    }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
