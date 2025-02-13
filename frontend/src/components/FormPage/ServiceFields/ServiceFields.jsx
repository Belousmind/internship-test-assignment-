import { Form, Select, Input } from "antd";
import { Controller } from "react-hook-form";

const { Option } = Select;

const ServiceFields = ({ control, errors }) => {
  return (
    <>
      <Form.Item label="Тип услуги" validateStatus={errors.serviceType ? "error" : ""} help={errors.serviceType?.message}>
        <Controller
          name="serviceType"
          control={control}
          rules={{ required: "Выберите тип услуги" }}
          render={({ field }) => (
            <Select {...field} placeholder="Выберите тип услуги">
              <Option value="">Выберите</Option>
              <Option value="remont">Ремонт</Option>
              <Option value="cleaning">Уборка</Option>
              <Option value="delivery">Доставка</Option>
            </Select>
          )}
        />
      </Form.Item>

      <Form.Item label="Опыт работы (лет)" validateStatus={errors.experience ? "error" : ""} help={errors.experience?.message}>
        <Controller
          name="experience"
          control={control}
          rules={{ required: "Введите опыт работы" }}
          render={({ field }) => <Input type="number" {...field} />}
        />
      </Form.Item>

      {/* Стоимость */}
      <Form.Item label="Стоимость (₽)" validateStatus={errors.cost ? "error" : ""} help={errors.cost?.message}>
        <Controller
          name="cost"
          control={control}
          rules={{ required: "Введите цену" }}
          render={({ field }) => <Input type="number" {...field} />}
        />
      </Form.Item>

      <Form.Item label="График работы">
        <Controller
          name="workSchedule"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>
    </>
  );
};

export default ServiceFields;
