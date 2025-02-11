import RealEstateFields from "./RealEstateFields/RealEstateFields";
import CarFields from "./CarFields/CarFields";
import ServiceFields from "./ServiceFields/ServiceFields";

const FormStep2 = ({ setFormStep, register, errors, category }) => {
  return (
    <>
      <h2>Дополнительная информация</h2>

      {category === "RealEstate" && <RealEstateFields register={register} errors={errors} />}
      {category === "Car" && <CarFields register={register} errors={errors} />}
      {category === "Service" && <ServiceFields register={register} errors={errors} />}

      <button type="button" onClick={() => setFormStep(1)}>Назад</button>
      <button type="submit">Отправить</button>
    </>
  );
};

export default FormStep2;
