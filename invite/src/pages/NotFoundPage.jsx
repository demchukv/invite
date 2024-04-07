import DocumentTitle from "../components/DocumentTitle";
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const NotFoundPage = () => {
  return (
    <>
      <DocumentTitle>Page not found</DocumentTitle>

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
          Вибачте, сторінка не знайдена!
          </Typography>
          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ alignSelf: 'center', width: { sm: '100%', md: '100%' } }}
          >
          Розпочніть з <Link component={RouterLink} to="/">Головної сторінки</Link>
          </Typography>
          </Stack>
    </>
  );
};

export default NotFoundPage;
