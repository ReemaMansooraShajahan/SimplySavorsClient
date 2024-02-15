
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from 'react-cookie';
import { useState, useEffect } from "react";
import axios from "axios"; // Import axios for making HTTP requests

export default function Settings() {
  const [cookies] = useCookies(['access_token' , 'user_id']);

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

  function changeTheme(i) {
    const _theme = { ...themes[i] };
    setTheme(i === 0 ? "light" : "dark");
    let _settings = { ...settings };
    for (let key in _theme) {
      _settings[key] = _theme[key];
    }
    setSettings(_settings);

    // Call the function to update settings on the server
    updateSettingsOnServer(_settings);
  }

  function changeColor(i) {
    const _color = primaryColors[i];
    let _settings = { ...settings };
    _settings["--primary-color"] = _color;
    setPrimaryColor(i);
    setSettings(_settings);

    // Call the function to update settings on the server
    updateSettingsOnServer(_settings);
  }

  function changeFontSize(i) {
    const _size = fontSizes[i];
    let _settings = { ...settings };
    _settings["--font-size"] = _size.value;
    setFontSize(i);
    setSettings(_settings);

    // Call the function to update settings on the server
    updateSettingsOnServer(_settings);
  }

  function changeAnimationSpeed(i) {
    let _speed = animationSpeeds[i];
    let _settings = { ...settings };
    _settings["--animation-speed"] = _speed.value;
    setAnimationSpeed(i);
    setSettings(_settings);

    // Call the function to update settings on the server
    updateSettingsOnServer(_settings);
  }

  // Function to update settings on the server
  const updateSettingsOnServer = async (newSettings) => {
    try {
      // Use the user ID from cookies
      const userId = cookies.user_id;

      // Ensure user ID is available
      if (!userId) {
        console.error('User ID is not available.');
        return;
      }

      // Send a request to update settings to the server
      const response = await axios.put(
        `http://localhost:3009/settings/updateSettings/${cookies.user_id}`,
        { newSettingValue: newSettings }, // Send the entire 'settings' object
        { headers: {  Authorization: `Bearer ${cookies['access_token']}`, } } 
      );

      // Handle the response as needed
      console.log('Settings updated on the server:', response.data.settings);
    } catch (error) {
      console.error('Error updating settings on the server:', error);
      // Handle errors or display a user-friendly message
    }
  };


  const fetchUserSettings = async () => {
    try {
      const response = await axios.get(`http://localhost:3009/settings/getSettings/${cookies.user_id}`, {
        headers: { Authorization: `Bearer ${cookies['access_token']}` },
      });

      // Assuming the response has a 'settings' property
      setSettings(response.data.settings);
    } catch (error) {
      console.error('Error fetching user settings:', error);
      // Handle errors or display a user-friendly message
    }
  };

  useEffect(() => {
    fetchUserSettings();
  }, []);
    return (
        <div>
       
            <div className="section d-block">
                <h2>Primary Theme</h2>
                <div className="options-container">
                    <div className="option light" onClick={() => changeTheme(0)}>
                        { theme === "light"  }
                    </div>
                    <div className="option dark" onClick={() => changeTheme(1)}>
                        { theme === "dark" }
                    </div>
                </div>
            </div>
            <div className="section d-block">
                <h2>Preferred color</h2>
                <div className="options-container">
                    { primaryColors.map((color, index) => (
                        <div key={index} className="option light" style={{backgroundColor: color}} onClick={() => changeColor(index)}>
                            { primaryColor === index 
                            }
                        </div>
                    ))}
                </div>
            </div>
            <div className="section d-block">
                <h2>Font size</h2>
                <div className="options-container">
                    { fontSizes.map((size, index) => (
                        <button key={index} className="btn" onClick={() => changeFontSize(index)}>
                            {size.title}
                            { fontSize === index }
                        </button>
                    ))}
                </div>
            </div>
            <div className="section d-block">
                <h2>Animation speed</h2>
                <div className="options-container">
                    { animationSpeeds.map((speed, index) => (
                        <button key={index} className="btn" onClick={() => changeAnimationSpeed(index)}>
                            {speed.title}
                            { animationSpeed === index  }
                        </button>
                    ))}
                </div>
            </div>
            
        </div>
    )
}