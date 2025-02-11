const CarFields = ({ register, errors }) => {
  return (
    <>
      <label>Марка</label>
      <select {...register("brand", { required: "Выберите марку" })}>
        <option value="">Выберите</option>
        <option value="Toyota">Toyota</option>
        <option value="BMW">BMW</option>
        <option value="Mercedes">Mercedes</option>
      </select>
      {errors.carBrand && <p style={{ color: "red" }}>{errors.carBrand.message}</p>}

      <label>Модель</label>
      <input type="text" {...register("model", { required: "Введите модель" })} />
      {errors.carModel && <p style={{ color: "red" }}>{errors.carModel.message}</p>}

      <label>Год выпуска</label>
      <input type="number" {...register("year", { required: "Введите год выпуска" })} />
      {errors.carYear && <p style={{ color: "red" }}>{errors.carYear.message}</p>}

      <label>Пробег (км)</label>
      <input type="number" {...register("mileage")} />
    </>
  );
};

export default CarFields;
