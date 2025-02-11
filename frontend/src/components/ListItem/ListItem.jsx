import React from "react";
import { Link } from "react-router-dom";

const ListItem = ({ item }) => {
  return (
    <div className="list-item">
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <p><strong>Локация:</strong> {item.location}</p>

      {item.type === "Недвижимость" && <RealEstate/>}

      {item.type === "Авто" && <Car/>}

      {item.type === "Услуги" && <Service/>}

      <Link to={`/list/${item.id}`} className="open-btn">
        Открыть
      </Link>
    </div>
  );
};

export default ListItem;

const RealEstate = () => {
  return (
  <>
    <p><strong>Тип:</strong> {item.propertyType}</p>
    <p><strong>Площадь:</strong> {item.area} м²</p>
    <p><strong>Комнат:</strong> {item.rooms}</p>
    <p><strong>Цена:</strong> {item.price.toLocaleString()} ₽</p>
  </>
  )
}

const Car = () => {
  return (
  <>
    <p><strong>Марка:</strong> {item.brand}</p>
    <p><strong>Модель:</strong> {item.model}</p>
    <p><strong>Год:</strong> {item.year}</p>
    {item.mileage && <p><strong>Пробег:</strong> {item.mileage.toLocaleString()} км</p>}
  </>
  )
}

const Service = () => {
  return (
  <>
    <p><strong>Тип услуги:</strong> {item.serviceType}</p>
    <p><strong>Опыт:</strong> {item.experience} лет</p>
    <p><strong>Стоимость:</strong> {item.cost.toLocaleString()} ₽</p>
    {item.workSchedule && <p><strong>График работы:</strong> {item.workSchedule}</p>}
  </>
  )
}