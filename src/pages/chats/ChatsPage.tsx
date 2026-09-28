import { useCallback, useContext, useState } from 'react';
import { IUser, UserContext } from '../../context/user';
import { useChats } from '../../widgets/Chat/hooks/useChats';
import { Layout } from '../../components/Layout/Layout';
import { NavigationTabs } from '../../widgets/Navigation/components/NavigationTabs';
import { Contacts } from '../../widgets/Contacts/components/Contacts';
import { Chat } from '../../widgets/Chat/components/Chat';
import { WAITING_RESPONSE_TIME } from '../../utils/constants';
import { formatNumber, generateNoPhoneWarning } from '../../utils';
import { checkAccount } from '../../utils/api';

export const ChatsPage = () => {
  const { user } = useContext(UserContext);
  const chats = useChats(user as IUser, WAITING_RESPONSE_TIME);
  const [currentChat, setCurrentChat] = useState("");
  const chat = chats[currentChat] || { messages: [] };

  const handleAddNewContact = useCallback(async (newContact: string) => {
    const formattedNumber = formatNumber(newContact);
    const data = await checkAccount(user as IUser, formattedNumber);
    if (data?.chatId) {
      setCurrentChat(data.chatId);
    } else {
      generateNoPhoneWarning(newContact);
    }
  }, [user]);

  const handleContactClick = useCallback((chatId: string) => {
    setCurrentChat(chatId);
  }, [setCurrentChat]);

  return (
    <Layout>
      <NavigationTabs />
      <Contacts
        headerText="Chats"
        current={currentChat}
        contacts={chats}
        onAddNewContact={handleAddNewContact}
        onContactClick={handleContactClick}
      />
      <Chat
        currentChat={currentChat}
        chat={chat}
      />
    </Layout>
  );
}