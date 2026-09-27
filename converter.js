const RATES_IN_METERS = {
  m: 1,
  cm: 0.01,
  in: 0.0254, // Fixed decimal place
  ft: 0.3048,
  km: 1000
};

const WEIGHT_RATES_IN_GRAMS = {
  g: 1,
  kg: 1000,
  lb: 453.59237,
  oz: 28.34952
};

const TEMP_TRANSFORMS = {
  c: {
    toBase: (val) => val,
    fromBase: (celsius) => celsius
  },
  f: {
    toBase: (val) => (val - 32) * (5 / 9),
    fromBase: (celsius) => (celsius * (9 / 5)) + 32
  },
  k: {
    toBase: (val) => val - 273.15,
    fromBase: (celsius) => celsius + 273.15
  }
};

const ALLOWED_CONVERSION = ['LENGTH', 'WEIGHT', 'TEMP'];


function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Show the selected section
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.style.display = 'block';
    }
}

function convertLength(value, fromUnit, toUnit) {
    if (!RATES_IN_METERS[fromUnit] || !RATES_IN_METERS[toUnit]) {
        return null;
    }

    // 2. Convert input to base unit (meters), then to target unit
    const valueInMeters = value * RATES_IN_METERS[fromUnit];
    const convertedValue = valueInMeters / RATES_IN_METERS[toUnit];

    return convertedValue;
}

function convertWeight(value, fromUnit, toUnit) {
  if (!WEIGHT_RATES_IN_GRAMS[fromUnit] || !WEIGHT_RATES_IN_GRAMS[toUnit]) {
    return null;
  }

  const valueInGrams = value * WEIGHT_RATES_IN_GRAMS[fromUnit];
  return valueInGrams / WEIGHT_RATES_IN_GRAMS[toUnit];
}

function convertTemperature(value, fromUnit, toUnit) {
  if (!TEMP_TRANSFORMS[fromUnit] || !TEMP_TRANSFORMS[toUnit]) {
    return null;
  }

  const celsius = TEMP_TRANSFORMS[fromUnit].toBase(value);
  return TEMP_TRANSFORMS[toUnit].fromBase(celsius);
}

function convert(buttonId, pId, inputId, fromId, toId, convertFunc) {
    const button = document.querySelector(buttonId);

    button.addEventListener('click', () => {
        const convertedValue = document.querySelector(pId);
        const val = document.querySelector(inputId).value;
        
        if (!val.trim()) {
            convertedValue.textContent = 'Empty text field!';
            return;
        }

        const converted = Number(val);

        const fromUnit = document.querySelector(fromId).value;
        const toUnit   = document.querySelector(toId).value;
    
        const result = convertFunc(converted, fromUnit, toUnit);
        convertedValue.textContent = `Converted: ${converted} ${fromUnit} = ${result} ${toUnit}`;
    });
    
}

function lengthConversion() {
    convert('#convert-length', '#converted-length-value', '#to-convert-length', '#input-type-length', '#output-type-length', convertLength);
}

function weightConversion() {
    convert('#convert-weight', '#converted-weight-value', '#to-convert-weight', '#input-type-weight', '#output-type-weight', convertWeight);
}

function tempConversion() {
    convert('#convert-temperature', "#converted-temp-value", '#to-convert-temp', '#input-type-temp', '#output-type-temp', convertTemperature);
}

lengthConversion();
weightConversion();
tempConversion();