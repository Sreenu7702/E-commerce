import {
  createContext,
  useState,
} from "react";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
};

type CartItem = Product & {
  quantity: number;
};

export type CartContextType = {
  cart: CartItem[];

  addToCart: (
    product: Product
  ) => void;

  removeFromCart: (
    id: number
  ) => void;

  increaseQuantity: (
    id: number
  ) => void;

  decreaseQuantity: (
    id: number
  ) => void;

  clearCart: () => void;
};

type CartProviderProps = {
  children: React.ReactNode;
};

export const CartContext =
  createContext<CartContextType | null>(
    null
  );

function CartProvider({
  children,
}: CartProviderProps) {
  const [cart, setCart] =
    useState<CartItem[]>([]);

  const addToCart = (
    product: Product
  ) => {
    const existingProduct = cart.find(
      (item) =>
        item.id === product.id
    );

    if (existingProduct) {
      const updatedCart = cart.map(
        (item) =>
          item.id === product.id
            ? {
                ...item,
                quantity:
                  item.quantity + 1,
              }
            : item
      );

      setCart(updatedCart);
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  const increaseQuantity = (
    id: number
  ) => {
    const updatedCart = cart.map(
      (item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item
    );

    setCart(updatedCart);
  };

  const decreaseQuantity = (
    id: number
  ) => {
    const updatedCart = cart.map(
      (item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                item.quantity - 1,
            }
          : item
    );

    setCart(
      updatedCart.filter(
        (item) =>
          item.quantity > 0
      )
    );
  };

  const removeFromCart = (
    id: number
  ) => {
    setCart(
      cart.filter(
        (item) => item.id !== id
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;