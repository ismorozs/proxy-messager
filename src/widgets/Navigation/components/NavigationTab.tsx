import { Icon } from "../../../components/Icon/Icon";
import { classNames } from "../../../utils";
import styles from './styles.module.css';

type INavigationTabProps = {
  name: string;
  onClick: () => void;
  icon: string;
  isCurrent: boolean;
}

export const NavigationTab = ({ name, onClick, icon, isCurrent }: INavigationTabProps) => {
  return (
    <button className={styles.NavigationTab} onClick={onClick}>
      <Icon
        type={icon}
        iconClassName={classNames([
          styles.NavigationTab__Icon,
          isCurrent && styles.NavigationTab__Icon_active]
        )}
      />
      <span className={styles.NavigationTab__Text}>{name}</span>
    </button>
  );
}