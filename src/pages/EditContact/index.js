import ContactForm from "../../components/ContactForm";
import PageHeader from "../../components/PageHeader";

export default function Home() {
  function handleSubmit(formData) {
    console.log('EditContacts', { formData })
  }

  return (
    <>
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
