import timelineItems from '@/lib/data/timelineItems';
import Timeline from './_components/Timeline';

export default function Home() {
  return <Timeline items={[...timelineItems]} />
}
