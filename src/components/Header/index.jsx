import React from 'react'
import styles from './styles.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>b<div className={styles.header__logo__dot}>I</div>nary <div className={styles.header__logo__wrapped}>
        <span>stu</span><span>dio</span></div>
      </div>
    </header>
  )
}

export default Header;
