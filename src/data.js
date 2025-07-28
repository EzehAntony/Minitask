export const mockData = {
  name: "John Doe",
  date: new Date().toLocaleDateString(),
  time: new Date().toLocaleTimeString(),
  scanId: "SCAN-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
  status: "LOCKED_IN",
};

export const sovereigntyOath = {
  title: "Speak the Sovereignty Oath",
  content:
    "I hereby declare my sovereignty and acknowledge my rights as a free individual.",
};

export const scannerConfig = {
  scanDuration: 3000,
  eyeIcon: "👁️",
};
