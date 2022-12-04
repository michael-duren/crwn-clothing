import { useParams } from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';

import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';
import {
  selectCategoriesMap,
  selectIsLoading,
} from '../../store/categories/category.selector';

import {
  CategoryContainerTitle,
  CategoryTitle,
  CategoryContainer,
} from './category.styles';

type CategoryRouteParams = {
  category: string;
};

const Category = () => {
  const { category } = useParams<
    keyof CategoryRouteParams
  >() as CategoryRouteParams;
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectIsLoading);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <CategoryContainerTitle>
        <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
        <CategoryTitle>&</CategoryTitle>
        <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
        <CategoryTitle>&</CategoryTitle>
        <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
        <CategoryTitle>!</CategoryTitle>
      </CategoryContainerTitle>
      {isLoading ? (
        <Spinner />
      ) : (
        <CategoryContainer>
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </CategoryContainer>
      )}
    </Fragment>
  );
};

export default Category;
