import PropTypes from "prop-types";
import { STATUS, SECTION } from "../constants/onBoarding";
import CarInformation from "./CarInformation";
import ContactInformation from "./ContactInformation";
import CurrentAddress from "./CurrentAddress";
import DriverLicense from "./DriverLicense";
import EmergencyContacts from "./EmergencyContacts";
import ImmigrationInformation from "./ImmigrationInformation";
import PersonalDetails from "./PersonalDetails";
import Reference from "./Reference";
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
