import { useState } from "react";
import { isMobile, isDesktop } from "react-device-detect";

import Menu from "./Menu/Menu";
import MenuItem from "./MenuItem/MenuItem";
import MobileMenu from "./MobileMenu/MobileMenu";
import MobileMenuItem from "./MobileMenuItem/MobileMenuItem";

import styles from "./Header.module.scss";
import { SlMenu } from "react-icons/sl";
import Telephone from "./Telephone/Telephone";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpened, setOpened] = useState(false);

  return (
    <header>
      <h2>🌙 Сомнолог Екатерина Плескач</h2>
      {isDesktop ? (
        <Menu>
          <Telephone>+7(912)-231-45-67</Telephone>
        </Menu>
      ) : null}
      {isMobile ? (
        <>
          <SlMenu
            size={"20px"}
            onClick={() => setOpened((prev) => (prev = !prev))}
          />
          {isOpened ? (
            <MobileMenu>

              <Telephone>+7(912)-231-45-67</Telephone>
            </MobileMenu>
          ) : null}
        </>
      ) : null}
    </header>
  );
};

export default Header;
