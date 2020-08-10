import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { 
  onAddProduct, 
  onDeleteProduct, 
  onDeleteSelectedProducts, 
  updateProduct,
  calculateTotalPrice,
  calculateSelectedTotalPrice,
  isNum
} from '../../utils/index';

import { 
  Logo, 
  ProductList, 
  TotalCounter, 
  ProductForm 
} from '../index';

import styles from './App.module.scss';

const App = ({ productMocks, categoryMocks }) => {
  const [products, setProducts] = useState(productMocks);
  const [total, setTotal] = useState(
    calculateTotalPrice(productMocks)
  );
  const [selectedTotal, setSelectedTotal] = useState(0);

  const onAddProductHandler = useCallback(
    productProperties => {
      const arrOfProducts = onAddProduct(products, productProperties);
      
      setProducts(arrOfProducts);
      setTotal(
        calculateTotalPrice(arrOfProducts)
      );
      setSelectedTotal(
        calculateSelectedTotalPrice(arrOfProducts)
      );
    },
    [products]
  );

  const onDeleteProductHandler = useCallback(
    id => {
      const arrOfProducts = onDeleteProduct(products, id);
      
      setProducts(arrOfProducts);
      setTotal(
        calculateTotalPrice(arrOfProducts)
      );
      setSelectedTotal(
        calculateSelectedTotalPrice(arrOfProducts)
      );
    },
    [products]
  );

  const onDeleteSelectedProductsHandler = useCallback(
    () => {
      const arrOfProducts = onDeleteSelectedProducts(products);
      
      setProducts(arrOfProducts);
      setTotal(
        calculateTotalPrice(arrOfProducts)
      );
      setSelectedTotal(
        calculateSelectedTotalPrice(arrOfProducts)
      );
    },
    [products]
  );

  const updateProductHandler = useCallback(
    productProperties => {
      const arrOfProducts = updateProduct(products, productProperties);
      
      setProducts(arrOfProducts);
      setTotal(
        calculateTotalPrice(arrOfProducts)
      );
      setSelectedTotal(
        calculateSelectedTotalPrice(arrOfProducts)
      );
    },
    [products]
  );

  return (
    <div className={ styles.container }>
      <Logo />
      <div className={ styles.title }>Fridge</div>
      <ProductList 
        products={ products } 
        categories={ categoryMocks } 
        onDeleteProduct={ onDeleteProductHandler } 
        updateProduct={ updateProductHandler }
      />
      <div className={ styles.btnRow }>
        <button className={ styles.btn } onClick={ onDeleteSelectedProductsHandler }>Delete Selected</button>
        <TotalCounter 
          products={ products } 
          total={ total }
          selectedTotal={ selectedTotal } 
        />
      </div>
      <ProductForm 
        onAddProduct={ onAddProductHandler } 
        categories={ categoryMocks } 
        isNum={ isNum }
      />
    </div>
  )
};

App.defaultProps = {
  productMocks: [],
  categoryMocks: []
};

App.propTypes = {
  productMocks: PropTypes.array,
  categoryMocks: PropTypes.array
};

export default App;