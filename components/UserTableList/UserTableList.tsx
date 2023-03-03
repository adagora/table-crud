import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import useIsMobile from '@components/hooks/useIsMobile';
import { styled } from '@mui/system';
import EmptyResult from '@components/EmptyResult/EmptyResult';
import { selectOpen, setOpen } from 'redux/slices/modalEdit';
import { useDispatch, useSelector } from 'react-redux';
import DeleteModal from '@components/Modal/DeleteModal';
import ButtonLink from '@components/ButtonLink';
import { setSelectedUserId } from 'redux/slices/usersSlice';

export interface UserListResponse {
  id: number;
  name: string;
  username: string;
  email: string;
  city: string;
}

interface Props {
  users: UserListResponse[];
}

export const StyledCell = styled(TableCell)<any>`
  border-bottom: none;
  font-size: 10px;
  line-height: 15px;
  font-weight: 500;
  padding: 0.4rem 0;
  @media screen and (min-width: 1224px) {
    font-size: 10px;
  }
`;
const mockedData = [
  {
    id: '1',
    name: 'John Doe',
    username: 'johndoe',
    email: '@gmail.com',
    city: 'New York',
  },
  {
    id: '2',
    name: 'Jane Doe',
    username: 'janedoe',
    email: '@gmail.com',
    city: 'New York',
  },
];

const UserTableList: React.FC<Props> = ({ users }) => {
  const dispatch = useDispatch<any>();

  return (
    <>
      <TableContainer
        sx={{
          background: 'transparent',
          marginTop: 2,
          px: '1rem',
          py: '1rem',
          borderBottom: 'none',
          height: '100%',
          width: '100%',
          borderRadius: 2,
        }}
        component={Paper}
      >
        <Table
          aria-label="table"
          stickyHeader
          sx={{
            '& .MuiTableHead-root': {
              '& .MuiTableCell-root': {
                backgroundColor: 'transparent',
              },
            },
          }}
        >
          <TableHead sx={{ mb: 0, padding: 0 }}>
            <TableRow sx={{ mb: 0, pb: 0 }}>
              <StyledCell sx={{ color: '#737474', fontWeight: 400 }}>Id</StyledCell>
              <StyledCell sx={{ color: '#737474', fontWeight: 400 }} align="right">
                Name
              </StyledCell>
              <StyledCell sx={{ color: '#737474', fontWeight: 400 }} align="right">
                Username
              </StyledCell>
              <StyledCell sx={{ color: '#737474', fontWeight: 400 }} align="right">
                Email
              </StyledCell>
              <StyledCell sx={{ color: '#737474', fontWeight: 400 }} align="right">
                City
              </StyledCell>
              <StyledCell sx={{ color: '#737474', fontWeight: 400 }} align="right">
                Edit
              </StyledCell>
              <StyledCell sx={{ color: '#737474', fontWeight: 400 }} align="right">
                Delete
              </StyledCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row, index) => (
              <TableRow key={row.id} sx={{ borderBottom: 'none' }}>
                <StyledCell
                  component="th"
                  scope="row"
                  sx={{ display: 'flex', alignItems: 'center', justifyItems: 'center', color: '#C1C1C1' }}
                >
                  {row.id}
                </StyledCell>
                <StyledCell align="right" sx={{ borderBottom: 'none', color: '#C1C1C1' }}>
                  {row.name}
                </StyledCell>
                <StyledCell align="right" sx={{ borderBottom: 'none' }}>
                  {row.username}
                </StyledCell>
                <StyledCell align="right" sx={{ borderBottom: 'none' }}>
                  {row.email}
                </StyledCell>
                <StyledCell align="right" sx={{ borderBottom: 'none' }}>
                  {row.city}
                </StyledCell>
                <StyledCell align="right" sx={{ borderBottom: 'none' }}>
                  <ButtonLink
                    variant="contained"
                    sx={{ background: '#FFC107', color: '#000000', fontSize: '10px' }}
                    href={`/edit/${row.id}`}
                  >
                    Edit
                  </ButtonLink>
                </StyledCell>
                <StyledCell align="right" sx={{ borderBottom: 'none' }}>
                  <Button
                    variant="contained"
                    sx={{ background: '#FF0000', color: '#000000', fontSize: '10px' }}
                    onClick={() => {
                      dispatch(setOpen(true));
                      dispatch(setSelectedUserId(row.id));
                    }}
                  >
                    Delete
                  </Button>
                </StyledCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {users.length === 0 && <EmptyResult description="No user list" />}
      </TableContainer>

      <DeleteModal />
    </>
  );
};

export default UserTableList;
