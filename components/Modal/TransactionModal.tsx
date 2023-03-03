import { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { selectMessage, selectOpen, selectStatus, setClose } from 'redux/slices/modalTransaction';
import { Button } from '@mui/material';
import CircleLoader from '../CircleLoader/CircleLoader';

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

const TypographyGrey = styled(Typography)`
  color: ${({ theme }) => theme.palette.grey[500]};
`;

const TransactionModal: FC = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(selectOpen);
  const status = useSelector(selectStatus);
  const message = useSelector(selectMessage);

  const handleModalOpen = () => {
    if (status !== PROCESSING_STATUSES.PROCESSING) {
      dispatch(setClose());
    }
  };

  return (
    <Modal isOpen={isModalOpen} handleClose={handleModalOpen}>
      <StyledBox>
        <Box mx="auto" mb={4}>
          <CircleLoader status={mapToLoader(status)} />
        </Box>

        {status === PROCESSING_STATUSES.PROCESSING && (
          <>
            <Typography variant="h1" align="center" paragraph>
              Processing request
            </Typography>
            <TypographyGrey variant="subtitle2" align="center">
              It may take a while
            </TypographyGrey>
          </>
        )}

        {status === PROCESSING_STATUSES.SUCCESS && (
          <>
            <Typography variant="h1" align="center" paragraph>
              Success
            </Typography>
            <TypographyGrey variant="subtitle2" align="center">
              {message.length > 0 ? message : 'Your request has been processed successfully'}
            </TypographyGrey>
            <Box mx="auto" my={2}>
              <Button variant="contained" onClick={handleModalOpen}>
                CLOSE
              </Button>
            </Box>
          </>
        )}

        {status === PROCESSING_STATUSES.ERROR && (
          <>
            <Typography variant="h1" align="center" paragraph>
              Error
            </Typography>
            <TypographyGrey variant="subtitle2" align="center">
              {message}
            </TypographyGrey>
            <Box mx="auto" my={2}>
              <Button variant="outlined" onClick={handleModalOpen}>
                CLOSE
              </Button>
            </Box>
          </>
        )}
      </StyledBox>
    </Modal>
  );
};

export default TransactionModal;
