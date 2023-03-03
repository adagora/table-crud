/* eslint-disable jsx-a11y/label-has-associated-control */
import { Box, Container } from '@mui/system';
import { useRouter } from 'next/router';
import { useForm, Controller, FieldValues } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '@components/Input/Input';
import { Button } from '@mui/material';
import CircleLoader from '@components/CircleLoader/CircleLoader';
import { useDispatch, useSelector } from 'react-redux';
import { setOpen, setStatus } from 'redux/slices/modalTransaction';
import PROCESSING_STATUSES from 'enums/processingStatuses';
import { useEffect } from 'react';
import prisma from '@lib/prisma';
import { editUser } from 'redux/slices/usersSlice';
import TransactionModal from '@components/Modal/TransactionModal';

interface FormData {
  name: string;
  username: string;
  city: string;
  email: string;
}

const MAX_EMAIL_LENGTH = 120;

const YupSchema = Yup.object().shape({
  name: Yup.string()
    .max(50, 'name cannot be longer than 50 characters')
    .required('name is required')
    .min(3, 'name must be at least 3 characters long'),
  username: Yup.string().max(50, 'username cannot be longer than 50 characters').required('username is required'),
  city: Yup.string().max(50, 'city cannot be longer than 50 characters').required('city is required'),
  email: Yup.string()
    .required('email is required')
    .max(MAX_EMAIL_LENGTH, `email cannot be longer than ${MAX_EMAIL_LENGTH} characters`)
    .email('provide a valid email address'),
});

interface EditUserFormProps {
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
    city: string;
  };
}

const EditUser = ({ user }: EditUserFormProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;

  const methods = useForm<FormData>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: yupResolver(YupSchema),
    defaultValues: {
      name: user.name,
      username: user.username,
      email: user.email,
      city: user.city,
    },
  });

  const {
    control,
    formState: { errors, isSubmitting },
    getValues,
    reset,
    watch,
  } = methods;

  useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [user, reset]);

  const onSubmit = async (data: FieldValues) => {
    dispatch(setStatus(PROCESSING_STATUSES.PROCESSING));
    dispatch(setOpen(true));

    try {
      await fetch(`http://localhost:3000/api/user/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      dispatch(editUser(data));
      dispatch(setStatus(PROCESSING_STATUSES.SUCCESS));
      reset();

      router.push('/home');
    } catch (error) {
      dispatch(setStatus(PROCESSING_STATUSES.ERROR));
      console.error(error);
    } finally {
      dispatch(setStatus(PROCESSING_STATUSES.SUCCESS));
    }
  };

  const handleCancel = () => {
    router.push('/home');
  };

  return (
    <Container>
      <h1>Edit</h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmit(getValues());
        }}
      >
        <Box pt={1}>
          <Controller
            name="name"
            control={control}
            defaultValue={undefined}
            render={({ field: { value, onChange, name } }) => {
              return (
                <Input
                  autoFocus
                  type="string"
                  header="name"
                  placeholder="Enter your name"
                  name={name}
                  autoComplete="off"
                  disabled={isSubmitting}
                  value={value}
                  onChange={onChange}
                  error={!!errors.name}
                  errorMessage={errors.name?.message}
                  customStyles={{
                    headerStyles: { color: '#00cc9b' },
                    borderOnFocus: '2px solid #cefdd1',
                  }}
                  trimSpacesFromPastedValue
                  required
                />
              );
            }}
          />
        </Box>

        <Box pt={1}>
          <Controller
            name="username"
            control={control}
            defaultValue={undefined}
            render={({ field: { value, onChange, name } }) => {
              return (
                <Input
                  // type='number'
                  type="string"
                  placeholder="your username"
                  header="username"
                  name={name}
                  autoComplete="off"
                  disabled={isSubmitting}
                  value={value}
                  onChange={onChange}
                  error={!!errors.username}
                  errorMessage={errors.username?.message}
                  customStyles={{
                    headerStyles: { color: '#00cc9b' },
                    borderOnFocus: '2px solid #cefdd1',
                  }}
                  trimSpacesFromPastedValue
                  required
                />
              );
            }}
          />
        </Box>
        <Box pt={1}>
          <Controller
            name="email"
            control={control}
            defaultValue={undefined}
            render={({ field: { value, onChange, name } }) => {
              return (
                <Input
                  // type='number'
                  type="string"
                  header="email"
                  placeholder="address email"
                  name={name}
                  autoComplete="off"
                  disabled={isSubmitting}
                  value={value}
                  onChange={onChange}
                  error={!!errors.email}
                  errorMessage={errors.email?.message}
                  customStyles={{
                    headerStyles: { color: '#00cc9b' },
                    borderOnFocus: '2px solid #cefdd1',
                  }}
                  trimSpacesFromPastedValue
                  required
                />
              );
            }}
          />
        </Box>
        <Box pt={1}>
          <Controller
            name="city"
            control={control}
            defaultValue={undefined}
            render={({ field: { value, onChange, name } }) => {
              return (
                <Input
                  // type='number'
                  type="string"
                  header="city"
                  placeholder="enter your city"
                  name={name}
                  autoComplete="off"
                  disabled={isSubmitting}
                  value={value}
                  onChange={onChange}
                  error={!!errors.city}
                  errorMessage={errors.city?.message}
                  customStyles={{
                    headerStyles: { color: '#00cc9b' },
                    borderOnFocus: '2px solid #cefdd1',
                  }}
                  trimSpacesFromPastedValue
                  required
                />
              );
            }}
          />
        </Box>
        <Box display="flex" justifyContent="flex-end" pt={2}>
          <Box display="flex" width={200} justifyContent="space-between">
            <Button type="button" onClick={handleCancel} variant="outlined" color="error">
              Cancel
            </Button>
            {isSubmitting ? (
              <CircleLoader size={20} />
            ) : (
              <Button
                type="submit"
                color="success"
                variant="contained"
                disabled={isSubmitting || !watch('name') || !watch('username') || !watch('email') || !watch('city')}
              >
                Submit
              </Button>
            )}
          </Box>
        </Box>
      </form>
      <TransactionModal />
    </Container>
  );
};

export default EditUser;

export async function getStaticPaths() {
  // Fetch all the user IDs we want to pre-render
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      city: true,
    },
  });

  // Get the paths we want to pre-render based on users
  const paths = users.map(user => ({
    params: { id: user.id.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  return { props: { user } };
}
