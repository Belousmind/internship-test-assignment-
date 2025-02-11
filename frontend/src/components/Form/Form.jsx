import { useState } from "react";
import "./Form.css"
import { Link, useLocation } from "react-router-dom";

const FormPage = () => {

  const [formStep, setStep] = useState(1);
  const [categoryName, setCategory] = useState(null);

  console.log(categoryName)

  const location = useLocation();
  const PageId = location.state?.id; 

  console.log(PageId)

  return (
    <>
    <Link to="/list">Вернуться к списку объявлений</Link>  
    <form>
      {formStep === 1 && (
        <>
      <label htmlFor="title"> Название
        <input id="title" type="text" required/>
      </label>
      <label htmlFor="description"> Описание
        <input id="description" type="text" required/>
      </label>
      <label htmlFor="location"> Локация
        <input id="location" type="text" required/>
      </label>
      <label htmlFor="photo"> Фото
        <input type="file" name="" id="photo" />
      </label>
      <label htmlFor="category"> Категория объявления
        <select onChange={(e) => setCategory(e.target.value)} name="category" id="category">
          <option value="real-estate">Недвижимость</option>
          <option value="auto">Авто</option>
          <option value="services">Услуги</option>
        </select>
      </label>
     
      <button onClick={() => setStep((formStep) => formStep + 1)}>Далее</button>
        </>
      )}

      {formStep === 2 && (
        <>

          <h2>Шаг два</h2>
          <button onClick={() => setStep((formStep) => formStep - 1)}>Назад</button>
          <button>Опубликовать</button>
        </>

      )}

    </form>
    </>
  )
}

export default FormPage;

// Основной шаг (для всех категорий)
// Название (обязательное)
// Описание (обязательное)
// Локация (обязательное)
// Фото (необязательное)
// Категория объявления (выпадающий список: Недвижимость, Авто, Услуги) (обязательное) Real Estate, Auto, Services
// Категорийный шаг
// Зависит от выбранной категории для объявления:

// - Недвижимость:

// Тип недвижимости (например: квартира, дом, коттедж и т.д.) (выпадающий список, обязательное, строка)
// Площадь (кв. м, обязательное, число)
// Количество комнат (обязательное, число)
// Цена (обязательное, число)
// - Авто:

// Марка (выпадающий список, обязательное, строка)
// Модель (обязательное, строка)
// Год выпуска (обязательное, число)
// Пробег (км, опциональное, число)
// - Услуги:

// Тип услуги (например: ремонт, уборка, доставка) (выпадающий список, обязательное, строка)
// Опыт работы (лет, обязательное, число)
// Стоимость (обязательное, число)
// График работы (опциональное, строка)