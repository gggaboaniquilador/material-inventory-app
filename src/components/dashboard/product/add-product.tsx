/* eslint-disable eslint-comments/require-description */
/* eslint-disable react/function-component-definition */

'use client';

import React, { useState, type Dispatch } from 'react';
import { Button, Dialog, DialogActions, DialogContent, Stack, TextField } from '@mui/material';

import { type ProductData } from './products-table';

interface AddProductDialogProps {
  open: boolean;
  onClose: () => void;
  setProductsState: Dispatch<ProductData[]>;
  productsState: ProductData[];
}

const AddProductDialog: React.FC<AddProductDialogProps> = ({ open, onClose, setProductsState, productsState }) => {
  const [formData, setFormData] = useState<ProductData>({
    id: '',
    image: '',
    name: '',
    provider: '',
    price: '',
    createdAt: new Date(),
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null); // Estado para la vista previa de la imagen

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          image: reader.result as string,
        }));
        setImagePreview(reader.result as string); // Actualiza la vista previa de la imagen
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = () => {
    // Aquí puedes añadir la lógica para guardar los datos y la imagen en tu backend
    // Por ahora, solo lo mostraré en la consola
    const lastProducts = [...productsState];
    lastProducts.push(formData);
    setProductsState(lastProducts);
    setImagePreview(''); // Actualiza la vista previa de la imagen
    setFormData({
      id: '',
      image: '',
      name: '',
      provider: '',
      price: '',
      createdAt: new Date(),
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <form>
          <TextField
            fullWidth
            label="Identificado"
            name="id"
            value={formData.id}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Nombre"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Proveedor"
            name="provider"
            value={formData.provider}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Precio"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            margin="normal"
          />
          <Stack>
            {/* Vista previa de la imagen */}
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" style={{ maxWidth: '50%', marginTop: '16px' }} />
            ) : null}
            {/* Botón de selección de archivo estilizado */}
            {/* Estiliza el botón de selección de archivo */}
            <Button
              variant="contained"
              component="label"
              sx={{
                marginTop: '16px',
                backgroundColor: '#2196f3', // Color de fondo
                color: '#fff', // Color del texto
                '&:hover': {
                  backgroundColor: '#1976d2', // Color de fondo al pasar el mouse
                },
              }}
            >
              Seleccionar Imagen
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }} // Oculta el input de archivo
              />
            </Button>
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onClose();
            setImagePreview(''); // Actualiza la vista previa de la imagen
            setFormData({
              id: '',
              image: '',
              name: '',
              provider: '',
              price: '',
              createdAt: new Date(),
            });
          }}
        >
          Cancel
        </Button>
        <Button onClick={handleFormSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductDialog;
