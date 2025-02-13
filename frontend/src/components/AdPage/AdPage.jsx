import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Divider, Typography, Skeleton } from 'antd';
import useDeleteItem from "../hooks/useDeleteItem";

const { Title, Text } = Typography;

const AdPage = () => {
  
  const { PageId } = useParams();
  const [item, setItem] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showDeleteModal, DeleteModal } = useDeleteItem();

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
      <div className="title-container">
        <Title level={2}>{item.name}</Title>
        <Link to="/list">
          <Button type="primary" ghost>Вернуться к списку объявлений</Button>
        </Link>
      </div>

      <Divider />

      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10, padding: 10, maxWidth: 600, margin: '0 auto'}}>

        <Skeleton.Image 
          style={{ width: '100%', height: "350px" }}
          active={false}
        />

        <Text style={{fontSize: 18}}>{item.description}</Text>
        <Text><strong>Локация:</strong> {item.location}</Text>

        {item.type === "Недвижимость" && <RealEstate item={item}/>}

        {item.type === "Авто" && <Car item={item}/>}

        {item.type === "Услуги" && <Service item={item}/>}
      </div>


      <div style={{display: 'flex', justifyContent: 'center', gap: 12, margin: '20px 0 60px 0'}}>
        <Link to="/form" state={{ item }}>
          <Button type="primary" ghost>Редактировать</Button>
        </Link>

        <Button danger onClick={() => showDeleteModal(item)}>Удалить</Button>
      </div>
      {DeleteModal}
    </div>
)};

export default AdPage;

const RealEstate = ({item}) => {
  return (
    <>
      <Text><strong>Тип:</strong> {item.propertyType}</Text>
      <Text><strong>Площадь:</strong> {item.area} м²</Text>
      <Text><strong>Комнат:</strong> {item.rooms}</Text>
      <Text><strong>Цена:</strong> {item.price.toLocaleString()} ₽</Text>
    </>
  )
}

const Car = ({item}) => {
  return (
    <>
      <Text><strong>Марка:</strong> {item.brand}</Text>
      <Text><strong>Модель:</strong> {item.model}</Text>
      <Text><strong>Год выпуска:</strong> {item.year}</Text>
      {item.mileage && <Text><strong>Пробег:</strong> {item.mileage.toLocaleString()} км</Text>}
    </>
  )
}

const Service = ({item}) => {
  return (
    <>
      <Text><strong>Тип услуги:</strong> {item.serviceType}</Text>
      <Text><strong>Опыт:</strong> {item.experience} лет</Text>
      <Text><strong>Стоимость:</strong> {item.cost.toLocaleString()} ₽</Text>
      {item.workSchedule && <Text><strong>График работы:</strong> {item.workSchedule}</Text>}
    </>
  )
}
