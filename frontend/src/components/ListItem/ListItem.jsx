import React from 'react';
import { Link } from "react-router-dom";

const ListItem = ({PageId}) => {
  
  return (  
    <div key={PageId}>
      <h2>Объявление</h2>
      <p>и еще какой-то текст!</p>
      <Link to={`/list/${PageId}`}>Открыть</Link>
    </div>
)};

export default ListItem;