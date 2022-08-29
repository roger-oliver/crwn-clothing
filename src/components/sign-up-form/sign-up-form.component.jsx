import { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

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
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="">Display Name</label>
        <input
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChanges}
          required
        />

        <label htmlFor="">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChanges}
          required
        />

        <label htmlFor="">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChanges}
          required
        />

        <label htmlFor="">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChanges}
          required
        />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
