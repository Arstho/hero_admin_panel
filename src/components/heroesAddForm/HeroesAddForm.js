

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

import { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 } from 'uuid'
import { heroAdd, heroesFetchingError } from "../../actions";
import { useHttp } from "../../hooks/http.hook";

const HeroesAddForm = () => {
  const [heroName, setHeroName] = useState('')
  const [description, setDescription] = useState('')
  const [element, setElement] = useState('')
  const dispatch = useDispatch()
  const { request } = useHttp();

  const handleSetName = (e) => {
    setHeroName(e.target.value)
  }
  const handleSetDescription = (e) => {
    setDescription(e.target.value)
  }

  const handleAdd = (e) => {
    e.preventDefault()
    request("http://localhost:3001/heroes", "POST", JSON.stringify({
      id: v4(),
      name: heroName,
      description,
      element
    })
    )
      .then(data => dispatch(heroAdd(data)))
      .catch(() => dispatch(heroesFetchingError()))
    setHeroName('')
    setDescription('')
    setElement('')
  }

  return (
    <form className="border p-4 shadow-lg rounded" onSubmit={handleAdd}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
        <input
          required
          type="text"
          name="name"
          value={heroName}
          onChange={handleSetName}
          className="form-control"
          id="name"
          placeholder="Как меня зовут?" />
      </div>

      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">Описание</label>
        <textarea
          required
          name="text"
          value={description}
          onChange={handleSetDescription}
          className="form-control"
          id="text"
          placeholder="Что я умею?"
          style={{ "height": '130px' }} />
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
        <select
          required
          className="form-select"
          id="element"
          value={element}
          onChange={(e) => setElement(e.target.value)}
          name="element">
          <option >Я владею элементом...</option>
          <option value="fire">Огонь</option>
          <option value="water">Вода</option>
          <option value="wind">Ветер</option>
          <option value="earth">Земля</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary">Создать</button>
    </form>
  )
}

export default HeroesAddForm;