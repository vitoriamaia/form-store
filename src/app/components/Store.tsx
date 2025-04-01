import React, { useState } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa"; // Importando ícones de estrela
import './Store.css'

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  rating: number; // Adicionando a propriedade de avaliação
}

interface CartItem {
  product: Product;
  quantity: number;
}

const Store: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Lista de produtos hardcoded
  const products: Product[] = [
    {
      id: 1,
      name: "Product 1",
      price: 19.99,
      imageUrl: "/assets/product1.jpg",
      rating: 4.5, // Avaliação do produto
    },
    {
      id: 2,
      name: "Product 2",
      price: 29.99,
      imageUrl: "/assets/product1.jpg",
      rating: 3.5, // Avaliação do produto
    },
    {
      id: 3,
      name: "Product 3",
      price: 39.99,
      imageUrl: "/assets/product1.jpg",
      rating: 5, // Avaliação do produto
    },
  ];

  // Função para adicionar produto ao carrinho
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const productInCart = prevCart.find(item => item.product.id === product.id);
      if (productInCart) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2);
  };

  // Função para exibir as estrelas com base na avaliação
  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={i} className="text-yellow-400" />
        ))}
        {halfStars === 1 && <FaStarHalfAlt className="text-yellow-400" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaStar key={fullStars + halfStars + i} className="text-gray-300" />
        ))}
      </>
    );
  };

  return (
    <section className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto flex justify-center rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold">Store</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-5">
        {/* Exibindo os produtos */}
        {products.map((product) => (
          <div key={product.id} className="custom-card">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="image-style"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>

              {/* Exibindo a avaliação antes do preço */}
              <div className="flex items-center space-x-2 mb-2">
                {renderRating(product.rating)}
              </div>

              <p className="text-gray-600 text-sm">{`$${product.price.toFixed(2)}`}</p>
              <button
                onClick={() => addToCart(product)}
                className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Carrinho */}
      <div className="mt-10 max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="max-w-4xl mx-auto flex justify-center rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-black">Shopping Cart</h1>
        </div>
        {cart.length === 0 ? (
          <p className="text-gray-500">Your shopping cart is empty</p>
        ) : (
          <div>
            <ul className="space-y-4">
              {cart.map((item) => (
                <li key={item.product.id} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-md mr-4"
                    />
                    <span className="font-medium text-black">{item.product.name}</span>
                  </div>
                  <span className="text-black">{`$${(item.product.price * item.quantity).toFixed(2)}`}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex justify-between items-center">
              <span className="text-lg font-semibold text-black">Total:</span>
              <span className="text-xl font-bold text-black">{`$${getTotal()}`}</span>
            </div>

            <button
              className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md"
              disabled={cart.length === 0}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Store;
