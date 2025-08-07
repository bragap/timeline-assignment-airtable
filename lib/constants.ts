import timelineItems from "./data/timelineItems";

export const laneColors = [
    'bg-color-1',
    'bg-color-2',
    'bg-color-3',
    'bg-color-4',
    'bg-color-5',
] as const;

export const allItems = timelineItems;
export const startDate = new Date(Math.min(...allItems.map(item => new Date(item.start).getTime())));
export const endDate = new Date(Math.max(...allItems.map(item => new Date(item.end).getTime())));