import { useSelector, useDispatch } from "react-redux";
import { changeFilter } from "../../redux/plates/actions";
import { getFilter } from "../../redux/plates/selectors";
import s from "./Filter.module.css";

const Filter = () => {
  const value = useSelector(getFilter);
  const dispatch = useDispatch();

  const onChangeFilter = e => dispatch(changeFilter(e.target.value));

  return (
    <>
      <h2 className={s.title}>ПВХ Підлога</h2>
      <form className={s.form}>
        <label className={s.label}>Пошук підлоги по назві</label>
        <input
          className={s.input}
          type="text"
          value={value}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          onChange={onChangeFilter}
        />
      </form>
    </>
  );
};

export default Filter;