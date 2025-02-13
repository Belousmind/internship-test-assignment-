import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

const ListItem = ({ item }) => {
  return (
    <div className="list-item">
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <p><strong>Локация:</strong> {item.location}</p>
      <p><strong>Категория:</strong>{item.type}</p>

      <Link to={`/list/${item.id}`}>
        <Button type="primary" ghost>Открыть</Button>
      </Link>
    </div>
  );
};

export default ListItem;