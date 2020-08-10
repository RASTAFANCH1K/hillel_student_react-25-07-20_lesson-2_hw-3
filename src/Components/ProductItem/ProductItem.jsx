import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import styles from './ProductItem.module.scss';

const ProductItem = ({ product, onDeleteProduct, updateProduct, categories }) => {
  const defaultState = {
    id: '',
    name: '',
    description: '',
    category: '',
    price: 0,
    selected: false,
    edited: false
  };

  const [productItemState, setProductItemState] = useState(defaultState);

  const onDeleteProductHandler = useCallback(
    e => {
      e.stopPropagation();

      onDeleteProduct(product.id)
    },
    [onDeleteProduct, product.id]
  );

  const selectProduct = useCallback(
    () => {
      updateProduct({
        ...product,
        selected: !product.selected,
      })

      setProductItemState(defaultState);
    },
    [updateProduct, product, defaultState]
  );

  const editProduct = useCallback(
    e => {
      e.stopPropagation();

      if (!productItemState.id) {
        setProductItemState({
          ...product,
          edited: true,
        })
      } else {
        setProductItemState(defaultState);
      }
    },
    [productItemState, product, defaultState]
  );

  const saveProduct = useCallback(
    e => {
      e.stopPropagation();

      if (!productItemState.id) return;
     
      updateProduct({
        ...productItemState,
        edited: false
      })
      
      setProductItemState(defaultState);
    },
    [productItemState, updateProduct, defaultState]
  );

  const onInputClick = e => e.stopPropagation();

  const onChange = ({ target }) => {
    setProductItemState({
      ...productItemState,
      [target.name]: target.value
    });
  };

  const productItem = productItemState.id ? productItemState : product;

  const { name, description, category, price, selected, edited } = productItem;

  return (
    <div
      className={ selected ? styles.itemSelected : styles.items }
      onClick={ selectProduct }>
      {
        selected && edited
          ? <input name="name" value={ name } onClick={ onInputClick } onChange={ onChange } />
          : <div className={ styles.item }>{ name }</div>
      }
      {
        selected && edited
          ? <input name="description" value={ description } onClick={ onInputClick } onChange={ onChange } />
          : <div className={ styles.item }>{ description }</div>
      }
      {
        selected && edited
          ? <select
              name="category"
              value={ category }
              onClick={ onInputClick }
              onChange={ onChange }
            >
              { categories.map(({ id, name }) => <option key={ id } value={ name }>{ name }</option>) }
            </select>
          : <div className={ styles.item }>{ category }</div>
      }
      {
        selected && edited
          ? <input name="price" value={ price } type="number" onClick={ onInputClick } onChange={ onChange } />
          : <div className={ styles.item }>{ price }</div>
      }
      <div className={ styles.item }>
        {
          selected 
            ? <div>
                <button className={ styles.btn } onClick={ editProduct }>Edit</button>
                <button className={ styles.btn } onClick={ saveProduct }>Save</button>
                <button className={ styles.btn } onClick={ onDeleteProductHandler }>Delete</button>
              </div>  
            : <button className={ styles.btn } onClick={ onDeleteProductHandler }>Delete</button>
        }
      </div>
    </div>
  )
};

ProductItem.defaultProps = {
  product: {},
  categories: []
};

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    price: PropTypes.string
  }),
  categories: PropTypes.array,
  onDeleteProduct: PropTypes.func,
  updateProduct: PropTypes.func
};

export default ProductItem;