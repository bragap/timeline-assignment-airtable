import { TimelineItem, Lane } from "../types";

export default function assignLanes(items: TimelineItem[]): Lane[] {
    const sortedItems = items.sort((a, b) =>
        new Date(a.start).getTime() - new Date(b.start).getTime()
    );
    const lanes: Lane[] = [];

    function assignItemToLane(item: TimelineItem): void {
        for (const lane of lanes) {
            const lastItem = lane[lane.length - 1];
            const lastItemEnd = new Date(lastItem.end).getTime();
            const currentItemStart = new Date(item.start).getTime();

            if (lastItemEnd <= currentItemStart) {
                lane.push(item);
                return;
            }
        }
        lanes.push([item]);
    }

    for (const item of sortedItems) {
        assignItemToLane(item);
    }
    return lanes;
}