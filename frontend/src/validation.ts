// frontend/src/validation.ts
export function validateLoanRequest(form: {
  studentName: string;
  studentEmail: string;
  startDate: string;
  endDate: string;
  quantity: number;
  reason: string;
}, maxAvailable: number) {
  const errors: Record<string, string> = {};

  if (!form.studentName.trim()) {
    errors.studentName = 'Student name is required.';
  }

  if (!form.studentEmail.trim()) {
    errors.studentEmail = 'Student email is required.';
  } else if (!form.studentEmail.includes('@')) {
    errors.studentEmail = 'Please enter a valid email address.';
  }

  if (!form.startDate) {
    errors.startDate = 'Start date is required.';
  }

  if (!form.endDate) {
    errors.endDate = 'End date is required.';
  } else if (form.startDate && form.endDate < form.startDate) {
    errors.endDate = 'End date cannot be earlier than start date.';
  }

  if (!form.quantity || form.quantity < 1) {
    errors.quantity = 'Quantity must be at least 1.';
  } else if (form.quantity > maxAvailable) {
    errors.quantity = `Quantity cannot exceed available stock (${maxAvailable}).`;
  }

  if (!form.reason.trim()) {
    errors.reason = 'Reason for loan is required.';
  }

  return errors;
}