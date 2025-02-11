import React from 'react';
import { Link } from "react-router-dom";

import ListItem from '../ListItem/ListItem';

const List = () => {
  
  return (  
  <>
  <h1>Список объявлений</h1>
    <Link to="/form">Создать объявление</Link>
    <hr />
    <ListItem PageId={1}/>
    <ListItem PageId={2}/>
  </>  
)};

export default List;