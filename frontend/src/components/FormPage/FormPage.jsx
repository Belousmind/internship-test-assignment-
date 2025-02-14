import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import NavigationButton from "../UI/NavigationButton";
import axios from "axios";
import { Form, Divider, Typography, message } from "antd";
import FormStep1 from "./FormStep1/FormStep1";
import FormStep2 from "./FormStep2/FormStep2";

const { Title } = Typography;

const FormPage = () => {

  const location = useLocation();
  const navigate = useNavigate();
  // Если пользователь редактирует объявление, получаем переданное объявление из state
  const editingItem = location.state?.item || null;

  // Инициализация react-hook-form
  const { control, handleSubmit, setValue, watch, formState: { errors, isValid } } = useForm({ mode: "onChange" });

  // Управление шагами формы
  const [formStep, setFormStep] = useState(1);
  const type = watch("type");

  useEffect(() => {
    if (editingItem) {
      // Если редактируем объявление, заполняем форму старыми значениями
      Object.keys(editingItem).forEach((key) => {
        setValue(key, editingItem[key], { shouldValidate: true });
      });
    }
  }, [editingItem, setValue]);

// Обработчик отправки формы
// Определяет, создаем новое объявление или редактируем существующее
// Отправляет данные на сервер
  const onSubmit = async (data) => {
    console.log("Отправляемые данные:", data);
  
    try {
      let response;
      if (editingItem) {
        response = await axios.put(`http://localhost:3000/items/${editingItem.id}`, data);
      } else {
        response = await axios.post("http://localhost:3000/items", data);
      }
      // После успешной отправки формы перенаправляем пользователя на страницу списка объявлений
      navigate("/list");
  
    } catch (error) {
      message.error(`Ошибка при создании объявления: ${error.message}`);
      console.error("Ошибка при создании объявления:", error.response?.data || error.message);
    }
  };

  return (
    <>
      <div className="title-container">
        <Title level={2}>{editingItem ? 'Редактировать объявление' : 'Создать объявление'}</Title>
        <NavigationButton to="/list" label="Вернуться к списку объявлений" type="primary" ghost />
      </div>

      <Divider />

      <Form
        layout="vertical"
        style={{ maxWidth: "480px", margin: "0 auto", padding: "20px" }}
        onFinish={handleSubmit(onSubmit)}
      >
        {formStep === 1 && (
          <FormStep1 
            setFormStep={setFormStep} 
            control={control} 
            errors={errors} 
            isValid={isValid}
         />
        )}

        {formStep === 2 && (
          <FormStep2 
            setFormStep={setFormStep} 
            control={control} 
            errors={errors} 
            type={type} 
            handleSubmit={handleSubmit}
            isValid={isValid}
            onSubmit={onSubmit}
          />
        )}
      </Form>
    </>
  );
};

export default FormPage;
