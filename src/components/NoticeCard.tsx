import { Notice } from '@/types/admin-types';
import Paper from '@mui/material/Paper';

const NoticeCard = ({ notice }: { notice: Notice }) => {
  const { title, message, updatedAt } = notice;

  const dateText = new Date(updatedAt!).toLocaleDateString('en-GB', {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  return (
    <Paper elevation={3} className="food-form__guest-row">
      <h3 className="info__para info__para--green info__para--large info__para--no-margin">
        {title}
      </h3>
      <p className="info__para info__para--purple">{message}</p>
      <p className="info__para info__para--dark-green">{dateText}</p>
    </Paper>
  );
};

export default NoticeCard;
