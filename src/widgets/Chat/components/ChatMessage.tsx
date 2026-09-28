import { Icon } from '../../../components/Icon/Icon';
import { classNames, formatDate } from '../../../utils';
import styles from './styles.module.css';

export type IChatMessage = {
  idMessage?: string;
  text?: string;
  timestamp?: number;
  isOutgoing?: boolean;
  status?: string;
};

export const ChatMessage = ({ text, timestamp, isOutgoing, status }: IChatMessage) => {
  if (!text) {
    return null;
  }

  const formattedDate = formatDate(timestamp);
  const iconType = isOutgoing ? status === 'read' ? 'doubleCheck' : 'check': '';
  const checkIcon = iconType && <Icon type={iconType} className={styles.ChatMessage__CheckIcon} />

  return (
    <div className={classNames([styles.ChatMessage, !!isOutgoing && styles.ChatMessage_outgoing])}>
      <div className={styles.ChatMessage__Content}>
        <p className={styles.ChatMessage__Text}>{text}</p>
        <span className={styles.ChatMessage__Date}>
          <span>{formattedDate}</span>
          <span>{checkIcon}</span>
        </span>
      </div>
    </div>
  );
}