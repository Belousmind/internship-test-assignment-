import RealEstateFields from "../RealEstateFields/RealEstateFields";
import CarFields from "../CarFields/CarFields";
import ServiceFields from "../ServiceFields/ServiceFields";
import { Button } from "antd";

const FormStep2 = ({ setFormStep, control, errors, type, handleSubmit, isValid, onSubmit }) => {
  return (
    <>
      <h2>Дополнительная информация</h2>

      {type === "Недвижимость" && <RealEstateFields control={control} errors={errors} />}
      {type === "Авто" && <CarFields control={control} errors={errors} />}
      {type === "Услуги" && <ServiceFields control={control} errors={errors} />}

      <Button type="default" onClick={() => setFormStep(1)}>
        Назад
      </Button>
      <Button 
        type="primary" 
        onClick={handleSubmit(onSubmit)}
        style={{ marginLeft: 10 }} 
        disabled={!isValid}
      >
        Отправить
      </Button>
    </>
  );
};

export default FormStep2;
