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
      background: '#1E1E1E', border: '2px solid #888', borderRadius: '24px', color: '#E8E8E8',
      padding: '14px 28px', fontWeight: '600', fontSize: '13px', width: '300px',
      textAlign: 'center',
    },
  },
  {
    id: 'main-agent',
    position: { x: 0, y: 110 },
    data: { label: '2. Main Agent acknowledges and dispatches' },
    style: {
      background: '#1E1E1E', border: '1px solid #555', borderRadius: '10px',
      padding: '14px 20px', fontSize: '13px', width: '300px', textAlign: 'center',
      color: '#E8E8E8',
    },
  },
  {
    id: 'create-thread',
    position: { x: 0, y: 220 },
    data: { label: '3. Host creates Discord thread\n    + seeds requirements.md' },
    style: {
      background: '#2A2A2A', color: '#FFFFFF', border: '2px solid #555', borderRadius: '10px',
      padding: '14px 20px', fontSize: '13px', width: '300px', fontWeight: '500',
      whiteSpace: 'pre-wrap', textAlign: 'center',
    },
  },
  {
    id: 'research-start',
    position: { x: 0, y: 350 },
    data: { label: '4. Research Agent spawns\n    Deep investigation begins' },
    style: {
      background: '#1E1E1E', border: '2px solid #888', borderRadius: '10px',
      padding: '14px 20px', fontSize: '13px', width: '300px', fontWeight: '500',
      whiteSpace: 'pre-wrap', textAlign: 'center', color: '#E8E8E8',
    },
  },
  {
    id: 'user-followup',
    position: { x: 440, y: 350 },
    data: { label: '5. User follow-up:\n    "Include FBI most wanted members"' },
    style: {
      background: '#1E1E1E', border: '2px solid #888', borderRadius: '24px', color: '#E8E8E8',
      padding: '14px 28px', fontWeight: '600', fontSize: '13px', width: '310px',
      whiteSpace: 'pre-wrap', textAlign: 'center',
    },
  },
  {
    id: 'chat-spawns',
    position: { x: 440, y: 480 },
    data: { label: '6. Chat Agent responds instantly\n    "Got it — added to requirements"' },
    style: {
      background: '#1E1E1E', border: '2px solid #e44', borderRadius: '10px',
      padding: '14px 20px', fontSize: '13px', width: '310px', fontWeight: '500',
      color: '#E84040', whiteSpace: 'pre-wrap', textAlign: 'center',
    },
  },
  {
    id: 'requirements',
    position: { x: 200, y: 610 },
    data: { label: '7. requirements.md updated\n\n   - [ ] Include FBI most wanted members' },
    style: {
      background: '#2A1515', border: '2px dashed #e44', borderRadius: '10px',
      padding: '16px 20px', fontSize: '13px', width: '340px', whiteSpace: 'pre-wrap',
      fontFamily: 'var(--vp-font-family-mono), monospace', textAlign: 'center',
      color: '#E8E8E8',
    },
  },
  {
    id: 'validate',
    position: { x: 0, y: 750 },
    data: { label: '8. Research Agent checks requirements\n    before delivering report' },
    style: {
      background: '#1E1E1E', border: '2px solid #888', borderRadius: '10px',
      padding: '14px 20px', fontSize: '13px', width: '300px', fontWeight: '500',
      whiteSpace: 'pre-wrap', textAlign: 'center', color: '#E8E8E8',
    },
  },
  {
    id: 'deliver',
    position: { x: 0, y: 880 },
    data: { label: '9. Report delivered (.md file)\n    All requirements satisfied' },
    style: {
      background: '#152A18', border: '2px solid #393', borderRadius: '10px',
      padding: '14px 20px', fontSize: '13px', width: '300px', fontWeight: '600',
      whiteSpace: 'pre-wrap', textAlign: 'center', color: '#E8E8E8',
    },
  },
  {
    id: 'expire',
    position: { x: 440, y: 880 },
    data: { label: '10 min idle → soft-expire\nMessage to reactivate with full context' },
    style: {
      background: '#141414', border: '1px dashed #888', borderRadius: '10px',
      padding: '14px 20px', fontSize: '12px', width: '280px', whiteSpace: 'pre-wrap',
      color: '#A0A0A0', textAlign: 'center',
    },
  },
])

const edges = ref([
  { id: 'e1', source: 'user-msg', target: 'main-agent', animated: true, style: { stroke: '#A0A0A0', strokeWidth: 2 } },
  {
    id: 'e2', source: 'main-agent', target: 'create-thread', style: { stroke: '#A0A0A0', strokeWidth: 2 },
    label: 'IPC: start_research_thread', labelStyle: { fontSize: '11px', fill: '#A0A0A0' },
  },
  { id: 'e3', source: 'create-thread', target: 'research-start', animated: true, style: { stroke: '#A0A0A0', strokeWidth: 2 } },
  { id: 'e4', source: 'user-followup', target: 'chat-spawns', animated: true, style: { stroke: '#e44', strokeWidth: 2 } },
  {
    id: 'e5', source: 'chat-spawns', target: 'requirements', style: { stroke: '#e44', strokeDasharray: '6,4', strokeWidth: 2 },
    label: 'writes', labelStyle: { fontSize: '11px', fontWeight: '600', fill: '#e44' },
  },
  {
    id: 'e6', source: 'requirements', target: 'validate', style: { stroke: '#e44', strokeDasharray: '6,4', strokeWidth: 2 },
    label: 'reads', labelStyle: { fontSize: '11px', fontWeight: '600', fill: '#e44' },
  },
  {
    id: 'e7', source: 'research-start', target: 'validate', style: { stroke: '#A0A0A0', strokeWidth: 2 },
    label: 'continues research...', labelStyle: { fontSize: '11px', fill: '#A0A0A0' },
  },
  { id: 'e8', source: 'validate', target: 'deliver', animated: true, style: { stroke: '#393', strokeWidth: 2 } },
  { id: 'e9', source: 'deliver', target: 'expire', style: { stroke: '#888', strokeDasharray: '6,4' } },
])
</script>

<template>
  <div style="width: 100%; height: 820px; border: 1px solid var(--vp-c-divider); border-radius: 8px; overflow: hidden;">
    <VueFlow
      :nodes="nodes"
      :edges="edges"
      :nodes-draggable="true"
      :zoom-on-scroll="true"
      :pan-on-drag="true"
      :fit-view-on-init="true"
      :max-zoom="1.5"
      :min-zoom="0.3"
    >
      <Background />
      <Controls position="bottom-right" />
    </VueFlow>
  </div>
  <p style="font-size: 12px; color: var(--vp-c-text-3); margin-top: 8px; text-align: center;">
    Drag to rearrange. Scroll to zoom. Red path shows the requirements flow.
  </p>
</template>
