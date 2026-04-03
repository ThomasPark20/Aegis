<script setup>
import { ref } from 'vue'
import { VueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import '@vue-flow/controls/dist/style.css'

const selectedNode = ref(null)

const nodes = ref([
  {
    id: 'channels',
    type: 'default',
    position: { x: 300, y: 0 },
    data: { label: 'Discord / Telegram' },
    style: {
      background: '#f5f5f5', border: '2px solid #333', borderRadius: '8px',
      padding: '12px 24px', fontWeight: '600', fontSize: '14px',
    },
  },
  {
    id: 'host',
    type: 'default',
    position: { x: 175, y: 100 },
    data: { label: 'AEGIS Host Process' },
    style: {
      background: '#000', color: '#fff', border: 'none', borderRadius: '8px',
      padding: '12px 24px', fontWeight: '700', fontSize: '14px', width: '380px',
      textAlign: 'center',
    },
  },
  {
    id: 'router',
    type: 'default',
    position: { x: 100, y: 180 },
    data: { label: 'Message Router' },
    style: {
      background: '#fafafa', border: '1px solid #ddd', borderRadius: '6px',
      padding: '8px 16px', fontSize: '12px',
    },
  },
  {
    id: 'queue',
    type: 'default',
    position: { x: 290, y: 180 },
    data: { label: 'Group Queue' },
    style: {
      background: '#fafafa', border: '1px solid #ddd', borderRadius: '6px',
      padding: '8px 16px', fontSize: '12px',
    },
  },
  {
    id: 'scheduler',
    type: 'default',
    position: { x: 100, y: 240 },
    data: { label: 'Task Scheduler' },
    style: {
      background: '#fafafa', border: '1px solid #ddd', borderRadius: '6px',
      padding: '8px 16px', fontSize: '12px',
    },
  },
  {
    id: 'ipc',
    type: 'default',
    position: { x: 290, y: 240 },
    data: { label: 'IPC Watcher' },
    style: {
      background: '#fafafa', border: '1px solid #ddd', borderRadius: '6px',
      padding: '8px 16px', fontSize: '12px',
    },
  },
  {
    id: 'main',
    type: 'default',
    position: { x: 0, y: 360 },
    data: { label: 'Main Agent' },
    style: {
      background: '#fff', border: '2px solid #333', borderRadius: '8px',
      padding: '12px 20px', fontWeight: '600', fontSize: '13px', width: '180px',
      textAlign: 'center',
    },
  },
  {
    id: 'main-detail',
    type: 'default',
    position: { x: 0, y: 410 },
    data: { label: 'Claude Code + sigma-cli + yarac + snort\nIPC: send_message, send_file, schedule_task, start_research_thread' },
    style: {
      background: '#fafafa', border: '1px dashed #ccc', borderRadius: '6px',
      padding: '8px 12px', fontSize: '10px', width: '180px', whiteSpace: 'pre-wrap',
      color: '#666', lineHeight: '1.4',
    },
  },
  {
    id: 'chat',
    type: 'default',
    position: { x: 220, y: 360 },
    data: { label: 'Thread-Chat Agent' },
    style: {
      background: '#fff', border: '2px solid #333', borderRadius: '8px',
      padding: '12px 20px', fontWeight: '600', fontSize: '13px', width: '180px',
      textAlign: 'center',
    },
  },
  {
    id: 'chat-detail',
    type: 'default',
    position: { x: 220, y: 410 },
    data: { label: 'Lightweight — answers Q&A\nWrites to requirements.md\nReads research workspace\nExits after one response' },
    style: {
      background: '#fafafa', border: '1px dashed #ccc', borderRadius: '6px',
      padding: '8px 12px', fontSize: '10px', width: '180px', whiteSpace: 'pre-wrap',
      color: '#666', lineHeight: '1.4',
    },
  },
  {
    id: 'research',
    type: 'default',
    position: { x: 440, y: 360 },
    data: { label: 'Research Agent' },
    style: {
      background: '#fff', border: '2px solid #333', borderRadius: '8px',
      padding: '12px 20px', fontWeight: '600', fontSize: '13px', width: '200px',
      textAlign: 'center',
    },
  },
  {
    id: 'research-detail',
    type: 'default',
    position: { x: 440, y: 410 },
    data: { label: 'Claude Code + sigma-cli + yarac + snort\nIPC: send_message, send_file, schedule_task\nChecks requirements.md before delivery' },
    style: {
      background: '#fafafa', border: '1px dashed #ccc', borderRadius: '6px',
      padding: '8px 12px', fontSize: '10px', width: '200px', whiteSpace: 'pre-wrap',
      color: '#666', lineHeight: '1.4',
    },
  },
])

const edges = ref([
  { id: 'e-channels-host', source: 'channels', target: 'host', animated: true, style: { stroke: '#333' } },
  { id: 'e-router-queue', source: 'router', target: 'queue', style: { stroke: '#999' }, label: '' },
  { id: 'e-scheduler-queue', source: 'scheduler', target: 'queue', style: { stroke: '#999' } },
  { id: 'e-ipc-channels', source: 'ipc', target: 'channels', style: { stroke: '#999', strokeDasharray: '5,5' }, label: 'outbound' },
  { id: 'e-queue-main', source: 'queue', target: 'main', animated: true, style: { stroke: '#333' } },
  { id: 'e-queue-chat', source: 'queue', target: 'chat', animated: true, style: { stroke: '#333' } },
  { id: 'e-queue-research', source: 'queue', target: 'research', animated: true, style: { stroke: '#333' } },
  {
    id: 'e-chat-research', source: 'chat', target: 'research',
    style: { stroke: '#e44', strokeDasharray: '5,5', strokeWidth: 2 },
    label: 'requirements.md', labelStyle: { fontSize: '11px', fontWeight: '600', fill: '#e44' },
  },
])

const nodeDetails = {
  main: {
    title: 'Main Agent Container',
    items: [
      'Handles messages in the main Discord/Telegram channel',
      'Dispatches research via start_research_thread IPC',
      'Full tooling: sigma-cli, yarac, snort',
      'Mounts: project (RO), group (RW), global (RO), IPC (RW)',
    ],
  },
  chat: {
    title: 'Thread-Chat Agent Container',
    items: [
      'Spawns when user sends a follow-up in a research thread',
      'Responds in seconds — answers questions or adds requirements',
      'Writes to requirements.md in shared research folder',
      'Exits after first response to free the slot',
      'Mounts: own group (RW), research folder (RW), global (RO)',
    ],
  },
  research: {
    title: 'Research Agent Container',
    items: [
      'Deep investigation: web search, IOC extraction, TTP mapping',
      'Generates and validates Sigma, YARA, Snort rules',
      'Checks requirements.md before delivering final report',
      'All requirements must be addressed before delivery',
      'Mounts: group (RW), global (RO), IPC (RW)',
    ],
  },
}

function onNodeClick(event) {
  const id = event.node.id
  if (nodeDetails[id]) {
    selectedNode.value = nodeDetails[id]
  } else {
    selectedNode.value = null
  }
}
</script>

<template>
  <div style="width: 100%; height: 560px; border: 1px solid var(--vp-c-divider); border-radius: 8px; overflow: hidden; position: relative;">
    <VueFlow
      :nodes="nodes"
      :edges="edges"
      :default-viewport="{ x: 20, y: 10, zoom: 0.9 }"
      :nodes-draggable="true"
      :zoom-on-scroll="true"
      :pan-on-drag="true"
      fit-view-on-init
      @node-click="onNodeClick"
    >
      <Background />
      <Controls position="bottom-right" />
    </VueFlow>
    <transition name="fade">
      <div
        v-if="selectedNode"
        style="position: absolute; top: 12px; right: 12px; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); border-radius: 8px; padding: 16px; max-width: 280px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); z-index: 10;"
      >
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <strong style="font-size: 13px;">{{ selectedNode.title }}</strong>
          <button @click="selectedNode = null" style="background: none; border: none; cursor: pointer; font-size: 16px; color: var(--vp-c-text-3);">&times;</button>
        </div>
        <ul style="margin: 0; padding-left: 16px; font-size: 12px; color: var(--vp-c-text-2); line-height: 1.6;">
          <li v-for="item in selectedNode.items" :key="item">{{ item }}</li>
        </ul>
      </div>
    </transition>
  </div>
  <p style="font-size: 12px; color: var(--vp-c-text-3); margin-top: 8px; text-align: center;">
    Click a container node for details. Drag to rearrange. Scroll to zoom.
  </p>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
