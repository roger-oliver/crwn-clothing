import { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import './sign-up-form.styles.scss';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = (props) => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { displayName, email, password, confirmPassword } = formFields;

  const handleChanges = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('password and password confirmation does not match!');
      return;
    }

    try {
      const response = await createAuthUserWithEmailAndPassword(email, password);
      console.log(response);
      const { user } = response;
      await createUserDocumentFromAuth({...user, displayName});
      resetFormFields();
    } catch (error) {
      if (error.code) {
        let message = `${error.code}: ${error.message}`;
        console.log(message);
        alert(message)
      } else {
        console.log(error);
      }
    }
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  return (
    <div className='sign-up-container'>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleOnSubmit}>
        <FormInput
          label='Display Name'
          type='text'
          name='displayName'
          value={displayName}
          onChange={handleChanges}
          required
        />

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

        <FormInput
          label='Confirm Password'
          type='password'
          name='confirmPassword'
          value={confirmPassword}
          onChange={handleChanges}
          required
        />

        <Button type='submit' buttonText='Sign Up' />
      </form>
    </div>
  );
};

export default SignUpForm;
