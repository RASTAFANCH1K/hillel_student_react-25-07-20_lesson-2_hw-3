import React from 'react';
import PropTypes from 'prop-types';

import { ProductItem } from '../index';

import styles from './ProductList.module.scss';

const ProductList = ({ products, categories, onDeleteProduct, updateProduct }) => {
  return (
    <div className={ styles.list }>
      <div className={ styles.titles }>
        <div className={ styles.title }>Product</div>
        <div className={ styles.title }>Description</div>
        <div className={ styles.title }>Category</div>
        <div className={ styles.title }>Price</div>
        <div className={ styles.title }></div>
      </div>
      {
        Array.isArray(products) && products.map(product => {
          return (
            <ProductItem 
              key={ product.id } 
              product={ product }
              categories={ categories }
              onDeleteProduct={ onDeleteProduct }
              updateProduct={ updateProduct }
            />
          )
        })
      }
    </div>
  )
};

ProductList.defaultProps = {
  products: [],
  categories: []
};

ProductList.propTypes = {
  products: PropTypes.array,
  categories: PropTypes.array,
  onDeleteProduct: PropTypes.func,
  updateProduct: PropTypes.func
};

export default ProductList;