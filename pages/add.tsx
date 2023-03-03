/* eslint-disable jsx-a11y/label-has-associated-control */
import { Box, Container } from '@mui/system';
import { useRouter } from 'next/router';
import { useForm, Controller, FieldValues } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '@components/Input/Input';
import { Button } from '@mui/material';
import CircleLoader from '@components/CircleLoader/CircleLoader';
import { PROCESSING_STATUSES } from '@components/Modal/processingStatuses';
import { setOpen, setStatus } from 'redux/slices/modalTransaction';
import { useDispatch } from 'react-redux';
import { addUser } from 'redux/slices/usersSlice';

interface FormData {
  name: string;
  username: string;
  city: string;
  email: string;
}

const MAX_EMAIL_LENGTH = 120;

const YupSchema = Yup.object().shape({
  name: Yup.string().max(50, 'name cannot be longer than 50 characters').required('name is required'),
  username: Yup.string().max(50, 'username cannot be longer than 50 characters').required('username is required'),
  city: Yup.string().max(50, 'city cannot be longer than 50 characters').required('city is required'),
  email: Yup.string()
    .required('email is required')
    .max(MAX_EMAIL_LENGTH, `email cannot be longer than ${MAX_EMAIL_LENGTH} characters`)
    .email('provide a valid email address'),
});

const AddUser = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const methods = useForm<FormData>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: yupResolver(YupSchema),
    defaultValues: {
      name: '',
      username: '',
      city: '',
      email: '',
    },
  });

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const {
    control,
    formState: { errors, isSubmitting },
    getValues,
    reset,
    watch,
  } = methods;

  const onSubmit = async (data: FieldValues) => {
    dispatch(setStatus(PROCESSING_STATUSES.PROCESSING));
    dispatch(setOpen(true));

    const res = await fetch(`api/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      dispatch(addUser(data));
      reset();
      refreshData();
      router.push('/home');
      dispatch(setStatus(PROCESSING_STATUSES.SUCCESS));
    } else {
      dispatch(setStatus(PROCESSING_STATUSES.ERROR));
    }
  };
  const handleCancel = () => {
    router.push('/home');
  };

  return (
    <Container>
      <h1>Add User</h1>
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
    </Container>
  );
};

export default AddUser;
