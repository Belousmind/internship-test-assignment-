import { Form, Select, Input } from "antd";
import { Controller } from "react-hook-form";

const { Option } = Select;

const RealEstateFields = ({ control, errors }) => {
  return (
    <>
      <Form.Item label="Тип недвижимости" validateStatus={errors.propertyType ? "error" : ""} help={errors.propertyType?.message}>
        <Controller
          name="propertyType"
          control={control}
          rules={{ required: "Выберите тип недвижимости" }}
          render={({ field }) => (
            <Select {...field} placeholder="Выберите тип недвижимости">
              <Option value="">Выберите</Option>
              <Option value="apartment">Квартира</Option>
              <Option value="house">Дом</Option>
              <Option value="cottage">Коттедж</Option>
            </Select>
          )}
        />
      </Form.Item>

      <Form.Item label="Площадь (кв. м)" validateStatus={errors.area ? "error" : ""} help={errors.area?.message}>
        <Controller
          name="area"
          control={control}
          rules={{ required: "Введите площадь" }}
          render={({ field }) => <Input type="number" {...field} />}
        />
      </Form.Item>

      <Form.Item label="Количество комнат" validateStatus={errors.rooms ? "error" : ""} help={errors.rooms?.message}>
        <Controller
          name="rooms"
          control={control}
          rules={{ required: "Введите количество комнат" }}
          render={({ field }) => <Input type="number" {...field} />}
        />
      </Form.Item>

      <Form.Item label="Цена (₽)" validateStatus={errors.price ? "error" : ""} help={errors.price?.message}>
        <Controller
          name="price"
          control={control}
          rules={{ required: "Введите цену" }}
          render={({ field }) => <Input type="number" {...field} />}
        />
      </Form.Item>
    </>
  );
};

export default RealEstateFields;
