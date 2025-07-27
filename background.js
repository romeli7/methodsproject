// Affective Background Animation - p5.js
let edgeElements = [];
let mouseX = 0;
let mouseY = 0;
let contentBounds = { x: 0, y: 0, width: 0, height: 0 };

// Affective color palettes for emotional states
const joyPalette = [
  [255, 220, 100],  // Warm yellow
  [255, 180, 100],  // Golden orange
  [255, 150, 150]   // Soft pink
];

const calmPalette = [
  [150, 200, 255],  // Soft blue
  [200, 220, 255],  // Light blue
  [180, 220, 200]   // Mint green
];

const energyPalette = [
  [255, 100, 100],  // Vibrant red
  [255, 150, 50],   // Bright orange
  [255, 200, 100]   // Warm yellow
];

const mysteryPalette = [
  [150, 100, 255],  // Deep purple
  [100, 100, 200],  // Navy blue
  [200, 100, 255]   // Magenta
];

const serenityPalette = [
  [200, 255, 200],  // Soft green
  [150, 255, 200],  // Mint
  [200, 200, 255]   // Lavender
];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('p5-background');
  
  // Initialize affective elements across the whole space
  for (let i = 0; i < 40; i++) {
    edgeElements.push(new EdgeElement());
  }
  
  // Calculate content bounds
  updateContentBounds();
}

function draw() {
  // Clean white background
  background(255, 255, 255);
  
  // Update mouse position with smoothing
  mouseX = mouseX * 0.95 + mouseX * 0.05;
  mouseY = mouseY * 0.95 + mouseY * 0.05;
  
  // Update content bounds
  updateContentBounds();
  
  // Draw edge elements
  for (let element of edgeElements) {
    element.update();
    element.display();
  }
  
  // Draw subtle reactive elements
  drawReactiveElements();
}

function updateContentBounds() {
  // Approximate content area (main element) - smaller bounds to keep text clear
  contentBounds.x = width * 0.15;  // 15% from left
  contentBounds.y = 120;          // Below header
  contentBounds.width = width * 0.7;  // 70% of width
  contentBounds.height = height - 240; // Most of height
}

function drawReactiveElements() {
  // Draw reactive elements everywhere - no restrictions
  
  // Draw affective reactive elements
  for (let i = 0; i < 5; i++) {
    let alpha = map(i, 0, 4, 25, 8);
    let size = map(i, 0, 4, 150, 50);
    let emotion = random(['joy', 'calm', 'energy', 'mystery', 'serenity']);
    let color;
    
    // Select color based on emotion
    switch(emotion) {
      case 'joy':
        color = random(joyPalette);
        break;
      case 'calm':
        color = random(calmPalette);
        break;
      case 'energy':
        color = random(energyPalette);
        break;
      case 'mystery':
        color = random(mysteryPalette);
        break;
      case 'serenity':
        color = random(serenityPalette);
        break;
    }
    
    push();
    noStroke();
    fill(color[0], color[1], color[2], alpha);
    
    // Position around mouse - everywhere
    let reactiveX = mouseX + random(-100, 100);
    let reactiveY = mouseY + random(-100, 100);
    
    // Draw different shapes
    if (i === 0) {
      ellipse(reactiveX, reactiveY, size);
    } else if (i === 1) {
      rectMode(CENTER);
      rect(reactiveX, reactiveY, size/2, size/2);
    } else if (i === 2) {
      triangle(reactiveX, reactiveY - size/3, reactiveX - size/3, reactiveY + size/3, reactiveX + size/3, reactiveY + size/3);
    } else {
      ellipse(reactiveX, reactiveY, size * 0.7);
    }
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Edge Element class
class EdgeElement {
  constructor() {
    this.reset();
  }
  
  reset() {
    // Position elements across the whole space - no restrictions
    this.x = random(width);
    this.y = random(height);
    
    this.size = random(30, 80);
    this.emotion = random(['joy', 'calm', 'energy', 'mystery', 'serenity']);
    this.type = random(['breathingLight', 'floatingAtmosphere', 'emotionalWave', 'contemplativeSpace', 'vitalityField', 'dreamState', 'meditativeRing', 'sensoryFlow']);
    
    // Select color based on emotion
    switch(this.emotion) {
      case 'joy':
        this.color = random(joyPalette);
        break;
      case 'calm':
        this.color = random(calmPalette);
        break;
      case 'energy':
        this.color = random(energyPalette);
        break;
      case 'mystery':
        this.color = random(mysteryPalette);
        break;
      case 'serenity':
        this.color = random(serenityPalette);
        break;
    }
    this.alpha = random(25, 50);
    this.pulse = random(0, TWO_PI);
    this.speed = random(0.01, 0.03);
  }
  
  update() {
    this.pulse += this.speed;
    this.alpha = 25 + sin(this.pulse) * 10;
    
    // More dynamic movement
    this.x += random(-0.5, 0.5);
    this.y += random(-0.5, 0.5);
    
    // Reset if too far from edges
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      this.reset();
    }
  }
  
  display() {
    // Display everywhere - no restrictions
    push();
    noStroke();
    fill(this.color[0], this.color[1], this.color[2], this.alpha);
    
    switch(this.type) {
      case 'breathingLight':
        this.drawBreathingLight();
        break;
      case 'floatingAtmosphere':
        this.drawFloatingAtmosphere();
        break;
      case 'emotionalWave':
        this.drawEmotionalWave();
        break;
      case 'contemplativeSpace':
        this.drawContemplativeSpace();
        break;
      case 'vitalityField':
        this.drawVitalityField();
        break;
      case 'dreamState':
        this.drawDreamState();
        break;
      case 'meditativeRing':
        this.drawMeditativeRing();
        break;
      case 'sensoryFlow':
        this.drawSensoryFlow();
        break;
    }
    
    pop();
  }
  
  drawBreathingLight() {
    // Breathing light that expands and contracts like breathing
    let breathPhase = sin(this.pulse * 0.5);
    let breathSize = this.size + breathPhase * 20;
    
    // Outer glow layers
    for (let i = 0; i < 6; i++) {
      let layerAlpha = this.alpha * (1 - i * 0.15) * (0.5 + breathPhase * 0.5);
      let layerSize = breathSize + i * 12;
      
      fill(this.color[0], this.color[1], this.color[2], layerAlpha);
      ellipse(this.x, this.y, layerSize);
    }
    
    // Inner breathing core
    let coreSize = this.size * 0.4 + breathPhase * 10;
    fill(255, 255, 255, this.alpha * (0.6 + breathPhase * 0.4));
    ellipse(this.x, this.y, coreSize);
  }
  
  drawFloatingAtmosphere() {
    // Gentle floating atmosphere with soft, cloud-like forms
    let floatPhase = sin(this.pulse * 0.3);
    let floatOffset = floatPhase * 8;
    
    // Create soft, organic cloud-like shapes
    for (let i = 0; i < 4; i++) {
      let cloudAlpha = this.alpha * (0.4 + floatPhase * 0.3);
      let cloudSize = this.size * (0.6 + i * 0.2);
      let cloudX = this.x + sin(this.pulse + i) * 15;
      let cloudY = this.y + floatOffset + cos(this.pulse + i) * 10;
      
      fill(this.color[0], this.color[1], this.color[2], cloudAlpha);
      ellipse(cloudX, cloudY, cloudSize);
    }
    
    // Gentle floating particles
    for (let i = 0; i < 6; i++) {
      let particleAlpha = this.alpha * 0.6;
      let particleX = this.x + sin(this.pulse * 2 + i) * this.size * 0.8;
      let particleY = this.y + cos(this.pulse * 2 + i) * this.size * 0.8 + floatOffset;
      
      fill(255, 255, 255, particleAlpha);
      ellipse(particleX, particleY, 3);
    }
  }
  
  drawEmotionalWave() {
    // Emotional wave that flows and undulates like feelings
    let wavePhase = sin(this.pulse * 0.8);
    let waveAmplitude = this.size * 0.3;
    
    // Create flowing wave pattern
    for (let i = 0; i < 8; i++) {
      let waveAngle = this.pulse + i * TWO_PI / 8;
      let waveRadius = this.size * 0.7;
      let waveX = this.x + cos(waveAngle) * waveRadius;
      let waveY = this.y + sin(waveAngle) * waveRadius + wavePhase * waveAmplitude;
      
      let waveAlpha = this.alpha * (0.6 + wavePhase * 0.4);
      fill(this.color[0], this.color[1], this.color[2], waveAlpha);
      ellipse(waveX, waveY, 12 + wavePhase * 8);
    }
    
    // Flowing center
    fill(this.color[0], this.color[1], this.color[2], this.alpha * (0.8 + wavePhase * 0.2));
    ellipse(this.x, this.y, this.size * 0.4 + wavePhase * 10);
  }
  
  drawContemplativeSpace() {
    // Contemplative space with gentle, meditative forms
    let contemplationPhase = sin(this.pulse * 0.2);
    
    // Create concentric circles that expand and contract slowly
    for (let i = 0; i < 5; i++) {
      let circleAlpha = this.alpha * (0.3 + contemplationPhase * 0.2);
      let circleSize = this.size * (0.4 + i * 0.2) + contemplationPhase * 15;
      
      noFill();
      stroke(this.color[0], this.color[1], this.color[2], circleAlpha);
      strokeWeight(1);
      ellipse(this.x, this.y, circleSize);
    }
    
    // Gentle central light
    fill(this.color[0], this.color[1], this.color[2], this.alpha * (0.4 + contemplationPhase * 0.3));
    ellipse(this.x, this.y, this.size * 0.3);
    
    noStroke();
  }
  
  drawVitalityField() {
    // Vitality field with dynamic, life-affirming energy
    let vitalityPhase = sin(this.pulse * 1.2);
    let vitalityIntensity = this.alpha * (0.6 + vitalityPhase * 0.4);
    
    // Dynamic energy rings
    for (let i = 0; i < 4; i++) {
      let ringAlpha = vitalityIntensity * (1 - i * 0.2);
      let ringSize = this.size * (0.5 + i * 0.3) + vitalityPhase * 20;
      
      noFill();
      stroke(this.color[0], this.color[1], this.color[2], ringAlpha);
      strokeWeight(2);
      ellipse(this.x, this.y, ringSize);
    }
    
    // Vitality particles
    for (let i = 0; i < 10; i++) {
      let particleAngle = this.pulse * 3 + i * TWO_PI / 10;
      let particleRadius = this.size * 0.8;
      let particleX = this.x + cos(particleAngle) * particleRadius;
      let particleY = this.y + sin(particleAngle) * particleRadius;
      
      fill(255, 255, 255, vitalityIntensity * 0.8);
      ellipse(particleX, particleY, 5 + vitalityPhase * 3);
    }
    
    noStroke();
  }
  
  drawDreamState() {
    // Dream state with ethereal, otherworldly forms
    let dreamPhase = sin(this.pulse * 0.4);
    let dreamIntensity = this.alpha * (0.5 + dreamPhase * 0.3);
    
    // Ethereal mist-like forms
    for (let i = 0; i < 6; i++) {
      let mistAngle = this.pulse + i * TWO_PI / 6;
      let mistRadius = this.size * 0.9;
      let mistX = this.x + cos(mistAngle) * mistRadius;
      let mistY = this.y + sin(mistAngle) * mistRadius;
      
      let mistSize = 20 + dreamPhase * 15;
      let mistAlpha = dreamIntensity * (0.3 + dreamPhase * 0.4);
      
      fill(this.color[0], this.color[1], this.color[2], mistAlpha);
      ellipse(mistX, mistY, mistSize);
    }
    
    // Dream particles floating upward
    for (let i = 0; i < 8; i++) {
      let particleY = this.y - this.size * 0.8 + sin(this.pulse * 2 + i) * 20;
      let particleX = this.x + cos(this.pulse + i) * this.size * 0.6;
      
      fill(255, 255, 255, dreamIntensity * 0.7);
      ellipse(particleX, particleY, 4);
    }
  }
  
  drawMeditativeRing() {
    // Meditative ring with calming, centering energy
    let meditationPhase = sin(this.pulse * 0.15);
    let meditationIntensity = this.alpha * (0.7 + meditationPhase * 0.3);
    
    // Concentric meditation rings
    for (let i = 0; i < 6; i++) {
      let ringAlpha = meditationIntensity * (1 - i * 0.1);
      let ringSize = this.size * (0.3 + i * 0.15) + meditationPhase * 10;
      
      noFill();
      stroke(this.color[0], this.color[1], this.color[2], ringAlpha);
      strokeWeight(1);
      ellipse(this.x, this.y, ringSize);
    }
    
    // Centering mandala-like pattern
    for (let i = 0; i < 8; i++) {
      let mandalaAngle = i * TWO_PI / 8;
      let mandalaRadius = this.size * 0.4;
      let mandalaX = this.x + cos(mandalaAngle) * mandalaRadius;
      let mandalaY = this.y + sin(mandalaAngle) * mandalaRadius;
      
      fill(this.color[0], this.color[1], this.color[2], meditationIntensity * 0.6);
      ellipse(mandalaX, mandalaY, 6);
    }
    
    // Central focus point
    fill(255, 255, 255, meditationIntensity * 0.8);
    ellipse(this.x, this.y, this.size * 0.1);
    
    noStroke();
  }
  
  drawSensoryFlow() {
    // Sensory flow with organic, fluid-like movement
    let flowPhase = sin(this.pulse * 0.6);
    let flowIntensity = this.alpha * (0.5 + flowPhase * 0.4);
    
    // Organic flow patterns
    for (let i = 0; i < 7; i++) {
      let flowAngle = this.pulse + i * TWO_PI / 7;
      let flowRadius = this.size * 0.8;
      let flowX = this.x + cos(flowAngle) * flowRadius;
      let flowY = this.y + sin(flowAngle) * flowRadius;
      
      let flowSize = 15 + flowPhase * 10;
      let flowAlpha = flowIntensity * (0.4 + flowPhase * 0.3);
      
      fill(this.color[0], this.color[1], this.color[2], flowAlpha);
      ellipse(flowX, flowY, flowSize);
    }
    
    // Flowing center with organic movement
    let centerSize = this.size * 0.5 + flowPhase * 15;
    fill(this.color[0], this.color[1], this.color[2], flowIntensity * 0.8);
    ellipse(this.x, this.y, centerSize);
    
    // Sensory particles flowing outward
    for (let i = 0; i < 6; i++) {
      let particleAngle = this.pulse * 2 + i * TWO_PI / 6;
      let particleRadius = this.size * 1.2;
      let particleX = this.x + cos(particleAngle) * particleRadius;
      let particleY = this.y + sin(particleAngle) * particleRadius;
      
      fill(255, 255, 255, flowIntensity * 0.6);
      ellipse(particleX, particleY, 4);
    }
  }
} 