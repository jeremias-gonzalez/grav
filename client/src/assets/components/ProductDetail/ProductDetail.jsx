import React, { useState } from "react"; // Asegúrate de que esta línea esté presente
import { FaArrowLeft, FaArrowRight, FaStar, FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";

const ProductDetail = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const product = {
    name: "Air Max Velocity",
    price: "$149.99",
    description: "Experience ultimate comfort and style with the Air Max Velocity sneakers. Featuring advanced cushioning technology and a sleek design.",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2",
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb"
    ],
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Red", "Blue", "White"],
    specifications: [
      { label: "Upper Material", value: "Breathable mesh" },
      { label: "Sole", value: "Rubber with Air cushioning" },
      { label: "Closure", value: "Lace-up" },
      { label: "Style", value: "Athletic, Casual" }
    ],
    reviews: [
      { author: "Mike R.", rating: 5, comment: "Most comfortable sneakers I've ever worn!" },
      { author: "Lisa T.", rating: 4, comment: "Great for running and everyday use. Stylish too!" }
    ],
    relatedProducts: [
      { name: "Running Socks", price: "$12.99", image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82" },
      { name: "Shoe Cleaner Kit", price: "$24.99", image: "https://images.unsplash.com/photo-1600369671236-e74521d4b6ad" }
    ]
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-100">
      <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Product Images Slider */}
        <div className="lg:w-1/2 bg-gray-200">
          <div className="relative h-96 lg:h-full">
            <motion.img
              key={currentImage}
              src={product.images[currentImage]}
              alt={`Product image ${currentImage + 1}`}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Previous image"
            >
              <FaArrowLeft className="text-gray-800" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Next image"
            >
              <FaArrowRight className="text-gray-800" />
            </button>
          </div>
          <div className="flex mt-4 space-x-2 px-4 pb-4">
            {product.images.map((img, index) => (
              <motion.img
                key={index}
                src={img}
                alt={`Product thumbnail ${index + 1}`}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer ${index === currentImage ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => setCurrentImage(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="lg:w-1/2 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-2xl text-blue-600 font-semibold mb-4">{product.price}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          
          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Select Size:</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-full ${selectedSize === size
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  } transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Select Color:</h3>
            <div className="flex space-x-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${selectedColor === color ? 'ring-2 ring-blue-500' : ''}`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  aria-label={`Select ${color} color`}
                />
              ))}
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center">
            <FaShoppingCart className="mr-2" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Grid Layout for Additional Information */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Specifications */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
          <h2 className="text-2xl font-semibold mb-4">Specifications</h2>
          <ul className="space-y-2">
            {product.specifications.map((spec, index) => (
              <li key={index} className="flex justify-between">
                <span className="font-medium">{spec.label}</span>
                <span className="text-gray-600">{spec.value}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Reviews */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
          <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
          <div className="space-y-4">
            {product.reviews.map((review, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <div className="flex items-center mb-2">
                  <span className="font-medium mr-2">{review.author}</span>
                  <div className="flex text-yellow-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
          <h2 className="text-2xl font-semibold mb-4">Related Products</h2>
          <div className="space-y-4">
            {product.relatedProducts.map((related, index) => (
              <div key={index} className="flex items-center">
                <img src={related.image} alt={related.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                <div>
                  <h3 className="font-medium">{related.name}</h3>
                  <p className="text-gray-600">{related.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
