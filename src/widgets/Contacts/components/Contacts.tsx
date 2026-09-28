import { useCallback, useState, KeyboardEvent, ChangeEvent } from 'react';
import { ContactsItem } from './ContactsItem';
import styles from './styles.module.css';
import { classNames, findRight } from '../../../utils';
import { IChats } from '../../Chat/components/Chat';

type IContactsProps = {
  headerText: string;
  current: string;
  contacts: IChats;
  onContactClick: (chatId: string) => void;
  onAddNewContact: (newContact: string) => void;
}

export const Contacts = ({
  headerText,
  current,
  contacts,
  onContactClick,
  onAddNewContact,
}: IContactsProps) => {
  const [searchInput, setSearchInput] = useState("");
  const [isInputFocused, setInputFocus] = useState(false);

  const handleContactItemClick = useCallback((chatId: string) => {
    onContactClick(chatId);
  }, [onContactClick]);

  const handleAddNewContact = useCallback(() => {
    onAddNewContact(searchInput);
    setSearchInput("");
  }, [onAddNewContact, searchInput]);

  const handleSearchInputChange = useCallback((e: KeyboardEvent|ChangeEvent) => {
    if ((e as KeyboardEvent).keyCode === 13) {
      return handleAddNewContact();
    }

    setSearchInput((e?.target as HTMLInputElement).value);
  }, [handleAddNewContact]);
  
  const contactItems = Object.entries(contacts).map(([chatId, contact]) => {
    const lastMessage = findRight(contact.messages, (el) => !!el.text);
    return <ContactsItem
      key={chatId}
      {...contact}
      lastMessage={lastMessage}
      isCurrent={current === chatId}
      onClick={handleContactItemClick}
    />
  });

  return (
    <div className={styles.Contacts}>
      <h2 className={styles.Contacts__Header}>
        {headerText}
        <button
          className={styles.Contacts__AddButton}
          title="Find phone number"
          onClick={handleAddNewContact}
        ></button>
      </h2>
      <div className={styles.Contacts__Search}>
        <input
          className={styles.Contacts__SearchInput}
          onKeyUp={handleSearchInputChange}
          onChange={handleSearchInputChange}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
          placeholder='Search'
          title="Find phone number"
          value={searchInput}
          type="text"
        />
        <div
          onMouseDown={() => setSearchInput("")}
          className={classNames([
            styles.Contacts__SearchClearButton,
            isInputFocused && styles.Contacts__SearchClearButton_active
          ])}
        ></div>
      </div>
      <div className={styles.Contacts__List}>
        {contactItems}
      </div>
    </div>
  );
}