import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from ".";
import "./App.css";
import LoginForm from "./components/LoginForm";
import { IUser } from "./models/IUser";
import UserService from "./services/UserService";

function App() {
  const {store} = useContext(Context)
  const [user, setUser] = useState<IUser[]>([])

  useEffect(() => {
    if(localStorage.getItem('token')){
      store.checkAuth()
    }
  }, [])

  const getUser = async () => {
    try {
      const response = await UserService.fetchUser()
      setUser(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  if(store.isLoading){
    return <div>Загрузка...</div>
  }

  if(!store.isAuth){
      return <div>
        <LoginForm />
        <button onClick={getUser}>Получить пользователей</button>
      </div>
  }

  return (
    <div className="App">
      <h1>{store.isAuth ? `Пользователь авторизован ${store.user.email}` : 'Авторизуйтесь'}</h1>
      <h1>{store.user.isActivated ? `Аккаунт подтвержден по почте` : `Подтвердите почту ${store.user.email}`}</h1>
      <button onClick={() => store.logout()}>Выйти</button>
      <div>
        <button onClick={getUser}>Получить пользователей</button>
      </div>
      {user.map(user => (
        <div key={user.email}>{user.email}</div>
      ))}
    </div>
  )
}

export default observer(App)