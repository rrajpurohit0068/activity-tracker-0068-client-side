import styled from "styled-components";
import { TypeAnimation } from "react-type-animation";
import React from "react";

const TypeAnimationWrapper = styled(TypeAnimation)`
  &::after {
    align-self: flex-end;
  }
`;

const TypingComponent = ({ sequence, classNames }) => {
  return (
    <TypeAnimationWrapper
      sequence={sequence}
      wrapper="h1"
      cursor={true}
      repeat={Infinity}
      style={{
        fontSize: "2em",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    />
  );
};

export const Typing = () => {
  return (
    <TypingComponent
      sequence={[
        "Track Your Activity",
        1500,
        "",
        1500,
        "Create New Activity",
        1500,
        "",
        1500,
        "Update Your Activity",
        1500,
        "",
        1500,
        "Duplicate You Daily Repeated Activity",
        1500,
        "",
        1500,
        "Change Status of Activities",
        1500,
        "",
        1500,
        "Change Priority of Activities",
        1500,
        "",
        1500,
        "Many More to Come Stay Up to Date",
        1500,
        "",
        1500,
        "Coming soon Secure Register and Login",
        1500,
        "",
        1500,
      ]}
    />
  );
};
