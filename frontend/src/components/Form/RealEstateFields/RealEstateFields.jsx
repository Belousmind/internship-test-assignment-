const RealEstateFields = ({ register, errors }) => {
  return (
    <>
      <label>Тип недвижимости</label>
      <select {...register("propertyType", { required: "Выберите тип недвижимости" })}>
        <option value="">Выберите</option>
        <option value="apartment">Квартира</option>
        <option value="house">Дом</option>
        <option value="cottage">Коттедж</option>
      </select>
      {errors.propertyType && <p style={{ color: "red" }}>{errors.propertyType.message}</p>}

      <label>Площадь (кв. м)</label>
      <input type="number" {...register("area", { required: "Введите площадь" })} />
      {errors.area && <p style={{ color: "red" }}>{errors.area.message}</p>}

      <label>Количество комнат</label>
      <input type="number" {...register("rooms", { required: "Введите количество комнат" })} />
      {errors.rooms && <p style={{ color: "red" }}>{errors.rooms.message}</p>}

      <label>Цена (₽)</label>
      <input type="number" {...register("price", { required: "Введите цену" })} />
      {errors.price && <p style={{ color: "red" }}>{errors.price.message}</p>}
    </>
  );
};

export default RealEstateFields;
