import { useState, useEffect, useMemo, useCallback } from "react";

import ContactsService from "../../services/ContactsService";
import toast from '../../utils/toast';
import useSafeAsyncState from "../../hooks/useSafeAsyncState";

export default function useHome() {
  const [contacts, setContacts] = useSafeAsyncState([])
  const [orderBy, setOrderBy] = useState('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useSafeAsyncState(true);
  const [hasError, setHasError] = useSafeAsyncState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useSafeAsyncState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useSafeAsyncState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const filteredContacts = useMemo(() => {
    return contacts.filter(contact => (
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    ))
  }, [contacts, searchTerm])

  // useCallback, só cria a função no primeiro render ou de acordo com o array de dependencias dele
  const loadContacts = useCallback(async() => {
    try {
      setIsLoading(true);

      const contactsList = await ContactsService.listContacts(orderBy);

      setContacts(contactsList);
      setHasError(false);

    } catch (error){
      setHasError(true);
      setContacts([]);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy])

  useEffect(() => {
    loadContacts();
  }, [loadContacts])

  function handleToggleOrderBy() {
    setOrderBy(prevState => (
      prevState === 'asc' ? 'desc' : 'asc'
    ))
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value)
  }

  function handleTryAgain() {
    loadContacts();
  }

  function handleDeleteContact(contact) {
    setContactBeingDeleted(contact)
    setIsDeleteModalVisible(true)
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
  }

  async function handleConfirmDeleteContact() {
    try {
      setIsLoadingDelete(true);
      await ContactsService.deleteContact(contactBeingDeleted.id)

      toast({
        type: 'success',
        text: 'Contato deletado com sucesso!'
      });
      handleCloseDeleteModal();
      setContacts(prevState => prevState.filter(
        (contact) => contact.id !== contactBeingDeleted.id
      ))
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao deletar o contato!'
      })
    } finally {
      setIsLoadingDelete(false);
    }
  }

  return {
    isLoading,
    isLoadingDelete,
    isDeleteModalVisible,
    contactBeingDeleted,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    contacts,
    searchTerm,
    handleChangeSearchTerm,
    hasError,
    filteredContacts,
    handleTryAgain,
    orderBy,
    handleToggleOrderBy,
    handleDeleteContact
  }
}
