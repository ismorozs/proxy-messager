import { JSX } from 'react';
import styles from './styles.module.css';

export type ILayoutProps = {
  children: JSX.Element | JSX.Element[]
}

export const Layout = ({ children }: ILayoutProps) => {
  return (
    <div className={styles.Layout}>
      {children}
    </div>
  );
}