# PostalMap - Product Requirements Document (PRD)

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technical Stack](#technical-stack)
3. [Application Architecture](#application-architecture)
4. [Feature Specifications](#feature-specifications)
5. [User Flows](#user-flows)
6. [Technical Specifications](#technical-specifications)
7. [Performance Considerations](#performance-considerations)
8. [Accessibility](#accessibility)
9. [Deployment](#deployment)
10. [Future Enhancements](#future-enhancements)
11. [Appendix](#appendix)

## Project Overview
PostalMap is an immersive 3D web application that creates a virtual journey through London, specifically tracing the route from postal code SE10-9DD to the London College of Communication. The application combines interactive 3D environments, spatial audio, and rich media content to deliver an engaging user experience.

### Key Objectives
- Create an immersive digital experience of London locations
- Showcase 3D scanning and web-based 3D rendering capabilities
- Provide educational content about the featured locations
- Deliver a seamless experience across desktop and mobile devices

### Target Audience
- Prospective students of London College of Communication
- Digital art and technology enthusiasts
- Educators in digital media and 3D visualization
- General public interested in virtual tours of London

## User Journey

### 1. Entry Point & First Impressions (0-30 seconds)
- **Landing Experience**:
  - Users are greeted with a loading screen featuring the LCC and PostalMap logos
  - Subtle animation of the postal code SE10-9DD transforming into a 3D map
  - Initial camera movement provides a bird's-eye view of the starting location
- **First Interaction**:
  - Simple on-screen prompt: "Scroll to begin your journey"
  - Subtle visual cues (pulsing arrows) guide the initial scroll
  - Smooth transition to the first scene with spatial audio fade-in

### 2. Scene 1: Postal Code SE10-9DD (30s - 2:30 min)
- **Initial Exploration**:
  - 360° view of the neighborhood with interactive hotspots
  - Gentle audio narration introduces the journey concept
  - Subtle UI elements highlight points of interest
- **Key Interactions**:
  - Clickable buildings reveal resident stories (audio snippets)
  - Time slider shows historical development of the area
  - Mini-map orients users within the larger journey
- **Transition**:
  - Visual prompt guides users toward Greenwich Pier
  - Camera follows a virtual path to the next location
  - Audio crossfade to waterfront ambience

### 3. Scene 2: Greenwich Pier (2:30 - 5:00 min)
- **Arrival Experience**:
  - Panoramic view of the Thames with the Cutty Sark in the distance
  - Dynamic time-of-day lighting reflects the journey's progression
  - Interactive elements pulse gently to indicate interactivity
- **Key Activities**:
  - Board the virtual Uber Boat (transition to next scene)
  - Explore historical photos in a floating gallery
  - Listen to ambient sounds of the river and seagulls
- **Educational Elements**:
  - Pop-up facts about the pier's history
  - Student interviews about their experiences
  - Time-lapse of the area's transformation

### 4. Scene 3: Embankment Station (5:00 - 7:30 min)
- **Station Arrival**:
  - Immersive recreation of the station's unique atmosphere
  - Spatial audio with train announcements and crowd sounds
  - Dynamic lighting simulates the underground environment
- **Interactive Features**:
  - Navigate through different station levels
  - Discover hidden architectural details
  - View historical photos overlaid on current views
- **Narrative Elements**:
  - Stories from daily commuters
  - Historical facts about the Underground
  - Connection to London's development

### 5. Scene 4: London College of Communication (7:30 - 10:00+ min)
- **Campus Arrival**:
  - Grand reveal of the LCC building
  - Ambient sounds of student activity
  - Dynamic lighting showcases the architecture
- **Exploration**:
  - Virtual tour of key facilities
  - Interactive displays of student work
  - Faculty and student testimonials
- **Call to Action**:
  - "Start Your Creative Journey" button
  - Contact form for more information
  - Links to course information

### 6. Post-Journey Experience
- **Reflection**:
  - Summary of key locations visited
  - Option to revisit favorite scenes
  - Share experience on social media
- **Next Steps**:
  - Schedule a campus tour
  - Download prospectus
  - Contact admissions

### Accessibility Considerations
- Keyboard navigation for all interactive elements
- Adjustable text sizes and contrast options
- Screen reader support for all content
- Captions and transcripts for all audio/video content

### Technical Requirements
- **Minimum Device Requirements**:
  - Desktop: Modern browser with WebGL 2.0 support
  - Mobile: iOS 13+/Android 10+ with latest Chrome/Safari
  - Internet: Minimum 10Mbps for HD content
- **Performance Optimization**:
  - Progressive loading of assets
  - Quality settings adjustment based on device capability
  - Background loading of next scene while user explores current one

## Technical Stack

### Core Technologies
- **Frontend Framework**: React 18.2.0
- **3D Rendering**: 
  - Three.js
  - @react-three/fiber (React Three Fiber)
  - @react-three/drei (Helpers and abstractions)
- **UI/State Management**:
  - React Context API
  - React Hooks (useState, useEffect, useRef, etc.)
- **Routing**: React Router DOM v6.4.5
- **Animation**: React Spring 9.5.5
- **Build Tool**: Create React App 5.0.1

### Development Dependencies
- Babel (with custom GLSL plugin)
- Jest & React Testing Library
- ESLint
- Webpack (via Create React App)

### 3D Asset Pipeline
- **Modeling**: External 3D modeling software (Blender/Maya/3DS Max)
- **Export Format**: GLB/GLTF
- **Optimization**: 
  - Mesh decimation
  - Texture compression
  - Level of Detail (LOD) models

## Application Architecture

### Component Hierarchy
```
src/
├── components/               # Reusable UI components
│   ├── ui/
│   │   ├── atoms/           # Basic building blocks
│   │   ├── molecules/       # Groups of atoms
│   │   └── organisms/       # Complex UI components
├── routes/
│   ├── web/                 # Desktop experience
│   │   ├── pages/           # Page components
│   │   └── sections/        # Section components
│   ├── mobile/              # Mobile experience
│   └── redirect/            # Redirect logic
├── assets/
│   ├── audio/               # Audio files
│   ├── images/              # Static images
│   ├── models/              # 3D models
│   └── videos/              # Video files
├── hooks/                   # Custom React hooks
└── utils/                   # Utility functions
```

### State Management
- **Local State**: React hooks (useState, useReducer)
- **Global State**: React Context API
- **URL State**: React Router for navigation state
- **Persistence**: Limited client-side storage for preferences

## Feature Specifications

### 1. 3D Environment System
- **Scene Management**: Dynamic loading and unloading of 3D scenes
- **Camera Controls**: Orbit controls for navigation
- **Lighting**: Dynamic lighting setup for each scene
- **Post-processing**: Visual effects and filters

### 2. Location-Based Scenes

#### a. Postal Code (SE10-9DD)
- **Purpose**: Starting point of the journey, establishing personal connection
- **Narrative Theme**: "Where Your Story Begins"
- **Key Narrative Elements**:
  - Introduction to the concept of place and identity
  - Personal stories from local residents
  - Historical development of the SE10 area
- **Assets**:
  - 3D Model: `postcode.glb` (interactive neighborhood model)
  - Audio: `sidewalk1.mp4` (ambient neighborhood sounds, optional voiceover)
  - Video: `postcode.mov` (time-lapse of the area throughout a day)
  - Images: Historical and contemporary views of the postal district
- **Interactions**:
  - 360° view navigation with parallax effects
  - Interactive map with points of interest
  - Audio narration toggle with multiple narrator options
  - "Meet the Neighbors" character interactions

#### b. Greenwich Pier
- **Purpose**: Historical and cultural hub connecting land and river
- **Narrative Theme**: "Where History Meets the Tide"
- **Key Narrative Elements**:
  - The pier's role in London's maritime history
  - Student life around the Thames
  - The changing face of riverside communities
- **Assets**:
  - 3D Models: 
    - `pier.glb` (main pier structure with interactive elements)
    - `gppay.glb` (payment kiosks and ticketing areas)
    - `gpstudents.glb` (animated student characters)
  - Audio: `greenwich.mp4` (river sounds, seagulls, boat announcements)
  - Video: 
    - `greenwich.mov` (historical footage of the pier)
    - `uberboat.mov` (first-person POV boat journey)
  - Images: 
    - Historical photographs of the pier
    - Student life snapshots
    - Seasonal changes in the area
- **Interactions**:
  - Board a virtual Uber Boat (transition to next scene)
  - Interview local business owners (audio snippets)
  - Compare historical and current views with slider
  - Time-lapse of the pier through different eras

#### c. Embankment Station
- **Purpose**: The beating heart of London's underground network
- **Narrative Theme**: "Beneath the Surface"
- **Key Narrative Elements**:
  - Engineering marvels of the Underground
  - Stories of daily commuters
  - The station's role in London's development
- **Assets**:
  - 3D Models: 
    - `embpier.glb` (river entrance and ticket hall)
    - `embfront.glb` (station facade and surrounding area)
    - `embplatform.glb` (detailed platform environment)
  - Audio: `station.mp4` (ambient station sounds, train announcements)
  - Images: 
    - Historical construction photos
    - Architectural blueprints
    - Crowd movement studies
- **Interactions**:
  - Navigate through different station levels
  - Interactive timeline of the station's history
  - "A Day in the Life" time-lapse of station activity
  - Hidden details about the station's design and artwork

#### d. London College of Communication (LCC)
- **Purpose**: Culmination of the journey, celebrating creative education
- **Narrative Theme**: "Where Ideas Take Shape"
- **Key Narrative Elements**:
  - The history of LCC and its impact on creative industries
  - Student success stories and graduate journeys
  - The future of creative education
- **Assets**:
  - 3D Models: 
    - `lcc.glb` (full campus model with interactive buildings)
    - `lcstudent.glb` (individual student avatars)
    - `lcstudents.glb` (group scenes and collaborative spaces)
  - Audio: `lcc.mp4` (campus sounds, student interviews, lecture snippets)
  - Images: 
    - Campus life throughout the years
    - Student work highlights
    - Campus events and exhibitions
- **Interactions**:
  - Self-guided virtual campus tour
  - Department deep-dives with faculty interviews
  - Interactive showcase of student projects
  - "Day in the Life" experience of LCC students
  - Alumni success stories and career paths

### 3. Navigation System
- **Scroll-based Navigation**: Smooth scrolling between sections
- **Progress Indicators**: Visual feedback on position in journey
- **Quick Navigation**: Jump to specific points of interest
- **Responsive Design**: Adapts to different screen sizes

### 4. Media System
- **Image Viewer**: High-resolution image display
- **Video Player**: Embedded video content
- **Audio System**: Spatial audio with volume falloff
- **3D Model Viewer**: Interactive model inspection

### 5. User Interface
- **Navigation Bar**: Persistent header with location info
- **Information Panels**: Contextual information display
- **Settings Menu**: Audio/visual preferences
- **Help System**: User guidance and controls

## Narrative Structure

### Story Arc
PostalMap tells the story of a student's journey from their home in Greenwich to the London College of Communication, highlighting the cultural and historical significance of each location along the way. The narrative weaves together personal experience, historical context, and educational content to create an engaging journey through London's urban landscape.

### Scene Transitions
1. **Postal Code to Greenwich Pier**
   - **Narrative Bridge**: "Leaving the familiar surroundings of your postal code, you begin your journey towards the River Thames, where centuries of maritime history meet modern student life..."
   - **Themes**: Transition from personal space to public space, introduction to London's river-based transportation history
   - **Interactive Element**: A virtual map shows the walking route with historical markers

2. **Greenwich Pier to Embankment Station**
   - **Narrative Bridge**: "As the Uber Boat glides along the Thames, watch as the historic maritime Greenwich gives way to the bustling heart of London..."
   - **Themes**: Contrast between old and new London, the river as a historical highway
   - **Interactive Element**: Timeline slider showing how the riverfront has changed over centuries

3. **Embankment Station to LCC**
   - **Narrative Bridge**: "Disembarking at Embankment, you join the flow of Londoners making their daily commute, a tradition that connects you to generations of students before you..."
   - **Themes**: Urban mobility, student life, educational journey
   - **Interactive Element**: Audio snippets of student experiences and historical accounts

## User Flows

### Primary User Journey
1. **Landing & Introduction**
   - Load application with a stylized map of London
   - View loading screen with fun facts about the journey
   - Enter main experience through an animated transition from map to 3D scene

2. **Postal Code Exploration**
   - **Narrative Hook**: "This is where your journey begins..."
   - Discover personal stories tied to the SE10-9DD area
   - Interactive elements reveal how postal codes shape community identity
   - Subtle audio cues guide attention to points of interest

3. **Greenwich Pier Experience**
   - **Narrative Hook**: "For centuries, the Thames has been London's lifeblood..."
   - Explore the pier's role in London's maritime history
   - Interactive timeline shows the evolution of river transport
   - Ambient sounds of the river and distant city create immersion

4. **Embankment Station Transition**
   - **Narrative Hook**: "Beneath the city's surface lies another world..."
   - Discover the hidden engineering marvels of London Underground
   - Interactive elements reveal the station's architectural significance
   - Audio design shifts to emphasize the underground atmosphere

5. **LCC Arrival**
   - **Narrative Hook**: "Your journey culminates at the heart of creative education..."
   - Explore the campus through student stories and achievements
   - Interactive showcase of student work and department highlights
   - Reflective conclusion with options to explore specific areas in depth

6. **Completion & Reflection**
   - Interactive timeline of the completed journey
   - Option to revisit favorite locations
   - Share experience on social media
   - Behind-the-scenes content about the project's creation

## Technical Specifications

### Performance Targets
- **Initial Load Time**: < 5s (on desktop, fast 3G)
- **Frame Rate**: 60 FPS (target), minimum 30 FPS
- **Memory Usage**: < 500MB for 3D assets
- **Asset Loading**: Progressive loading with placeholders

### Browser Support
- **Desktop**: Latest versions of Chrome, Firefox, Safari, Edge
- **Mobile**: iOS 13+, Android 10+
- **Fallbacks**: Basic functionality on unsupported browsers

### API Endpoints
- **Asset Hosting**: CDN for media files
- **Analytics**: Optional tracking integration
- **Content Management**: Headless CMS for dynamic content

## Performance Considerations

### Asset Optimization
- **3D Models**:
  - Triangle count limits per model
  - Texture atlasing
  - Compression (Draco, meshopt)
- **Images**:
  - WebP format with fallbacks
  - Responsive image sets
  - Lazy loading
- **Audio/Video**:
  - Compressed formats (Opus, H.265)
  - Streaming where possible
  - Background loading

### Code Splitting
- Route-based code splitting
- Dynamic imports for heavy components
- Lazy loading of non-critical assets

### Memory Management
- Asset cleanup on scene changes
- Texture and geometry disposal
- Garbage collection optimization

## Accessibility

### WCAG 2.1 Compliance
- **Perceivable**: Text alternatives, captions
- **Operable**: Keyboard navigation, timing adjustable
- **Understandable**: Readable and predictable
- **Robust**: Compatible with assistive technologies

### Navigation
- Keyboard controls
- Screen reader support
- High contrast mode

## Deployment

### Build Process
```bash
# Install dependencies
npm install

# Development server
npm start

# Production build
npm run build

# Deploy to GitHub Pages
npm run deploy
```

### Hosting
- **Production**: GitHub Pages
- **CDN**: For static assets
- **Analytics**: Optional integration

## Future Enhancements

### Short-term
- [ ] Add more interactive elements
- [ ] Implement user preferences
- [ ] Expand location coverage

### Medium-term
- [ ] Multi-language support
- [ ] User accounts and saved progress
- [ ] Social sharing features

### Long-term
- [ ] VR/AR integration
- [ ] User-generated content
- [ ] Live data integration

## Appendix

### Asset Inventory
| Type | Format | Average Size | Notes |
|------|--------|--------------|-------|
| 3D Models | GLB | 5-20MB | Optimized for web |
| Textures | JPEG/PNG | 0.5-5MB | WebP preferred |
| Audio | MP4/OGG | 1-10MB | Compressed |
| Video | MP4/WebM | 5-50MB | Streamed where possible |

### Performance Metrics
| Metric | Target | Current |
|--------|--------|---------|
| Time to Interactive | < 5s | TBD |
| FPS | 60 | TBD |
| Memory Usage | < 500MB | TBD |
| Load Time | < 3s | TBD |

### Dependencies
```json
{
  "dependencies": {
    "@babel/core": "^7.20.5",
    "@react-three/drei": "^9.35.1",
    "@react-three/fiber": "^8.8.10",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.4.5",
    "three": "^0.145.0"
  }
}
```

### Development Scripts
- `npm start`: Start development server
- `npm test`: Run tests
- `npm run build`: Create production build
- `npm run deploy`: Deploy to GitHub Pages

### Known Issues
- [ ] Performance on low-end devices
- [ ] Mobile browser compatibility
- [ ] Asset loading optimization needed