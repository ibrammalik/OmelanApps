// api/proxy.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const url = 'http://3.27.122.40:5000' + req.url.replace('/api/proxy', '');
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Proxy Error', details: err.message });
  }
}
