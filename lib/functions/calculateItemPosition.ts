import { endDate, startDate } from "../constants";
import { TimelineItem } from "../types";

export default function calculateItemPosition(item: TimelineItem, containerWidth: number) {
    const totalDuration = endDate.getTime() - startDate.getTime();
    const itemStart = new Date(item.start).getTime() - startDate.getTime();
    const itemDuration = new Date(item.end).getTime() - new Date(item.start).getTime();
    const left = (itemStart / totalDuration) * containerWidth;
    const width = (itemDuration / totalDuration) * containerWidth;

    const minWidth = Math.max(item.name.length * 8 + 2, 120);
    const maxWidth = containerWidth * 0.3;
    return { left, width: Math.min(Math.max(width, minWidth), maxWidth) };
}