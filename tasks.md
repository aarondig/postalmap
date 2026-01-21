# PostalMap MVP Tasks

## MVP Definition
A minimal, performant web experience that:
- Loads quickly (<3s on desktop, <5s on mobile)
- Works on modern Chrome/Safari (latest 2 versions)
- Delivers core narrative without crashes
- Uses minimal external services
- Is easily debuggable

## Priority 1: Core Functionality

### 1. Fix Navigation
- [x] Fix previous/next button click handlers
  - [x] Ensure buttons are clickable despite perspective positioning
  - [x] Apply proper z-index and pointer-events to maintain interactivity
  - [x] Added invisible hitboxes that mirror button layout
  - [x] Hitboxes work with parallax effect and are clickable
  - [x] Tested and working on view sections
- [ ] Ensure smooth scene transitions
- [ ] Add basic error boundaries around scenes

### 2. Audio System
- [x] Set up basic audio context
- [x] Load and play scene-specific audio
- [x] Add mute/unmute toggle
  - [x] Implement fade-in animation for audio icon (only after home screen)
  - [x] Ensure icon is hidden on home screen
  - [x] Add smooth transition for icon appearance
- [x] Clean up audio on scene change

### 3. 3D Rendering
- [ ] Fix mini canvas visibility
  - [ ] Ensure 3D models are properly centered in their containers
  - [ ] Add slight auto-rotation to models
  - [ ] Set pointer-events: none on 3D model containers
  - [ ] Adjust camera and lighting for optimal model presentation
- [ ] Implement basic LOD for models
- [ ] Add loading states for 3D assets
- [ ] Dispose of unused resources

## Priority 2: Performance

### 1. Asset Optimization
- [ ] Compress all textures (max 2K resolution)
- [ ] Convert models to compressed GLB
- [ ] Optimize 3D model polygon counts
- [ ] Implement basic texture atlases

### 2. Loading Strategy
- [ ] Add loading screen with progress
- [ ] Implement basic code splitting
- [ ] Preload next scene in background
- [ ] Add error fallbacks for failed loads

### 3. Memory Management
- [ ] Dispose of unused assets
- [ ] Limit concurrent asset loading
- [ ] Add memory warning handler

## Priority 3: Content

### 1. Complete Scenes
- [ ] Add all missing 3D models
- [ ] Finalize all text content
- [ ] Add basic interaction hints

### 2. Basic Responsiveness
- [ ] Ensure mobile view works
- [ ] Basic desktop layout
- [ ] Handle orientation changes

## Setup Instructions for Claude

### Prerequisites
1. Node.js v16+
2. npm v8+
3. Modern browser with WebGL2

### Development Commands
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run performance test
npm run build && npx serve -s build
```

## Getting Started
1. Begin with the highest priority tasks
2. Test changes frequently on target devices
3. Document any new issues that arise
4. Update this task list as needed


Key changes made:
1. **Audio Tasks**:
   - Focused on fixing existing implementation
   - Added specific fixes for audio context and scene transitions
   - Included error handling

2. **Navigation**:
   - Made tasks more specific to current implementation
   - Focused on fixing existing functionality

3. **3D Rendering**:
   - Kept essential optimizations
   - Focused on stability and performance

4. **Removed**:
   - Unnecessary build steps
   - Redundant tasks
   - Non-essential optimizations

The tasks are now more focused on fixing what's already there rather than adding new features or making major architectural changes.


## Testing
- [ ] Bring back Intro loading screen once testing is complete
  - File: `src/routes/mobile/App.js:8` and `src/routes/mobile/App.js:154`
  - Uncomment: `import Intro from "./pages/intro";`
  - Uncomment: `<Intro {...loader}/>`
