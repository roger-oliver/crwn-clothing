import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import Button from '../button/button.component';
import './product-card.styles.scss';

const ProductCard = (props) => {
  const { name, price, imageUrl } = props.product;
  const { addItemToCart } = useContext(CartContext);

  const addProductToCart = () => addItemToCart(props.product);

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
