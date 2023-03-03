import type { NextPage } from 'next';
import { Container, Box } from '@mui/material';
import ButtonLink from '@components/ButtonLink';

const Home: NextPage = () => {
  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <ButtonLink href="/home" color="primary" sx={{ backgroundColor: 'blue', color: '#fff', fontWeight: 700 }}>
          go to table example
        </ButtonLink>
      </Box>
    </Container>
  );
};

export default Home;
