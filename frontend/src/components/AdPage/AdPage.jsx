import React from 'react';
import { useParams } from "react-router-dom";
import useDeleteItem from "../hooks/useDeleteItem";
import useFetchData from "../hooks/useFetchData";
import NavigationButton from "../UI/NavigationButton";

import { Button, Divider, Typography, Skeleton } from 'antd';

const { Title, Text } = Typography;

const AdPage = () => {
  
  const { PageId } = useParams();
  const { data: item, loading, error } = useFetchData(`http://localhost:3000/items/${PageId}`);
  const { showDeleteModal, DeleteModal } = useDeleteItem();

  if (loading) return <Title level={3}>Загрузка объявления...</Title>;
  if (error) return <Title level={3}>{error}</Title>;
  if (!item) return <Title level={3}>Объявление не найдено</Title>;

  return (  
    <div>
      <div className="title-container">
        <Title level={2}>{item.name}</Title>
        <NavigationButton to="/list" label="Вернуться к списку объявлений" type="primary" ghost />
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

        <NavigationButton to="/form" state={{ item }} label="Редактировать" type="primary" ghost />

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
