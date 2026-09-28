import { fetchLastUpdate, removeUpdate } from "../../../utils/api";
import { CHAT_UPDATES } from "../../../utils/constants";
import { IChats } from "../components/Chat";
import { IChatMessage } from "../components/ChatMessage";

type ISenderData = {
  chatId: string;
  chatName: string;
}

type IRawUpdate = {
  idMessage: string;
  chatId: string;
  status: string;
  timestamp: number;
  typeWebhook: string;
  senderData: ISenderData
  messageData?: {
    extendedTextMessageData?: {
      text: string;
    }
    textMessageData?: {
      textMessage: string;
    }
  }
};

function createChat (chatId: string) {
  return { chatId, messages: [] };
}

function parseRawChatUpdates (rawUpdates: IRawUpdate[]) {
  const chats: IChats = {};

  rawUpdates.forEach((update) => {
    switch (update.typeWebhook) {
      case CHAT_UPDATES.NEW_INCOMING_MESSAGE:
        addTextMessageUpdate(chats, update);
        break;

      case CHAT_UPDATES.NEW_OUTGOING_MESSAGE:
        addTextMessageUpdate(chats, update, true);
        break;

      case CHAT_UPDATES.NEW_MESSAGE_STATUS:
        addMessageStatusUpdate(chats, update);
        break;

      default:
        break;
    }
  });

  return chats;
};

function addTextMessageUpdate (chats: IChats, update: IRawUpdate, isOutgoing?: boolean) {
  const { idMessage, timestamp } = update;
  const chatId = update.senderData?.chatId;
  const text = isOutgoing
    ? update.messageData?.extendedTextMessageData?.text as string
    : update.messageData?.textMessageData?.textMessage as string;

  if (!chats[chatId]) {
    chats[chatId] = createChat(update.senderData.chatId);
  }

  const newMessage = { idMessage, text, timestamp, isOutgoing };
  chats[chatId].chatName = update.senderData.chatName;
  chats[chatId].messages.push(newMessage);
}

function addMessageStatusUpdate (chats: IChats, update: IRawUpdate) {
  const message = chats[update.chatId]?.messages.find(
    ({ idMessage }) => idMessage === update.idMessage,
  );
  
  if (message) {
    message.status = update.status;
  } else {
    if (!chats[update.chatId]) {
      chats[update.chatId] = createChat(update.chatId);
    }
    chats[update.chatId].messages.push({
      idMessage: update.idMessage,
      status: update.status,
    });
  }
}

export const fetchAllUpdates = async (apiInstance: string, apiTokenInstance: string) => {
  const messages = [];

  while (true) {
    try {
      const update = await fetchLastUpdate(apiInstance, apiTokenInstance);
      const data = await update.json();
      if (!data) {
        break;
      }

      messages.push(data.body);
      await removeUpdate(apiInstance, apiTokenInstance, data.receiptId);
    } catch (e) {
      console.error(e);
      break;
    }
  }

  return parseRawChatUpdates(messages);
};

export function combineChats (oldChats: IChats = {}, newChats: IChats = {}) {
  let chats = { ...oldChats };

  for (let chatId in newChats) {
    if (oldChats[chatId]) {
      const oldMessages = oldChats[chatId].messages || [];
      Object.assign(chats[chatId], newChats[chatId]);
      chats[chatId].messages = combineMessages(
        oldMessages,
        newChats[chatId].messages,
      );
    } else {
      chats = { [chatId]: newChats[chatId], ...chats};
    }
  }

  return chats;
};

function combineMessages (oldMessages: IChatMessage[], newMessages: IChatMessage[]) {
  newMessages.forEach((message) => {
    const oldMessage = oldMessages.find(
      ({ idMessage }) => idMessage === message.idMessage,
    );
    if (oldMessage) {
      Object.assign(oldMessage, message);
    } else {
      oldMessages.push(message);
    }
  });

  return oldMessages;
} 