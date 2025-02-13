import "./List.css"
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";

import ListItem from '../ListItem/ListItem';
import { Pagination, Input, Button, Typography, Divider, Select } from "antd";

const { Search } = Input;
const { Title } = Typography;
const { Option } = Select;

const List = () => {

  const { data: items, loading, error, setData: setItems } = useFetchData("http://localhost:3000/items");
  const [filteredItems, setFilteredItems] = useState([]); 
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    if (items) setFilteredItems(items);
  }, [items]);

  const handleSearch = (value) => {
    setSearchQuery(value.toLowerCase());
    filterItems(value, selectedCategories);
    setCurrentPage(1);
  };

  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories);
    filterItems(searchQuery, categories);
    setCurrentPage(1);
  };

  const filterItems = (search, categories) => {
    let filtered = items;

    if (search) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (categories.length > 0) {
      filtered = filtered.filter((item) => categories.includes(item.type));
    }

    setFilteredItems(filtered);
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
        style={{ width: 400 }}
      />

      <Select
        mode="multiple"
        placeholder="Выберите категорию"
        allowClear
        onChange={handleCategoryChange}
        style={{ width: 250 }}
      >
        <Option value="Недвижимость">Недвижимость</Option>
        <Option value="Авто">Авто</Option>
        <Option value="Услуги">Услуги</Option>
      </Select>

    </div>

    <div className="card-list">
      {loading && <Title level={3}>Загрузка...</Title>}
      {error && <Title level={3}>{error}</Title>}
      {filteredItems.length === 0 && !loading && !error ? <Title level={3}>Объявления не найдены</Title> : null}

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