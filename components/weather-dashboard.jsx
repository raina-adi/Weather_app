"use client"
import React, { useState, useEffect } from "react";
import {
  ChevronDown, MapPin, Sun, CloudRain, Wind, Droplet, Eye,
  Thermometer, Cloud, Sunrise, Sunset, Navigation, CloudSnow, Snowflake
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mock Data (unchanged)
const locations = [
  { id: "newyork", name: "New York", country: "USA", timezone: "America/New_York" },
  { id: "london", name: "London", country: "UK", timezone: "Europe/London" },
  { id: "tokyo", name: "Tokyo", country: "Japan", timezone: "Asia/Tokyo" },
  { id: "mumbai", name: "Mumbai", country: "India", timezone: "Asia/Kolkata" },
  { id: "pune", name: "Pune", country: "India", timezone: "Asia/Kolkata" },
  { id: "jammu", name: "Jammu", country: "India", timezone: "Asia/Kolkata" },
  { id: "kashmir", name: "Kashmir", country: "India", timezone: "Asia/Kolkata" },
];

const mockWeatherData = {
  newyork: {
    temperature: 22,
    condition: "Partly Cloudy",
    icon: <CloudRain className="h-16 w-16 text-blue-500" />,
    highTemp: 25,
    lowTemp: 18,
    windSpeed: 12,
    humidity: 65,
    visibility: 10,
    feelsLike: 23,
    sunrise: "06:15 AM",
    sunset: "08:20 PM",
    windDirection: "NW",
    uvIndex: {
      value: 6,
      status: "Moderate"
    },
    precipitation: {
      chance: 30,
      amount: 0.2
    },
    forecast: [
      { day: "Mon", temp: 22, icon: <Sun className="h-6 w-6" /> },
      { day: "Tue", temp: 24, icon: <CloudRain className="h-6 w-6" /> },
      { day: "Wed", temp: 21, icon: <Sun className="h-6 w-6" /> },
      { day: "Thu", temp: 23, icon: <CloudRain className="h-6 w-6" /> },
      { day: "Fri", temp: 25, icon: <Sun className="h-6 w-6" /> },
    ],
    airQuality: {
      index: 45,
      status: "Moderate",
    },
  },
  london: {
    temperature: 16,
    condition: "Rainy",
    icon: <CloudRain className="h-16 w-16 text-blue-500" />,
    highTemp: 18,
    lowTemp: 12,
    windSpeed: 15,
    humidity: 75,
    visibility: 8,
    feelsLike: 14,
    sunrise: "07:30 AM",
    sunset: "06:45 PM",
    windDirection: "SW",
    uvIndex: {
      value: 3,
      status: "Low"
    },
    precipitation: {
      chance: 60,
      amount: 0.5
    },
    forecast: [
      { day: "Mon", temp: 16, icon: <CloudRain className="h-6 w-6" /> },
      { day: "Tue", temp: 15, icon: <CloudRain className="h-6 w-6" /> },
      { day: "Wed", temp: 17, icon: <Sun className="h-6 w-6" /> },
      { day: "Thu", temp: 16, icon: <CloudRain className="h-6 w-6" /> },
      { day: "Fri", temp: 18, icon: <Sun className="h-6 w-6" /> },
    ],
    airQuality: {
      index: 55,
      status: "Moderate",
    },
  },
  tokyo: {
    temperature: 28,
    condition: "Sunny",
    icon: <Sun className="h-16 w-16 text-yellow-500" />,
    highTemp: 30,
    lowTemp: 24,
    windSpeed: 8,
    humidity: 60,
    visibility: 12,
    feelsLike: 29,
    sunrise: "05:15 AM",
    sunset: "07:00 PM",
    windDirection: "NE",
    uvIndex: {
      value: 8,
      status: "High"
    },
    precipitation: {
      chance: 10,
      amount: 0.1
    },
    forecast: [
      { day: "Mon", temp: 28, icon: <Sun className="h-6 w-6" /> },
      { day: "Tue", temp: 29, icon: <Sun className="h-6 w-6" /> },
      { day: "Wed", temp: 30, icon: <Sun className="h-6 w-6" /> },
      { day: "Thu", temp: 27, icon: <CloudRain className="h-6 w-6" /> },
      { day: "Fri", temp: 29, icon: <Sun className="h-6 w-6" /> },
    ],
    airQuality: {
      index: 35,
      status: "Good",
    },
  },
  mumbai: {
    temperature: 32,
    condition: "Sunny",
    icon: <Sun className="h-16 w-16 text-yellow-500" />,
    highTemp: 35,
    lowTemp: 28,
    windSpeed: 10,
    humidity: 70,
    visibility: 10,
    feelsLike: 34,
    sunrise: "06:00 AM",
    sunset: "07:30 PM",
    windDirection: "SE",
    uvIndex: {
      value: 9,
      status: "High"
    },
    precipitation: {
      chance: 5,
      amount: 0.0
    },
    forecast: [
      { day: "Mon", temp: 32, icon: <Sun className="h-6 w-6" /> },
      { day: "Tue", temp: 33, icon: <Sun className="h-6 w-6" /> },
      { day: "Wed", temp: 34, icon: <Sun className="h-6 w-6" /> },
      { day: "Thu", temp: 31, icon: <CloudRain className="h-6 w-6" /> },
      { day: "Fri", temp: 33, icon: <Sun className="h-6 w-6" /> },
    ],
    airQuality: {
      index: 50,
      status: "Moderate",
    },
  },
  pune: {
    temperature: 30,
    condition: "Partly Cloudy",
    icon: <Cloud className="h-16 w-16 text-gray-500" />,
    highTemp: 32,
    lowTemp: 26,
    windSpeed: 12,
    humidity: 65,
    visibility: 11,
    feelsLike: 31,
    sunrise: "06:10 AM",
    sunset: "07:40 PM",
    windDirection: "SW",
    uvIndex: {
      value: 7,
      status: "Moderate"
    },
    precipitation: {
      chance: 15,
      amount: 0.1
    },
    forecast: [
      { day: "Mon", temp: 30, icon: <Sun className="h-6 w-6" /> },
      { day: "Tue", temp: 31, icon: <CloudRain className="h-6 w-6" /> },
      { day: "Wed", temp: 29, icon: <Sun className="h-6 w-6" /> },
      { day: "Thu", temp: 30, icon: <CloudRain className="h-6 w-6" /> },
      { day: "Fri", temp: 32, icon: <Sun className="h-6 w-6" /> },
    ],
    airQuality: {
      index: 40,
      status: "Moderate",
    },
  },
  jammu: {
    temperature: 6,
    condition: "Cold",
    icon: <Wind className="h-16 w-16 text-blue-400" />,
    highTemp: 8,
    lowTemp: 4,
    windSpeed: 8,
    humidity: 70,
    visibility: 9,
    feelsLike: 4,
    sunrise: "07:00 AM",
    sunset: "06:00 PM",
    windDirection: "NW",
    uvIndex: {
      value: 4,
      status: "Low"
    },
    precipitation: {
      chance: 20,
      amount: 0.1
    },
    forecast: [
      { day: "Mon", temp: 6, icon: <Cloud className="h-6 w-6" /> },
      { day: "Tue", temp: 7, icon: <CloudRain className="h-6 w-6" /> },
      { day: "Wed", temp: 5, icon: <Cloud className="h-6 w-6" /> },
      { day: "Thu", temp: 6, icon: <CloudRain className="h-6 w-6" /> },
      { day: "Fri", temp: 8, icon: <Cloud className="h-6 w-6" /> },
    ],
    airQuality: {
      index: 35,
      status: "Good",
    },
  },
  kashmir: {
    temperature: -4,
    condition: "Snowy",
    icon: <CloudSnow className="h-16 w-16 text-blue-300" />,
    highTemp: -2,
    lowTemp: -6,
    windSpeed: 5,
    humidity: 75,
    visibility: 7,
    feelsLike: -8,
    sunrise: "07:30 AM",
    sunset: "05:30 PM",
    windDirection: "N",
    uvIndex: {
      value: 2,
      status: "Low"
    },
    precipitation: {
      chance: 25,
      amount: 0.2
    },
    forecast: [
      { day: "Mon", temp: -4, icon: <Cloud className="h-6 w-6" /> },
      { day: "Tue", temp: -3, icon: <CloudRain className="h-6 w-6" /> },
      { day: "Wed", temp: -5, icon: <Cloud className="h-6 w-6" /> },
      { day: "Thu", temp: -4, icon: <CloudRain className="h-6 w-6" /> },
      { day: "Fri", temp: -2, icon: <Cloud className="h-6 w-6" /> },
    ],
    airQuality: {
      index: 30,
      status: "Good",
    },
  },
};

// Enhanced Weather Icon Component with animations
export const WeatherIcon = ({ condition, size = 64, className = "" }) => {
  const iconMap = {
    "Sunny": <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}><Sun className={`transition-all duration-300 hover:scale-110 text-yellow-500 ${className}`} size={size} /></motion.div>,
    "Partly Cloudy": <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity }}><Cloud className={`transition-all duration-300 hover:scale-110 text-gray-500 ${className}`} size={size} /></motion.div>,
    "Rainy": <motion.div animate={{ y: [0, 2, 0] }} transition={{ duration: 2, repeat: Infinity }}><CloudRain className={`transition-all duration-300 hover:scale-110 text-blue-500 ${className}`} size={size} /></motion.div>,
    "Cold": <motion.div animate={{ y: [0, 2, 0] }} transition={{ duration: 2, repeat: Infinity }}><Wind className={`transition-all duration-300 hover:scale-110 text-blue-400 ${className}`} size={size} /></motion.div>,
    "Snowy": <motion.div animate={{ y: [0, 2, 0] }} transition={{ duration: 2, repeat: Infinity }}><CloudSnow className={`transition-all duration-300 hover:scale-110 text-white ${className}`} size={size} /></motion.div>,
  };

  return iconMap[condition] || <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}><Sun className={`transition-all duration-300 hover:scale-110 text-yellow-500 ${className}`} size={size} /></motion.div>;
};

// Enhanced Weather Details Card Component with hover effects
export const WeatherDetailsCard = ({ data }) => {
  const detailsItems = [
    {
      icon: <Sunrise className="text-orange-500" />,
      label: "Sunrise",
      value: data.sunrise
    },
    {
      icon: <Sunset className="text-orange-500" />,
      label: "Sunset",
      value: data.sunset
    },
    {
      icon: <Navigation className="text-blue-500" />,
      label: "Wind Direction",
      value: data.windDirection
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white/90 backdrop-blur-lg dark:bg-gray-800/90 rounded-2xl shadow-2xl p-6 space-y-4 hover:shadow-3xl transition-all duration-300"
    >
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Additional Details</h3>
      <div className="grid grid-cols-3 gap-4">
        {detailsItems.map((item, index) => (
          <motion.div
            key={index}
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
          >
            {item.icon}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{item.label}</p>
              <p className="font-semibold text-gray-800 dark:text-gray-200">{item.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Enhanced UV Index Card with interactive elements
export const UVIndexCard = ({ uvIndex }) => {
  const getUVColor = () => {
    if (uvIndex.value <= 2) return "text-green-600";
    if (uvIndex.value <= 5) return "text-yellow-600";
    if (uvIndex.value <= 7) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white/90 backdrop-blur-lg dark:bg-gray-800/90 rounded-2xl shadow-2xl p-6 hover:shadow-3xl transition-all duration-300"
    >
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">UV Index</h3>
      <motion.div
        className="flex items-center justify-between"
        whileHover={{ y: -2 }}
      >
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">UV Protection</p>
          <p className={`text-3xl font-bold ${getUVColor()}`}>{uvIndex.value}</p>
        </div>
        <motion.p
          className={`font-semibold ${getUVColor()} px-3 py-1 rounded-full bg-opacity-20`}
          whileHover={{ scale: 1.1 }}
        >
          {uvIndex.status}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

// Enhanced Precipitation Card with animated progress
export const PrecipitationCard = ({ precipitation }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white/90 backdrop-blur-lg dark:bg-gray-800/90 rounded-2xl shadow-2xl p-6 hover:shadow-3xl transition-all duration-300"
    >
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Precipitation</h3>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Chance of Rain</p>
          <p className="text-3xl font-bold text-blue-600">{precipitation.chance}%</p>
        </div>
        <motion.div
          className="relative h-16 w-16"
          whileHover={{ scale: 1.1 }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-semibold text-blue-600">{precipitation.amount} mm</p>
          </div>
          <svg className="transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="3"
              strokeDasharray={`${precipitation.chance}, 100`}
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
};

const getWeatherBackground = (condition) => {
  const backgrounds = {
    "Sunny": {
      from: "from-yellow-100",
      via: "via-orange-100",
      to: "to-yellow-200",
      darkFrom: "dark:from-yellow-900",
      darkVia: "dark:via-orange-900",
      darkTo: "dark:to-yellow-800"
    },
    "Partly Cloudy": {
      from: "from-blue-100",
      via: "via-gray-100",
      to: "to-white",
      darkFrom: "dark:from-gray-900",
      darkVia: "dark:via-gray-800",
      darkTo: "dark:to-gray-700"
    },
    "Rainy": {
      from: "from-blue-200",
      via: "via-gray-200",
      to: "to-blue-300",
      darkFrom: "dark:from-blue-900",
      darkVia: "dark:via-gray-900",
      darkTo: "dark:to-blue-800"
    },
    "Cloudy": {
      from: "from-gray-100",
      via: "via-gray-200",
      to: "to-white",
      darkFrom: "dark:from-gray-900",
      darkVia: "dark:via-gray-800",
      darkTo: "dark:to-gray-700"
    },
    "Cold": {
      from: "from-blue-100",
      via: "via-blue-200",
      to: "to-blue-300",
      darkFrom: "dark:from-blue-900",
      darkVia: "dark:via-blue-800",
      darkTo: "dark:to-blue-700"
    },
    "Snowy": {
      from: "from-white",
      via: "via-gray-100",
      to: "to-white",
      darkFrom: "dark:from-gray-900",
      darkVia: "dark:via-gray-800",
      darkTo: "dark:to-gray-700"
    },
    "Default": {
      from: "from-blue-50",
      via: "via-white",
      to: "to-blue-100",
      darkFrom: "dark:from-gray-900",
      darkVia: "dark:via-gray-800",
      darkTo: "dark:to-gray-900"
    }
  };

  return backgrounds[condition] || backgrounds["Default"];
};

// Enhanced Forecast Card with interactive elements
export const ForecastCard = ({ forecast = [] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.3 }}
    className="bg-white/90 dark:bg-gray-700/90 rounded-xl shadow-2xl p-6 hover:shadow-3xl transition-all duration-300"
  >
    <h3 className="text-xl font-semibold mb-4">5-Day Forecast</h3>
    <div className="grid grid-cols-5 gap-4">
      {forecast.length > 0 ? (
        forecast.map((day, index) => (
          <motion.div
            key={index}
            className="text-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600/50 transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
          >
            <p className="text-sm text-gray-500">{day.day}</p>
            {day.icon}
            <p className="font-semibold">{day.temp}°C</p>
          </motion.div>
        ))
      ) : (
        <p className="text-center text-gray-500 col-span-5">No forecast available</p>
      )}
    </div>
  </motion.div>
);

// Enhanced Air Quality Card with animated indicator
export const AirQualityCard = ({ index = 0, status = "N/A" }) => {
  const getColorForAQI = () => {
    if (index <= 50) return "text-green-600";
    if (index <= 100) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white/90 dark:bg-gray-700/90 rounded-xl shadow-2xl p-6 hover:shadow-3xl transition-all duration-300"
    >
      <h3 className="text-xl font-semibold mb-4">Air Quality</h3>
      <motion.div
        className="flex items-center justify-between"
        whileHover={{ y: -2 }}
      >
        <div>
          <p className="text-sm text-gray-500">Air Quality Index</p>
          <p className={`text-2xl font-bold ${getColorForAQI()}`}>{index}</p>
        </div>
        <motion.div
          className={`px-4 py-2 rounded-full ${getColorForAQI()} bg-opacity-20`}
          whileHover={{ scale: 1.1 }}
        >
          <p className={`font-semibold ${getColorForAQI()}`}>{status}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Enhanced Main Weather Dashboard Component
export function WeatherDashboard({ initialLocation = "newyork" }) {
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const locationDetails = locations.find(loc => loc.id === selectedLocation) || locations[0];
  const weatherData = mockWeatherData[selectedLocation] || mockWeatherData.newyork;

  // Get dynamic background based on current weather condition
  const backgroundColors = getWeatherBackground(weatherData.condition);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleString('en-US', {
    timeZone: locationDetails?.timezone || 'America/New_York',
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <div className={`min-h-screen bg-gradient-to-br
      ${backgroundColors.from}
      ${backgroundColors.via}
      ${backgroundColors.to}
      ${backgroundColors.darkFrom}
      ${backgroundColors.darkVia}
      ${backgroundColors.darkTo}
      text-gray-800 dark:text-gray-100 relative overflow-hidden`}
    >
      {/* Enhanced Background Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 bg-blue-100 dark:bg-gray-900 opacity-10"
      />

      <div className="mx-auto max-w-7xl px-4 py-8 relative z-10">
        {/* Enhanced Header with Location Selector */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0"
        >
          <motion.div
            className="flex items-center space-x-4"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <Sun className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                  SunShine Dashboard
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {isClient ? formattedTime : null}
                </p>
              </div>
            </div>
          </motion.div>

          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
              className="w-[220px] flex items-center justify-between p-3 rounded-xl bg-white/90 backdrop-blur-lg dark:bg-gray-700/90 shadow-lg border border-gray-200 dark:border-gray-600 transition-all hover:shadow-xl"
            >
              <span>{locationDetails.name}, {locationDetails.country}</span>
              <ChevronDown className={`transform transition-transform ${isLocationDropdownOpen ? 'rotate-180' : ''}`} />
            </motion.button>

            <AnimatePresence>
              {isLocationDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute w-full mt-2 rounded-xl bg-white/90 backdrop-blur-lg dark:bg-gray-700/90 shadow-xl border border-gray-200 dark:border-gray-600 overflow-hidden z-50"
                >
                  {locations.map((location) => (
                    <motion.button
                      key={location.id}
                      whileHover={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
                      onClick={() => {
                        setSelectedLocation(location.id);
                        setIsLocationDropdownOpen(false);
                      }}
                      className="w-full p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-600/50 transition-colors"
                    >
                      {location.name}, {location.country}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Enhanced Weather Content */}
        <div className="grid gap-6">
          {/* Enhanced Primary Weather Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="bg-white/90 backdrop-blur-lg dark:bg-gray-800/90 rounded-2xl shadow-2xl p-8 flex flex-col md:flex-row items-center justify-between hover:shadow-3xl transition-all duration-300"
          >
            <div className="flex items-center space-x-6">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <WeatherIcon
                  condition={weatherData.condition}
                  size={96}
                  className="drop-shadow-2xl"
                />
              </motion.div>
              <div>
                <motion.h2
                  className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {weatherData.temperature}°C
                </motion.h2>
                <p className="text-xl text-gray-500 dark:text-gray-300">
                  {weatherData.condition}
                </p>
              </div>
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <motion.div
                className="text-center p-3 rounded-lg bg-green-50 dark:bg-green-900/20"
                whileHover={{ scale: 1.1 }}
              >
                <p className="text-sm text-gray-500">High</p>
                <p className="font-semibold text-green-600 text-2xl">{weatherData.highTemp}°C</p>
              </motion.div>
              <motion.div
                className="text-center p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20"
                whileHover={{ scale: 1.1 }}
              >
                <p className="text-sm text-gray-500">Low</p>
                <p className="font-semibold text-blue-600 text-2xl">{weatherData.lowTemp}°C</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Enhanced Secondary Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <WeatherDetailsCard data={weatherData} />
            <UVIndexCard uvIndex={weatherData.uvIndex} />
            <PrecipitationCard precipitation={weatherData.precipitation} />
          </div>

          {/* Enhanced Forecast and Air Quality Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ForecastCard forecast={weatherData.forecast} />
            <AirQualityCard
              index={weatherData?.airQuality?.index}
              status={weatherData?.airQuality?.status}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherDashboard;
