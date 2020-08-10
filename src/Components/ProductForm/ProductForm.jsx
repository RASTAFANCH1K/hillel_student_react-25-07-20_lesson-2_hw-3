import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import styles from './ProductForm.module.scss';

const ProductForm = ({ onAddProduct, isNum, categories }) => {
  const defaultCategory = categories ? categories[0].name : 'Uncategorized';

  const defaultState = {
    name: '',
    description: '',
    category: defaultCategory,
    price: ''
  };

  const [productFormState, setProductFormState] = useState(defaultState);

  const onAddProductHandler = useCallback(
    e => {
      e.preventDefault();

      const { name, description, price } = productFormState;

      if (name && description && price > 0) {
        onAddProduct(productFormState);
      }

      setProductFormState(defaultState);
    },
    [onAddProduct, productFormState, defaultState]
  );

  const onChange = ({ target }) => {
    setProductFormState({
      ...productFormState,
      [target.name]: target.value
    });
  };

  const onPriceChange = ({ target }) => {
    const value = target.value.replace(',', '.');

    if (!isNum(value)) return;

    setProductFormState({
      ...productFormState,
      [target.name]: target.value
    });
  };

  const { name, description, category, price } = productFormState;

  return (
    <div>
      <form onSubmit={ onAddProductHandler }>
        <div className={ styles.groups }>
          <input 
            className={ styles.control }
            placeholder="Name"
            name="name"
            value={ name }
            onChange={ onChange }
          />
        </div>
        <div className={ styles.groups }>
          <input 
            className={ styles.control }
            placeholder="Description"
            name="description"
            value={ description }
            onChange={ onChange }
          />
        </div>
        <div className={ styles.groups }>
          <select 
            className={ `${styles.control} ${styles.select}` }
            name="category"
            value={ category }
            onChange={ onChange }>
            <option key="none" value=""></option>
            { categories.map(({ id, name }) => <option key={ id } value={ name }>{ name }</option>) }
          </select>
        </div>
        <div className={ styles.groups }>
          <input 
            className={ styles.control }
            placeholder="Price"
            name="price"
            value={ price }
            onChange={ onPriceChange }
          />
        </div>
        <button className={ styles.btn } type="submit">Add Product</button>
      </form>
    </div>
  )
};

ProductForm.defaultProps = {
  categories: []
};

ProductForm.propTypes = {
  categories: PropTypes.array,
  onAddProduct: PropTypes.func,
  validateNumericInput: PropTypes.func
};

export default ProductForm;