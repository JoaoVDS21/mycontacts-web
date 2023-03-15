import { useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";

import ContactsService from "../../services/ContactsService";

import toast from "../../utils/toast";
import useSafeAsyncState from "../../hooks/useSafeAsyncState";
import useSafeAsyncAction from "../../hooks/useSafeAsyncAction";

export default function useEditContact() {
  const [isLoading, setIsLoading] = useSafeAsyncState(true);
  const [contactName, setContactName] = useSafeAsyncState('');

  const contactFormRef = useRef(null);

  const { id } = useParams();
  const history = useHistory();
  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    async function loadContact() {
      try {
        const contactData = await ContactsService.getContactById(id);

        contactFormRef.current.setFieldsValues(contactData);

        safeAsyncAction(() => {
          setIsLoading(false);
          setContactName(contactData.name);
        })
      } catch {
        safeAsyncAction(() => {
          history.push('/');
          toast({
            type: 'danger',
            text: 'Contato não encontrado!'
          })
        })
      }
    }

    loadContact();
  }, [id, history, safeAsyncAction]);

  async function handleSubmit(contact) {
    try {
      const contactData = await ContactsService.updateContact(id, contact);

      setContactName(contactData.name);
      toast({
        type: 'success',
        text: 'Contato editado com sucesso!'
      })
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar o contato!'
      })
    }
  }

  return {
    isLoading,
    contactName,
    contactFormRef,
    handleSubmit
  }
}
