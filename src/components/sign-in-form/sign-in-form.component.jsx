import { useState } from 'react';
import { returnErrorMessageFromCode, signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from '../../utils/firebase/firebase.utils';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss';

const defaultFormFields = {
  email: '',
  password: ''
}

const SignInForm = (props) => {

  const [ formFields, setFormFields ] = useState(defaultFormFields);
  const { email, password } = formFields;
 
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      
      resetFormFields();
    } catch (error) {
      let message = returnErrorMessageFromCode(error.code.toLocaleLowerCase());
      alert(message || error);
    }
  };

  const handleChanges = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  }

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  }

  return (
    <div className='sign-in-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleOnSubmit}>
        <FormInput
          label='Email'
          type='email'
          name='email'
          value={email}
          onChange={handleChanges}
          required
        />

        <FormInput
          label='Password'
          type='password'
          name='password'
          value={password}
          onChange={handleChanges}
          required
        />

        <div className='buttons-container'>
          <Button type='submit' buttonText='Sign In' />
          <Button type='button' onClick={signInWithGoogle} buttonText='Google Sign In' buttonStyleType='google' />
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
