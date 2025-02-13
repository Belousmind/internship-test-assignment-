import { Form, Select, Input } from "antd";
import { Controller } from "react-hook-form";

const { Option } = Select;

const CarFields = ({ control, errors }) => {
  return (
    <>
      <Form.Item label="Марка" validateStatus={errors.brand ? "error" : ""} help={errors.brand?.message}>
        <Controller
          name="brand"
          control={control}
          rules={{ required: "Выберите марку" }}
          render={({ field }) => (
            <Select {...field} placeholder="Выберите марку">
              <Option value="">Выберите</Option>
              <Option value="Toyota">Toyota</Option>
              <Option value="BMW">BMW</Option>
              <Option value="Mercedes">Mercedes</Option>
            </Select>
          )}
        />
      </Form.Item>

      <Form.Item label="Модель" validateStatus={errors.model ? "error" : ""} help={errors.model?.message}>
        <Controller
          name="model"
          control={control}
          rules={{ required: "Введите модель" }}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>

      <Form.Item label="Год выпуска" validateStatus={errors.year ? "error" : ""} help={errors.year?.message}>
        <Controller
          name="year"
          control={control}
          rules={{ required: "Введите год выпуска" }}
          render={({ field }) => <Input type="number" {...field} />}
        />
      </Form.Item>

      <Form.Item label="Пробег (км)">
        <Controller
          name="mileage"
          control={control}
          render={({ field }) => <Input type="number" {...field} />}
        />
      </Form.Item>
    </>
  );
};

export default CarFields;
