import './categories-preview.styles.scss';
import { Fragment } from 'react';
import CategoryPreview from '../../components/category-preview/category.preview.component';
import { useSelector } from 'react-redux';
import { getCategoriesMap } from '../../store/categories/category.selector';

const CategoriesPreview = () => {
  const categoriesMap = useSelector(getCategoriesMap)

  return (
    <Fragment>
      {
        categoriesMap &&
        Object.keys(categoriesMap).map(title => {
          return (
            <CategoryPreview key={title} title={title} products={categoriesMap[title]} />
          )
        })
      }
    </Fragment>
  );
};

export default CategoriesPreview;
