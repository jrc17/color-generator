# React + Vite
# Color Generator App

A React app for generating and exploring color schemes, inspired by [Coolors](https://coolors.co). Started as a course project, extended into a more complete tool.

## Features (Phase 1)
- Generate colors using named schemes (monochrome, triad, complement, etc.)
- Generate custom schemes (pastel, neon, earthy, jewel, muted) using HSL ranges
- Displays HEX codes and color names via API

## Planned Features (Phase 2)
- Lock/unlock individual colors
- Add and delete colors from a scheme
- Copy HEX code to clipboard
- UI polish inspired by Coolors

## Tech Stack
- React, JavaScript, HTML, CSS
- [The Color API](https://www.thecolorapi.com/)

## Getting Started

```bash
npm install
npm start
```

## Technical Decisions

**Why React?** Started in vanilla JS but refactored to React as state management became complex — especially for planned Phase 2 features like locking individual colors.

**Why HSL for color generation?** HSL lets you control hue, saturation, and lightness independently, making it straightforward to define ranges that produce predictable color feels (e.g. high saturation + mid lightness = neon).

**Parallel fetching** Refactored from sequential fetch calls to `Promise.all` to fetch all colors simultaneously, improving performance.