import { classNames } from '../../utils';
import Icons from './icons';
import styles from './styles.module.css';

type IIconProps = {
  type: string;
  className?: string;
  iconClassName?: string;
}

export const Icon = ({ type, className, iconClassName }: IIconProps) => {
  const IconComponent = Icons[type as keyof typeof Icons];

  return (
    <span className={classNames([styles.IconContainer, !!className && className])}>
      <IconComponent
        className={classNames([styles.Icon, !!iconClassName && iconClassName])}
      />
    </span>
  );
}