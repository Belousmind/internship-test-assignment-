import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Form, Button, Divider, Typography, message } from "antd";
import FormStep1 from "./FormStep1/FormStep1";
import FormStep2 from "./FormStep2/FormStep2";

const { Title } = Typography;

const FormPage = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const editingItem = location.state?.item || null;

  const { control, handleSubmit, setValue, watch, formState: { errors, isValid } } = useForm({ mode: "onChange" });

  const [formStep, setFormStep] = useState(1);
  const type = watch("type");

  useEffect(() => {
    if (editingItem) {
      Object.keys(editingItem).forEach((key) => {
        setValue(key, editingItem[key], { shouldValidate: true });
      });
    }
  }, [editingItem, setValue]);

  const onSubmit = async (data) => {
    try {
      let response;
      if (editingItem) {
        response = await axios.put(`http://localhost:3000/items/${editingItem.id}`, data);
      } else {
        response = await axios.post("http://localhost:3000/items", data);
      }
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
        <Link to="/list">
          <Button type="primary" ghost>Вернуться к списку объявлений</Button>
        </Link>
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
