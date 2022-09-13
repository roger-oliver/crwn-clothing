import './cart-dropdown.styles.scss';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';

const CartDropdown = (props) => {

  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    dispatch(setIsCartOpen(false));
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