import DocumentTitle from "../components/DocumentTitle";

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const HomePage = () => {
  return (
    <>
      <DocumentTitle>Create your invitation</DocumentTitle>
      <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '100%' } }}>
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: 'clamp(3.5rem, 10vw, 4rem)',
            }}
          >
          Invitation!
          </Typography>
          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ alignSelf: 'center', width: { sm: '100%', md: '100%' } }}
          >
          Create original invitations for your event for free!
          </Typography>
          </Stack>
    </>
  );
};

export default HomePage;
