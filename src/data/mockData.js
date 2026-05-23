export const mockPatients = [
  {
    patientId: 1,
    patientName: "Aman",
    age: 22,
    diseases: ["Fever", "Cold"],
    assignedDoctor: 101, // Doctor ID
    assignedNurse: "Sister Mary",
    ward: "Ward-A",
    bedNo: 12,
    status: "Admitted", // Admitted, Discharged
    totalBill: 6500,
  }
];

export const mockDoctors = [
  {
    id: 101,
    name: "Dr. Sharma",
    department: "Cardiology",
    specialization: "Heart Specialist",
    isIntern: false,
  },
  {
    id: 102,
    name: "Rahul",
    department: "General",
    specialization: "Junior Doctor",
    isIntern: true,
    duration: 6, // months
  }
];

export const mockCases = [
  {
    caseId: 501,
    status: "Closed", // Open, Operational, Closed
    patientId: 1
  }
];
