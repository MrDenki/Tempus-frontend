import { Link } from "react-router-dom";
import Button from "@/components/UI/Button";
import { Heading } from "@/components/Typography";

const NoMatch = () => (
  <div style={{ textAlign: "center", margin: "0 auto" }}>
    <Heading>Nothing to see here!</Heading>
    <Link to="/" style={{ marginTop: 10 }}>
      <Button>Go to the home page</Button>
    </Link>
  </div>
);

export default NoMatch;
