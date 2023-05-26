import React from "react";
import {
  View,
  Image
} from "@tarojs/components";
import {
  baseUrl
} from '@config';
import "./index.scss";

const Certified = (props) => {
  let {
    ali,
    car,
    company,
    edu,
    idcard
  } = props;
  return (
    <View className="certified">
      <Image
        src={`${baseUrl}MobileAuthentication_active.png`}
        className="certified_item"
      />
      <Image
        src={`${idcard ? `${baseUrl}verified_active.png` : `${baseUrl}verified.png`}`}
        className="certified_item"
      />
      <Image
        src={`${company ? `${baseUrl}JobCertification_active.png` : `${baseUrl}JobCertification.png`}`}
        className="certified_item"
      />
      <Image
        src={`${edu ? `${baseUrl}AcademicCertificate_active.png` : `${baseUrl}AcademicCertificate.png`}`}
        className="certified_item"
      />
      <Image
        src={`${ali ? `${baseUrl}SesameCredit_active.png` : `${baseUrl}SesameCredit.png`}`}
        className="certified_item"
      />
    </View>
  )
}
export default Certified;