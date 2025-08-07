import assignLanes from '@/lib/functions/assignLanes';
import calculateItemPosition from '@/lib/functions/calculateItemPosition';
import { endDate, laneColors, startDate } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { TimelineItem, TimelineProps } from '@/lib/types';
import { useState, useEffect } from 'react';
import { Pencil, Search, Sun, Moon } from 'lucide-react';

export default function Timeline<T extends TimelineItem>({ items, onItemUpdate, editable = false, showZoomControls = true }: TimelineProps<T>) {
    const [editingItem, setEditingItem] = useState<number | null>(null);
    const [editValue, setEditValue] = useState<string>('');
    const [zoomLevel, setZoomLevel] = useState(1);
    const [isDark, setIsDark] = useState(false);
    const containerWidth = 1250;
    const lanes = assignLanes([...items]);

    useEffect(() => {
        setIsDark(document.documentElement.classList.contains('dark'));
    }, []);

    const toggleTheme = () => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);
        
        if (newIsDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const handleItemDoubleClick = (item: T) => {
        if (!editable) return;
        setEditingItem(item.id);
        setEditValue(item.name);
    };

    const handleEditSubmit = (item: T) => {
        if (onItemUpdate && editValue.trim()) {
            const updatedItem = { ...item, name: editValue.trim() };
            onItemUpdate(updatedItem);
        }
        setEditingItem(null);
        setEditValue('');
    };

    const handleEditCancel = () => {
        setEditingItem(null);
        setEditValue('');
    };

    const handleKeyDown = (e: React.KeyboardEvent, item: T) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleEditSubmit(item);
        } else if (e.key === 'Escape') {
            handleEditCancel();
        }
    };

    const handleZoomIn = () => {
        setZoomLevel(prev => Math.min(prev * 1.25, 2));
    };

    const handleZoomOut = () => {
        setZoomLevel(prev => Math.max(prev / 1.25, 0.75));
    };

    const handleZoomReset = () => {
        setZoomLevel(1);
    };

    return (
        <section className="w-full flex h-screen flex-col items-center bg-background py-8">
            <div className="w-full max-w-7xl flex flex-col items-center pb-4">
                <div className="flex items-center gap-4 mb-1">
                    <div className="text-3xl font-semibold">Timeline Assignment</div>
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors cursor-pointer"
                        title="Toggle theme"
                    >
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>
                <div className="text-sm text-muted-foreground text-center space-y-1">
                    {editable && (
                        <div className="flex items-center gap-1 justify-center"><Pencil height={20} /> Double-tap any item to edit its name.</div>
                    )}
                    {showZoomControls && (
                        <div className="flex items-center gap-1 justify-center"><Search height={20} /> Use the zoom controls to enlarge or reduce the view.</div>
                    )}
                </div>
            </div>

            <div className="w-full max-w-7xl border rounded-xl shadow-md h-[590px] p-1">

                <div className="flex justify-between items-center w-full border-b bg-background p-3">
                    <p>{startDate.toLocaleDateString()}</p>

                    {showZoomControls && (
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleZoomOut}
                                className="flex items-center gap-1 px-3 py-2 text-sm bg-muted hover:bg-muted/80 rounded-md cursor-pointer transition-colors"
                                title="Zoom out"
                            >
                                <Search height={20} />-
                            </button>
                            <span className="text-xs text-muted-foreground min-w-[60px] text-center">
                                {Math.round(zoomLevel * 100)}%
                            </span>
                            <button
                                onClick={handleZoomIn}
                                className="flex items-center gap-1 px-3 py-2 text-sm bg-muted hover:bg-muted/80 rounded-md cursor-pointer transition-colors"
                                title="Zoom in"
                            >
                                <Search height={20} />+
                            </button>
                            <button
                                onClick={handleZoomReset}
                                className="px-3 py-2 text-sm bg-muted hover:bg-muted/80 rounded-md cursor-pointer transition-colors ml-2"
                                title="Reset zoom"
                            >
                                100%
                            </button>
                        </div>
                    )}

                    <p>{endDate.toLocaleDateString()}</p>
                </div>

                <div className="overflow-x-auto h-[520px] p-2 select-none">
                    {lanes.map((lane, laneIndex) => (
                        <div key={laneIndex} className="border-b" style={{ width: Math.max(1400 * zoomLevel, 1400) }}>
                            <div className={cn("relative p-10 w-full")}>
                                {lane.map((item) => {
                                    const { left, width } = calculateItemPosition(item, Math.max(containerWidth * zoomLevel, 900));

                                    return (
                                        <div
                                            key={item.id}
                                            className={cn(
                                                "absolute text-sm flex items-center justify-start shadow-sm border border-border",
                                                "px-2 py-1 transition-all duration-200 whitespace-nowrap rounded-md",
                                                "top-2 z-[2] h-[55px]",
                                                laneColors[laneIndex % laneColors.length],
                                                editable ? "cursor-pointer hover:shadow-lg hover:scale-105" : "cursor-default",
                                                editingItem === item.id ? "ring-2 ring-primary shadow-lg scale-105" : ""
                                            )}
                                            style={{
                                                left: left,
                                                width: width,
                                            }}
                                            title={`${item.name} (${item.start} - ${item.end})${editable ? ' - Duplo clique para editar' : ''}`}
                                            onDoubleClick={() => handleItemDoubleClick(item as T)}
                                        >
                                            {editingItem === item.id ? (
                                                <input
                                                    type="text"
                                                    value={editValue}
                                                    onChange={(e) => setEditValue(e.target.value)}
                                                    onBlur={() => handleEditSubmit(item as T)}
                                                    onKeyDown={(e) => handleKeyDown(e, item as T)}
                                                    className="bg-transparent border-none outline-none w-full text-foreground font-medium"
                                                    autoFocus
                                                />
                                            ) : (
                                                <span className="truncate select-none">{item.name}</span>
                                            )}
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