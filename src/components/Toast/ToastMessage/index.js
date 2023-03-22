import { useEffect, memo } from 'react';
import PropTypes from 'prop-types';

import { Container } from "./styles"

import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';

function ToastMessage({ message, onRemoveMessage, isLeaving, animatedRef }) {

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleRemoveToast();
    }, message.duration || 7000)

    return () => clearTimeout(timeoutId);
  }, [])

  function handleRemoveToast() {
    onRemoveMessage(message.id)
  }

  return (
    <Container
      type={message.type}
      onClick={handleRemoveToast}
      tabIndex={0}
      role="button"
      isLeaving={isLeaving}
      ref={animatedRef}
    >
      {message.type === 'danger' && <img src={xCircleIcon} alt="X"/>}
      {message.type === 'success' && <img src={checkCircleIcon} alt="Check"/>}
      <strong>{message.text}</strong>
    </Container>
  )
}

ToastMessage.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['default', 'danger', 'success']),
    duration: PropTypes.number
  }).isRequired,
  onRemoveMessage: PropTypes.func.isRequired,
  isLeaving: PropTypes.bool.isRequired,
  animatedRef: PropTypes.shape().isRequired
}

ToastMessage.defaultProps = {
  type: 'default'
}

export default memo(ToastMessage);
