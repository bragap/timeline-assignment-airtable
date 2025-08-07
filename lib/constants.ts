import timelineItems from "./data/timelineItems";

export const laneColors = [
    'bg-primary',
    'bg-secondary',
    'bg-destructive',
    'bg-accent',
    'bg-card',
    'bg-popover',
] as const;

export const allItems = timelineItems;
export const startDate = new Date(Math.min(...allItems.map(item => new Date(item.start).getTime())));
export const endDate = new Date(Math.max(...allItems.map(item => new Date(item.end).getTime())));