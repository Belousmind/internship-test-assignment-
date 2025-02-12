import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import FormStep1 from "./FormStep1/FormStep1";
import FormStep2 from "./FormStep2/FormStep2";

const FormPage = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const editingItem = location.state?.item || null;


  const [formStep, setFormStep] = useState(1);
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const type = watch("type");
 
  useEffect(() => {
    if (editingItem) {
      Object.keys(editingItem).forEach((key) => {
        setValue(key, editingItem[key]);
      });
    }
  }, [editingItem, setValue]);

  const onSubmit = async (data) => {
    try {
      if (editingItem) {
      // Если редактируем, отправляем PUT-запрос
      await axios.put(`http://localhost:3000/items/${editingItem.id}`, data);
      console.log("Объявление обновлено:", data);
      } else {
      // Если создаем новое, отправляем POST-запрос
      await axios.post("http://localhost:3000/items", data);
      console.log("Объявление создано:", data);
      }
      navigate("/list");
    } catch (error) {
      console.error("Ошибка при создании объявления:", error.response?.data || error.message);
    }
  };

  return (
    <>
      <Link to="/list">Вернуться к списку объявлений</Link>
      <hr />

      <form onSubmit={handleSubmit(onSubmit)}>
        {formStep === 1 && (
          <FormStep1 setFormStep={setFormStep} register={register} watch={watch} errors={errors} />
        )}

        {formStep === 2 && (
          <FormStep2 setFormStep={setFormStep} register={register} errors={errors} type={type} />
        )}
      </form>
    </>
  );
};

export default FormPage;
