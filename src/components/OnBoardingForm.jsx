import PropTypes from "prop-types";
import { SECTION } from "../constants/onBoarding";
import CarInformation from "./sections/CarInformation";
import ContactInformation from "./sections/ContactInformation";
import CurrentAddress from "./sections/CurrentAddress";
import DriverLicense from "./sections/DriverLicense";
import EmergencyContacts from "./sections/EmergencyContacts";
import ImmigrationInformation from "./sections/ImmigrationInformation";
import PersonalDetails from "./sections/PersonalDetails";
import Reference from "./sections/Reference";
function OnBoardingForm({ disabled, section }) {
  switch (section) {
    case SECTION.CAR_INFORMATION:
      return <CarInformation disabled={disabled} />;
    case SECTION.CONTACT_INFORMATION:
      return <ContactInformation disabled={disabled} />;
    case SECTION.CURRENT_ADDRESS:
      return <CurrentAddress disabled={disabled} />;
    case SECTION.DRIVER_LICENSE:
      return <DriverLicense disabled={disabled} />;
    case SECTION.PERSONAL_DETAILS:
      return <PersonalDetails disabled={disabled} />;
    case SECTION.EMERGENCY_CONTACTS:
      return <EmergencyContacts disabled={disabled} />;
    case SECTION.REFERENCE:
      return <Reference disabled={disabled} />;
    case SECTION.IMMIGRATION_INFORMATION:
      return <ImmigrationInformation disabled={disabled} />;
  }
}

OnBoardingForm.propTypes = {
  disabled: PropTypes.bool,
  section: PropTypes.oneOf(Object.values(SECTION)),
};

export default OnBoardingForm;
