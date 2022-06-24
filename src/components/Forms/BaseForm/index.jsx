import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Title } from "../../Typography";
import "./style.scss";

const BaseForm = ({ title, children, onSubmit }) => {
  return (
    <Container maxWidth="xs" className="form">
      <Card className="form__card" elevation={3}>
        <CardContent>
          <Title className="form__title" variant="h5">
            {title}
          </Title>

          <Box component="form" onSubmit={onSubmit}>
            {children}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default BaseForm;
