import assignLanes from '@/lib/functions/assignLanes';
import calculateItemPosition from '@/lib/functions/calculateItemPosition';
import { endDate, laneColors, startDate } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { TimelineItem, TimelineProps } from '@/lib/types';

export default function Timeline<T extends TimelineItem>({ items }: TimelineProps<T>) {
    const containerWidth = 1250;
    const lanes = assignLanes([...items]);

    return (
        <section className="w-full flex h-screen flex-col items-center bg-background py-8">
            <div className="w-full max-w-7xl flex flex-col items-center pb-4">
                <div className="text-3xl font-semibold mb-1">Timeline Assignment</div>
            </div>

            <div className="w-full max-w-7xl border rounded-xl shadow-md h-[650px] p-1">

                <div className="flex justify-between w-full border-b bg-background p-3">
                    <div className="text-primary">
                        {startDate.toLocaleDateString()}
                    </div>
                    <div className="text-primary">
                        {endDate.toLocaleDateString()}
                    </div>
                </div>

                <div className="overflow-x-auto h-[550px] p-2 select-none">
                    {lanes.map((lane, laneIndex) => (
                        <div key={laneIndex} className="border-b w-[1400px]">
                            <div className={cn("relative p-10 w-full")}>
                                {lane.map((item) => {
                                    const { left, width } = calculateItemPosition(item, Math.max(containerWidth, 900));

                                    return (
                                        <div
                                            key={item.id}
                                            className={cn(
                                                "absolute text-sm flex items-center justify-start shadow-sm border border-border",
                                                "px-2 py-1 cursor-pointer hover:shadow-lg transition-shadow whitespace-nowrap rounded-md",
                                                "top-2 z-[2] h-[55px]",
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

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}