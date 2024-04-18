// src/pages/Orders.tsx
import React, {useEffect, useState} from 'react';
import {DataGrid, GridPaginationModel, GridColDef} from '@mui/x-data-grid';
import {getOrders, Order} from "../services/ordersApiService";
import {Box, Typography} from "@mui/material";

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = React.useState<GridPaginationModel>({
    pageSize: 20,
    page: 1,
  })
  const [rowCountState, setRowCountState] = React.useState(rowCount);

  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      rowCount !== undefined ? rowCount : prevRowCountState,
    );
  }, [rowCount, setRowCountState]);

  const handlePaginationModelChange = (newModel: GridPaginationModel) => {
    setPaginationModel(newModel);
  }

  useEffect(() => {
    document.title = 'Orders';
    if (paginationModel.page === 0) {
      return;
    }
    setLoading(true);
    getOrders(paginationModel.page, paginationModel.pageSize)
      .then((response) => {
        setOrders(response.data.orders)
        setRowCount(response.data.total)
        setLoading(false)
      })
      .catch((error) => {
        console.error('There was an error!', error);
        setLoading(false);
      });
  }, [paginationModel]);

  const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', flex: 1},
    {field: 'opportunity_uuid', headerName: 'Opportunity UUID', flex: 2},
    {field: 'arbitrage_type', headerName: 'Arbitrage Type', align: 'center', flex: 1},
    {field: 'order_type', headerName: 'Type', align: 'center', flex: 1},
    {field: 'order_status', headerName: 'Status', align: 'center', flex: 1},
    {field: 'order_ref', headerName: 'Exchange Ref', flex: 2},
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 1,
      align: 'right',
      valueFormatter: (value?: string) => {
        if (value == null) {
          return '';
        }
        return parseFloat(value).toFixed(4)
      }
    },
    {
      field: 'price',
      headerName: 'Price',
      flex: 1,
      align: 'right',
      valueFormatter: (value?: string) => {
        if (value == null) {
          return '';
        }
        return parseFloat(value).toFixed(4)
      }
    }
    // add other fields as necessary
  ];

  return (
    <>
      <Box mt={2} mb={4}>
        <Typography variant="h4">Exchanges Orders</Typography>
      </Box>
      <Box>
        <DataGrid
          rows={orders}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 50,
              },
            },
          }}
          rowCount={rowCountState}
          pageSizeOptions={[5, 10, 20, 50, 100]}
          pagination
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={handlePaginationModelChange}
          loading={loading}
        />
      </Box>
    </>
  );
};

export default Orders;