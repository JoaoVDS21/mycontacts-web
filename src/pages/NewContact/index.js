import Input from "../../components/Input";
import PageHeader from "../../components/PageHeader";
import Select from "../../components/Select";
import Button from "../../components/Button";
import ContactForm from "../../components/ContactForm";

export default function Home() {
  return (
    <>
      <PageHeader
        title='Novo contato'
      />

      <ContactForm
        buttonLabel="Cadastrar"
      />
    </>
  )
}
