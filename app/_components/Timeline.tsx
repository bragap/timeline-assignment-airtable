'use client';

import { Lane, TimelineItem } from '@/lib/types';
import timelineItems from '../../lib/data/timelineItems';
import { cn } from '@/lib/utils';

function assignLanes(items: TimelineItem[]): Lane[] {
    const sortedItems = items.sort((a, b) =>
        new Date(a.start).getTime() - new Date(b.start).getTime()
    );
    const lanes: Lane[] = [];

    function assignItemToLane(item: TimelineItem): void {
        for (const lane of lanes) {
            const lastItem = lane[lane.length - 1];
            const lastItemEnd = new Date(lastItem.end).getTime();
            const currentItemStart = new Date(item.start).getTime();

            const margin = 24 * 60 * 60 * 1000;

            if (lastItemEnd + margin <= currentItemStart) {
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

export default function Timeline() {
    const containerWidth = 1250;

    const lanes = assignLanes([...timelineItems]);

    const allItems = timelineItems;
    const startDate = new Date(Math.min(...allItems.map(item => new Date(item.start).getTime())));
    const endDate = new Date(Math.max(...allItems.map(item => new Date(item.end).getTime())));

    function calculateItemPosition(item: TimelineItem, containerWidth: number) {
        const totalDuration = endDate.getTime() - startDate.getTime();
        const itemStart = new Date(item.start).getTime() - startDate.getTime();
        const itemDuration = new Date(item.end).getTime() - new Date(item.start).getTime();
        const left = (itemStart / totalDuration) * containerWidth;
        const width = (itemDuration / totalDuration) * containerWidth;

        const minWidth = Math.max(item.name.length * 8 + 32, 120);
        const maxWidth = containerWidth * 0.3;
        return { left, width: Math.min(Math.max(width, minWidth), maxWidth) };
    }

    const laneColors = [
        'bg-primary',
        'bg-secondary',
        'bg-destructive',
        'bg-accent',
        'bg-card',
        'bg-popover',
    ];

    return (
        <section className="w-full flex h-screen flex-col items-center bg-background py-8">
            <div className="w-full max-w-7xl flex flex-col items-center pb-4">
                <div className="text-3xl font-semibold mb-1">Timeline Assignment</div>
            </div>

            <div className="w-full max-w-7xl border rounded-xl shadow-md h-[650px]">
                <div
                    className={cn("relative mx-auto")}
                    style={{
                        width: Math.max(containerWidth, 900),
                    }}
                >
                    <div className="flex justify-between w-full border-b bg-background p-3">
                        <div className=" text-xs text-muted-foreground">
                            {startDate.toLocaleDateString()}
                        </div>
                        <div className=" text-xs text-muted-foreground">
                            {endDate.toLocaleDateString()}
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        {lanes.map((lane, laneIndex) => (
                            <div key={laneIndex} className={cn("relative h-[70px]")}>
                                {lane.map((item) => {
                                    const { left, width } = calculateItemPosition(item, Math.max(containerWidth, 900));

                                    return (
                                        <div
                                            key={item.id}
                                            className={cn(
                                                "absolute text-xs flex items-center justify-start shadow-sm border border-border",
                                                "px-2 py-1 cursor-pointer hover:shadow-lg transition-shadow whitespace-nowrap rounded-md",
                                                "top-2 z-[2] h-[54px]",
                                                laneColors[laneIndex % laneColors.length]
                                            )}
                                            style={{
                                                left: left,
                                                width: width,
                                            }}
                                            title={`${item.name} (${item.start} - ${item.end})`}
                                        >
                                            <span className="truncate">{item.name}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}