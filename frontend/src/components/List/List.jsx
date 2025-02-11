import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ListItem from '../ListItem/ListItem';

const List = () => {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/items")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка загрузки данных:", error);
        setLoading(false);
      });
  }, []);

  const elements = items.map((item) => (
    <ListItem key={item.id} item={item} />
  ))
  
  return (  
  <>
  <h1>Список объявлений</h1>
    <Link to="/form">Создать объявление</Link>
    <hr />

    {loading ? <p>Загрузка...</p> : null }
    {items.length === 0 ? <p>Объявления не найдены</p> : elements}
 
  </>  
)};

export default List;