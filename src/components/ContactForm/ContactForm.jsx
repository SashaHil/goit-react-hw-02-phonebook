import PropTypes from 'prop-types';
import { Formik, Field } from 'formik';
import { nanoid } from 'nanoid';
import * as Yup from 'yup';
import { Form, ErrorMessage } from './ContactForm.styled';

const InputSchema = Yup.object().shape({
  name: Yup.string().required('Must be required'),
  number: Yup.string().required('Must be required'),
});

export const ContactForm = ({ onAddContact }) => {
  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={InputSchema}
      onSubmit={(values, actions) => {
        onAddContact({ id: nanoid(), ...values });
        actions.resetForm();
      }}
    >
      <Form>
        <label>Name</label>
        <Field
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <ErrorMessage name="name" component="div" />

        <label>Number</label>
        <Field
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <ErrorMessage name="number" component="div" />
        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
};

ContactForm.propType = {
  onSubmit: PropTypes.func.isRequired,
};