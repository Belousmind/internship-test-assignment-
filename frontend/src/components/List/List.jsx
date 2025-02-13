import "./List.css"
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ListItem from '../ListItem/ListItem';
import { Pagination, Input, Button, Typography, Divider } from "antd";

const { Search } = Input;
const { Title } = Typography;

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
    <div className="title-container">
      <Title>Доска объявлений</Title>
      <Link to="/form">
        <Button type="primary" ghost>Разместить объявление</Button>
      </Link>
    </div>

    <Divider/>

    <div className="filter-container">
      <Search
        placeholder="Поиск по названию..."
        allowClear
        enterButton="Поиск"
        size="medium"
        onSearch={handleSearch}
        style={{ width: 400, marginBottom: 20 }}
      />
    </div>

    <div className="card-list">
      {loading && <Title level={3}>Загрузка...</Title>}
      {filteredItems.length === 0 && !loading ? <Title level={3}>Объявления не найдены</Title> : null}

      {currentItems.map((item) => (
        <ListItem key={item.id} item={item}/>
      ))}

      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={items.length}
        onChange={(page) => setCurrentPage(page)}
        style={{ margin: "20px 0 60px 0", textAlign: "center" }}
      />
    </div>
  </>  
)};

export default List;