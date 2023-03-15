import PageHeader from "../../components/PageHeader";
import ContactForm from "../../components/ContactForm";

import useNewContact from "./useNewContact";

export default function Home() {
  const {
    contactFormRef,
    handleSubmit
  } = useNewContact();

  return (
    <>
      <PageHeader
        title='Novo contato'
      />

      <ContactForm
        ref={contactFormRef}
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </>
  )
}
