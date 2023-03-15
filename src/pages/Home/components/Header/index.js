import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import { Container } from './styles'

export default function Header({
  hasError,
  qtyOfcontacts,
  qtyOffilteredContacts
}) {
  const alignment = hasError
    ? 'flex-end'
    : (
      qtyOfcontacts > 0
        ? 'space-between'
        : 'center'
    );

  return (
    <Container
      justifyContent={alignment}
    >
      {(!hasError && qtyOfcontacts > 0) && (
        <strong>
          {qtyOffilteredContacts}
          {qtyOffilteredContacts === 1 ? ' contato' : ' contatos'}
        </strong>
      )}
      <Link to="/new">Novo contato</Link>
    </Container>
  )
}

Header.propTypes = {
  hasError: PropTypes.bool.isRequired,
  qtyOfcontacts: PropTypes.number.isRequired,
  qtyOffilteredContacts: PropTypes.number.isRequired,
}
