import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Title } from "../../Typography";
import "./style.scss";

const BaseForm = ({ title, children, onSubmit }) => {
  return (
    <Container maxWidth="xs" className="form">
      <Card className="form__card" elevation={5}>
        <CardContent>
          <Grid item xs={12} sx={{ mb: 1 }}>
            <Title className="form__title" variant="h5">
              {title}
            </Title>
          </Grid>

          <Box component="form" onSubmit={onSubmit}>
            {children}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default BaseForm;
