import PatientService from "./PatientService";

class HmsService {
  patient: PatientService;
  constructor(patientService: PatientService) {
    this.patient = patientService;
  }
}

const hmsService = new HmsService(new PatientService());

export default hmsService;
