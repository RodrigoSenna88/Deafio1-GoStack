const express = require ('express');

const app = express();

app.use(express.json());

let numberOfRequests = 0;

const projects = [];

function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ error: 'Project not found' });
  }

  return next();
};

function logRequests(req,res,next) {
  numberOfRequests++;

  console.log(`Número de requisições: ${numberOfRequests}`);

  return next();
}

app.use(logRequests);


app.get('/projects', (req,res) => {
  return res.json(projects);
});


app.post('/projects', (req, res) => {
  const { id, title} = req.body;
 
  const project = {
     id,
     title,
     task: []
     };

   projects.push(project);

   return res.json(project);
  
   });

   app.put('/projects/:id', checkProjectExists, (req, res) => {
     const { id } = req.params;
     const { title } = req.body;
    
     const project = projects.find(p => p.id == id);

      project.title = title;
      
      return res.json(projects);
   });

   app.delete('/projects/:id', checkProjectExists, (req, res) => {
     const { id } = req.params;

     const project = projects.find(p => p.id == id);

     
     projects.splice(project, 1);

     return res.send();
   });

   app.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
     const { id } = req.params;
     const { title } = req.body;
  

     const project = projects.find(p => p.id == id);

     project.task.push(title);

     return res.json(project);
   });

app.listen(3333);