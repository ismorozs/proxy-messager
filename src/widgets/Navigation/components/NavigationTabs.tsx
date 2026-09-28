import { useContext } from 'react';
import { NavigationTab } from './NavigationTab';
import { RouterContext } from '../../../context/router';
import { routes } from '../../../routes';
import styles from './styles.module.css';

export const NavigationTabs = () => {
  const { current, setRoute } = useContext(RouterContext);
  
  return (
    <div className={styles.NavigationTabs}>
      {routes.map((tab, i) => (
        <NavigationTab
          key={i}
          isCurrent={tab.route === current}
          onClick={() => setRoute(tab.route)}
          {...tab}
        />
      ))}
    </div>
  )
}