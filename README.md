# Biome Climate Simulator - Updated

A real-time pixel art ecosystem simulation with smooth transitions and flexible animal types.

## Animal Type System

Animals are now defined by **animalType** instead of hardcoded species names. This makes it easy to create any custom animal!

### Available Animal Types

#### `large_herbivore`
- **Shape**: Blocky body with rectangular head and legs
- **Examples**: Caribou, elephant, wildebeest, zebra, bison
- **Best for**: Large grazing animals

#### `small_herbivore`
- **Shape**: Compact square body with ear
- **Examples**: Hare, rabbit, gazelle, deer
- **Best for**: Small, fast prey animals

#### `predator`
- **Shape**: Sleek elongated body with head and tail
- **Examples**: Wolf, fox, lion, jaguar, cheetah
- **Best for**: Carnivorous hunters
- **Visual**: Red direction indicator when hunting

#### `bird`
- **Shape**: Triangle (wings spread)
- **Examples**: Macaw, eagle, raven, parrot
- **Best for**: Flying animals

#### `small_omnivore`
- **Shape**: Rounded body with arms and tail
- **Examples**: Monkey, baboon, raccoon, bear
- **Best for**: Versatile animals that hunt and forage
- **Visual**: Orange direction indicator when hunting

#### `default`
- **Shape**: Simple square
- **Best for**: Any custom creature

## Diet Types

### `herbivore`
- Eats plants only
- Does not hunt other animals
- No direction indicator
- Natural prey for carnivores and omnivores

### `carnivore`
- Hunts other animals (specified in `preyOn` array)
- Red direction indicator shows hunting behavior
- Gains energy from successful kills

### `omnivore` (NEW!)
- Can hunt other animals (specified in `preyOn` array)
- Orange direction indicator shows hunting behavior
- More versatile than pure carnivores
- Good for creating realistic ecosystems with scavengers

## JSON Structure

```json
{
  "name": "My Custom Biome",
  "geography": {
    "latitude": 45,
    "elevation": 500,
    "terrainType": "forest"
  },
  "climate": {
    "baseTemp": 10,
    "tempRange": 20,
    "seasonalVariation": 0.7,
    "precipitationRate": 0.4,
    "windSpeed": 12,
    "humidity": 0.6
  },
  "flora": [
    {
      "type": "oak",
      "density": 0.5,
      "color": "#2d5016"
    }
  ],
  "fauna": [
    {
      "species": "bear",
      "population": 20,
      "growthRate": 0.04,
      "color": "#654321",
      "size": 10,
      "speed": 2.5,
      "diet": "omnivore",
      "preyOn": ["deer", "rabbit"],
      "animalType": "small_omnivore"
    }
  ]
}
```

## Fauna Properties Explained

- **species**: Display name (can be anything)
- **population**: Target population size
- **growthRate**: 0.01-0.15 (how fast they reproduce)
- **color**: Hex color code for the animal
- **size**: Pixel size (3-15 recommended)
- **speed**: Movement speed (1-6 recommended)
- **diet**: `herbivore`, `carnivore`, or `omnivore`
- **preyOn**: Array of species names this animal hunts (only for carnivore/omnivore)
- **animalType**: Visual appearance (see types above)

## Creating Custom Animals

### Example: Adding a Bear
```json
{
  "species": "grizzly",
  "population": 15,
  "growthRate": 0.03,
  "color": "#8B4513",
  "size": 11,
  "speed": 2,
  "diet": "omnivore",
  "preyOn": ["deer", "fish"],
  "animalType": "small_omnivore"
}
```

### Example: Adding a Dragon (Fantasy)
```json
{
  "species": "dragon",
  "population": 3,
  "growthRate": 0.01,
  "color": "#8B0000",
  "size": 15,
  "speed": 4,
  "diet": "carnivore",
  "preyOn": ["knight", "sheep"],
  "animalType": "predator"
}
```

### Example: Adding a Penguin
```json
{
  "species": "penguin",
  "population": 100,
  "growthRate": 0.08,
  "color": "#000000",
  "size": 5,
  "speed": 2,
  "diet": "carnivore",
  "preyOn": ["fish"],
  "animalType": "bird"
}
```

## Features

✅ **Smooth color transitions** - No more flashing backgrounds
✅ **Pixel art style** - Crisp retro aesthetic
✅ **Double buffered rendering** - Eliminates screen tearing
✅ **Flexible animal system** - Create any creature with animalType
✅ **Omnivores** - Animals that can hunt AND forage
✅ **Import/Export** - Save and share your biomes
✅ **Quick load presets** - Arctic, Rainforest, Savanna built-in
✅ **Real-time stats** - Population tracking and weather data
✅ **Speed control** - 0.1x to 10x simulation speed

## Tips for Balanced Ecosystems

1. **Predator to Prey Ratio**: Keep predators at 5-15% of prey population
2. **Growth Rates**: 
   - Herbivores: 0.08-0.15
   - Omnivores: 0.04-0.08
   - Carnivores: 0.02-0.05
3. **Speed Balance**: Prey should be faster than predators, or much more numerous
4. **Food Web**: Create multiple prey options for predators to prevent collapse
5. **Omnivores**: Use omnivores to add stability to ecosystems

## Example: Temperate Forest

```json
{
  "name": "Temperate Forest",
  "climate": {
    "baseTemp": 12,
    "tempRange": 25,
    "seasonalVariation": 0.7,
    "precipitationRate": 0.5,
    "windSpeed": 10,
    "humidity": 0.7
  },
  "fauna": [
    { "species": "deer", "population": 80, "diet": "herbivore", "animalType": "large_herbivore", "color": "#8B4513", "size": 7, "speed": 3, "growthRate": 0.09 },
    { "species": "rabbit", "population": 150, "diet": "herbivore", "animalType": "small_herbivore", "color": "#D2B48C", "size": 4, "speed": 4, "growthRate": 0.12 },
    { "species": "wolf", "population": 12, "diet": "carnivore", "preyOn": ["deer"], "animalType": "predator", "color": "#696969", "size": 7, "speed": 3.5, "growthRate": 0.03 },
    { "species": "fox", "population": 20, "diet": "carnivore", "preyOn": ["rabbit"], "animalType": "predator", "color": "#FF4500", "size": 5, "speed": 3, "growthRate": 0.05 },
    { "species": "bear", "population": 8, "diet": "omnivore", "preyOn": ["deer", "rabbit"], "animalType": "small_omnivore", "color": "#654321", "size": 10, "speed": 2, "growthRate": 0.025 }
  ]
}
```

Enjoy creating your custom ecosystems! 🌲🦌🐺
