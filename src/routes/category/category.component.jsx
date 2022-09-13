import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.component';
import { getCategoriesMap } from '../../store/categories/category.selector';
import './category.styles.scss';

const Category = (props) => {
  const { category } = useParams();
  const [ products, setProducts ] = useState([]);
  
  const categoriesMap = useSelector(getCategoriesMap);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h2 className='category-title'>{category}</h2>
      <div className='category-container'>
        {
          products && products.map((product) => <ProductCard key={product.id} product={product} />)
        }
      </div>
    </Fragment>
  )
}

export default Category;