import { useEffect, useState } from 'react';
import { toastEventManager } from '../../../utils/toast';

import ToastMessage from "../ToastMessage";
import { Container } from "./styles";

export default function ToastContainer() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    function handleAddToast({ type, text }) {
      setMessages((prevState) => [
        ...prevState,
        {id: Math.random(), type, text}
      ])
    }

    toastEventManager.on('addtoast', handleAddToast)

    return () => toastEventManager.removeListener('addtoast', handleAddToast);
  }, [])

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          type={message.type}
          text={message.text}
        />
      ))}
    </Container>
  )
}
