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

   app.put('/projects/:id', (req, res) => {
     const { id } = req.params;
     const { title } = req.body;
    
     const project = projects.find(p => p.id == id);

      project.title = title;
      
      return res.json(projects);
   });

   app.delete('/projects/:id', (req, res) => {
     const { id } = req.params;

     const project = projects.find(p => p.id == id);

     
     projects.splice(id, 1);

     return res.send();
   });

   app.post('/projects/:id/tasks', (req, res) => {
     const { id } = req.params;
     const { title } = req.body;
     const { tasks } = req.body;

     const project = projects.find(p => p.id == id);

     const task = tasks.find(t => t.tasks == tasks);

     project.task.push(title);

     return res.json(project);
   });

app.listen(3333);