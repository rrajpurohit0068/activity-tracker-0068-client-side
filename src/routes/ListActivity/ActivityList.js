import React from "react";
import { Activity } from "./Activity";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;
export const ActivityList = ({
  activityList,
  text_color,
  background_color,
}) => {
  return (
    <Container>
      {activityList
        .sort((a, b) => a.priority - b.priority)
        .map((activity) => {
          return (
            <Activity
              text_color={text_color}
              background_color={background_color}
              activity={activity}
            />
          );
        })}
    </Container>
  );
};
