'use client';

import { useAppStore } from '@/store/appStore';
import AgentCard from './AgentCard';

export default function AgentList() {
  const { filteredAgents, selectedAgent, setSelectedAgent } = useAppStore();

  if (filteredAgents.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <div className="text-center">
          <svg className="mx-auto w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="text-lg font-medium">No agents found</p>
          <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div className="text-sm text-gray-600 mb-4">
        {filteredAgents.length} agent{filteredAgents.length !== 1 ? 's' : ''} found
      </div>
      {filteredAgents.map((agent) => (
        <AgentCard
          key={agent.id}
          agent={agent}
          isSelected={selectedAgent?.id === agent.id}
          onClick={() => setSelectedAgent(agent)}
        />
      ))}
    </div>
  );
}
