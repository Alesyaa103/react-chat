import React from 'react';
import moment from 'moment';
import styles from './styles.module.scss';

const ChatInfo = ({lastMessageDate, countUsers, countMessages}) => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h2 className={styles.info__title}>My chat</h2>
        <span className={styles.info__counter}>{countUsers} participants</span>
        <span className={styles.info__counter}>{countMessages} messages</span>
      </div>
      <span className={styles.recent}>last message at {moment(lastMessageDate).format('HH:mm')}</span>
    </div>
  )
}

export default ChatInfo
