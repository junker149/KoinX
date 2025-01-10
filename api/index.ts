import express, { Request, Response } from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.json());

const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,matic-network&vs_currencies=usd';
const options = {
  method: 'GET',
  headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-r2ggNpry5Wv7tthiywX7DXWg'}
};

axios.get(url, options)
.then((res)=>{
    console.log(res.data);
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
