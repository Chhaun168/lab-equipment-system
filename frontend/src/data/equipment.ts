// frontend/src/data/equipment.ts
import type { Equipment, LoanRequest } from '../types';

export const INITIAL_EQUIPMENT: Equipment[] = [
  {
    id: 1,
    name: 'Arduino Uno Rev3 Kit',
    category: 'Microcontrollers',
    totalQuantity: 10,
    availableQuantity: 5,
    description: 'ATmega328P microcontroller board with USB cable and sensor starter pack.',
    location: 'Shelf A-1',
    image: 'arduino.jpg',
    status: 'AVAILABLE'
  },
  {
    id: 2,
    name: 'Digital Multimeter (Model DM-2)',
    category: 'Tools & Measurement',
    totalQuantity: 8,
    availableQuantity: 2,
    description: 'Auto-ranging digital multimeter for measuring voltage, current, and resistance.',
    location: 'Shelf B-3',
    image: 'multimeter.jpg',
    status: 'AVAILABLE'
  },
  {
    id: 3,
    name: 'Raspberry Pi 4 (4GB)',
    category: 'Microcontrollers',
    totalQuantity: 4,
    availableQuantity: 0,
    description: 'Quad-core ARM Cortex-A72 single-board computer for IoT development.',
    location: 'Shelf A-2',
    image: 'rpi4.jpg',
    status: 'FULL'
  },
  {
    id: 4,
    name: 'Digital Oscilloscope 50MHz',
    category: 'Tools & Measurement',
    totalQuantity: 3,
    availableQuantity: 3,
    description: 'Dual-channel digital storage oscilloscope for signal waveform analysis.',
    location: 'Bench C-1',
    image: 'oscilloscope.jpg',
    status: 'AVAILABLE'
  },
  {
    id: 5,
    name: 'DC Bench Power Supply',
    category: 'Power Supplies',
    totalQuantity: 5,
    availableQuantity: 4,
    description: 'Variable single-output DC regulated power supply (0-30V, 0-5A).',
    location: 'Bench C-3',
    image: 'powersupply.jpg',
    status: 'AVAILABLE'
  }
];

export const INITIAL_LOANS: LoanRequest[] = [
  {
    id: 101,
    equipmentId: 2,
    equipmentName: 'Digital Multimeter (Model DM-2)',
    studentName: 'Sok Dara',
    studentEmail: 'sok.dara@student.edu',
    startDate: '2026-10-14',
    endDate: '2026-10-21',
    quantity: 1,
    reason: 'Circuit analysis lab experiment',
    status: 'PENDING',
    createdAt: '2026-10-14T08:30:00Z'
  },
  {
    id: 102,
    equipmentId: 1,
    equipmentName: 'Arduino Uno Rev3 Kit',
    studentName: 'Chan Vanny',
    studentEmail: 'chan.vanny@student.edu',
    startDate: '2026-10-14',
    endDate: '2026-10-21',
    quantity: 2,
    reason: 'Embedded systems project assignment',
    status: 'PENDING',
    createdAt: '2026-10-14T09:15:00Z'
  }
];