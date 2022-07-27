import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import operations from '../../redux/plates/operations';
import { getPlates } from '../../redux/plates/selectors';
import { Button } from '../Button/Button';
import s from './PlatesForm.module.css';

const PlatesForm = () => {
  const plates = useSelector(getPlates);
  const dispatch = useDispatch();
  const navigate = useNavigate ();
    
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [plateImage, setPlateImage] = useState([]);
    const [previewImage, setPreviewImage] = useState([]);

    const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'quantity':
        setQuantity(value);
        break;
        
      case 'price':
        setPrice(value);
        break;
        
      case 'description':
        setDescription(value);
        break;
        
      case 'plateImage':
        setPlateImage(value);
        break;

      default:
        return;
    }
  };
 
  const onFileChange = e => {

    let fileObj = [];
    let fileArray = [];

    fileObj.push(e.target.files);

    for(let i = 0; i < fileObj[0].length; i++){
      fileArray.push(URL.createObjectURL(fileObj[0][i]));
      setPreviewImage(fileArray);
      }
      setPlateImage(e.target.files);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('quantity', quantity);
      formData.append('price', price);
      formData.append('description', description);
      for (const key of Object.keys(plateImage)) {
        formData.append('plateImage', plateImage[key]);
      }
      if (plates.find(plate => plate.name === name)) {
        return alert(`Підлога "${name}" вже існує`);
      };
      dispatch(operations.addPlate(formData)).then((res) => {
        if (!res.error) {
          navigate(`/plate/${res.payload.id}`, { replace: true });
        }
      });
      
      resetForm();
      
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    setName('');
    setQuantity('');
    setPrice('');
    setDescription('');
    setPlateImage('');
  };

  const handleClick = () => navigate(-1);
    
    return (
      <>
        <Button
          isBackButton = {true}
          onClick={handleClick}
        >
          Назад
        </Button>
            <h1 className={s.text}>Додати виріб</h1>
            <form className={s.form}>
          <div className={s.input_box}>
              <input
                type="text"
                value={name}
                name="name"   
                required={true}
                onChange={handleChange}
                className={s.input}
              />
            <label className={s.label}>Назва підлоги:</label>
          </div>
          <div className={s.input_box}>
            <input
              type="text"
              value={quantity}
              name="quantity" 
              required={true}
              onChange={handleChange}
              className={s.input}
              />
          <label className={s.label}>Кількість:</label>
            </div>
          <div className={s.input_box}>
            <input
              type="text"
              value={price}
              name="price" 
              required={true}
              onChange={handleChange}
              className={s.input}
              />
              <label className={s.label}>Ціна підлоги:</label>
            </div>
          <div className={s.input_box}>
            <input
              type="text"
              value={description}
              name="description"  
              required={true}
              onChange={handleChange}
              className={s.input}
              />
              <label className={s.label}>Опис підлоги:</label>
          </div>
          <div className={s.file_input}>
            <input
              type="file"
              name="plateImage"  
              multiple
              required={true}
              id="file-upload"
              onChange={onFileChange}
              className={s.input_img}
              />
            <label htmlFor="file-upload">Зображення підлоги:</label>
          </div>
            <div>
              {plateImage && (
                <ul className={s.images_box}>
                    {previewImage.map((file, index) => (
                  <li key={index}>
                        <img
                          src={file}
                          alt={file}
                          className={s.image}
                        />
                  </li>
                    ))}
                </ul>
                  )}
              </div>
            <Button
            onClick={handleSubmit}
            className={s.button}
            >
              Створити
            </Button>
        </form>
        </>
    );
};

export default PlatesForm;