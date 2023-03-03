import { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { selectOpen, setClose } from 'redux/slices/modalAction';
import { Button, Divider } from '@mui/material';

import { deleteUser } from 'redux/slices/usersSlice';
import { Store } from 'redux/store';
import { selectStatus, setStatus } from 'redux/slices/modalTransaction';
import { useRouter } from 'next/router';
import { mapToLoader, PROCESSING_STATUSES } from './processingStatuses';
import Modal from './Modal';

const StyledBox = styled(Box)`
  width: 420px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    width: 100%;
  }
`;

const DeleteModal: FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const userId = useSelector((state: Store) => state.users.selectedUserId);

  const userName = useSelector((state: Store) => state.users.users.find(user => user.id === userId)?.name);

  const isModalOpen = useSelector(selectOpen);

  const handleModalOpen = () => {
    dispatch(setClose());
  };

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleDelete = async () => {
    dispatch(setStatus(PROCESSING_STATUSES.PROCESSING));
    try {
      await fetch(`api/user/${userId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      dispatch(setStatus(PROCESSING_STATUSES.SUCCESS));

      dispatch(deleteUser(userId));
      refreshData();
    } catch (error) {
      dispatch(setStatus(PROCESSING_STATUSES.ERROR));
      console.error(error);
    } finally {
      dispatch(setStatus(PROCESSING_STATUSES.SUCCESS));
      dispatch(setClose());
    }
  };

  return (
    <Modal isOpen={isModalOpen} handleClose={handleModalOpen} title="Delete Modal">
      <StyledBox>
        <Divider />
        <Typography variant="h4" align="center" paragraph p={5}>
          Do you want to delete user {userName}?
        </Typography>
        <Divider />

        <Box display="flex" justifyContent="flex-end" pt={2}>
          <Box display="flex" width={200} justifyContent="space-between">
            <Button
              type="button"
              onClick={() => {
                dispatch(setClose());
              }}
              variant="outlined"
              color="inherit"
            >
              Cancel
            </Button>
            <Button color="error" variant="contained" onClick={handleDelete}>
              Delete
            </Button>
          </Box>
        </Box>
      </StyledBox>
    </Modal>
  );
};

export default DeleteModal;
