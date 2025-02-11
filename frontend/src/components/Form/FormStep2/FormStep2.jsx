import RealEstateFields from "../RealEstateFields/RealEstateFields";
import CarFields from "../CarFields/CarFields";
import ServiceFields from "../ServiceFields/ServiceFields";

const FormStep2 = ({ setFormStep, register, errors, type }) => {
  return (
    <>
      <h2>Дополнительная информация</h2>

      {type === "Недвижимость" && <RealEstateFields register={register} errors={errors} />}
      {type === "Авто" && <CarFields register={register} errors={errors} />}
      {type === "Услуги" && <ServiceFields register={register} errors={errors} />}

      <button type="button" onClick={() => setFormStep(1)}>Назад</button>
      <button type="submit">Отправить</button>
    </>
  );
};

export default FormStep2;
