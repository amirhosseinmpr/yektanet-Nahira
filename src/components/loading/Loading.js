import React from "react";
import styles from "./Loading.module.scss";
import { Progress } from "semantic-ui-react";
import "semantic-ui-css/components/progress.css";
import img1 from "../../assets/images/logo.png";
const CustomProgressBar = ({ percent }) => {
  return (
    <div className={styles.progresss}>
      <div className={styles.container}>
        <div className="logo_icon">
          <img src={img1} alt="logo_pasur" />
        </div>
        <div className="progress-logo">
          <Progress
            progress
            percent={percent}
            autoSuccess
            color="blue"
            label={
              <div
                style={{ color: "white", lineHeight: 1.5, direction: "rtl" }}
              >
                {"در حال دریافت اطلاعات"}
              </div>
            }
            style={{
              maxWidth: 320,
              width: "100%",
              fontSize: "14px",
              backgroundColor: "white",
              margin: "2em",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomProgressBar;
