import { Form, Input, Select, Button } from "antd";
import { Controller } from "react-hook-form";
const { Option } = Select;

const FormStep1 = ({ setFormStep, control, errors, isValid }) => {
  return (
    <>
      <h2>Основная информация</h2>

      <Form.Item label="Название" validateStatus={errors.name ? "error" : ""} help={errors.name?.message}>
        <Controller
          name="name"
          control={control}
          rules={{ required: "Введите название" }}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>

      <Form.Item label="Описание" validateStatus={errors.description ? "error" : ""} help={errors.description?.message}>
        <Controller
          name="description"
          control={control}
          rules={{ required: "Введите описание" }}
          render={({ field }) => <Input.TextArea {...field} />}
        />
      </Form.Item>

      <Form.Item label="Локация" validateStatus={errors.location ? "error" : ""} help={errors.location?.message}>
        <Controller
          name="location"
          control={control}
          rules={{ required: "Введите локацию" }}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>

      <Form.Item label="Ссылка на изображение">
        <Controller
          name="image"
          control={control}
          rules={{
          pattern: {
            value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/i,
            message: "Введите корректную ссылку на изображение",
          },
        }}
        render={({ field, fieldState }) => (
          <>
        <Input {...field} placeholder="https://example.com/image.jpg" />
        {fieldState.error && <span style={{ color: "red" }}>{fieldState.error.message}</span>}
         </>
        )}
        />
      </Form.Item>

      <Form.Item label="Категория" validateStatus={errors.type ? "error" : ""} help={errors.type?.message}>
        <Controller
          name="type"
          control={control}
          rules={{ required: "Выберите категорию" }}
          render={({ field }) => (
            <Select {...field} placeholder="Выберите категорию">
              <Option value="Недвижимость">Недвижимость</Option>
              <Option value="Авто">Авто</Option>
              <Option value="Услуги">Услуги</Option>
            </Select>
          )}
        />
      </Form.Item>

      <Button type="primary" onClick={() => setFormStep(2)} disabled={!isValid}>
        Далее
      </Button>
    </>
  );
};

export default FormStep1;
