export default interface PacienteInterface {
  id: string;
  state: string;
  sensor: {
    temperature: string;
    respiratoryRate: string;
    heartRate: string;
    bloodOxygenation: string;
    arterialPressure: string;
  };
}
