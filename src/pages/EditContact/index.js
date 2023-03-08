import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ContactForm from "../../components/ContactForm";
import PageHeader from "../../components/PageHeader";
import ContactsService from "../../services/ContactsService";

import Loader from "../../components/Loader";
import toast from "../../utils/toast";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadContact() {
      try {
        const contactData = await ContactsService.getContactById(id);

        console.log(contactData);
        setIsLoading(false);
      } catch {
        history.push('/');
        toast({
          type: 'danger',
          text: 'Contato não encontrado!'
        })
      }
    }

    loadContact();
  }, [id, history]);

  function handleSubmit(formData) {
    console.log('EditContacts', { formData })
  }

  return (
    <>
      <Loader isLoading={isLoading}/>

      <PageHeader
        title='Editar Matheus Silva'
      />

      <ContactForm
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
      />
    </>
  );
}
