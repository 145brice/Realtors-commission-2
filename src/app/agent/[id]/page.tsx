import AgentDetailPage from '@/components/AgentDetailPage';

export default function AgentPage({ params }: { params: { id: string } }) {
  return <AgentDetailPage agentId={params.id} />;
}
