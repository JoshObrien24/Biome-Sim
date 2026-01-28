# Biome Climate Simulator

A real-time ecosystem simulation that visualizes climate, weather patterns, flora, and fauna interactions in various biomes. Configure different environments through JSON files and watch as complex ecological systems evolve over time.

## Features

### Visual Simulation
- **2D Isometric View**: Stardew Valley-style perspective showing your biome
- **Real-time Weather**: See snow, rain, clouds, and clear skies
- **Seasonal Changes**: Visual transitions through winter, spring, summer, and autumn
- **Animal Behavior**: Watch animals move, hunt, flee, and reproduce
- **Flora Visualization**: Trees, shrubs, and vegetation that change with seasons

### Climate Simulation
- **Temperature**: Dynamic temperature based on season, latitude, and daily variation
- **Weather Patterns**: Rain, snow, cloudy, and clear conditions
- **Wind Speed**: Variable wind patterns
- **Humidity**: Atmospheric moisture levels
- **Precipitation**: Rainfall and snowfall amounts

### Ecosystem Dynamics
- **Predator-Prey Relationships**: Carnivores hunt herbivores
- **Population Dynamics**: Natural growth, death, and reproduction
- **Energy Systems**: Animals require energy and can starve
- **Age Simulation**: Animals age over time
- **Species Interactions**: Complex food web relationships

### Controls
- **Play/Pause**: Control simulation flow
- **Speed Control**: 0.1x to 10x speed (default: 1 hour per second)
- **Reset**: Restart simulation with current configuration
- **Save/Load**: Store custom biome configurations
- **Import/Export**: Share biome JSON files
- **Real-time Parameter Tweaking**: Adjust climate and populations on the fly

### Data Visualization
- **Population Trends**: Line charts tracking species over time
- **Current Stats**: Live population counts with progress bars
- **Climate Metrics**: Real-time temperature, weather, wind, and humidity displays

## JSON Configuration Format

Biomes are defined using JSON files with the following structure:

```json
{
  "name": "Biome Name",
  "geography": {
    "latitude": 65,          // Affects seasonal temperature variation
    "elevation": 200,        // Meters above sea level
    "terrainType": "forest"  // Visual descriptor
  },
  "climate": {
    "baseTemp": -15,         // Base temperature in Celsius
    "tempRange": 35,         // Temperature swing from base
    "seasonalVariation": 0.8, // 0-1, how much seasons affect temp
    "precipitationRate": 0.3, // 0-1, chance of precipitation
    "windSpeed": 15,         // Base wind speed in km/h
    "humidity": 0.65         // 0-1, atmospheric moisture
  },
  "flora": [
    {
      "type": "spruce",      // Plant type name
      "density": 0.4,        // 0-1, how many appear
      "color": "#2d5016"     // Hex color code
    }
  ],
  "fauna": [
    {
      "species": "wolf",
      "population": 8,        // Starting population
      "growthRate": 0.02,     // Natural reproduction rate
      "color": "#505050",     // Hex color code
      "size": 6,              // Visual size (pixels)
      "speed": 3,             // Movement speed
      "diet": "carnivore",    // "herbivore" or "carnivore"
      "preyOn": ["caribou"]   // Species this hunts (carnivores only)
    }
  ]
}
```

## Included Example Biomes

### 1. Arctic Taiga (`arctic_taiga.json`)
- **Climate**: Cold winters (-30°C) to mild summers (20°C)
- **Animals**: Caribou, wolves, hares, foxes
- **Flora**: Spruce, pine, shrubs
- **Characteristics**: Harsh winters, seasonal migration patterns

### 2. Tropical Rainforest (`tropical_rainforest.json`)
- **Climate**: Hot and humid year-round (22-30°C)
- **Animals**: Jaguars, capybaras, macaws, tapirs, anacondas
- **Flora**: Dense canopy, palms, undergrowth
- **Characteristics**: High biodiversity, constant precipitation

### 3. African Savanna (`african_savanna.json`)
- **Climate**: Warm with seasonal wet/dry periods (15-35°C)
- **Animals**: Lions, zebras, wildebeest, cheetahs, gazelles, elephants
- **Flora**: Acacia trees, grasslands, baobabs
- **Characteristics**: Large herbivore herds, apex predators

## Creating Custom Biomes

### Step 1: Design Your Ecosystem
Think about:
- What climate zone? (Arctic, temperate, tropical, desert, etc.)
- What animals live there? What do they eat?
- What plants grow there?
- How do seasons affect the environment?

### Step 2: Set Climate Parameters
- `baseTemp`: Average yearly temperature
- `tempRange`: How much temperature varies seasonally
- `seasonalVariation`: 0.8-1.0 for strong seasons, 0.1-0.3 for tropics
- `precipitationRate`: 0.1 for deserts, 0.3-0.5 for temperate, 0.7+ for rainforests

### Step 3: Add Flora
- Use 2-5 plant types for variety
- Adjust `density` (0.1-0.9) for sparse to dense coverage
- Choose appropriate colors for the biome

### Step 4: Design Food Web
- Start with herbivores (higher populations)
- Add predators with `preyOn` relationships
- Balance populations: predators need enough prey
- Adjust `growthRate` for population stability

### Step 5: Test and Iterate
- Import your JSON
- Run simulation at 5-10x speed
- Watch for population crashes or explosions
- Adjust parameters and test again

## Tips for Realistic Ecosystems

### Population Balance
- Prey should outnumber predators 5:1 to 15:1
- Herbivore growth rates: 0.08-0.15
- Carnivore growth rates: 0.02-0.05

### Climate Realism
- Arctic: baseTemp -15 to -5, tempRange 30-40
- Temperate: baseTemp 10-15, tempRange 20-30
- Tropical: baseTemp 24-28, tempRange 5-10
- Desert: baseTemp 20-25, tempRange 30-40, precipitationRate 0.05-0.15

### Speed Settings
- Fast species (birds, small prey): 4-6
- Medium species (most mammals): 2-4
- Slow species (large herbivores): 1-2.5

## Usage Instructions

### Basic Operation
1. Open the application in your browser
2. Click **PLAY** to start the simulation
3. Use the speed slider to control time flow
4. Watch populations, weather, and seasons change

### Saving Configurations
1. Adjust parameters or create a custom biome
2. Click **SAVE** button
3. Enter a name for your configuration
4. Access it later from the "SAVED SLOTS" list

### Importing Custom Biomes
1. Create a JSON file following the format above
2. Click **IMPORT** button
3. Select your JSON file
4. Simulation resets with new biome

### Exporting Biomes
1. Click **EXPORT** button
2. JSON file downloads automatically
3. Share with others or save as backup

## Technical Details

### Simulation Engine
- Time progression: Configurable hours per frame
- Physics: Simple velocity-based movement
- Predation: Distance-based detection and energy transfer
- Reproduction: Probabilistic based on growth rates
- Mortality: Age and energy-based

### Performance
- Optimized for 200-300 simultaneous animals
- Canvas rendering at 60 FPS
- Efficient collision detection
- History limited to last 100 data points

### Browser Compatibility
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Requires modern browser with Canvas API

## Future Enhancement Ideas

- Time of day cycle (sunrise/sunset)
- Migration patterns
- Plant growth and seasonal changes
- Water sources and terrain features
- More complex predator strategies
- Disease and population events
- Climate change scenarios
- Multi-layer food webs
- Symbiotic relationships

## License

Feel free to modify and extend this simulator for your own projects!

## Credits

Created as a customizable ecosystem simulation platform. Designed to be educational, extensible, and visually engaging.
