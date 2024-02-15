import React, { useState } from 'react';

import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import axios from 'axios';

function SignInSide() {
  const navigate = useNavigate();
  const [cookies,setCookies] = useCookies(['access_token' , 'user_id']);
  
  // const [settings, setSettings] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

//  const fetchUserSettings = async (token) => {
//   try {
//     const response = await axios.get(`http://localhost:3009/settings/getSettings/${cookies.user_id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     // Assuming the response has a 'settings' property
//     setSettings(response.data.settings);

//     // Update the settings in the local storage as well
//     localStorage.setItem("settings", JSON.stringify(response.data.settings));
//   } catch (error) {
//     console.error('Error fetching user settings:', error);
//     // Handle errors or display a user-friendly message
//   }
// };
  const fetchUserProfile = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get("http://localhost:3009/auth/user/profile", config);
      console.log('User Profile:', response.data);
      // You can store the user profile data in state or context if needed
    } catch (error) {
      console.error('User Profile Error:', error);
      // Handle errors here, e.g., show an error message to the user
    }
  };

  const handleLogin = async () => {
    try {
      console.log('Login request payload:', { username, password });
      const result = await axios.post("http://localhost:3009/auth/login", {
        username,
        password,
      });

      console.log('Login result:', result.data);

      setCookies("access_token", result.data.token);
      window.localStorage.setItem("userID", result.data.userID);
      setCookies("user_id", result.data.userID);
      console.log('Token stored:', result.data.token);

      // Fetch user profile after successful login
      await fetchUserProfile(result.data.token);
      // Fetch user settings after successful login
      await fetchUserSettings(result.data.userID, result.data.token);

      // Redirect to home or another page
      navigate("/");
    } catch (error) {
      console.error('Login error:', error);
      // Handle errors here, e.g., show an error message to the user
    }
  };

  useEffect(() => {
    const token = cookies["access_token"];
    console.log('Token retrieved:', token);

    // Fetch user profile and settings on component mount (if token is present)
    if (token) {
      fetchUserProfile(token);
      fetchUserSettings(token);
    }
  }, [cookies]);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin();
  };






 

  const initialSettings =
    JSON.parse(localStorage.getItem("settings")) || {
      "--background-color": "#fff",
      "--background-light": "#fff",
      "--primary-color": "rgb(255, 0, 86)",
      "--shadow-color": "rgba(0,0,0,0.2)",
      "--text-color": "#0A0A0A",
      "--text-light": "#575757",
      "--font-size": "16px",
      "--animation-speed": 1,
    };

  const [settings, setSettings] = useState(initialSettings);

  useEffect(() => {
    const root = document.documentElement;
    for (let key in settings) {
      root.style.setProperty(key, settings[key]);
    }
  }, [settings]);

  const [theme, setTheme] = useState("light");
  const themes = [
    {
      "--background-color": "#fff",
      "--background-light": "#fff",
      "--shadow-color": "rgba(0,0,0,0.2)",
      "--text-color": "#0A0A0A",
      "--text-light": "#575757",
    },
    {
      "--background-color": "rgb(29, 29, 29)",
      "--background-light": "rgb(77, 77, 77)",
      "--shadow-color": "rgba(0,0,0,0.2)",
      "--text-color": "#ffffff",
      "--text-light": "#eceaea",
    },
  ];

  const primaryColors = [
    "rgb(255, 0, 86)",
    "rgb(33, 150, 243)",
    "rgb(255, 193, 7)",
    "rgb(0, 200, 83)",
    "rgb(156, 39, 176)",
  ];

  const fontSizes = [
    {
      title: "Small",
      value: "12px",
    },
    {
      title: "Medium",
      value: "16px",
    },
    {
      title: "Large",
      value: "20px",
    },
  ];

  const animationSpeeds = [
    {
      title: "Slow",
      value: 2,
    },
    {
      title: "Medium",
      value: 1,
    },
    {
      title: "Fast",
      value: 0.5,
    },
  ];

  const [primaryColor, setPrimaryColor] = useState(0);
  const [fontSize, setFontSize] = useState(1);
  const [animationSpeed, setAnimationSpeed] = useState(1);

  // function changeTheme(i) {
  //   const _theme = { ...themes[i] };
  //   setTheme(i === 0 ? "light" : "dark");
  //   let _settings = { ...settings };
  //   for (let key in _theme) {
  //     _settings[key] = _theme[key];
  //   }
  //   setSettings(_settings);

  //   // Call the function to update settings on the server
  //   updateSettingsOnServer(_settings);
  // }

  // function changeColor(i) {
  //   const _color = primaryColors[i];
  //   let _settings = { ...settings };
  //   _settings["--primary-color"] = _color;
  //   setPrimaryColor(i);
  //   setSettings(_settings);

  //   // Call the function to update settings on the server
  //   updateSettingsOnServer(_settings);
  // }

  // function changeFontSize(i) {
  //   const _size = fontSizes[i];
  //   let _settings = { ...settings };
  //   _settings["--font-size"] = _size.value;
  //   setFontSize(i);
  //   setSettings(_settings);

  //   // Call the function to update settings on the server
  //   updateSettingsOnServer(_settings);
  // }

  // function changeAnimationSpeed(i) {
  //   let _speed = animationSpeeds[i];
  //   let _settings = { ...settings };
  //   _settings["--animation-speed"] = _speed.value;
  //   setAnimationSpeed(i);
  //   setSettings(_settings);

  //   // Call the function to update settings on the server
  //   updateSettingsOnServer(_settings);
  // }



  const fetchUserSettings = async (userId, token) => {
    try {
      const response = await axios.get(`http://localhost:3009/settings/getSettings/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      // Assuming the response has a 'settings' property
      setSettings(response.data.settings);
    } catch (error) {
      console.error('Error fetching user settings:', error);
      // Handle errors or display a user-friendly message
    }
  };
  
  useEffect(() => {
    const token = cookies["access_token"];
    const userId = cookies["user_id"];
    console.log('Token retrieved:', token);
  
    // Fetch user profile and settings on component mount (if token and userId are present)
    if (token && userId) {
      fetchUserProfile(token);
      fetchUserSettings(userId, token);
    }
  }, [cookies]);

  useEffect(() => {
    fetchUserSettings();
  }, []);






  return (
    <ThemeProvider theme={createTheme()}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://img.freepik.com/premium-photo/penne_303714-1840.jpg?w=900)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: 'rgb(225, 0, 86)', color: '#fff' }}
              >
                Sign In
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <p>
                    Don't have an account? <Link to="/registeration" style={{ cursor: "pointer" }}>Register</Link>
                  </p>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SignInSide;

