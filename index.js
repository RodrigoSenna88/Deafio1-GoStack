const express = require ('express');

const app = express();

app.use(express.json());

const projects = [];

app.get('/projects', (req,res) => {
  return res.json(projects);
});

app.post('/projects', (req, res) => {
  const { id, title} = req.body;
 
  const project = {
     id,
     title,
     task: []
     }
   projects.push(project);

   return res.json(project);
  
   });

app.listen(3333);