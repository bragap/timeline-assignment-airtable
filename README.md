# Timeline Assignment - Airtable

A modern, interactive timeline component built with Next.js that efficiently organizes timeline items in horizontal lanes. This project demonstrates advanced lane assignment algorithms and responsive timeline visualization.

## Project Overview

This Timeline Assignment application showcases:
- **Intelligent Lane Assignment**: Items are organized in compact horizontal lanes using an efficient algorithm
- **Space Optimization**: When item A ends before item B starts, they can share the same lane instead of being rendered separately
- **Inline Editing**: Double-click any timeline item to edit its name directly (when editable mode is enabled)
- **Visual Milestones**: All start dates are displayed as visual markers at the top for easy navigation
- **Responsive Design**: Built with Tailwind CSS using a custom purple color scheme
- **Interactive Features**: Hover effects, detailed tooltips, and smooth animations for each timeline item

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/bragap/timeline-assignment-airtable
cd timeline-assignment-airtable
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the timeline.

## Project Structure

```
├── app/
│   ├── _components/
│   │   └── Timeline.tsx          # Main timeline component
│   ├── globals.css               # Global styles with custom color scheme
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Main page
├── lib/
│   ├── constants.ts             # Color definitions and date calculations
│   ├── data/
│   │   └── timelineItems.ts     # Timeline data
│   ├── functions/
│   │   ├── assignLanes.ts       # Lane assignment algorithm
│   │   └── calculateItemPosition.ts  # Position calculation logic
│   └── utils.ts                 # Utility functions
└── README.md
```

## Features

### Lane Assignment Algorithm
The timeline uses an intelligent algorithm that:
- Sorts items chronologically by start date
- Assigns items to lanes based on visual space availability (not just dates)
- Considers the actual rendered width of items (including minimum text width)
- Maintains a 10px margin between items for visual clarity
- Limits item width to 30% of container to prevent overflow

### Visual Design
- **Custom Purple Color Scheme**: 6 distinct purple shades for different lanes
- **Responsive Layout**: Adapts to different screen sizes
- **Clean Typography**: Uses Geist font family for optimal readability
- **Intuitive Tooltips**: Show item details on hover
- **Interactive Animations**: Smooth hover effects and scale transitions

### Inline Editing Feature
The timeline supports real-time editing of item names:

**How to Use:**
1. Set `editable={true}` when rendering the Timeline component
2. Provide an `onItemUpdate` callback function
3. Double-click any timeline item to start editing
4. Press `Enter` to save or `Escape` to cancel
5. Click outside the input to save automatically

**Visual Indicators:**
- Hover effects show editability
- Ring highlight during editing
- Smooth scale animations
- Helpful tooltip instructions

### Data Structure
Each timeline item contains:
```typescript
{
  id: number;
  start: string;        
  end: string;          
  name: string;        
}
```

## Customization

### Adding New Timeline Items
Edit `lib/data/timelineItems.ts` to add or modify timeline items:

```typescript
{
  id: 17,
  start: "2021-05-15",
  end: "2021-05-20",
  name: "Your new item",
}
```

### Modifying Colors
The color scheme is defined in:
- `app/globals.css` - CSS variables for the 6 purple shades
- `lib/constants.ts` - Lane color assignments

### Adjusting Algorithm Parameters
In `lib/functions/assignLanes.ts`, you can modify:
- Visual margin between items (currently 10px)
- Maximum item width percentage (currently 30%)
- Minimum text-based width calculation

## Technical Details

### Technologies Used
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Custom CSS Variables** - For consistent theming

### Key Components
- `Timeline.tsx` - Main component that renders the timeline
- `assignLanes()` - Algorithm for efficient lane assignment
- `calculateItemPosition()` - Converts dates to pixel positions

### Algorithm Complexity
- Time Complexity: O(n × m) where n = number of items, m = average items per lane
- Space Complexity: O(n) for storing lane assignments
- Optimized for visual layout rather than just temporal overlap

## Assignment Requirements Met

✅ **Lane Organization**: Items are organized in horizontal lanes  
✅ **Space Efficiency**: Items share lanes when possible (A ends before B starts)  
✅ **Flexible Constraints**: Algorithm relaxes rules for text readability  
✅ **Visual Quality**: Clean, professional appearance  
✅ **Responsive Design**: Works on different screen sizes  
✅ **Interactive Elements**: Hover states and tooltips  

## Notes for Recruiters

This project demonstrates:
- **Algorithm Design**: Efficient lane assignment with visual considerations
- **React/Next.js Proficiency**: Modern React patterns and Next.js App Router
- **TypeScript Skills**: Proper typing and interface design
- **CSS/Styling**: Custom design system with Tailwind CSS
- **Problem Solving**: Balancing algorithmic efficiency with visual requirements
- **Code Organization**: Clean, modular architecture

The timeline handles edge cases like very long item names, short duration items, and overlapping date ranges while maintaining visual clarity and performance.

## Implementation Reflection

### What I Like About This Implementation

1. **Smart Visual-Based Algorithm**: Unlike simple date-based lane assignment, my algorithm considers the actual rendered width of items, making it truly space-efficient. This prevents visual overlaps even when items have long names or short durations.

2. **Modular Architecture**: The separation of concerns is clean - lane assignment logic is isolated from rendering, making the code maintainable and testable. Each function has a single responsibility.

3. **Flexible Constraint System**: The algorithm intelligently balances space efficiency with readability. When an item's text is too long for its time duration, it gets the space it needs rather than being artificially truncated.

4. **Performance Considerations**: The O(n×m) complexity is reasonable for timeline data, and the algorithm stops at the first available lane rather than searching all lanes unnecessarily.

### What I Would Change If Doing It Again

1. **Virtualization for Large Datasets**: For timelines with hundreds of items, I'd implement virtual scrolling to only render visible items, improving performance significantly.

2. **More Sophisticated Collision Detection**: I'd implement a more advanced algorithm that could handle overlapping items by slightly adjusting positions rather than always creating new lanes.

3. **Configurable Parameters**: Make algorithm parameters (margin, max width %, colors) configurable through props or a settings panel, allowing for better customization.

4. **Accessibility Improvements**: Add better keyboard navigation, ARIA labels, and screen reader support to make the timeline fully accessible.

5. **Animation and Interactions**: Add smooth transitions when items change lanes, and implement drag-and-drop functionality for interactive timeline editing.

6. **Better Mobile Experience**: Implement touch gestures for zooming and panning on mobile devices, and optimize the layout for smaller screens.

### Design Decision Process

**Timeline Research & Inspiration:**
- **Gantt Charts**: Analyzed traditional project management timelines for best practices in date representation
- **Figma's Version History**: Influenced the clean, minimal aesthetic and hover interaction patterns

**Algorithm Design Choices:**
- **Visual-first approach**: After seeing how text truncation ruins UX in other timelines, I prioritized readable text over strict temporal accuracy
- **Left-to-right assignment**: Chose this over more complex algorithms (like bin packing) for predictable, debuggable behavior
- **10px margin**: Based on typical button padding in design systems, ensuring comfortable visual separation

**Technology Stack Rationale:**
- **Next.js 15**: App Router for modern React patterns and excellent performance
- **Tailwind CSS**: Rapid prototyping and consistent design system
- **TypeScript**: Essential for algorithm correctness and maintainable code
- **CSS Variables**: Enables easy theming and future dark mode support

### Testing Strategy (If i had more time)

**Accessibility Tests:**
- **axe-core**: Automated accessibility testing
- **Screen reader testing**: Manual testing with NVDA/VoiceOver
- **Keyboard navigation**: Ensure all interactions work without mouse
- **Color contrast validation**: Verify WCAG compliance

**User Acceptance Tests:**
- **Usability testing**: Observe users interacting with different timeline scenarios
- **Edge case scenarios**: Very long item names, overlapping dates, dense timelines
- **Mobile device testing**: Touch interactions and responsive layout validation

---

**Created by Pedro Henrique Braga de Castro**  
*Timeline Assignment for Airtable*
