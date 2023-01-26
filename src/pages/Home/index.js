import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Container, InputSearchContainer, Header, ListContainer, Card } from "./styles";

import arrow from '../../assets/images/icons/arrow.svg'
import edit from '../../assets/images/icons/edit.svg'
import trash from '../../assets/images/icons/trash.svg'

import Modal from "../../components/Modal";
import Loader from "../../components/Loader";

export default function Home() {
  const [contacts, setContacts] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/contacts')
      .then(async (response) => {
        const json = await response.json();
        setContacts(json);
      })
      .catch(error => {
        console.log('erro', error)
      })
  }, [])

  return (
    <Container>
      <InputSearchContainer>
        <input type="text" placeholder="Pesquisar pelo nome..."/>
      </InputSearchContainer>

      <Header>
        <strong>
          {contacts.length}
          {contacts.length === 1 ? ' contato' : ' contatos'}
        </strong>
        <Link to="/new">Novo contato</Link>
      </Header>

      <ListContainer>
        <header>
          <button type="button">
            <span>Nome</span>
            <img src={arrow} alt="Arrow" />
          </button>
        </header>

        {contacts.map((contact) => (
          <Card>
            <div className="info">
              <div className="contact-name">
                <strong>{contact.name}</strong>
                <small>{contact.category_name}</small>
              </div>
              <span>{contact.email}</span>
              <span>{contact.phone}</span>
            </div>
            <div className="actions">
              <Link to="/edit/123">
                <img src={edit} alt="Edit" />
              </Link>
              <button type="button">
                <img src={trash} alt="Delete" />
              </button>
            </div>
          </Card>
        ))}
      </ListContainer>
    </Container>
  );
}
