// src/pages/Orders.tsx
import React, { useEffect, useState } from 'react';
import {DataGrid, GridPaginationModel} from '@mui/x-data-grid';
import axios from 'axios';
import { fetchAuthSession } from 'aws-amplify/auth';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState([]);
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
    setLoading(true);
    fetchAuthSession().then((session) => {
      const jwtToken = session.tokens?.accessToken
      axios.get(
        'http://localhost:8000/orders',
        {
          headers: {
            Authorization: `Bearer ${jwtToken}` // include JWT token in Authorization header
          },
          params: {
            page: paginationModel.page,
            per_page: paginationModel.pageSize
        }
      })
        .then((response) => {
          setOrders(response.data.orders)
          setRowCount(response.data.total)
          setLoading(false)
        })
        .catch((error) => {
          console.error('There was an error!', error);
          setLoading(false);
        });
    }).catch(
      (error) => {
        console.error('There was an error fetching authentication token from Cognito!', error);
        setLoading(false);
      }
    )
  }, [paginationModel]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'opportunity_uuid', headerName: 'Opportunity UUID', width: 250 },
    { field: 'arbitrage_type', headerName: 'Arbitrage Type', width: 150 },
    { field: 'order_type', headerName: 'Type', width: 150 },
    { field: 'order_status', headerName: 'Status', width: 150 },
    { field: 'order_ref', headerName: 'Exchange Ref', width: 250 },
    { field: 'amount', headerName: 'Amount', width: 150 },
    { field: 'price', headerName: 'Price', width: 150 }
    // add other fields as necessary
  ];

  return (
    <div style={{width: '100%'}}>
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
    </div>
  );
};

export default Orders;