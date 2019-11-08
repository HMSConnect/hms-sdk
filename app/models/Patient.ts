import SFHIRPatient from "../components/standards/smart_fhir/SFHIRPatient";

const SFHIRPatientObj = SFHIRPatient();

class Patient {
  static parse(json: any): Patient {
    //TODO: throws exception if fail
    SFHIRPatientObj.setData(json.data);
    return SFHIRPatientObj.compile() || {};
  }
}

export default Patient;
