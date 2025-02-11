const ServiceFields = ({ register, errors }) => {
  return (
    <>
      <label>Тип услуги</label>
      <select {...register("serviceType", { required: "Выберите тип услуги" })}>
        <option value="">Выберите</option>
        <option value="remont">Ремонт</option>
        <option value="cleaning">Уборка</option>
        <option value="delivery">Доставка</option>
      </select>
      {errors.serviceType && <p style={{ color: "red" }}>{errors.serviceType.message}</p>}

      <label>Опыт работы (лет)</label>
      <input type="number" {...register("experience", { required: "Введите опыт работы" })} />
      {errors.experience && <p style={{ color: "red" }}>{errors.experience.message}</p>}

      <label>Стоимость (₽)</label>
      <input type="number" {...register("cost", { required: "Введите цену" })} />
      {errors.price && <p style={{ color: "red" }}>{errors.price.message}</p>}

      <label>График работы</label>
      <input type="text" {...register("workSchedule")} />
    </>
  );
};

export default ServiceFields;
