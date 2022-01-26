import type { NextPage } from 'next';
import { useState } from 'react';
import styles from './styles.module.scss';

type Props = {
  value: string;
  handleValue: (value: string) => void;
  handleSubmit?: () => void;
  icon: () => JSX.Element;
  placeholder: string;
};

const InputBox: NextPage<Props> = ({
  handleValue,
  handleSubmit,
  value,
  icon,
  placeholder,
}) => {
  const [focus, setFocus] = useState(false);

  const handleFocus = () => setFocus(true);
  const handleFocusOut = () => setFocus(false);

  const handleOnChange = (event: string) => {
    handleValue(event);
  };

  const handleSubmitForm = (event: React.FormEvent) => {
    event.preventDefault();
    handleSubmit();
  };

  return (
    <form
      onFocus={event => handleFocus()}
      onBlur={event => handleFocusOut()}
      onSubmit={handleSubmitForm}
      className={focus ? styles.boxActivate : styles.box}
    >
      <input
        placeholder={placeholder}
        value={value}
        onChange={event => handleOnChange(event.target.value)}
      />
      <button type="submit">{icon()}</button>
    </form>
  );
};

export default InputBox;
