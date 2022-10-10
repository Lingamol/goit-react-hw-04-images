import { Formik, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
// import { ReactComponent as Envelope } from '../img/envelope.svg';
import {
  SearchForm,
  FormInput,
  FormErrorMessage,
  SearchBarWrapper,
  // SearchFormButtonLabel,
  FormBtn,
  SvgBtn,
  FormRadioInput,
  RadioWraper,
  LabelRadio,
} from './Searchbar.styled';
import * as yup from 'yup';
import { Component } from 'react';

class SearchBar extends Component {
  initialValues = {
    search: '',
    // pagination: this.props.paginationMode ? 'Pagination' : 'LoadMore',
  };

  onSubmitForm = (values, { resetForm }) => {
    // console.log('values', values);
    //   console.log('actions', actions);
    this.props.onSubmit(values);
    // resetForm();
  };
  onChangeForm = (values, { resetForm }) => {
    console.log(values);
  };

  schema = yup.object().shape({
    search: yup
      .string()
      .max(20)
      .matches(
        /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
        'Search may contain only letters, apostrophe, dash and spaces. '
      )
      .required(),
  });

  render() {
    return (
      <SearchBarWrapper className="searchbar">
        <Formik
          initialValues={this.initialValues}
          validationSchema={this.schema}
          onSubmit={this.onSubmitForm}
          onChange={this.onChangeForm}
        >
          {/* {({ isSubmitting }) => {
            console.log(isSubmitting);
            return ( */}
          <SearchForm className="form">
            <FormBtn
              type="submit"
              disabled={this.props.isSubmitting}
              className="button"
              aria-label="Search"
            >
              <SvgBtn />
              {/* <SearchFormButtonLabel className="button-label">
              Search
            </SearchFormButtonLabel> */}
            </FormBtn>

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
          {/* ); }} */}
        </Formik>
        {/* <div id="my-radio-group">Pagination select</div> */}
        <RadioWraper role="group" aria-labelledby="my-radio-group">
          <LabelRadio>
            <FormRadioInput
              type="radio"
              name="pagination"
              checked={this.props.paginationMode === 'LoadMore'}
              value="LoadMore"
              onChange={event =>
                this.props.radioBtnChange(event.currentTarget.value)
              }
            />
            LoadMore
          </LabelRadio>
          <LabelRadio>
            <FormRadioInput
              type="radio"
              name="pagination"
              checked={this.props.paginationMode === 'Pagination'}
              value="Pagination"
              onChange={event =>
                this.props.radioBtnChange(event.currentTarget.value)
              }
            />
            Pagination
          </LabelRadio>
        </RadioWraper>
        {/* <Envelope width="90" height="90" color="red" /> */}
      </SearchBarWrapper>
    );
  }
}
export default SearchBar;
SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  paginationMode: PropTypes.string.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  radioBtnChange: PropTypes.func.isRequired,
};
