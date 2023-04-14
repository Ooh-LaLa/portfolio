import React from "react";

import classes from "./degree.module.css";
// import UniversityImg from "../../Data/universityLogo.png";

import Card from "../UI/Card";
import EducationData from "../../Data/EducationData"
import { useSelector } from "react-redux";

function Degrees(props) {

    const uiColor=useSelector(state=>state.uiColor);
    const nonThemeColor = useSelector(state => state.nonThemeColor);

    return (
        <div className={classes.degreeMain}>
            <h1 style={{ color: nonThemeColor }}>
               
            </h1>
            <div className={classes.degreeCard}>
                <div className={`${classes.degreeImage} centered`} style={{borderColor:uiColor}}>
                    {/* <img src={UniversityImg} alt="degree" srcset="" /> */}
                 
                </div>
                        {EducationData.map((item, index) =>
                // <ul className={classes.EducationData}>
                <Card  key={index} className={classes.degreeWrapper}>
                    <div className={classes.degreeInfo}>
                        <h3 style={{ color: nonThemeColor }}>
                            
                            {item.couseStartYear} - {item.courseEndYear}</h3>
                        <h1 style={{ color: nonThemeColor }}>{item.collegeName}</h1>
                        <h2 style={{ color: nonThemeColor }}>{item.courseName}</h2>
                        <h4 style={{ color: nonThemeColor }}>{item.details}</h4>
                    </div>
                </Card>
                        )}
            </div>
        </div>
    )
}

export default Degrees;