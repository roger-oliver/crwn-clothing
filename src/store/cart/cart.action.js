import { createAction } from '../../utils/reducer/reducer.utils';
import { CART_ACTION_TYPES } from './cart.types';

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

  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
    cartItems: newCartItems,
    cartCount: currentCartCount,
    total: currentTotal,
    isCartOpen: newCartItems.isCartOpen || false,
  });
};

export const addItemToCart = (cartItems, productToAdd) =>
  updateCartItemsHandler(addCartItem(cartItems, productToAdd));


export const removeItemFromCart = (cartItems, itemToRemove) =>
  updateCartItemsHandler(removeCartItem(cartItems, itemToRemove));

export const clearItemFromCart = (cartItems, itemIdToClear) =>
  updateCartItemsHandler(clearCartItem(cartItems, itemIdToClear));

export const setIsCartOpen = (isCartOpen) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, { isCartOpen });
