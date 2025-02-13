import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Form } from "antd";
import FormStep1 from "./FormStep1/FormStep1";
import FormStep2 from "./FormStep2/FormStep2";

const FormPage = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const editingItem = location.state?.item || null;

  const { control, handleSubmit, setValue, watch, formState: { errors, isValid } } = useForm({ mode: "onChange" });

  const [formStep, setFormStep] = useState(1);
  const type = watch("type");

  const [fileList, setFileList] = useState([]);
 
  useEffect(() => {
    if (editingItem) {
      Object.keys(editingItem).forEach((key) => {
        setValue(key, editingItem[key], { shouldValidate: true });
      });
    }
  }, [editingItem, setValue]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
  
      Object.keys(data).forEach((key) => {
        if (key !== "photo") {
          formData.append(key, data[key]);
        }
      });
  
      if (fileList.length > 0) {
        formData.append("photo", fileList[0].originFileObj);
      }
  
      let response;
      if (editingItem) {
        response = await axios.put(`http://localhost:3000/items/${editingItem.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        response = await axios.post("http://localhost:3000/items", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
  
      console.log("Объявление обновлено:", response.data);
      navigate("/list");
    } catch (error) {
      console.error("Ошибка при создании объявления:", error.response?.data || error.message);
    }
  };

  return (
    <>
      <Link to="/list">Вернуться к списку объявлений</Link>
      <hr />

      <Form layout="vertical" style={{ maxWidth: "480px", margin: "0 auto", padding: "20px" }}>
        {formStep === 1 && (
          <FormStep1 
            setFormStep={setFormStep} 
            control={control} 
            errors={errors} 
            isValid={isValid}
            fileList={fileList}
            setFileList={setFileList}
         />
        )}

        {formStep === 2 && (
          <FormStep2 
            setFormStep={setFormStep} 
            control={control} 
            errors={errors} 
            type={type} 
            handleSubmit={handleSubmit(onSubmit)} 
            isValid={isValid}
            fileList={fileList}
          />
        )}
      </Form>
    </>
  );
};

export default FormPage;
