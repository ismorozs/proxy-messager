import { classNames } from '../../utils';
import styles from './styles.module.css';
import { ILayoutProps } from './Layout'; 

export const AuthLayout = ({ children }: ILayoutProps) => {
  return (
    <div className={classNames([styles.Layout, styles.AuthLayout])}>
      {children}
    </div>
  );
};