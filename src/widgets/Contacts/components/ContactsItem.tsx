import styles from './styles.module.css';
import { classNames, formatDate } from "../../../utils";
import { Icon } from '../../../components/Icon/Icon';
import { Avatar } from '../../../components/Avatar/Avatar';
import { IChatMessage } from '../../Chat/components/ChatMessage';

export type IContactsItemProps = {
  chatId: string;
  chatName?: string;
  lastMessage?: IChatMessage;
  isCurrent: boolean;
  onClick: (chatId: string) => void;
}

export const ContactsItem = ({
  chatId,
  chatName,
  lastMessage,
  isCurrent,
  onClick,
}: IContactsItemProps) => {
  const date = formatDate(lastMessage?.timestamp);
  const iconType = lastMessage?.isOutgoing ? lastMessage?.status === 'read' ? 'doubleCheck' : 'check': '';
  const checkIcon = iconType && <Icon type={iconType} className={styles.ContactsItem__CheckIcon} />

  return (
    <div onClick={() => onClick(chatId)} className={classNames([
      styles.ContactsItem,
      isCurrent && styles.ContactsItem_active
    ])}>
      <Avatar text={chatName} />
      <div className={styles.ContactsItem__Data}>
        <span className={styles.ContactsItem__Name}>{chatName}</span>
        <span className={styles.ContactsItem__Date}>
          <span>{checkIcon}</span>
          <span>{date}</span>
        </span>
        <p className={styles.ContactsItem__LastMessage}>{lastMessage?.text}</p>
      </div>
    </div>
  );
}