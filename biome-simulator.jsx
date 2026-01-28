const { useState, useEffect, useRef, useCallback } = React;
const { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } = Recharts;

// Lucide React Icons (embedded SVG components)
const Play = ({ size = 24, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
);

const Pause = ({ size = 24, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="4" width="4" height="16"></rect>
        <rect x="14" y="4" width="4" height="16"></rect>
    </svg>
);

const RotateCcw = ({ size = 24, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1 4 1 10 7 10"></polyline>
        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
    </svg>
);

const Save = ({ size = 24, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
        <polyline points="17 21 17 13 7 13 7 21"></polyline>
        <polyline points="7 3 7 8 15 8"></polyline>
    </svg>
);

const Upload = ({ size = 24, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="17 8 12 3 7 8"></polyline>
        <line x1="12" y1="3" x2="12" y2="15"></line>
    </svg>
);

const Gauge = ({ size = 24, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 14 4-4"></path>
        <path d="M3.34 19a10 10 0 1 1 17.32 0"></path>
    </svg>
);

// Default Arctic Taiga biome configuration
const DEFAULT_BIOME = {
  name: "Arctic Taiga",
  geography: {
    latitude: 65,
    elevation: 200,
    terrainType: "forest"
  },
  climate: {
    baseTemp: -15,
    tempRange: 35,
    seasonalVariation: 0.8,
    precipitationRate: 0.3,
    windSpeed: 15,
    humidity: 0.65
  },
  flora: [
    { type: "spruce", density: 0.4, color: "#2d5016" },
    { type: "pine", density: 0.3, color: "#3a6b35" },
    { type: "shrub", density: 0.5, color: "#4a7c59" }
  ],
  fauna: [
    { 
      species: "caribou", 
      population: 50, 
      growthRate: 0.05,
      color: "#8b7355",
      size: 8,
      speed: 2,
      diet: "herbivore"
    },
    { 
      species: "wolf", 
      population: 8, 
      growthRate: 0.02,
      color: "#505050",
      size: 6,
      speed: 3,
      diet: "carnivore",
      preyOn: ["caribou"]
    },
    { 
      species: "hare", 
      population: 120, 
      growthRate: 0.15,
      color: "#d4d4d4",
      size: 3,
      speed: 4,
      diet: "herbivore"
    },
    { 
      species: "fox", 
      population: 15, 
      growthRate: 0.08,
      color: "#c1440e",
      size: 5,
      speed: 3.5,
      diet: "carnivore",
      preyOn: ["hare"]
    }
  ]
};

// Simulation Engine
class BiomeSimulation {
  constructor(config) {
    this.config = JSON.parse(JSON.stringify(config));
    this.time = 0;
    this.dayOfYear = 0;
    this.temperature = 0;
    this.precipitation = 0;
    this.wind = 0;
    this.humidity = 0;
    this.season = "winter";
    this.weather = "clear";
    this.animals = [];
    this.history = [];
    this.maxHistory = 100;
    
    this.initializeAnimals();
  }
  
  initializeAnimals() {
    this.animals = [];
    this.config.fauna.forEach(species => {
      for (let i = 0; i < species.population; i++) {
        this.animals.push({
          id: `${species.species}_${i}`,
          species: species.species,
          x: Math.random() * 800,
          y: Math.random() * 450,
          vx: (Math.random() - 0.5) * species.speed,
          vy: (Math.random() - 0.5) * species.speed,
          color: species.color,
          size: species.size,
          speed: species.speed,
          diet: species.diet,
          preyOn: species.preyOn || [],
          energy: 100,
          age: Math.random() * 50
        });
      }
    });
  }
  
  getSeason(dayOfYear) {
    if (dayOfYear < 90) return "winter";
    if (dayOfYear < 180) return "spring";
    if (dayOfYear < 270) return "summer";
    if (dayOfYear < 360) return "autumn";
    return "winter";
  }
  
  calculateTemperature(dayOfYear) {
    const { baseTemp, tempRange, seasonalVariation } = this.config.climate;
    const yearProgress = (dayOfYear / 365) * 2 * Math.PI;
    const seasonalTemp = Math.sin(yearProgress - Math.PI / 2) * tempRange * seasonalVariation;
    const dailyVariation = (Math.random() - 0.5) * 5;
    return baseTemp + seasonalTemp + dailyVariation;
  }
  
  calculateWeather(temp, dayOfYear) {
    const precipChance = this.config.climate.precipitationRate;
    const rand = Math.random();
    
    if (rand < precipChance) {
      if (temp < 0) return "snow";
      return "rain";
    } else if (rand < precipChance * 1.5) {
      return "cloudy";
    }
    return "clear";
  }
  
  updateAnimals() {
    // Update each animal
    this.animals.forEach(animal => {
      // Age and energy
      animal.age += 0.01;
      animal.energy -= 0.1;
      
      // Movement with slight randomness
      animal.vx += (Math.random() - 0.5) * 0.2;
      animal.vy += (Math.random() - 0.5) * 0.2;
      
      // Limit velocity
      const maxSpeed = animal.speed;
      const currentSpeed = Math.sqrt(animal.vx ** 2 + animal.vy ** 2);
      if (currentSpeed > maxSpeed) {
        animal.vx = (animal.vx / currentSpeed) * maxSpeed;
        animal.vy = (animal.vy / currentSpeed) * maxSpeed;
      }
      
      // Update position
      animal.x += animal.vx;
      animal.y += animal.vy;
      
      // Wrap around edges
      if (animal.x < 0) animal.x = 800;
      if (animal.x > 800) animal.x = 0;
      if (animal.y < 0) animal.y = 450;
      if (animal.y > 450) animal.y = 0;
    });
    
    // Predation
    this.animals.forEach(predator => {
      if (predator.diet === "carnivore" && predator.preyOn.length > 0) {
        this.animals.forEach(prey => {
          if (predator.preyOn.includes(prey.species)) {
            const dx = predator.x - prey.x;
            const dy = predator.y - prey.y;
            const distance = Math.sqrt(dx ** 2 + dy ** 2);
            
            if (distance < 20) {
              // Chase prey
              predator.vx = -dx / distance * predator.speed;
              predator.vy = -dy / distance * predator.speed;
              
              // Catch prey
              if (distance < 10 && Math.random() < 0.1) {
                prey.energy = 0;
                predator.energy = Math.min(100, predator.energy + 50);
              }
            }
          }
        });
      }
    });
    
    // Remove dead animals
    this.animals = this.animals.filter(animal => animal.energy > 0 && animal.age < 100);
    
    // Reproduction
    const speciesCounts = {};
    this.animals.forEach(animal => {
      speciesCounts[animal.species] = (speciesCounts[animal.species] || 0) + 1;
    });
    
    this.config.fauna.forEach(species => {
      const currentPop = speciesCounts[species.species] || 0;
      const targetPop = species.population;
      
      // Natural growth
      if (currentPop < targetPop && Math.random() < species.growthRate) {
        this.animals.push({
          id: `${species.species}_${Date.now()}_${Math.random()}`,
          species: species.species,
          x: Math.random() * 800,
          y: Math.random() * 450,
          vx: (Math.random() - 0.5) * species.speed,
          vy: (Math.random() - 0.5) * species.speed,
          color: species.color,
          size: species.size,
          speed: species.speed,
          diet: species.diet,
          preyOn: species.preyOn || [],
          energy: 100,
          age: 0
        });
      }
    });
  }
  
  step(hoursPerStep = 1) {
    this.time += hoursPerStep;
    const hours = this.time % 24;
    const days = Math.floor(this.time / 24);
    this.dayOfYear = days % 365;
    
    this.season = this.getSeason(this.dayOfYear);
    this.temperature = this.calculateTemperature(this.dayOfYear);
    this.weather = this.calculateWeather(this.temperature, this.dayOfYear);
    this.wind = this.config.climate.windSpeed + (Math.random() - 0.5) * 10;
    this.humidity = this.config.climate.humidity + (Math.random() - 0.5) * 0.2;
    this.precipitation = this.weather === "rain" || this.weather === "snow" ? Math.random() * 10 : 0;
    
    this.updateAnimals();
    
    // Record history
    const speciesCounts = {};
    this.animals.forEach(animal => {
      speciesCounts[animal.species] = (speciesCounts[animal.species] || 0) + 1;
    });
    
    this.history.push({
      time: this.time,
      day: this.dayOfYear,
      temperature: this.temperature,
      populations: { ...speciesCounts },
      weather: this.weather
    });
    
    if (this.history.length > this.maxHistory) {
      this.history.shift();
    }
  }
  
  getState() {
    return {
      time: this.time,
      dayOfYear: this.dayOfYear,
      season: this.season,
      temperature: this.temperature,
      weather: this.weather,
      wind: this.wind,
      humidity: this.humidity,
      precipitation: this.precipitation,
      animals: this.animals,
      history: this.history,
      config: this.config
    };
  }
}

// Main Component
function BiomeSimulator() {
  const [simulation, setSimulation] = useState(() => new BiomeSimulation(DEFAULT_BIOME));
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [state, setState] = useState(simulation.getState());
  const [editingParam, setEditingParam] = useState(null);
  const [saveSlots, setSaveSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  
  // Animation loop
  useEffect(() => {
    if (isPlaying) {
      const animate = () => {
        simulation.step(speed);
        setState(simulation.getState());
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, speed, simulation]);
  
  // Canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.fillStyle = getBackgroundColor(state.season, state.weather);
    ctx.fillRect(0, 0, width, height);
    
    // Draw weather effects
    drawWeather(ctx, state.weather, state.precipitation, width, height);
    
    // Draw terrain/flora
    drawTerrain(ctx, state.config.flora, state.season, width, height);
    
    // Draw animals
    state.animals.forEach(animal => {
      ctx.fillStyle = animal.color;
      ctx.beginPath();
      ctx.arc(animal.x, animal.y, animal.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Direction indicator
      ctx.strokeStyle = 'rgba(0,0,0,0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(animal.x, animal.y);
      ctx.lineTo(animal.x + animal.vx * 3, animal.y + animal.vy * 3);
      ctx.stroke();
    });
    
    // Draw time/season indicator
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.font = 'bold 18px "Courier New", monospace';
    ctx.fillText(`Day ${Math.floor(state.dayOfYear)} - ${state.season.toUpperCase()}`, 20, 30);
    ctx.font = '14px "Courier New", monospace';
    ctx.fillText(`${Math.floor(state.time % 24)}:00`, 20, 50);
    
  }, [state]);
  
  const getBackgroundColor = (season, weather) => {
    if (weather === "snow") return "#e8f4f8";
    if (weather === "rain") return "#b0c4de";
    if (weather === "cloudy") return "#c0d6e8";
    
    switch(season) {
      case "winter": return "#d4e9f7";
      case "spring": return "#c8e6c9";
      case "summer": return "#f0f4c3";
      case "autumn": return "#ffe0b2";
      default: return "#e0e0e0";
    }
  };
  
  const drawWeather = (ctx, weather, intensity, width, height) => {
    if (weather === "snow" || weather === "rain") {
      ctx.fillStyle = weather === "snow" ? "rgba(255,255,255,0.8)" : "rgba(100,149,237,0.6)";
      for (let i = 0; i < intensity * 20; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        if (weather === "snow") {
          ctx.fillRect(x, y, 3, 3);
        } else {
          ctx.fillRect(x, y, 2, 8);
        }
      }
    }
  };
  
  const drawTerrain = (ctx, flora, season, width, height) => {
    // Draw trees/vegetation
    flora.forEach(plant => {
      const count = plant.density * 50;
      for (let i = 0; i < count; i++) {
        const x = (i * 137.508) % width; // Golden angle for distribution
        const y = (i * 197.508) % height;
        
        let color = plant.color;
        if (season === "autumn") color = "#d4a574";
        if (season === "winter") color = "#7a9b8e";
        
        ctx.fillStyle = color;
        
        if (plant.type === "spruce" || plant.type === "pine") {
          // Draw simple tree
          ctx.beginPath();
          ctx.moveTo(x, y - 15);
          ctx.lineTo(x - 8, y + 5);
          ctx.lineTo(x + 8, y + 5);
          ctx.closePath();
          ctx.fill();
        } else {
          // Draw shrub
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    });
  };
  
  const handleReset = () => {
    const newSim = new BiomeSimulation(state.config);
    setSimulation(newSim);
    setState(newSim.getState());
    setIsPlaying(false);
  };
  
  const handleSave = () => {
    const slotName = prompt("Enter a name for this biome configuration:");
    if (slotName) {
      const newSlots = [...saveSlots, { name: slotName, config: state.config }];
      setSaveSlots(newSlots);
      localStorage.setItem('biomeSlots', JSON.stringify(newSlots));
    }
  };
  
  const handleLoad = (slot) => {
    const newSim = new BiomeSimulation(slot.config);
    setSimulation(newSim);
    setState(newSim.getState());
    setIsPlaying(false);
    setSelectedSlot(slot);
  };
  
  const handleExport = () => {
    const dataStr = JSON.stringify(state.config, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${state.config.name.replace(/\s+/g, '_')}.json`;
    link.click();
  };
  
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const config = JSON.parse(event.target.result);
          const newSim = new BiomeSimulation(config);
          setSimulation(newSim);
          setState(newSim.getState());
          setIsPlaying(false);
        } catch (error) {
          alert("Error loading biome configuration");
        }
      };
      reader.readAsText(file);
    }
  };
  
  // Load saved slots on mount
  useEffect(() => {
    const saved = localStorage.getItem('biomeSlots');
    if (saved) {
      setSaveSlots(JSON.parse(saved));
    }
  }, []);
  
  const getPopulationData = () => {
    if (state.history.length < 2) return [];
    
    return state.history.map(h => ({
      day: h.day,
      ...h.populations
    }));
  };
  
  const speciesColors = {};
  state.config.fauna.forEach(s => {
    speciesColors[s.species] = s.color;
  });

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      display: 'flex',
      fontFamily: '"Courier New", monospace',
      overflow: 'hidden'
    }}>
      {/* Main Simulation View - 75% */}
      <div style={{
        width: '75%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        gap: '15px'
      }}>
        {/* Header Controls */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '15px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <h1 style={{
            margin: 0,
            color: '#ffffff',
            fontSize: '24px',
            fontWeight: 'bold',
            letterSpacing: '2px'
          }}>
            {state.config.name}
          </h1>
          
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              style={{
                background: isPlaying ? '#ef4444' : '#22c55e',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 20px',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                fontWeight: 'bold',
                transition: 'transform 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              {isPlaying ? <><Pause size={16} /> PAUSE</> : <><Play size={16} /> PLAY</>}
            </button>
            
            <button
              onClick={handleReset}
              style={{
                background: '#3b82f6',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 20px',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px'
              }}
            >
              <RotateCcw size={16} /> RESET
            </button>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Gauge size={16} color="#ffffff" />
              <input
                type="range"
                min="0.1"
                max="10"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                style={{ width: '100px' }}
              />
              <span style={{ color: '#ffffff', fontSize: '12px', minWidth: '40px' }}>
                {speed.toFixed(1)}x
              </span>
            </div>
          </div>
        </div>
        
        {/* Canvas */}
        <div style={{
          flex: 1,
          background: 'rgba(0,0,0,0.3)',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '2px solid rgba(255,255,255,0.1)',
          position: 'relative'
        }}>
          <canvas
            ref={canvasRef}
            width={800}
            height={450}
            style={{
              width: '100%',
              height: '100%',
              imageRendering: 'crisp-edges'
            }}
          />
        </div>
        
        {/* Weather Info Bar */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '15px 20px',
          display: 'flex',
          gap: '30px',
          border: '1px solid rgba(255,255,255,0.1)',
          color: '#ffffff'
        }}>
          <div>
            <div style={{ fontSize: '11px', opacity: 0.6, marginBottom: '4px' }}>TEMPERATURE</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{state.temperature.toFixed(1)}°C</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', opacity: 0.6, marginBottom: '4px' }}>WEATHER</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase' }}>{state.weather}</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', opacity: 0.6, marginBottom: '4px' }}>WIND</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{state.wind.toFixed(1)} km/h</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', opacity: 0.6, marginBottom: '4px' }}>HUMIDITY</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{(state.humidity * 100).toFixed(0)}%</div>
          </div>
        </div>
      </div>
      
      {/* Data Panel - 25% */}
      <div style={{
        width: '25%',
        height: '100%',
        background: 'rgba(0,0,0,0.4)',
        borderLeft: '2px solid rgba(255,255,255,0.1)',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto'
      }}>
        {/* Population Chart */}
        <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <h3 style={{ color: '#ffffff', margin: '0 0 15px 0', fontSize: '14px', letterSpacing: '1px' }}>
            POPULATION TRENDS
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={getPopulationData()}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="day" stroke="#ffffff" fontSize={10} />
              <YAxis stroke="#ffffff" fontSize={10} />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(0,0,0,0.9)', 
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '4px',
                  fontSize: '11px'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '10px' }} />
              {state.config.fauna.map(species => (
                <Line
                  key={species.species}
                  type="monotone"
                  dataKey={species.species}
                  stroke={species.color}
                  strokeWidth={2}
                  dot={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Current Populations */}
        <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <h3 style={{ color: '#ffffff', margin: '0 0 15px 0', fontSize: '14px', letterSpacing: '1px' }}>
            CURRENT POPULATIONS
          </h3>
          {state.config.fauna.map(species => {
            const count = state.animals.filter(a => a.species === species.species).length;
            return (
              <div key={species.species} style={{ marginBottom: '12px' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  color: '#ffffff',
                  fontSize: '12px',
                  marginBottom: '4px'
                }}>
                  <span style={{ textTransform: 'uppercase' }}>{species.species}</span>
                  <span style={{ fontWeight: 'bold' }}>{count}</span>
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${(count / species.population) * 100}%`,
                    height: '100%',
                    background: species.color,
                    transition: 'width 0.3s'
                  }} />
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Save/Load */}
        <div style={{ padding: '20px' }}>
          <h3 style={{ color: '#ffffff', margin: '0 0 15px 0', fontSize: '14px', letterSpacing: '1px' }}>
            BIOME CONFIGS
          </h3>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
            <button
              onClick={handleSave}
              style={{
                flex: 1,
                background: '#8b5cf6',
                border: 'none',
                borderRadius: '6px',
                padding: '8px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '11px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <Save size={14} /> SAVE
            </button>
            <button
              onClick={handleExport}
              style={{
                flex: 1,
                background: '#06b6d4',
                border: 'none',
                borderRadius: '6px',
                padding: '8px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '11px'
              }}
            >
              EXPORT
            </button>
            <label style={{
              flex: 1,
              background: '#f59e0b',
              border: 'none',
              borderRadius: '6px',
              padding: '8px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '11px',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}>
              <Upload size={14} /> IMPORT
              <input type="file" accept=".json" onChange={handleImport} style={{ display: 'none' }} />
            </label>
          </div>
          
          {saveSlots.length > 0 && (
            <div style={{ marginTop: '15px' }}>
              <div style={{ color: '#ffffff', fontSize: '11px', marginBottom: '8px', opacity: 0.6 }}>
                SAVED SLOTS
              </div>
              {saveSlots.map((slot, idx) => (
                <button
                  key={idx}
                  onClick={() => handleLoad(slot)}
                  style={{
                    width: '100%',
                    background: selectedSlot === slot ? 'rgba(139,92,246,0.3)' : 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '6px',
                    padding: '10px',
                    color: '#ffffff',
                    cursor: 'pointer',
                    fontSize: '11px',
                    marginBottom: '6px',
                    textAlign: 'left'
                  }}
                >
                  {slot.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BiomeSimulator />);
