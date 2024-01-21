import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PayTmPayment from "../../images/paytm-payment.jpeg";
import { Wrapper, Container } from "../../components/styled/CenterComponent";

export function Payment() {
  return (
    <Wrapper>
      <Container>
        <Card>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                AT
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title="Payment For Development Support"
            subheader="Rajiv Rajpurohit"
          />
          <CardMedia
            component="img"
            height="194"
            image={PayTmPayment}
            alt="PayTM Payment"
            style={{
              height: "calc(100vh - 20vh)",
              objectFit: "contain",
            }}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              dummy text here
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Wrapper>
  );
}
