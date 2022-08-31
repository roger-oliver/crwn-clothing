import './cart-dropdown.styles.scss';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CartDropdown = (props) => {

  const { cartItems } = useContext(CartContext);

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {
          cartItems.map(cartItem => {
            return <CartItem key={cartItem.id} cartItem={cartItem}></CartItem>
          })
        }
      </div>
      <Button buttonText='go to checkout' />
    </div>
  );
}

export default CartDropdown;