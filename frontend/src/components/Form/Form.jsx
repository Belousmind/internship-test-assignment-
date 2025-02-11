import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import FormStep1 from "./FormStep1";
import FormStep2 from "./FormStep2";

import "./Form.css";

const FormPage = () => {
  const [formStep, setFormStep] = useState(1);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const category = watch("category");

  const onSubmit = (data) => {
    console.log("Форма отправлена:", data);
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
          <FormStep2 setFormStep={setFormStep} register={register} errors={errors} category={category} />
        )}
      </form>
    </>
  );
};

export default FormPage;
