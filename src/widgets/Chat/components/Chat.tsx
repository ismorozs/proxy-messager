import { useCallback, useContext, useOptimistic, useState, startTransition, KeyboardEvent, ChangeEvent } from 'react';
import styles from './styles.module.css';
import { sendMessage } from '../../../utils/api';
import { classNames, recreateStructure } from '../../../utils';
import { Icon } from '../../../components/Icon/Icon';
import { ChatMessage, IChatMessage } from './ChatMessage';
import { IUser, UserContext } from '../../../context/user';
import { Avatar } from '../../../components/Avatar/Avatar';

export type IChat = {
  chatId: string;
  messages: IChatMessage[];
  chatName?: string;
}

export type IChats = Record<string, IChat>;

export type IChatProps = {
  currentChat: string;
  chat: IChat
};

function createOptimisticMessage (chat: IChat, text: string) {
  chat.messages.push({
    text,
    timestamp: Math.round(Date.now() / 1000),
    isOutgoing: true
  });

  return recreateStructure(chat);
} 

export const Chat = ({ currentChat, chat }: IChatProps) => {
  const [optimisticChat, setOptimisticChat] = useOptimistic(chat);
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState("");

  const handleSubmitChatMessage = useCallback(async () => {
    const data = await sendMessage(user as IUser, currentChat, message);
    if (data?.idMessage) {
      const newChat = createOptimisticMessage(optimisticChat, message);
      startTransition(() => {
        setOptimisticChat(newChat as IChat);
      });
      setMessage("");
    }
  }, [currentChat, message, optimisticChat, setOptimisticChat, user]);

  const handleMessageInputChange = useCallback((e: KeyboardEvent|ChangeEvent) => {
    if ((e as KeyboardEvent).keyCode === 13) {
      return handleSubmitChatMessage();
    }

    setMessage((e?.target as HTMLInputElement).value);
  }, [handleSubmitChatMessage]);

  if (!currentChat) {
    return null;
  }

  const chatMessages = optimisticChat?.messages.map((message, i) => (
    <ChatMessage key={message.idMessage || i} {...message} />)
  );

  const chatName = optimisticChat?.chatName || currentChat;

  return (
    <div className={styles.Chat}>
      <div className={styles.Chat__Header}>
        <Avatar text={chatName} className={styles.Chat__Avatar} />
        <div className={styles.Chat__Name}>{chatName}</div>
      </div>
      <div className={styles.Chat__MessagesContainer}>
        <div className={styles.Chat__Messages}>
          {chatMessages}
        </div>
      </div>
      <div className={styles.Chat__MessageFormContainer}>
        <div className={styles.Chat__MessageForm}>
          <input
            value={message}
            placeholder='Message'
            className={styles.Chat__MessageFormInput}
            onChange={handleMessageInputChange}
            onKeyUp={handleMessageInputChange}
          />
          <button
            className={classNames([styles.Chat__MessageFormSubmit, !!message.length && styles.Chat__MessageFormSubmit_active])}
            onClick={handleSubmitChatMessage}
          >
            <Icon type="arrowUp" className={styles.Chat__MessageFormSubmitIcon} />
          </button>
        </div>
      </div>
    </div>
  );
}