export type TimelineItem = {
  id: number;
  start: string;
  end: string;
  name: string;
};

export type Lane = TimelineItem[];

export interface TimelineProps<T>{
  items: T[];
  onItemUpdate?: (updatedItem: T) => void;
  editable?: boolean;
}