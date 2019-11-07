import Patient from "../models/Patient";
import patientDataAdaptor from "../adapters/PatientDataAdapter";

class PatientService {
  async get(id: string): Promise<Patient> {
    const json = await patientDataAdaptor.get(id);
    return Patient.parse(json.data);
  }
}
export default PatientService;
