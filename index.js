const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('<h1>Welcome to Secure Node App</h1>');
});

app.get('/login', (req, res) => {
  res.send(`
    <form action="/login" method="post">
      <input name="username" placeholder="Username" />
      <input name="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  `);
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  res.send(`Logged in as: ${username}`);
});

app.get('/dashboard', (req, res) => {
  res.send('<h2>Dashboard: Restricted Area</h2>');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Permissions-Policy", "geolocation=()");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Content-Security-Policy", "default-src 'self'");
  next();
});

app.disable("x-powered-by");
