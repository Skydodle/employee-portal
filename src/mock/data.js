import EmergencyContacts from "../components/EmergencyContacts";

 const profile = {
    firstName: "Gavin",
    middleName:"Alexander",
    lastName: "Ye",
    emailAddress:"gavinjiadaye@gmail.com",
    phoneNumber:"1234567890",
    workPhoneNumber:"0987654321",
    streetName:"1234 Wall Street",
    unit: "apt 123",
    city:"New York",
    state: "NY",
    zipCode:"11110",
    isUsCitizenOrResident:"no",
    usCitizenshipStatus:"green card",
    workAuthorization:"other",
    visaType:"other",
    emergencyContacts:[{firstName:"Johnny",middleName:"Martin",lastName:"Wu",emailAddress:"skydodle@gmail.com", relationship:"teammate", phoneNumber:"1222367890",}],
    haveDriverLicense:"yes",
    driverLicense:{
        driverLicenseNumber:"12344",
        expirationDate:"2025-02-22",
    },
    car:{
        make:"Toyota",
        model:"Camry", 
        color:"black"
    },
    reference:{firstName:"Johnny",middleName:"Martin",lastName:"Wu",emailAddress:"skydodle@gmail.com", relationship:"teammate", phoneNumber:"1222367890"},
};
export default profile;