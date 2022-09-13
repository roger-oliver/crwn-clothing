import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import Button from '../button/button.component';
import './product-card.styles.scss';

const ProductCard = (props) => {
  const { name, price, imageUrl } = props.product;

  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const addProductToCart = () => dispatch(addItemToCart(cartItems, props.product));

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button
        buttonStyleType="inverted"
        buttonText="Add to Cart"
        onClick={addProductToCart}
      />
    </div>
  );
};

export default ProductCard;
