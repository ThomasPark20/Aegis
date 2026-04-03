<script setup>
import { ref } from 'vue'
import { VueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import '@vue-flow/controls/dist/style.css'

const nodes = ref([
  {
    id: 'user-msg',
    position: { x: 0, y: 0 },
    data: { label: '1. User: "Research Lazarus Group"' },
    style: {
      background: '#f0f0f0', border: '2px solid #333', borderRadius: '20px',
      padding: '10px 20px', fontWeight: '600', fontSize: '12px', width: '260px',
    },
  },
  {
    id: 'main-agent',
    position: { x: 0, y: 80 },
    data: { label: '2. Main Agent acknowledges' },
    style: {
      background: '#fff', border: '1px solid #ccc', borderRadius: '8px',
      padding: '10px 16px', fontSize: '12px', width: '260px',
    },
  },
  {
    id: 'create-thread',
    position: { x: 0, y: 160 },
    data: { label: '3. Host creates Discord thread + seeds requirements.md' },
    style: {
      background: '#000', color: '#fff', border: 'none', borderRadius: '8px',
      padding: '10px 16px', fontSize: '12px', width: '260px', fontWeight: '500',
    },
  },
  {
    id: 'research-start',
    position: { x: 0, y: 250 },
    data: { label: '4. Research Agent spawns — deep investigation begins' },
    style: {
      background: '#fff', border: '2px solid #333', borderRadius: '8px',
      padding: '10px 16px', fontSize: '12px', width: '260px', fontWeight: '500',
    },
  },
  {
    id: 'user-followup',
    position: { x: 340, y: 250 },
    data: { label: '5. User: "Include FBI most wanted members"' },
    style: {
      background: '#f0f0f0', border: '2px solid #333', borderRadius: '20px',
      padding: '10px 20px', fontWeight: '600', fontSize: '12px', width: '260px',
    },
  },
  {
    id: 'chat-spawns',
    position: { x: 340, y: 340 },
    data: { label: '6. Chat Agent responds instantly' },
    style: {
      background: '#fff', border: '2px solid #e44', borderRadius: '8px',
      padding: '10px 16px', fontSize: '12px', width: '260px', fontWeight: '500',
      color: '#c33',
    },
  },
  {
    id: 'requirements',
    position: { x: 170, y: 430 },
    data: { label: '7. requirements.md updated\n- [ ] Include FBI most wanted members' },
    style: {
      background: '#fff8f8', border: '2px dashed #e44', borderRadius: '8px',
      padding: '10px 16px', fontSize: '12px', width: '280px', whiteSpace: 'pre-wrap',
      fontFamily: 'monospace',
    },
  },
  {
    id: 'validate',
    position: { x: 0, y: 520 },
    data: { label: '8. Research Agent checks requirements before delivery' },
    style: {
      background: '#fff', border: '2px solid #333', borderRadius: '8px',
      padding: '10px 16px', fontSize: '12px', width: '260px', fontWeight: '500',
    },
  },
  {
    id: 'deliver',
    position: { x: 0, y: 610 },
    data: { label: '9. Report delivered (.md file) — all requirements satisfied' },
    style: {
      background: '#f0fff0', border: '2px solid #393', borderRadius: '8px',
      padding: '10px 16px', fontSize: '12px', width: '260px', fontWeight: '600',
    },
  },
  {
    id: 'expire',
    position: { x: 340, y: 610 },
    data: { label: '10 min idle → soft-expire\nMessage to reactivate' },
    style: {
      background: '#fafafa', border: '1px dashed #999', borderRadius: '8px',
      padding: '10px 16px', fontSize: '11px', width: '220px', whiteSpace: 'pre-wrap',
      color: '#666', textAlign: 'center',
    },
  },
])

const edges = ref([
  { id: 'e1', source: 'user-msg', target: 'main-agent', animated: true, style: { stroke: '#333' } },
  { id: 'e2', source: 'main-agent', target: 'create-thread', style: { stroke: '#333' }, label: 'IPC: start_research_thread' },
  { id: 'e3', source: 'create-thread', target: 'research-start', animated: true, style: { stroke: '#333' } },
  { id: 'e4', source: 'user-followup', target: 'chat-spawns', animated: true, style: { stroke: '#e44' } },
  { id: 'e5', source: 'chat-spawns', target: 'requirements', style: { stroke: '#e44', strokeDasharray: '5,5' }, label: 'writes' },
  { id: 'e6', source: 'requirements', target: 'validate', style: { stroke: '#e44', strokeDasharray: '5,5' }, label: 'reads' },
  { id: 'e7', source: 'research-start', target: 'validate', style: { stroke: '#333' }, label: 'continues research...' },
  { id: 'e8', source: 'validate', target: 'deliver', animated: true, style: { stroke: '#393' } },
  { id: 'e9', source: 'deliver', target: 'expire', style: { stroke: '#999', strokeDasharray: '5,5' } },
])
</script>

<template>
  <div style="width: 100%; height: 700px; border: 1px solid var(--vp-c-divider); border-radius: 8px; overflow: hidden;">
    <VueFlow
      :nodes="nodes"
      :edges="edges"
      :default-viewport="{ x: 20, y: 10, zoom: 0.85 }"
      :nodes-draggable="true"
      :zoom-on-scroll="true"
      :pan-on-drag="true"
      fit-view-on-init
    >
      <Background />
      <Controls position="bottom-right" />
    </VueFlow>
  </div>
  <p style="font-size: 12px; color: var(--vp-c-text-3); margin-top: 8px; text-align: center;">
    Drag to rearrange. Scroll to zoom. Red path shows the requirements flow.
  </p>
</template>
