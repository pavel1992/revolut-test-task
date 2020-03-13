import { OPEN_EXCHANGE_API_RATES_URL, OPEN_EXCHANGE_APP_ID } from "../constants";

export const fetchExchangeRate = () => fetch(
  `${OPEN_EXCHANGE_API_RATES_URL}?app_id=${OPEN_EXCHANGE_APP_ID}`,
  {
    method: 'GET',
  },
);