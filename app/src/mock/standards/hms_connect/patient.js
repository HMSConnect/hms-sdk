export default function MockSFHIRPatient(){
    return {
        "resourceType": "Patient",
        "hn": "15-99-999999",
        "identifier": [
            {
                "type": "MRN",
                "value": "15-99-999999",
                "start": "2013-09-30T21:29:04",
                "end": ""
            },
            {
                "type": "NID",
                "value": "3219999999999",
                "start": "2013-09-30T00:00:00",
                "end": "2020-09-18T00:00:00"
            }
        ],
        "active": true,
        "name": [
            {
                "text": "นาง มานะ มานี",
                "prefix": "นาง",
                "givenName": "มานะ",
                "middleName": "",
                "familyName": "มานี",
                "language": "TH"
            },
            {
                "text": "miss mana manee",
                "prefix": "miss",
                "givenName": "mana",
                "middleName": "",
                "familyName": "manee",
                "language": "EN"
            }
        ],
        "telecom": [
            {
                "type": "mobile",
                "value": "0899999999"
            }
        ],
        "gender": "female",
        "birthDate": "1967-08-15",
        "deceasedBoolean": false,
        "deceasedDateTime": "",
        "address": [
            {
                "text": "9999/9   ถ.ราษฎร์บำรุง เนินพระ เมืองระยอง ระยอง 21000",
                "line": "9999/9   ถ.ราษฎร์บำรุง",
                "city": "เนินพระ",
                "district": "เมืองระยอง",
                "state": "ระยอง",
                "postalCode": "21000",
                "country": "THA"
            }
        ],
        "maritalStatus": "single",
        "nationality": "TH",
        "religion": "พุทธ (BUDDHISM)",
        "contact": [
            {
                "relationship": "",
                "type": "",
                "value": ""
            }
        ],
        "communication": [
            {
                "language": "TH",
                "preferred": true
            }
        ],
        "vip": {
            "type": "",
            "display": ""
        },
        "organization": {
            "codeNumber": "015",
            "codeName": "BRH",
            "name": "Bangkok Hospital Rayong",
            "latitude": "",
            "longitude": ""
        }
    }
}