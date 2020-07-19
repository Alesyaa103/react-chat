import React, {useEffect, useReducer, useState, useRef} from 'react';
import axios from 'axios';
import moment from 'moment';
import reducer, {initialState} from './reducer';
import AddMessage from '../../components/AddMessage';
import ChatInfo from '../../components/ChatInfo';
import Message from '../../components/Message';
import {MESSAGES_RECIEVED, ADD_MESSAGE, UPDATE_LAST_MESSAGE_DATE, DELETE_MESSAGE, EDIT_MESSAGE, LIKE_TOGGLE} from './types';
import styles from './styles.module.scss';
import Spinner from '../../components/Spinner';

const Chat = ({ currentUser : {id, user, avatar} }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {messages, lastMessageDate, users, loading} = state;
  const [messageToEdit, setMessageToEdit] = useState(null); 
  const messagesEndRef = useRef(null);

  useEffect(() => {
    axios.get('https://api.npoint.io/a139a0497ad54efd301f')
      .then(res => messagesRecieved(res.data))
      .catch(error => console.log(error));
  },[]);

  useEffect(() => {
    if (messages.length) {
      const messageLastDate = moment(messages[messages.length - 1].createdAt).format();
      dispatch({type: UPDATE_LAST_MESSAGE_DATE, payload: messageLastDate});
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages]);

  const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

  const messagesRecieved = (data) => {
    const users = new Map();
    data.forEach(({id, avatar, user}) => users.set(id, {id, avatar, user}));
    dispatch({type: MESSAGES_RECIEVED, payload: {
      messages: data.map(item => ({...item, likes: new Set(), messageId: generateId()})),
      users
    }});
  };

  const addNewMessage = (message) => {
    dispatch({type: ADD_MESSAGE, payload: {
      text: message,
      id,
      user,
      avatar,
      messageId: generateId(),
      likes: new Set(),
      createdAt: moment().format(),
      editedAt: ''
    }})
  }

  const deleteMessage = id => e => {
    dispatch({type: DELETE_MESSAGE, payload: id})
  };

  const likeMessage = (id, user) => e => {
    dispatch({type: LIKE_TOGGLE, payload: {id, user}})
  };

  const editMessage = (text, messageId) => e => {
    setMessageToEdit({text, messageId});
  };

  const saveEditedMessage = text => {
    dispatch({type: EDIT_MESSAGE, payload: {messageId: messageToEdit.messageId, text, editedAt: moment().format()}})
    setMessageToEdit(null);
  };

  return (
    <React.Fragment>
      {loading ? <Spinner/> : (
        <section className={styles.container}>
        <ChatInfo countMessages={messages.length} countUsers={users.size} lastMessageDate={lastMessageDate}/>
          <article className={styles.messageField}>
            {messages.map(item => (
            <Message
              key={item.messageId}
              message={item}
              currentUserId={id}
              deleteMessage={deleteMessage}
              editMessage={editMessage}
              likeMessage={likeMessage}/>
            ))}
            <div ref={messagesEndRef} />
          </article>
        <AddMessage targetFunction={messageToEdit ? saveEditedMessage: addNewMessage} text={messageToEdit ? messageToEdit.text : ''}/>
      </section>)}
    </React.Fragment>
  )
}

export default Chat
