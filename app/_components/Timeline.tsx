'use client';

import { cn } from '@/lib/utils';
import assignLanes from '@/lib/functions/assignLanes';
import timelineItems from '../../lib/data/timelineItems';
import { endDate, laneColors, startDate } from '@/lib/constants';
import {calculateItemPosition} from '@/lib/functions/calculateItemPosition';

export default function Timeline() {
    const containerWidth = 1250;
    const lanes = assignLanes([...timelineItems]);

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
                        <div className="text-muted-foreground">
                            {startDate.toLocaleDateString()}
                        </div>
                        <div className="text-muted-foreground">
                            {endDate.toLocaleDateString()}
                        </div>
                    </div>

                    <div className="overflow-x-scroll  h-[550px]">
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