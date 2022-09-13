import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, clearItemFromCart, removeItemFromCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import './checkout-item.styles.scss';

const CheckoutItem = (props) => {
  const { id, name, imageUrl, price, quantity } = props.cartItem;

  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const clearItemFromCartHandler = () => {
    dispatch(clearItemFromCart(cartItems, id));
  }

  const increaseItem = () => {
    dispatch(addItemToCart(cartItems, props.cartItem));
  }

  const decreaseItem = () => {
    dispatch(removeItemFromCart(cartItems, props.cartItem));
  }

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={decreaseItem}>&#10094;</div>
        {quantity}
        <div className="arrow" onClick={increaseItem}>&#10095;</div>
      </span>
      <span className="price">{price.toFixed(2)}</span>
      <div className="remove-button" onClick={clearItemFromCartHandler}>&#10005;</div>
    </div>
  )
};

export default CheckoutItem;