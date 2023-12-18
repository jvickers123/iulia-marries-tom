import Card from '@mui/material/Card';

const AdminCard = ({ children }: { children: React.ReactNode }) => {
  return <Card className="admin-card">{children}</Card>;
};

export default AdminCard;
