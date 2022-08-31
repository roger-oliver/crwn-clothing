import './cart-dropdown.styles.scss';
import Button from '../button/button.component';

const CartDropdown = (props) => {
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items"></div>
      <Button buttonText='go to checkout' />
    </div>
  );
}

export default CartDropdown;