import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ListItem from '../ListItem/ListItem';
import { Pagination } from "antd";

const List = () => {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

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

  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  
  return (  
  <>
    <h1>Список объявлений</h1>
    <Link to="/form">Создать объявление</Link>
    <hr />

    {loading && <p>Загрузка...</p>}
    {items.length === 0 && !loading ? <p>Объявления не найдены</p> : null}

    {currentItems.map((item) => (
      <ListItem key={item.id} item={item} />
    ))}

    <Pagination
      current={currentPage}
      pageSize={pageSize}
      total={items.length}
      onChange={(page) => setCurrentPage(page)}
      style={{ marginTop: "20px", textAlign: "center" }}
    />
  </>  
)};

export default List;