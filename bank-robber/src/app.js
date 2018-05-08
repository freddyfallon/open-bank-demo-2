import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import moment from 'moment';
import { AuthAPIClient, DataAPIClient } from 'truelayer-client';

dotenv.config();

const app = express();

const port = 5050;

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

const redirectUri = process.env.REDIRECT_URL;

const client = new AuthAPIClient({
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
});

const scopes = ['info', 'accounts', 'balance', 'transactions', 'offline_access', 'cards'];

app.get('/', (req, res) => {
  try {
    const authURL = client.getAuthUrl(redirectUri, scopes, null, null, null, true);
    res.redirect(authURL);
  } catch (err) {
    console.error('🔴', err);
  }
});

app.get('/token', async (req, res) => {
  try {
    const { code } = req.query;
    const tokens = await client.exchangeCodeForToken(redirectUri, code);
    res.send(tokens);
  } catch (err) {
    console.error('🔴', err);
  }
});

app.post('/user-details', async (req, res) => {
  try {
    const { token } = req.body;
    const userDetails = await DataAPIClient.getInfo(token);
    res.send(userDetails);
  } catch (err) {
    console.error('🔴', err);
  }
});

app.post('/transactions', async (req, res) => {
  try {
    const firstDate = moment().subtract(100, 'days').format('YYYY-MM-DD');
    const secondDate = moment().format('YYYY-MM-DD');
    const { token } = req.body;
    const accounts = await DataAPIClient.getAccounts(token);
    const accountId = accounts.results[0].account_id;
    const transactions = await DataAPIClient.getTransactions(
      token,
      accountId,
      firstDate,
      secondDate,
    );
    const transaction = transactions.results.filter(payment => payment.description === 'AA INSURANCE')[0];
    res.send(transaction);
  } catch (err) {
    console.error('🔴', err);
  }
});

app.post('/accounts', async (req, res) => {
  try {
    const { token } = req.body;
    const transactions = await DataAPIClient.getAccounts(token);
    res.send(transactions);
  } catch (err) {
    console.error('🔴', err);
  }
});

app.listen(port);

console.log(`App is listening on port: ${port}`);
