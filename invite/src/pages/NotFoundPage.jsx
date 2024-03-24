import DocumentTitle from "../components/DocumentTitle";
import Link from "@mui/material/Link";

const NotFoundPage = () => {
  return (
    <>
      <DocumentTitle>Page not found</DocumentTitle>
      <div className="row">
        <div className="col s12">
          <h4>Sorry, page not found!</h4>
          <h6>
            Start with <Link href="/">Home page</Link>
          </h6>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
