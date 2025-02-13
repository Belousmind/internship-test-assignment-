import React from "react";
import NavigationButton from "../UI/NavigationButton";
import { Card, Skeleton, Tag } from "antd";

const { Meta } = Card;

const categoryColors = {
  "Недвижимость": "green",
  "Авто": "blue",
  "Услуги": "gold",
  "Другое": "default"
};

const ListItem = ({ item }) => {
  const imageExists = !!item.imageUrl;

  return (
    <>
    <Card
      hoverable
      cover={
        imageExists ? (
          <img 
            alt={item.name} 
            src={item.imageUrl} 
            style={{ height: "200px", objectFit: "cover" }} 
          />
        ) : (
          <Skeleton.Image 
            style={{ width: "100%", height: "200px" }}
            active={false}
          />
        )
      }
      style={{ maxWidth: 450, width: "100%", margin: "16px auto" }}
    >
      <Meta title={item.name} description={item.description} />
      <p><strong>Локация:</strong> {item.location}</p>

      <p><strong>Категория: </strong>
        <Tag color={categoryColors[item.type] || "default"}>
          {item.type}
        </Tag>
      </p>
      <NavigationButton to={`/list/${item.id}`} label="Открыть" type="primary" ghost />
    </Card>
    </>
  );
};

export default ListItem;