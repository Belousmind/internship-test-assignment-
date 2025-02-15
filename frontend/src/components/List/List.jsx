import "./List.css"
import React, { useEffect, useState } from "react";

import useFetchData from "../../hooks/useFetchData";

import ListItem from '../ListItem/ListItem';
import NavigationButton from "../UI/NavigationButton";
import { Pagination, Input, Typography, Divider, Select } from "antd";

const { Search } = Input;
const { Title } = Typography;
const { Option } = Select;

const List = () => {
  // Загружаем данные с сервера с помощью кастомного хука и управляем состоянием списка
  const { data: items, loading, error, setData: setItems } = useFetchData("http://localhost:3000/items");

  // Локальное состояние для фильтрации и пагинации
  const [filteredItems, setFilteredItems] = useState([]); 
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Обновляет список отфильтрованных объявлений при изменении загруженных данных
  useEffect(() => {
    if (items) setFilteredItems(items);
  }, [items]);

  // Обрабатывает ввод в строке поиска и фильтрует объявления по названию
  const handleSearch = (value) => {
    setSearchQuery(value.toLowerCase());
    filterItems(value, selectedCategories);
    setCurrentPage(1);
  };

  // Обрабатывает изменение выбранных категорий и фильтрует объявления
  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories);
    filterItems(searchQuery, categories);
    setCurrentPage(1);
  };

  // Фильтрует объявления по названию и категории
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

  // Вычисляем индексы элементов для текущей страницы
  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  
  return (  
  <>
    <div className="title-container">
      <Title>Доска объявлений</Title>
      <NavigationButton to="/form" label="Разместить объявление" type="primary" ghost />
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