// src/pages/ExchangesBalances.tsx
import React, {useEffect, useState} from 'react';
import { Typography, Select, MenuItem, SelectChangeEvent, CircularProgress } from "@mui/material";
import { getAssets } from '../services/assetsApiService';
import {getExchanges, getExchangesAssetBalance} from '../services/exchangesApiService';

const ExchangesBalances: React.FC = () => {
  const [assets, setAssets] = useState<string[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<string>('');
  const [exchanges, setExchanges] = useState<string[]>([]);
  const [balances, setBalances] = useState<{[key: string]: number}>({});
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

  const fetchBalances = async (asset: string) => {
    setLoading(true);
    getExchangesAssetBalance(asset).then(response => {
      let newBalances: {[key: string]: number} = {};
      response.data.exchanges.forEach((exchange: any) => {
        newBalances[exchange.exchange] = exchange.full_balance
      })
      setBalances(newBalances);
      setLoading(false);
    }).catch(error => {
      setLoading(false);
      console.error('There was an error fetching exchanges!', error);
    });
  };

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedAsset(event.target.value as string);
    fetchBalances(event.target.value as string);
  };

  return (
    <div>
      <Typography variant="h4">Exchanges Asset Balances</Typography>
      <Select
        value={selectedAsset}
        onChange={handleChange}
      >
        {assets.map((asset: string) => (
          <MenuItem key={asset} value={asset}>{asset}</MenuItem>
        ))}
      </Select>
      {loading ? (
        <>
          <Typography>Fetching balances ...</Typography>
          <CircularProgress />
        </>
      ) : (
        Object.entries(balances).map(([exchange, balance]) => (
          <div key={exchange}>
            <Typography variant="h6">{exchange}</Typography>
            <Typography>{balance} {selectedAsset}</Typography>
          </div>
        ))
      )}
    </div>
  );
};

export default ExchangesBalances;