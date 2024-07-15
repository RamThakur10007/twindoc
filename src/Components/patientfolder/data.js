 const data =
[
    {
      "id": 1,
      "name": "Dr. Suresh Joshi",
      "image": "assets/img/doctors/doctor-13.jpg",
      "speciality": "MBBS, Dentist",
      "location": "Andheri West - Mumbai, India",
      
      "gender": "Male",
      "availability": "Available Today",
      "reviews": [
        {
          "patientName": "patient1",
          "doctorId": {
            "$oid": "661a2d002e9968809252fbed"
          },
          "description": "good",
          "rating": 5,
          "_id": {
            "$oid": "6635f9309c2d01014e0ee8c3"
          }
        },
        {
          "patientName": "patient1",
          "doctorId": {
            "$oid": "661a2d002e9968809252fbed"
          },
          "description": "great experience",
          "rating": 4,
          "_id": {
            "$oid": "6635f94f9c2d01014e0ee8e7"
          }
        },
        {
          "patientName": "patient2",
          "doctorId": {
            "$oid": "661a2d002e9968809252fbed"
          },
          "description": "Dr. [Name] is an exceptional physician who demonstrates professionalism, expertise, and excellent communication skills. Their empathetic bedside manner made me feel valued and heard during appointments. Additionally, the doctor's accessibility and prompt response to my concerns further enhanced my experience. The office environment was clean and welcoming, and the staff were friendly and efficient. Overall, I highly recommend Dr. [Name] for their outstanding care and positive outcomes.",
          "rating": 3,
          "_id": {
            "$oid": "6635fa129c2d01014e0ee90d"
          }
        },
        {
          "patientName": "patient2",
          "doctorId": {
            "$oid": "661a2d002e9968809252fbed"
          },
          "description": "bad experience",
          "rating": 2,
          "_id": {
            "$oid": "6635fa289c2d01014e0ee933"
          }
        }
      ],
      "specialization": "Heart specialist",
      "yearOfExperience": 1,
      "fee": 1500
    },
    {
      "id": 2,
      "name": "Dr. Abhijit Dey",
      "image": "assets/img/doctors/doctor-14.jpg",
      "speciality": "BDS, MDS - Oral & Maxillofacial Surgery",
      "location": "Andheri West - Mumbai, India",
      
      "gender": "Male",
      "availability": "Available Tomorrow",
      "reviews": [
        {
          "patientName": "patient1",
          "doctorId": {
            "$oid": "661a2d002e9968809252fbed"
          },
          "description": "good",
          "rating": 4,
          "_id": {
            "$oid": "6635f9309c2d01014e0ee8c3"
          }
        },
        {
          "patientName": "patient1",
          "doctorId": {
            "$oid": "661a2d002e9968809252fbed"
          },
          "description": "great experience",
          "rating": 5,
          "_id": {
            "$oid": "6635f94f9c2d01014e0ee8e7"
          }
        },
        {
          "patientName": "patient2",
          "doctorId": {
            "$oid": "661a2d002e9968809252fbed"
          },
          "description": "Dr. [Name] is an exceptional physician who demonstrates professionalism, expertise, and excellent communication skills. Their empathetic bedside manner made me feel valued and heard during appointments. Additionally, the doctor's accessibility and prompt response to my concerns further enhanced my experience. The office environment was clean and welcoming, and the staff were friendly and efficient. Overall, I highly recommend Dr. [Name] for their outstanding care and positive outcomes.",
          "rating": 5,
          "_id": {
            "$oid": "6635fa129c2d01014e0ee90d"
          }
        },
        {
          "patientName": "patient2",
          "doctorId": {
            "$oid": "661a2d002e9968809252fbed"
          },
          "description": "bad experience",
          "rating": 2,
          "_id": {
            "$oid": "6635fa289c2d01014e0ee933"
          }
        }
      ],
      "specialization": "Heart specialist",
      "yearOfExperience": 2,
      "fee": 2800
    },
    {
      "id": 3,
      "name": "Dr. Sofia Brient",
      "image": "assets/img/doctors/doctor-15.jpg",
      "speciality": "MBBS, Dentist",
      "location": "Andheri West - Mumbai, India",
      
      "gender": "Female",
      "availability": "Available Today",
      "rating": 4.5,
      "specialization": "Heart specialist",
      "yearOfExperience": 3,
      "reviews": [
        {
          "patientName": "patient1",
          "doctorId": {
            "$oid": "661a2d002e9968809252fbed"
          },
          "description": "good",
          "rating": 5,
          "_id": {
            "$oid": "6635f9309c2d01014e0ee8c3"
          }
        },
        {
          "patientName": "patient1",
          "doctorId": {
            "$oid": "661a2d002e9968809252fbed"
          },
          "description": "great experience",
          "rating": 5,
          "_id": {
            "$oid": "6635f94f9c2d01014e0ee8e7"
          }
        },
        {
          "patientName": "patient2",
          "doctorId": {
            "$oid": "661a2d002e9968809252fbed"
          },
          "description": "Dr. [Name] is an exceptional physician who demonstrates professionalism, expertise, and excellent communication skills. Their empathetic bedside manner made me feel valued and heard during appointments. Additionally, the doctor's accessibility and prompt response to my concerns further enhanced my experience. The office environment was clean and welcoming, and the staff were friendly and efficient. Overall, I highly recommend Dr. [Name] for their outstanding care and positive outcomes.",
          "rating": 5,
          "_id": {
            "$oid": "6635fa129c2d01014e0ee90d"
          }
        },
        {
          "patientName": "patient2",
          "doctorId": {
            "$oid": "661a2d002e9968809252fbed"
          },
          "description": "bad experience",
          "rating": 5,
          "_id": {
            "$oid": "6635fa289c2d01014e0ee933"
          }
        }
      ],
      "fee": 1500
    },
    {
      "id": 4,
      "name": "Dr. Johny Rita",
      "image": "assets/img/doctors/doctor-16.jpg",
      "speciality": "MBBS, Dentist",
      "location": "Andheri West - Mumbai, India",
     
      "gender": "Male",
      "availability": "Available Today",
      "rating": 4.5,
      "specialization": "Heart specialist",
      "yearOfExperience": 7,
      "reviews": [
        {
          "patientName": "patient1",
          "doctorId": {
            "$oid": "661a2d002e9968809252fbed"
          },
          "description": "good",
          "rating": 4,
          "_id": {
            "$oid": "6635f9309c2d01014e0ee8c3"
          }
        },
        {
          "patientName": "patient1",
          "doctorId": {
            "$oid": "661a2d002e9968809252fbed"
          },
          "description": "great experience",
          "rating": 4,
          "_id": {
            "$oid": "6635f94f9c2d01014e0ee8e7"
          }
        },
        {
          "patientName": "patient2",
          "doctorId": {
            "$oid": "661a2d002e9968809252fbed"
          },
          "description": "Dr. [Name] is an exceptional physician who demonstrates professionalism, expertise, and excellent communication skills. Their empathetic bedside manner made me feel valued and heard during appointments. Additionally, the doctor's accessibility and prompt response to my concerns further enhanced my experience. The office environment was clean and welcoming, and the staff were friendly and efficient. Overall, I highly recommend Dr. [Name] for their outstanding care and positive outcomes.",
          "rating": 4,
          "_id": {
            "$oid": "6635fa129c2d01014e0ee90d"
          }
        },
        {
          "patientName": "patient2",
          "doctorId": {
            "$oid": "661a2d002e9968809252fbed"
          },
          "description": "bad experience",
          "rating": 4,
          "_id": {
            "$oid": "6635fa289c2d01014e0ee933"
          }
        }
      ],
      "fee": 1500
    },
    {
      "id": 5,
      "name": "Dr. Deborai Angel",
      "image": "assets/img/doctors/doctor-17.jpg",
      "speciality": "MBBS, Dentist",
      "location": "Andheri West - Mumbai, India",
      
      "gender": "Female",
      "availability": "Available Today",
      "rating": 4.5,
      "specialization": "Heart specialist",
      "yearOfExperience": 8,
      "reviews": [
        {
          "patientName": "patient1",
          "doctorId": {
            "$oid": "661a2d002e9968809252fbed"
          },
          "description": "good",
          "rating": 3,
          "_id": {
            "$oid": "6635f9309c2d01014e0ee8c3"
          }
        },
        {
          "patientName": "patient1",
          "doctorId": {
            "$oid": "661a2d002e9968809252fbed"
          },
          "description": "great experience",
          "rating": 3,
          "_id": {
            "$oid": "6635f94f9c2d01014e0ee8e7"
          }
        },
        {
          "patientName": "patient2",
          "doctorId": {
            "$oid": "661a2d002e9968809252fbed"
          },
          "description": "Dr. [Name] is an exceptional physician who demonstrates professionalism, expertise, and excellent communication skills. Their empathetic bedside manner made me feel valued and heard during appointments. Additionally, the doctor's accessibility and prompt response to my concerns further enhanced my experience. The office environment was clean and welcoming, and the staff were friendly and efficient. Overall, I highly recommend Dr. [Name] for their outstanding care and positive outcomes.",
          "rating": 3,
          "_id": {
            "$oid": "6635fa129c2d01014e0ee90d"
          }
        },
        {
          "patientName": "patient2",
          "doctorId": {
            "$oid": "661a2d002e9968809252fbed"
          },
          "description": "bad experience",
          "rating": 3,
          "_id": {
            "$oid": "6635fa289c2d01014e0ee933"
          }
        }
      ],
      "fee": 1500
    },
    {
      "id": 6,
      "name": "Dr. Shree Ram",
      "image": "assets/img/doctors/doctor-17.jpg",
      "speciality": "MBBS, Dentist",
      "location": "Andheri West - Mumbai, India",
      "gender": "Male",
      "availability": "Available Today",
      "rating": 4.5,
      "specialization": "Heart specialist",
      "yearOfExperience": 9,
      "reviews": [
        {
          "patientName": "patient1",
          "doctorId": {
            "$oid": "661a2d002e9968809252fbed"
          },
          "description": "good",
          "rating": 2,
          "_id": {
            "$oid": "6635f9309c2d01014e0ee8c3"
          }
        },
        {
          "patientName": "patient1",
          "doctorId": {
            "$oid": "661a2d002e9968809252fbed"
          },
          "description": "great experience",
          "rating": 2,
          "_id": {
            "$oid": "6635f94f9c2d01014e0ee8e7"
          }
        },
        {
          "patientName": "patient2",
          "doctorId": {
            "$oid": "661a2d002e9968809252fbed"
          },
          "description": "Dr. [Name] is an exceptional physician who demonstrates professionalism, expertise, and excellent communication skills. Their empathetic bedside manner made me feel valued and heard during appointments. Additionally, the doctor's accessibility and prompt response to my concerns further enhanced my experience. The office environment was clean and welcoming, and the staff were friendly and efficient. Overall, I highly recommend Dr. [Name] for their outstanding care and positive outcomes.",
          "rating": 2,
          "_id": {
            "$oid": "6635fa129c2d01014e0ee90d"
          }
        },
        {
          "patientName": "patient2",
          "doctorId": {
            "$oid": "661a2d002e9968809252fbed"
          },
          "description": "bad experience",
          "rating": 2,
          "_id": {
            "$oid": "6635fa289c2d01014e0ee933"
          }
        }
      ],
      "fee": 1500
    }
  ]
  
export default data;