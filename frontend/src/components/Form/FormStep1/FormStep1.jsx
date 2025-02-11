const FormStep1 = ({ setFormStep, register, watch, errors }) => {
  
  const name = watch("name");
  const description = watch("description");
  const location = watch("location");
  const category = watch("category");

  return (
    <>
      <h2>Основная информация</h2>

      <label>Название</label>
      <input type="text" {...register("name", { required: "Введите название" })} />
      {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}

      <label>Описание</label>
      <textarea {...register("description", { required: "Введите описание" })}></textarea>
      {errors.description && <p style={{ color: "red" }}>{errors.description.message}</p>}

      <label>Локация</label>
      <input type="text" {...register("location", { required: "Введите локацию" })} />
      {errors.location && <p style={{ color: "red" }}>{errors.location.message}</p>}

      <label>Фото</label>
      <input type="file" {...register("photo")} />

      <label>Категория</label>
      <select {...register("category", { required: "Выберите категорию" })}>
        <option value="">Выберите категорию</option>
        <option value="RealEstate">Недвижимость</option>
        <option value="Car">Авто</option>
        <option value="Service">Услуги</option>
      </select>
      {errors.category && <p style={{ color: "red" }}>{errors.category.message}</p>}

      <button
        type="button"
        onClick={() => setFormStep(2)}
        disabled={!name || !description || !location || !category}
      >
        Далее
      </button>
    </>
  );
};

export default FormStep1;
