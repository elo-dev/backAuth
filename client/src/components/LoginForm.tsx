import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Context } from "..";

interface Props {}

const LoginForm: React.FC = (props: Props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { store } = useContext(Context)
  return (
    <div>
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => store.login(email, password)}>Логин</button>
      <button onClick={() => store.registration(email, password)}>Регистрация</button>
    </div>
  );
};

export default observer(LoginForm)