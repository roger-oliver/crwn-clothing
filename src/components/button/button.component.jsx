import './button.styles.scss';

const BUTTON_TYPE_CLASSES = {
  google: 'google-sign-in',
  inverted: 'inverted',
};

const Button = (props) => {
  const { buttonText, buttonStyleType, ...otherProps } = props;

  return (
    <button
      className={`button-container${
        buttonStyleType ? ' ' + BUTTON_TYPE_CLASSES[buttonStyleType] : ''
      }`}
      { ...otherProps }
    >{ buttonText }</button>
  );
};

export default Button;
