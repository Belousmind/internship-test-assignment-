import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ListItem from '../ListItem/ListItem';
import { Pagination, Input } from "antd";

const { Search } = Input;

const List = () => {

  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    fetch("http://localhost:3000/items")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setFilteredItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка загрузки данных:", error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (value) => {
    setSearchQuery(value.toLowerCase());
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredItems(filtered);
    setCurrentPage(1);
  };


  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  
  return (  
  <>
    <h1>Список объявлений</h1>
    <Link to="/form">Создать объявление</Link>
    <hr />

    <Search
      placeholder="Поиск по названию..."
      allowClear
      enterButton="Поиск"
      size="large"
      onSearch={handleSearch}
      style={{ width: 400, marginBottom: 20 }}
    />

    {loading && <p>Загрузка...</p>}
    {filteredItems.length === 0 && !loading ? <p>Объявления не найдены</p> : null}

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