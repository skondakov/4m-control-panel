// src/pages/Orders.tsx
import React, { useEffect, useState } from 'react';
import {DataGrid, GridPaginationModel, GridColDef} from '@mui/x-data-grid';
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
      if (paginationModel.page === 0) {
        paginationModel.page = 1
      }
      axios.get(
        'http://localhost:8000/orders/',
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

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'opportunity_uuid', headerName: 'Opportunity UUID', flex: 2 },
    { field: 'arbitrage_type', headerName: 'Arbitrage Type', align: 'center', flex: 1 },
    { field: 'order_type', headerName: 'Type', align: 'center', flex: 1},
    { field: 'order_status', headerName: 'Status', align: 'center', flex: 1 },
    { field: 'order_ref', headerName: 'Exchange Ref', flex: 2 },
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