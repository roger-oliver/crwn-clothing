import './cart-dropdown.styles.scss';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { useNavigate } from 'react-router-dom';

const CartDropdown = (props) => {

  const { cartItems, setIsCartOpen } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  }

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {
          cartItems.map(cartItem => {
            return <CartItem key={cartItem.id} cartItem={cartItem}></CartItem>
          })
        }
      </div>
      <Button buttonText='go to checkout' onClick={goToCheckoutHandler} />
    </div>
  );
}

export default CartDropdown;