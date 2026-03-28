const axios = require('axios');
axios.post('https://avatar-backend-uz7j.onrender.com/api/auth/login', { email: 'admin@recbanda.ac.in', password: 'admin123' })
  .then(res => console.log('LOGIN SUCCESS! Token:', res.data.token.substring(0, 10) + '...'))
  .catch(err => console.log('LOGIN ERROR:', err.response ? err.response.data : err.message));
