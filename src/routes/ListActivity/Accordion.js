import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { ActivityList } from "./ActivityList";
import { useDispatch, useSelector } from "react-redux";
import {
  activityStateSelector,
  expandedActivityStateSelector,
  setExpandedActivity,
} from "../../Provider/Redux/activity";
import { statusStateSelector } from "../../Provider/Redux/status";
import styledComp from "styled-components";
import { status_color } from "../../api/status_color";
import { ActivityDate } from "./ActivityDate";
import moment from "moment";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { StatusComponent } from "../../components/Status";
import { PriorityComponent } from "../../components/Priority";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const HeaderContainer = styledComp.span`
    display: flex;
    width: max-content;
    flex: 1;
`;

const TitleContainer = styledComp(Typography)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 1;
`;

const BarContainer = styledComp.span`
    display: flex;
    flex: 1;

    position: absolute;
    width: 100%;
    height: 100%;
    margin-left: -38px;
`;
const Bar = styledComp.span`
  display: flex;
  width: ${(prop) => prop.percent + "%"};
  background: ${(prop) => prop.bg};
  color: ${(prop) => prop.tc};
  opacity: 0.6;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  
`;

const FilterContainer = styledComp.div`
  margin-block: 16px;
  display: flex;
  align-item: center;
  flex-wrap: wrap;
  & > * {
    margin-right: 16px !important;
    width: max-width !important;
    margin-bottom: 16px !important;
    min-width: 300px !important;
  }
`;
export function Accordions() {
  const [date, setDate] = React.useState(moment());
  const [isAll, setIsAll] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [filterStatus, setFilterStatus] = React.useState(-1);
  const [filterPriority, setFilterPriority] = React.useState(-1);

  const status = useSelector(statusStateSelector);
  const activitysAll = useSelector(activityStateSelector);
  const expanded = useSelector(expandedActivityStateSelector);
  const dispatch = useDispatch();

  const activitys = React.useMemo(() => {
    return activitysAll.filter((activity) => {
      const { title, desc, status_id, created, updated, user_id, priority } =
        activity;
      console.log({ priority, status_id, filterPriority, filterStatus });
      if (filterStatus !== -1) {
        if (status_id !== filterStatus) {
          return false;
        }
      }
      if (filterPriority !== -1) {
        if (priority !== filterPriority) {
          return false;
        }
      }
      if (search) {
        const lowerCase = search.toLowerCase();
        return (
          title.toLowerCase().includes(lowerCase) ||
          desc.toLowerCase().includes(lowerCase)
        );
      }
      if (isAll) {
        return true;
      }

      if (date.isValid()) {
        return (
          moment(created).format("YYYY-MM-DD") === date.format("YYYY-MM-DD")
        );
      }
      return false;
    });
  }, [date, activitysAll, isAll, search, filterStatus, filterPriority]);

  const setExpanded = (value) => {
    dispatch(setExpandedActivity(value));
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  console.log({ filterPriority, filterStatus });

  return (
    <div>
      <FilterContainer>
        <TextField
          label="Search Activity's"
          type="search"
          variant="standard"
          value={search}
          onChange={(e) => {
            console.log({ e });
            setSearch(e.target.value);
            // setSearch(e.target.)
          }}
          fullWidth={true}
        />
        <ActivityDate
          value={date}
          disabled={isAll || search}
          onChange={(value) => {
            setDate(value);
          }}
        />
        <FormControlLabel
          onChange={() => {
            setIsAll((prev) => !prev);
          }}
          control={<Checkbox checked={isAll || !!search} disabled={!!search} />}
          label="Show All"
        />

        {/* <StatusComponent includeAll value={filterStatus} onChange={({ target: value }) => setFilterStatus(value.value)}   /> */}
        <PriorityComponent
          includeAll
          value={filterPriority}
          onChange={({ target: value }) => setFilterPriority(value.value)}
        />
      </FilterContainer>

      {status
        .sort((a, b) => a.sr_no - b.sr_no)
        .map(({ id, title, desc, text_color, background_color, sr_no }) => {
          const activityList = activitys.filter(({ status_id }) => {
            return status_id === id;
          });
          const percent = (activityList.length / activitys.length) * 100;
          return (
            <Accordion expanded={expanded === id} onChange={handleChange(id)}>
              <AccordionSummary aria-controls={`${title}-content`}>
                <HeaderContainer>
                  <TitleContainer>
                    {` ${title} `}
                    {activityList.length
                      ? " ( " + activityList.length + " ) "
                      : ""}
                  </TitleContainer>
                  <BarContainer>
                    <Bar
                      percent={percent}
                      bg={status_color[`${id}b`][`${2}`]}
                      tc={status_color[`${id}t`][`${2}`]}
                    ></Bar>
                  </BarContainer>
                </HeaderContainer>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <ActivityList
                    text_color={text_color}
                    background_color={background_color}
                    activityList={activityList}
                  />
                </Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
    </div>
  );
}
