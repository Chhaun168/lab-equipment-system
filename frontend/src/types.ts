// src/types.ts

export type Category = 'Microcontrollers' | 'Sensors & Modules' | 'Tools & Measurement' | 'Power Supplies' | 'Accessories';

export interface Equipment {
  id: number;
  name: string;
  category: Category;
  totalQuantity: number;
  availableQuantity: number;
  description: string;
  location: string;
  image: string;
  status: 'AVAILABLE' | 'LOW_STOCK' | 'FULL';
}

export type LoanStatus = 'PENDING' | 'APPROVED' | 'ACTIVE' | 'RETURNED' | 'REJECTED';

export interface LoanRequest {
  id: number;
  equipmentId: number;
  equipmentName?: string;
  studentName: string;
  studentEmail: string;
  startDate: string;
  endDate: string;
  quantity: number;
  reason: string;
  status: LoanStatus;
  createdAt: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'organiser';
}