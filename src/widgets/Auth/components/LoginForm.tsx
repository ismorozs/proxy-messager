import { ChangeEvent, useContext, useState, MouseEvent } from 'react';
import { UserContext } from "../../../context/user";
import { getStateInstance } from '../../../utils/api';
import styles from './styles.module.css';

export const LoginForm = () => {
  const { setUser } = useContext(UserContext);
  const [apiInstance, setApiInstance] = useState("");
  const [apiTokenInstance, setApiTokenInstance] = useState("");
  const [errorText, setErrorText] = useState("");
  const formFields = [
    { name: "apiInstance", value: apiInstance, set: setApiInstance },
    { name: "apiTokenInstance", value: apiTokenInstance, set: setApiTokenInstance },
  ];

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    formFields.filter((field) => field.name === name)[0].set(value);
    setErrorText("");
  }

  const onSumbit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { status } = await getStateInstance(apiInstance, apiTokenInstance);
    
    if (status === 200) {
      return setUser({
        apiInstance,
        apiTokenInstance,
      });
    }

    setErrorText(status.toString());
  }

  return (
    <div className={styles.LoginForm}>
      <form className={styles.LoginForm__Form}>
        {formFields.map(({ name, value }) => (
          <div key={name} className={styles.LoginForm__InputContainer}>
            <input
              className={styles.LoginForm__Input}
              type="text"
              name={name}
              placeholder={name}
              value={value}
              onChange={onInputChange}
            />
          </div>
        ))}
        <button className={styles.LoginForm__Submit} onClick={onSumbit}>Login</button>
        <a href="https://green-api.com/v3/docs/before-start/" className={styles.LoginForm__Help}>Help?</a>
      </form>
      {errorText && (
        <div className={styles.LoginForm__ErrorMessage}>Something went wrong.<br />Http status code: {errorText}</div>
      )}
    </div>
  )
};