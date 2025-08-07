'use client';

import { Lane, TimelineItem } from '@/lib/types';
import timelineItems from '../../lib/data/timelineItems';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

function assignLanes(items: TimelineItem[]): Lane[] {
    const sortedItems = items.sort((a, b) =>
        new Date(a.start).getTime() - new Date(b.start).getTime()
    );
    const lanes: Lane[] = [];

    function assignItemToLane(item: TimelineItem): void {
        for (const lane of lanes) {
            if (new Date(lane[lane.length - 1].end).getTime() < new Date(item.start).getTime()) {
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
    const [containerWidth, setContainerWidth] = useState(1200);

    useEffect(() => {
        const updateWidth = () => {
            setContainerWidth(window.innerWidth - 80);
        };

        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

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
        // largura mínima baseada no texto
        const minWidth = Math.max(item.name.length * 8 + 32, 120);
        return { left, width: Math.max(width, minWidth) };
    }

    const laneHeight = 56;
    const laneColors = [
        'bg-primary',        
        'bg-secondary',      
        'bg-destructive',    
        'bg-accent',         
        'bg-card',           
        'bg-popover',        
    ];

    return (
        <section className="w-full min-h-screen flex flex-col items-center bg-background py-8">
            <div className="w-full max-w-7xl flex flex-col items-center py-4">
                <div className="text-lg font-semibold mb-1">Timeline Assignment</div>
                <div className="text-xs text-muted-foreground">
                    {startDate.toLocaleDateString()} — {endDate.toLocaleDateString()}
                </div>
            </div>

            <div className="w-full max-w-7xl flex-1 border rounded-xl overflow-x-auto bg-muted/60 shadow-md">
                <div
                    className="relative mx-auto"
                    style={{
                        width: Math.max(containerWidth, 900),
                        height: lanes.length * laneHeight + 40,
                        maxWidth: 1800,
                    }}
                >
                    <div className="flex justify-between w-full border-b bg-background sticky top-0 z-30">
                        <div className="pl-2 text-xs text-muted-foreground">
                            {startDate.toLocaleDateString()}
                        </div>
                        <div className="pr-2 text-xs text-muted-foreground">
                            {endDate.toLocaleDateString()}
                        </div>
                    </div>

                    {lanes.map((lane, laneIndex) => (
                        <div key={laneIndex} className="relative" style={{ height: laneHeight }}>
                            {/* Label do lane */}
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-8 text-xs text-muted-foreground select-none">
                                {laneIndex + 1}
                            </div>
                            {lane.map((item, idx) => {
                                const { left, width } = calculateItemPosition(item, Math.max(containerWidth, 900));
                                // Verifica se há sobreposição com o próximo item
                                let isOverlapped = false;
                                let nextLeft: number | undefined = undefined;
                                if (idx < lane.length - 1) {
                                    const nextItem = lane[idx + 1];
                                    const pos = calculateItemPosition(nextItem, Math.max(containerWidth, 900));
                                    nextLeft = pos.left;
                                    if (left + width > nextLeft) {
                                        isOverlapped = true;
                                    }
                                }
                                return (
                                    <div
                                        key={item.id}
                                        className={cn(
                                            "absolute text-xs flex items-center justify-start shadow-sm border border-border",
                                            "px-2 py-1 cursor-pointer hover:shadow-lg transition-shadow whitespace-nowrap",
                                            laneColors[laneIndex % laneColors.length],
                                            "rounded-md"
                                        )}
                                        style={{
                                            left: left,
                                            top: 8,
                                            width: width,
                                            height: laneHeight - 16,
                                            zIndex: 2,
                                            maxWidth: nextLeft !== undefined && isOverlapped ? nextLeft - left - 8 : undefined,
                                            overflow: isOverlapped ? 'hidden' : undefined,
                                        }}
                                        title={`${item.name} (${item.start} - ${item.end})`}
                                    >
                                        <span className={cn("truncate", isOverlapped && "pr-6")}>{item.name}</span>
                                        
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}