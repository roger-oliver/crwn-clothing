import { createContext, useReducer } from 'react';
import { createAction } from '../utils/reducer/reducer.utils';

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) => {
      return cartItem.id === productToAdd.id
        ? { ...productToAdd, quantity: cartItem.quantity + 1 }
        : cartItem;
    });
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) => {
    return cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem;
  });
};

const clearCartItem = (cartItems, itemIdToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== itemIdToClear);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  // TODO: change name to "increase item unit from cart"
  addItemToCart: () => {},
  cartCount: 0,
  // TODO: change name to "decrease item unit from cart"
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  total: 0,
});

// that is the shape of cart state!!!
const INITIAL_STATE = {
  cartItems: [],
  cartCount: 0,
  total: 0,
  isCartOpen: false,
};

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };

    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        ...payload,
      };

    default:
      break;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const { cartItems, cartCount, total, isCartOpen } = state;

  // as we have many variables to be set, this function was created to 
  // keep the logic apart from the reducer, return only the variables
  // that need to be updated
  const updateCartItemsHandler = (newCartItems) => {
    /**
     * the received object has this shape:
     *    cartItems
     *
     * this method should return the following state components updated:
     *    cartItems
     *    cartTotal
     *    cartCount
     */

    const currentCartCount = newCartItems.reduce((total, item) => {
      return total + item.quantity;
    }, 0);

    const currentTotal = newCartItems.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);

    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartCount: currentCartCount,
        total: currentTotal,
        isCartOpen: newCartItems.isCartOpen || false,
      })
    );
  };

  // these 4 methods we expose through the context provider
  const addItemToCart = (productToAdd) => {
    updateCartItemsHandler(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (itemToRemove) => {
    updateCartItemsHandler(removeCartItem(cartItems, itemToRemove));
  };

  const clearItemFromCart = (itemIdToClear) => {
    updateCartItemsHandler(clearCartItem(cartItems, itemIdToClear));
  };

  const setIsCartOpen = (isCartOpen) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, { isCartOpen }));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    removeItemFromCart,
    clearItemFromCart,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
