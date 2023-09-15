import styles from "./Heading.module.scss";
import { memo } from "react";

const Heading = memo(function Heading({ children }) {
  return <h1>{children}</h1>;
});

export default Heading;
