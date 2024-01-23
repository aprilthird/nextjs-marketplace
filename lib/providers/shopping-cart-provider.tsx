"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import CartList from "@/lib/models/cart-list";
import CartItem from "../models/cart-item";

export interface ShoppingCartContextInterface {
  lists: CartList[];
  setLists: Dispatch<SetStateAction<CartList[]>>;
  increaseQuantity: (item: CartItem) => void;
  decreaseQuantity: (item: CartItem) => void;
  removeList: (id: number) => void;
}

const defaultState = {
  lists: [],
  setLists: (value: CartList[]) => {},
  increaseQuantity: (item: CartItem) => {},
  decreaseQuantity: (item: CartItem) => {},
  removeList: (id: number) => {},
} as ShoppingCartContextInterface;

export const ShoppingCartContext = createContext(defaultState);

type Props = {
  children?: React.ReactNode;
};

export const ShoppingCartProvider = ({ children }: Props) => {
  const [lists, setLists] = useState([] as CartList[]);

  function isSameCartItem(item1: CartItem, item2: CartItem): boolean {
    return (
      item1.product.id === item2.product.id &&
      item1.selectedColor === item2.selectedColor &&
      item1.selectedSize === item2.selectedSize &&
      item1.selectedProductPriceKey === item2.selectedProductPriceKey
    );
  }

  function increaseQuantity(item: CartItem) {
    setLists((prevLists: CartList[]) =>
      prevLists.map((cartList: CartList) => {
        const itemIndex = cartList.items.findIndex((cartItem) =>
          isSameCartItem(cartItem, item)
        );
        if (itemIndex > -1) {
          const newItem = {
            ...cartList.items[itemIndex],
            quantity: cartList.items[itemIndex].quantity + 1,
          };
          return {
            ...cartList,
            items: [
              ...cartList.items.slice(0, itemIndex),
              newItem,
              ...cartList.items.slice(itemIndex + 1),
            ],
          };
        }
        return cartList;
      })
    );
  }

  function decreaseQuantity(item: CartItem) {
    setLists((prevLists: CartList[]) =>
      prevLists
        .map((cartList: CartList) => {
          const itemIndex = cartList.items.findIndex((cartItem) =>
            isSameCartItem(cartItem, item)
          );
          if (itemIndex > -1) {
            if (cartList.items[itemIndex].quantity == 1) {
              return {
                ...cartList,
                items: cartList.items.filter(
                  (cartItem) => !isSameCartItem(cartItem, item)
                ),
              };
            } else {
              const newItem = {
                ...cartList.items[itemIndex],
                quantity: cartList.items[itemIndex].quantity - 1,
              };
              return {
                ...cartList,
                items: [
                  ...cartList.items.slice(0, itemIndex),
                  newItem,
                  ...cartList.items.slice(itemIndex + 1),
                ],
              };
            }
          }
          return cartList;
        })
        .filter((cartList) => cartList.items.length > 0)
    );
  }

  function removeList(id: number) {
    setLists((prevLists) => prevLists.filter((list, index) => index !== id));
  }

  useEffect(() => {
    const jsonCart = localStorage.getItem("cart");
    if (jsonCart != null) {
      const itemsFromStorage = JSON.parse(jsonCart) as CartList[];
      setLists(itemsFromStorage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(lists));
  }, [lists]);

  return (
    <ShoppingCartContext.Provider
      value={{
        lists,
        setLists,
        increaseQuantity,
        decreaseQuantity,
        removeList,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const useShoppingCart = () => {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error(
      "useShoppingCart debe ser usado dentro de un ShoppingCartProvider"
    );
  }
  return context;
};
