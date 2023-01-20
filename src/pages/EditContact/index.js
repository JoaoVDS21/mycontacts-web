import ContactForm from "../../components/ContactForm";
import PageHeader from "../../components/PageHeader";

export default function Home() {
  return (
    <>
      <PageHeader
        title='Editar Matheus Silva'
      />

      <ContactForm
        buttonLabel="Salvar alterações"
      />
    </>
  );
}
