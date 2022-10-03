import { Formik, ErrorMessage } from 'formik';
// import PropTypes from 'prop-types';
import { SearchForm, FormInput, FormErrorMessage } from './Searchbar.styled';
import * as yup from 'yup';

const initialValues = { search: '' };

const handleOnSubmit = (values, { resetForm }) => {
  console.log('values', values);
  //   console.log('actions', actions);
  //   this.props.onSubmit(values);
  resetForm();
};

const schema = yup.object().shape({
  search: yup
    .string()
    .max(20)
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .required(),
});

const Searchbar = () => {
  return (
    <header className="searchbar">
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleOnSubmit}
      >
        <SearchForm className="form">
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <FormInput
            className="input"
            name="search"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <ErrorMessage name="search" component={FormErrorMessage} />
        </SearchForm>
      </Formik>
    </header>
  );
};
export default Searchbar;
