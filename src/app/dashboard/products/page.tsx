"use client";
import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import dayjs from 'dayjs';

import { CustomersFilters } from '@/components/dashboard/product/products-filters';
import { CustomersTable } from '@/components/dashboard/product/products-table';
import type { ProductData } from '@/components/dashboard/product/products-table';
import AddProductDialog from '@/components/dashboard/product/add-product';


const customers = [
  {
    id: 'USR-010',
    image: '/assets/producto1.jpg',
    name: 'Tablero de 4 circuitos con tapa/puerta',
    provider: 'Suministros Eléctricos Táchira',
    price: '12,20$',
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-009',
    name: 'Terminal anillo azul 5/32 16-14 awg',
    image: '/assets/producto2.jpg',
    provider: 'TiendaElectrica.com',
    price: '0,50$',
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-008',
    name: 'Breakers thql 1x50 amperios',
    image: '/assets/producto3.jpg',
    provider: 'Makro',
    price: '3,00$',
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
] satisfies ProductData[];

export default function Page(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 20;

  const [productsState, setProductsState] = React.useState<ProductData[]>(customers);
  const paginatedCustomers = applyPagination(productsState, page, rowsPerPage);
  const [open, setOpen] = React.useState<boolean>(false);

  const handleDelete = (index: number) => {
    // Crea una copia del estado actual de productos
    const updatedProducts = [...productsState];
    // Elimina el producto en el índice dado
    updatedProducts.splice(index, 1);
    // Actualiza el estado con los productos actualizados
    setProductsState(updatedProducts);
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Productos</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
              Import
            </Button>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Export
            </Button>
          </Stack>
        </Stack>
        <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained" onClick={()=>{ setOpen(true); }}>
            Añadir
          </Button>
        </div>
      </Stack>
      <CustomersFilters />
      <CustomersTable
        count={paginatedCustomers.length}
        page={page}
        rows={paginatedCustomers}
        rowsPerPage={rowsPerPage}
        handleDelete={handleDelete}
      />
      <AddProductDialog open={open} onClose={()=>{ setOpen(false); }} setProductsState={setProductsState} productsState={productsState}/>
    </Stack>
  );
}

function applyPagination(rows: ProductData[], page: number, rowsPerPage: number): ProductData[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
