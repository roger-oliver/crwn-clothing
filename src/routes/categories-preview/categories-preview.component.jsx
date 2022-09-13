import './categories-preview.styles.scss';
import { Fragment } from 'react';
import CategoryPreview from '../../components/category-preview/category.preview.component';
import { useSelector } from 'react-redux';
import {
  getCategoriesMap,
  selectCategoriesIsLoading,
} from '../../store/categories/category.selector';
import Spinner from '../../components/spinner/spinner.component';

const CategoriesPreview = () => {
  const categoriesMap = useSelector(getCategoriesMap);
  const categoriesIsLoading = useSelector(selectCategoriesIsLoading);

  return (
    <Fragment>
      {categoriesIsLoading ? (
        <Spinner />
      ) : (
        Object.keys(categoriesMap).map((title) => {
          return (
            <CategoryPreview
              key={title}
              title={title}
              products={categoriesMap[title]}
            />
          );
        })
      )}
    </Fragment>
  );
};

export default CategoriesPreview;
