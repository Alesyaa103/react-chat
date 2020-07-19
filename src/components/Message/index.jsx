import React from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import styles from './styles.module.scss';

const Message = ({
  message: {text, user, avatar, createdAt, id, likes, messageId},
  currentUserId,
  deleteMessage,
  editMessage,
  likeMessage
}) => {
  const isLiked = likes.has(currentUserId);
  return (
    <div className={`${styles.container} ${currentUserId === id ? styles.right : styles.left}`}>
      {currentUserId !== id && <img src={avatar} className={styles.avatar} alt={user}></img>}
      <div className={styles.message}>
        <div className={styles.message__user}>{user}</div>
        <div className={styles.message__text}>{text}</div>
        <div className={styles.meta}>
          <div className={styles.meta__data}>{moment(createdAt).format('DD.MM.YY HH:mm')}</div>
          {likes.size > 0  && <span className={styles.meta__likes}>{likes.size} liked</span>}
          {currentUserId === id && (
            <div className={styles.meta__controls}>
              <FontAwesomeIcon icon={faPencilAlt} onClick={editMessage(text, messageId)} className={styles.meta__controls__pencil}/>
              <FontAwesomeIcon icon={faTrashAlt} onClick={deleteMessage(messageId)}  className={styles.meta__controls__trash}/>
            </div>
          )}
          {currentUserId !== id && <FontAwesomeIcon icon={faHeart} onClick={likeMessage(messageId, currentUserId)} className={`${styles.meta__likeButton} ${isLiked && styles.meta__liked}`}/>}
        </div>
      </div>
    </div>
  )
}

export default Message
