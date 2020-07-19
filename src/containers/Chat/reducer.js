import { MESSAGES_RECIEVED, ERROR_CATCH, ERROR_CLEAR, ADD_MESSAGE, UPDATE_LAST_MESSAGE_DATE, DELETE_MESSAGE, EDIT_MESSAGE, LIKE_TOGGLE } from './types';

export const initialState = {
  users: null,
  loading: true,
  messages: [],
  error: null,
  lastMessageDate: null
}

export default (state=initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case MESSAGES_RECIEVED:
      const {users, messages, lastMessageDate} = payload;
      return {
        ...state,
        loading: false,
        users,
        messages,
        lastMessageDate
      }
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, payload]
      }
    case UPDATE_LAST_MESSAGE_DATE:
      return {
        ...state,
        lastMessageDate: payload
      }
    case EDIT_MESSAGE:
      return {
        ...state,
        messages: state.messages.map(message => message.messageId === payload.messageId ? {...message, ...payload} : message)
      }
    case DELETE_MESSAGE:
      return {
        ...state,
        messages: state.messages.filter(({messageId}) => messageId !== payload)
      }
    case LIKE_TOGGLE:
      return {
        ...state,
        messages: state.messages.map(message => {
          const { likes } = message;
          const {id, user} = payload;
          if (message.messageId === id) {
            likes.has(user) ? likes.delete(user) : likes.add(user)
          }
          return {...message, likes}
      })
      }
    case ERROR_CATCH:
      const {message, status} = payload;
      return {
        error: {
          status,
          message
        }
      }
    case ERROR_CLEAR:
      return {
        error: null
      }
    default:
      return state;
  }
}