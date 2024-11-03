import React from "react";
import styled from "styled-components";

const AnnContainer = styled.div`
  background-color: #1239c7;
  height: 30px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Nunito Sans", sans-serif;
  color: white;
  font-weight: 400;
  position: sticky;
    top: 0px;
    z-index: 1000;
`;

function Announcement() {
  return <AnnContainer>50% off on All dresses</AnnContainer>;
}

export default Announcement;
