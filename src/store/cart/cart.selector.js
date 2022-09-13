import { createSelector } from "reselect";

const cartStateNode = state => state.cart;

export const selectCartItems = createSelector(
  [cartStateNode],
  (cartSlice) => {
    return cartSlice.cartItems;
  }
);

export const selectCartCount = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0)
)

export const selectCartTotal = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0)
)

// as "selectCartItems" isn't running business logic
// and all "observers" are memoised, no need to memoise
// selectCartItems in a second selector
export const selectIsCartOpen = createSelector(
  [cartStateNode],
  (cartSlice) => {
    return cartSlice.isCartOpen;
  }
)