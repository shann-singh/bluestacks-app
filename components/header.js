import React, { useState } from "react";
import styles from "../styles/Header.module.css";
import { Navbar, Nav, NavDropdown, Dropdown } from "react-bootstrap";
import { videos, snackBarOptions } from "../util";
import axios from "axios";
import { useSnackbar } from "react-simple-snackbar";
import { useVideo } from "./videoContext";
import Spinner from "./spinner";

const Header = () => {
  const { setListUpdated } = useVideo();
  const [loading, setLoading] = useState(false);
  const [openSnackbar, closeSnackbar] = useSnackbar(snackBarOptions);

  const submit = async (e) => {
    setLoading(true);
    try {
      const response = await axios({
        method: "POST",
        url: process.env.NEXT_PUBLIC_API_URL + "/videos/fetch-popular",
        data: { maxResults: e },
      });
      setLoading(false);
      const newEntries = response.data.newEntries;
      const duplicates = response.data.duplicates;
      if (newEntries > 0) {
        setListUpdated(true);
        openSnackbar(
          `Video List has been updated with ${newEntries} new videos`
        );
      } else {
        openSnackbar(
          `No new most popular videos found. Please try again later.`
        );
      }
    } catch (error) {
      setLoading(false);
      openSnackbar("Error occured. Unable to fetch most popular videos");
    }
  };

  return (
    <div>
      <Navbar bg='dark' expand='lg' fixed='top'>
        <Navbar.Brand href='/' className={styles.navbarBrand}>
          Bluestacks App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse
          id='basic-navbar-nav'
          className='justify-content-end'
        >
          <Nav className='me-auto'>
            <Dropdown>
              <Dropdown.Toggle
                id='dropdown-button-dark-example1'
                variant='dark'
                size='sm'
              >
                Add more Videos
              </Dropdown.Toggle>
              <Dropdown.Menu variant='dark' alignRight>
                {videos.map((item, index) => {
                  return (
                    <Dropdown.Item
                      key={index}
                      eventKey={index}
                      onClick={() => submit(item)}
                      disabled={loading ? true : false}
                    >
                      {item}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {loading ? <Spinner /> : null}
    </div>
  );
};

export default Header;
