import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

import { Form, ButtonContainer } from './styles';
import PropTypes from 'prop-types';

import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';

import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';
import useErrors from '../../hooks/useErrors';
import CategoriesSerivce from '../../services/CategoriesSerivce';
import Spinner from '../Spinner';

const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
  console.log('ContactForm.ref ', ref)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    setError,
    removeError,
    getErrorMessageByFieldName,
    errors
  } = useErrors();

  const isFormValid = (name && errors.length === 0);

  useImperativeHandle(ref, () => ({
    setFieldsValues: (contact) => {
      setName(contact.name);
      setEmail(contact.email);
      setPhone(contact.phone);
      setCategoryId(contact.category_id);
    }
  }), [])

  // useEffect(() => {
  //   const refObject = ref;
  //   refObject.current = {
  //     setFieldsValues: (contact) => {
  //       setName(contact.name);
  //       setEmail(contact.email);
  //       setPhone(contact.phone);
  //       setCategoryId(contact.category_id);
  //     }
  //   };
  // }, [ref])

  useEffect(() => {
    async function loadCategories(){
      try{
        const categoriesList = await CategoriesSerivce.listCategories();

        setCategories(categoriesList);
      } catch {} finally {
        setIsLoadingCategories(false)
      }
    }

    loadCategories()
  }, [])

  function handleNameChange(event){
    setName(event.target.value);

    if(!event.target.value){
      setError({ field: 'name', message: 'Nome é obrigatório' })
    } else {
      removeError('name')
    }
  }

  function handleEmailChange(event){
    setEmail(event.target.value)

    if(event.target.value && !isEmailValid(event.target.value)){
      setError({ field: 'email', message: 'E-mail inválido.' })
    } else {
      removeError('email')
    }
  }

  function handlePhoneChange(event){
    setPhone(formatPhone(event.target.value));

  }

  function handleCategoryChange(event){
    setCategoryId(event.target.value)
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSubmitting(true)

    await onSubmit({
      name,
      email,
      phone: phone.replace(/\D/g, ''),
      categoryId
    })

    setIsSubmitting(false);
    setName('');
    setEmail('');
    setPhone('');
    setCategoryId('');
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup
        error={getErrorMessageByFieldName('name')}
      >
        <Input
          placeholder='Nome *'
          value={name}
          onChange={handleNameChange}
          error={getErrorMessageByFieldName('name')}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup
        error={getErrorMessageByFieldName('email')}
      >
        <Input
          type="email"
          placeholder='E-mail'
          value={email}
          onChange={handleEmailChange}
          error={getErrorMessageByFieldName('email')}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup>
        <Input
          type="tel"
          placeholder='Telefone'
          value={phone}
          onChange={handlePhoneChange}
          maxLength={15}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId}
          onChange={handleCategoryChange}
          disabled={isLoadingCategories || isSubmitting}
        >
          <option value="" disabled>
            {/* {isLoadingCategories && 'Carregando...'} */}
            {/* {!isLoadingCategories && 'Sem categoria'} */}
            Sem categoria
          </option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button
          type="submit"
          disabled={!isFormValid}
          isLoading={isSubmitting}
        >
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
})

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default ContactForm;
