import { Spinner } from "react-bootstrap";
import styles from "../styles/Common.module.css";

const Loading = () => {
  return (
    <Spinner
      animation='border'
      variant='primary'
      className={styles.headerSpinner}
    />
  );
};

export default Loading;
