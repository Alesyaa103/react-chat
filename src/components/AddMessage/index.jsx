import React, {useState} from 'react';
import styles from './styles.module.scss';

const AddMessage = ({ targetFunction, text }) => {
  const [message, setMessage] = useState("");
  React.useMemo(() => {
    setMessage(text);
  }, [text])
  const inputHandler = (e) => {
    setMessage(e.target.value);
  };
  const sendMessage = (e) => {
    e.preventDefault();
    targetFunction(message);
    setMessage('');
  }
  return (
    <form onSubmit={sendMessage} className={styles.container}>
      <textarea name="message" id="message" onChange={inputHandler} value={message} className={styles.container__field}></textarea>
      <input type="submit" value="Send" className={styles.container__button}/>
    </form>
  )
}

export default AddMessage
