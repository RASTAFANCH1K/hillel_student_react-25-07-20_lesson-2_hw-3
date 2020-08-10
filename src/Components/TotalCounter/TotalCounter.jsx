import React from 'react';

import styles from './TotalCounter.module.scss';

const TotalCounter = ({ products, total, selectedTotal }) => {
  return (
    <div className={ styles.counterWrap }>
      <div className={ styles.totalWrap }>
        <div className={ `${styles.total} ${styles.totalTitle}` }>Total:</div>
        <div className={ `${styles.total} ${styles.totalNum}` }>{ total }</div>
      </div>
      <div className={ styles.totalWrap }>
        <div className={ `${styles.total} ${styles.totalTitle}` }>Selected Total:</div>
        <div className={ `${styles.total} ${styles.totalNum}` }>{ selectedTotal }</div>
      </div>
      <div className={ styles.totalWrap }>
        <div className={ `${styles.total} ${styles.totalTitle}` }>Amount:</div>
        <div className={ `${styles.total} ${styles.totalNum}` }>{ products.length }</div>
      </div>
    </div>
  )
};

export default TotalCounter;