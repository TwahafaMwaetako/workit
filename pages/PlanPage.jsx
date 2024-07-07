import React, { useState } from 'react';
import { Typography, TextField, Button, List, ListItem, ListItemText, Card, CardContent, Grid, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const PlanPage = ({ plans, setPlans }) => {
  const [planName, setPlanName] = useState('');
  const [exercise, setExercise] = useState('');

  const addExercise = () => {
    if (!planName || !exercise) return;
    setPlans(prevPlans => {
      const existingPlan = prevPlans.find(p => p.name === planName);
      if (existingPlan) {
        return prevPlans.map(p => 
          p.name === planName ? { ...p, exercises: [...p.exercises, exercise] } : p
        );
      } else {
        return [...prevPlans, { name: planName, exercises: [exercise] }];
      }
    });
    setExercise('');
  };

  const deletePlan = (planName) => {
    setPlans(prevPlans => prevPlans.filter(p => p.name !== planName));
  };

  const deleteExercise = (planName, exerciseToDelete) => {
    setPlans(prevPlans => prevPlans.map(p => 
      p.name === planName 
        ? { ...p, exercises: p.exercises.filter(e => e !== exerciseToDelete) } 
        : p
    ));
  };

  return (
    <Box className="page" sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>Create Workout Plan</Typography>
      <Card sx={{ mb: 3, p: 2 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <TextField 
                fullWidth 
                label="Plan Name" 
                value={planName} 
                onChange={(e) => setPlanName(e.target.value)} 
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField 
                fullWidth 
                label="Exercise" 
                value={exercise} 
                onChange={(e) => setExercise(e.target.value)} 
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button 
                onClick={addExercise} 
                variant="contained" 
                color="primary" 
                fullWidth
                startIcon={<AddIcon />}
              >
                Add Exercise
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      
      <Grid container spacing={3}>
        {plans.map((plan, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6">{plan.name}</Typography>
                  <IconButton onClick={() => deletePlan(plan.name)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </Box>
                <List>
                  {plan.exercises.map((exercise, i) => (
                    <ListItem key={i} divider secondaryAction={
                      <IconButton edge="end" aria-label="delete" onClick={() => deleteExercise(plan.name, exercise)}>
                        <DeleteIcon />
                      </IconButton>
                    }>
                      <ListItemText primary={exercise} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PlanPage;