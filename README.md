# Enchanted Doors – Animation Demo

A concept demo of 20 interactive doors built with plain HTML, CSS and JavaScript. Each door swings open in 3D, warm light spills out, sparkles drift upward and the books of a library fade in one by one.

**Live demo:** https://door-animation-demo.vercel.app

## Features

- 20 doors generated with JavaScript (one reusable component)
- Smooth 3D door swing using CSS transforms
- Light beams, floating sparkles and staggered book animation
- Twinkling stars and drifting fireflies in the background
- Responsive layout for desktop and mobile
- Keyboard accessible (Tab, Enter, Space)
- Respects `prefers-reduced-motion`

## Tech Stack

HTML5, CSS3 (transforms, keyframes, gradients), vanilla JavaScript. No libraries.

## Project Structure

```
door-animation-demo/
├── index.html
├── style.css
└── script.js
```

## Run Locally

1. Clone the repository
2. Open `index.html` in a browser (or use the VS Code Live Server extension)

## Customize

- Colors: change the `--gold`, `--wood-a` and `--wood-b` variables in `style.css`
- Number of doors: change the loop limit in `script.js`
- Door speed: change the transition duration of `.door` in `style.css`

## Author

Neha Bhatti – [GitHub](https://github.com/nehabhatti9028-collab) · [LinkedIn](https://linkedin.com/in/neha-bhatti-80b237382)
