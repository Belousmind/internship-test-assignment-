import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import FormStep1 from "./FormStep1/FormStep1";
import FormStep2 from "./FormStep2/FormStep2";

const FormPage = () => {
  const [formStep, setFormStep] = useState(1);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const type = watch("type");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data)
    try {
      const response = await axios.post("http://localhost:3000/items", data);
      console.log("Объявление создано:", response.data);

      navigate("/list");
    } catch (error) {
      console.log(data)
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
