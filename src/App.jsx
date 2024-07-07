import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, BottomNavigation, BottomNavigationAction, Button, TextField, Card } from '@mui/material';
import { FitnessCenter, EventNote, Timeline, Timer, Brightness4, Brightness7 } from '@mui/icons-material';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import WorkoutPage from '/pages/WorkoutPage.jsx';
import PlanPage from '/pages/PlanPage.jsx';
import ProgressPage from '/pages/ProgressPage.jsx';
import TimerPage from '/pages/TimerPage.jsx';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [page, setPage] = useState('workout');
  const [workouts, setWorkouts] = useState([]);
  const [plans, setPlans] = useState([]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#bb86fc' : '#9c27b0',
      },
      background: {
        default: darkMode ? '#000000' : '#f5f5f5',
        paper: darkMode ? '#121212' : '#ffffff',
      },
    },
    typography: {
      fontFamily: 'Poppins, sans-serif',
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '20px',
            padding: '10px 20px',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            marginBottom: '16px',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: darkMode ? '0 2px 4px rgba(255,255,255,0.1)' : '0 2px 4px rgba(0,0,0,0.1)',
            padding: '16px',
            marginBottom: '16px',
            backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
          },
        },
      },
    },
  });

  useEffect(() => {
    const savedWorkouts = localStorage.getItem('workouts');
    const savedPlans = localStorage.getItem('plans');
    if (savedWorkouts) setWorkouts(JSON.parse(savedWorkouts));
    if (savedPlans) setPlans(JSON.parse(savedPlans));
  }, []);

  useEffect(() => {
    localStorage.setItem('workouts', JSON.stringify(workouts));
    localStorage.setItem('plans', JSON.stringify(plans));
  }, [workouts, plans]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const renderPage = () => {
    switch (page) {
      case 'workout':
        return <WorkoutPage workouts={workouts} setWorkouts={setWorkouts} />;
      case 'plan':
        return <PlanPage plans={plans} setPlans={setPlans} />;
      case 'progress':
        return <ProgressPage workouts={workouts} />;
      case 'timer':
        return <TimerPage />;
      default:
        return <WorkoutPage workouts={workouts} setWorkouts={setWorkouts} />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        maxWidth: '100%',
        margin: '0 auto',
        padding: '0',
        textAlign: 'center',
      }}>
        <Button
          onClick={toggleDarkMode}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 1000,
          }}
        >
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </Button>
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px',
          paddingBottom: '72px',
          paddingTop: '56px', // Added to account for the dark mode toggle button
        }}>
          <TransitionGroup>
            <CSSTransition
              key={page}
              classNames="fade"
              timeout={300}
            >
              <div className="page">
                {renderPage()}
              </div>
            </CSSTransition>
          </TransitionGroup>
        </div>
        <BottomNavigation
          value={page}
          onChange={(event, newValue) => {
            setPage(newValue);
          }}
          showLabels
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            borderTop: '1px solid',
            borderColor: 'divider',
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <BottomNavigationAction label="Workout" value="workout" icon={<FitnessCenter />} />
          <BottomNavigationAction label="Plan" value="plan" icon={<EventNote />} />
          <BottomNavigationAction label="Progress" value="progress" icon={<Timeline />} />
          <BottomNavigationAction label="Timer" value="timer" icon={<Timer />} />
        </BottomNavigation>
      </div>
    </ThemeProvider>
  );
};

export default App;