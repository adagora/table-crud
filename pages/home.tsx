import type { GetServerSideProps } from 'next';
import { Container, Typography, Box } from '@mui/material';
import ButtonLink from '@components/ButtonLink';
import UserTableList from '@components/UserTableList/UserTableList';
import { useDispatch } from 'react-redux';
import { prisma } from '../lib/prisma';

import { setSelectedUserId, setUsers } from 'redux/slices/usersSlice';
import { useEffect } from 'react';
import { ATable } from '@components/Table/ATable';
// import { selectOpen, setOpen } from 'redux/slices/modalAction';
import { selectOpen, setOpen } from 'redux/slices/modalAction';
import DeleteModal from '@components/Modal/DeleteModal';

interface Users {
  users: {
    id: number;
    name: string;
    username: string;
    email: string;
    city: string;
  }[];
}

const Home = ({ users }: Users) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUsers(users));
  }, [dispatch, users]);

  //   const { data = [], isFetching, isLoading, error } = useFetchUsersQuery();

  //   if (isLoading) {
  //     return <div>Loading...</div>;
  //   }

  //   if (error) {
  //     return <div>Error</div>;
  //   }

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography color="primary" variant="h4">
          User List
        </Typography>
        <ButtonLink href="/add" color="primary" sx={{ backgroundColor: 'blue', color: '#fff', fontWeight: 700 }}>
          Add
        </ButtonLink>
      </Box>

      <UserTableList users={users} />

      {/* <ATable
        tableSearchTitle="Activity"
        showSearch={false}
        fixedHeader
        tableMaxHeight={400}
        otherTableProps={{
          sx: {
            '& .MuiTableHead-root': {
              '& .MuiTableCell-root': {
                backgroundColor: 'transparent',
              },
            },
          },
        }}
        columns={[
          {
            title: 'id',
            key: 'id',
            disableSorting: true,
            textAlign: 'left',
            options: { raw: true },
          },
          {
            title: 'name',
            key: 'name',
            textAlign: 'left',
            options: { raw: true },
          },

          {
            title: 'username',
            key: 'username',
            textAlign: 'left',
            options: { raw: true },
          },
          {
            title: 'email',
            key: 'email',
            textAlign: 'left',
            options: { raw: true },
          },
          {
            title: 'city',
            key: 'city',
            textAlign: 'right',
            options: { raw: true },
          },
          {
            title: 'Edit',
            key: 'id',
            textAlign: 'right',
            options: {
              render: e => {
                return (
                  <ButtonLink
                    variant="contained"
                    sx={{ background: '#FFC107', color: '#000000', fontSize: '10px' }}
                    href={`/edit/${e}`}
                  >
                    Edit
                  </ButtonLink>
                );
              },
            },
          },
          {
            title: 'Delete',
            key: 'id',
            textAlign: 'right',
            options: {
              render: e => {
                console.log('e', e);
                return (
                  <Button
                    type="button"
                    variant="contained"
                    sx={{ background: '#FF0000', color: '#000000', fontSize: '10px' }}
                    onClick={() => {
                      dispatch(setOpen(true));
                      dispatch(setSelectedUserId(e));
                    }}
                  >
                    Delete
                  </Button>
                );
              },
            },
          },
        ]}
        rows={users}
        size="medium"
      /> */}
      <DeleteModal />
    </Container>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      city: true,
    },
  });

  return {
    props: {
      users,
    },
  };
};
