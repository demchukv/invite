import DocumentTitle from "../components/DocumentTitle";
import Link from '@mui/material/Link';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const NotFoundPage = () => {
  return (
    <Container maxWidth="lg">
      <DocumentTitle>Page not found</DocumentTitle>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2, textAlign:'center'}}>
        Sorry, page not found!
        </Typography>
        <Typography variant="h6" component="h2" sx={{ mb: 2, textAlign:'center' }}>
        Start with <Link href="/">Home page</Link>
        </Typography>
      </Box>
    </Container>    
  )
}

export default NotFoundPage