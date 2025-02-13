import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from "axios";


const AdPage = () => {
  
  const { PageId } = useParams();
  const [item, setItem] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/items/${PageId}`)
      .then((res) => {
        setItem(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Ошибка загрузки объявления");
        setLoading(false);
      });
  }, [PageId]);

  console.log(PageId)

  if (loading) return <p>Загрузка объявления...</p>;
  if (error) return <p>{error}</p>;
  if (!item) return <p>Объявление не найдено</p>;

  return (  
    <div>
      <Link to="/form" state={{ item }}>Редактировать</Link>
      <hr />

      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <p><strong>Локация:</strong> {item.location}</p>

      {item.type === "Недвижимость" && <RealEstate item={item}/>}

      {item.type === "Авто" && <Car item={item}/>}

      {item.type === "Услуги" && <Service item={item}/>}

      <hr />
      <Link to="/list">Назад к списку</Link>
    </div>
)};

export default AdPage;

const RealEstate = ({item}) => {
  return (
    <>
      <p><strong>Тип:</strong> {item.propertyType}</p>
      <p><strong>Площадь:</strong> {item.area} м²</p>
      <p><strong>Комнат:</strong> {item.rooms}</p>
      <p><strong>Цена:</strong> {item.price.toLocaleString()} ₽</p>
    </>
  )
}

const Car = ({item}) => {
  return (
    <>
      <p><strong>Марка:</strong> {item.brand}</p>
      <p><strong>Модель:</strong> {item.model}</p>
      <p><strong>Год выпуска:</strong> {item.year}</p>
      {item.mileage && <p><strong>Пробег:</strong> {item.mileage.toLocaleString()} км</p>}
    </>
  )
}

const Service = ({item}) => {
  return (
    <>
      <p><strong>Тип услуги:</strong> {item.serviceType}</p>
      <p><strong>Опыт:</strong> {item.experience} лет</p>
      <p><strong>Стоимость:</strong> {item.cost.toLocaleString()} ₽</p>
      {item.workSchedule && <p><strong>График работы:</strong> {item.workSchedule}</p>}
    </>
  )
}
