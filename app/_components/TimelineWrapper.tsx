'use client';

import { useState } from 'react';
import Timeline from './Timeline';
import timelineItems from '@/lib/data/timelineItems';
import { TimelineItem } from '@/lib/types';

export default function TimelineWrapper() {
    const [items, setItems] = useState<TimelineItem[]>([...timelineItems]);

    const handleItemUpdate = (updatedItem: TimelineItem) => {
        setItems(prev => 
            prev.map(item => 
                item.id === updatedItem.id ? updatedItem : item
            )
        );
    };

    return (
        <Timeline 
            items={items}
            editable={true}
            showZoomControls={true}
            onItemUpdate={handleItemUpdate}
        />
    );
}