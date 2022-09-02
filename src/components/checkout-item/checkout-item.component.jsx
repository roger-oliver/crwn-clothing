import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import './checkout-item.styles.scss';

const CheckoutItem = (props) => {
  const { id, name, imageUrl, price, quantity } = props.cartItem;

  const { clearItemFromCart, addItemToCart, removeItemFromCart } = useContext(CartContext);

  const clearItemFromCartHandler = () => {
    clearItemFromCart(id);
  }

  const increaseItem = () => {
    addItemToCart(props.cartItem);
  }

  const decreaseItem = () => {
    removeItemFromCart(props.cartItem);
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