import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import operations from '../../redux/plates/operations';
import { getPlates } from '../../redux/plates/selectors';
import { Button } from '../Button/Button';

const PlatesForm = () => {
  const plates = useSelector(getPlates);
  const dispatch = useDispatch();
  const navigate = useNavigate ();
    
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [plateImage, setPlateImage] = useState([]);

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
    setPlateImage(e.target.files);
  }

  const handleSubmit = () => {
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
            <h1>Додати виріб</h1>
            <form>
          <label>
            Назва підлоги:
            <input
                type="text"
                placeholder="Назва виробу"
                value={name}
                name="name"   
                onChange={handleChange}
            />
            </label>
          <label>
            Кількість:
            <input
                type="text"
                placeholder="Кількість"
                value={quantity}
                name="quantity" 
                onChange={handleChange}
            />
            </label>
          <label>
            Ціна підлоги:
            <input
                type="text"
                placeholder="Ціна"
                value={price}
                name="price" 
                onChange={handleChange}
            />
            </label>
          <label>
            Опис підлоги:
            <input
                type="text"
                placeholder="Опис"
                value={description}
                name="description"   
                onChange={handleChange}
            />
            </label>
          <label>
            Зображення підлоги:
            <input
                type="file"
                placeholder="Зображення"
                name="plateImage"  
                multiple
                onChange={onFileChange}
            />
            </label>
          <Button
            onClick={handleSubmit}
          >
            Створити
          </Button>
        </form>
        </>
    );
};

export default PlatesForm;