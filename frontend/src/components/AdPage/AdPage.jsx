import React from 'react';
import { Link, useParams } from "react-router-dom";

const AdPage = () => {
  
  const { PageId } = useParams();

  console.log(PageId)

  return (  
    <div>
      <Link to="/form" state={{ id: PageId }}>Редактировать</Link>
      <hr />
      <h2>Объявление</h2>
      <p>и еще какой-то текст!</p>
      <p>и еще потому что это другая страница</p>
      <Link to="/list">ОГО! это кнопка назад!!!</Link>
    </div>
)};

export default AdPage;