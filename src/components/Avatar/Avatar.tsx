import { classNames, getNameInitials } from '../../utils';
import styles from './styles.module.css';

type IAvatarProps = {
  text?: string;
  className?: string;
}

export const Avatar = ({ text, className }: IAvatarProps) => {
  return (
    <div className={classNames([styles.Avatar, !!className && className])}>
      <span>{getNameInitials(text)}</span>
    </div>
  );
}
