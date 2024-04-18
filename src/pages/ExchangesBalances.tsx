// src/pages/ExchangesBalances.tsx
import React, {useEffect, useState} from 'react';
import {
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box
} from "@mui/material";
import { getAssets } from '../services/assetsApiService';
import {getExchanges, getExchangeAssetBalance, ExchangeAssetBalance} from '../services/exchangesApiService';

const ExchangesBalances: React.FC = () => {
  const [assets, setAssets] = useState<string[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<string>('');
  const [exchanges, setExchanges] = useState<string[]>([]);
  const [balances, setBalances] = useState<ExchangeAssetBalance[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    document.title = 'Exchanges Asset Balances';
    getAssets().then(response => {
      let assetsCodes: string[] = []
      response.data.forEach((asset: any) => {
        assetsCodes.push(asset.code)
      })
      setAssets(assetsCodes);
    }).catch(error => {
      console.error('There was an error fetching assets!', error);
    });
    getExchanges().then(response => {
      let exchangeNames: string[] = []
      response.data.forEach((exchange: any) => {
        exchangeNames.push(exchange.name)
      })
      setExchanges(exchangeNames);
    }).catch(error => {
      console.error('There was an error fetching exchanges!', error);
    });
  }, []);

  useEffect(() => {
    if (assets.length > 0 && exchanges.length > 0) {

      const fetchBalances = async (asset: string) => {
        setLoading(true);
        const balancePromises = exchanges.map(exchange => getExchangeAssetBalance(exchange, asset));
        Promise.all(balancePromises)
          .then(responses => {
            setBalances(responses.map(response => response.data));
            setLoading(false);
          })
          .catch(error => {
            setLoading(false);
            console.error('There was an error fetching exchanges!', error);
          });
      };

      if (selectedAsset) {
        fetchBalances(selectedAsset);
      } else {
        setSelectedAsset(assets[0]);
      }
    }
  }, [assets, selectedAsset, exchanges]);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedAsset(event.target.value as string);
  };

  return (
    <div>
      <Box mt={2} mb={4}>
        <Typography variant="h4">Exchanges Asset Balances</Typography>
      </Box>
      <Box mt={2} mb={4} display="flex" alignItems="center">
        <Typography mr={1}>Asset: </Typography>
        <Select
          value={selectedAsset}
          onChange={handleChange}
        >
          {assets.map((asset: string) => (
            <MenuItem key={asset} value={asset}>{asset}</MenuItem>
          ))}
        </Select>
      </Box>
      <TableContainer>
        <Table>
          <TableHead style={{backgroundColor: '#f0f0f0', fontWeight: 'bold'}}>
            <TableRow>
              <TableCell>Exchange</TableCell>
              <TableCell align="right">Full Balance</TableCell>
              <TableCell align="right">Available Balance</TableCell>
              <TableCell align="right">Locked Balance</TableCell>
              <TableCell align="right">Available Balance in Memory</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ?
              <TableRow key="Loading">
                <TableCell colSpan={5} align="center">
                  <Typography>Fetching balances ...</Typography>
                  <CircularProgress />
                </TableCell>
              </TableRow>
             :
              <>
                {balances.map((balance) => (
                    <TableRow key={balance.exchange}>
                      <TableCell component="th" scope="row">
                        {balance.exchange}
                      </TableCell>
                      <TableCell align="right">{balance.full_balance.toFixed(4)} {selectedAsset}</TableCell>
                      <TableCell align="right">{balance.available_balance.toFixed(4)} {selectedAsset}</TableCell>
                      <TableCell align="right">{balance.locked_balance.toFixed(4)} {selectedAsset}</TableCell>
                      <TableCell align="right">{balance.available_balance_in_memory ? (balance.available_balance_in_memory.toFixed(4) + ' ' + selectedAsset) : '-'}</TableCell>
                    </TableRow>
                  )
                )}
                <TableRow style={{backgroundColor: '#f0f0f0', fontWeight: 'bold'}}>
                  <TableCell component="th" scope="row">
                    Totals:
                  </TableCell>
                  <TableCell align="right">{balances.reduce((acc, balance) => acc + balance.full_balance, 0).toFixed(4)} {selectedAsset}</TableCell>
                  <TableCell align="right">{balances.reduce((acc, balance) => acc + balance.available_balance, 0).toFixed(4)} {selectedAsset}</TableCell>
                  <TableCell align="right">{balances.reduce((acc, balance) => acc + balance.locked_balance, 0).toFixed(4)} {selectedAsset}</TableCell>
                  <TableCell align="right">{balances.reduce((acc, balance) => acc + (balance.available_balance_in_memory || 0), 0).toFixed(4)} {selectedAsset}</TableCell>
                </TableRow>
              </>
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ExchangesBalances;