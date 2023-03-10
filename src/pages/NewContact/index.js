import Input from "../../components/Input";
import PageHeader from "../../components/PageHeader";
import Select from "../../components/Select";
import Button from "../../components/Button";
import ContactForm from "../../components/ContactForm";
import ContactsService from "../../services/ContactsService";
import toast from "../../utils/toast";

export default function Home() {
  async function handleSubmit(formData) {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      }

      await ContactsService.createContact(contact);

      toast({
        type: 'success',
        text: 'Contato cadastro com sucesso!'
      })
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao cadastrar o contato!'
      })
    }
  }

  return (
    <>
      <PageHeader
        title='Novo contato'
      />

      <ContactForm
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </>
  )
}
