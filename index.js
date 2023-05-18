import http from 'http';
import fs from 'fs';

const hostname = 'backend06.onrender.com';
const port = 3000;

let status = { red: 0, blue: 0 };

// Read the status from the file during server startup
try {
  const data = fs.readFileSync('./status.json', 'utf8');
  status = JSON.parse(data);
  console.log(status);
} catch (error) {
  console.error(error);
}

const server = http.createServer((req, res) => {
  // Set CORS headers for every response
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  // Check if the request method is OPTIONS
  if (req.method === 'OPTIONS') {
    // Send a response with status code 200 for OPTIONS method
    res.statusCode = 200;
    res.end();
    return;
  }

  // Handle GET requests based on request URL
  if (req.method === 'GET') {
    if (req.url === '/red') {
      // Send a response with status code 200 and { red: status.red } as JSON
      res.statusCode = 200;
      res.end(JSON.stringify({ red: status.red }));
    } else if (req.url === '/blue') {
      // Send a response with status code 200 and { blue: status.blue } as JSON
      res.statusCode = 200;
      res.end(JSON.stringify({ blue: status.blue }));
    } else if (req.url === '/status') {
      // Send a response with status code 200 and the status object as JSON
      res.statusCode = 200;
      res.end(JSON.stringify(status));
    } else {
      // Send a response with status code 404 and { error: "page not found" } as JSON
      res.statusCode = 404;
      res.end(JSON.stringify({ error: 'page not found' }));
    }
  } else if (req.method === 'PUT') {
    if (req.url === '/red') {
      // Increase status.red by one
      status.red += 1;
      // Send a response with status code 200 and { red: status.red } as JSON
      res.statusCode = 200;
      res.end(JSON.stringify({ red: status.red }));
      // Write the updated status object to the file
      fs.writeFile('./status.json', JSON.stringify(status), (err) => {
        if (err) {
          console.log(err);
        }
      });
    } else if (req.url === '/blue') {
      // Increase status.blue by one
      status.blue += 1;
      // Send a response with status code 200 and { blue: status.blue } as JSON
      res.statusCode = 200;
      res.end(JSON.stringify({ blue: status.blue }));
      // Write the updated status object to the file
      fs.writeFile('./status.json', JSON.stringify(status), (err) => {
        if (err) {
          console.log(err);
        }
      });
    } else {
      // Send a response with status code 404 and { error: "page not found" } as JSON
      res.statusCode = 404;
      res.end(JSON.stringify({ error: 'page not found' }));
    }
  } else {
    // Send a response with status code 405 for unsupported request methods
    res.statusCode = 405;
    res.end();
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
