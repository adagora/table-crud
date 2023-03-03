import { styled } from '@mui/system';

const EmptyContainer = styled('div')`
  padding: 10px 10px 10px 10px;
`;
const Empty = styled('div')`
  width: 100%;
  height: 130px;
  border: 1px dotted rgb(115, 115, 115);
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 10px;
`;
const EmptyFont = styled('div')`
  font-size: 1em;
  color: rgb(115, 115, 115);
`;

const EmptyResult: React.FC<{ description: string; isButton?: boolean }> = ({
  description = 'No data',
  isButton = false,
}): JSX.Element => {
  return (
    <EmptyContainer>
      <Empty>
        <EmptyFont>{description}</EmptyFont>
      </Empty>
    </EmptyContainer>
  );
};

export default EmptyResult;
