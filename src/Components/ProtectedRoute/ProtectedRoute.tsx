import { Box, Button, Container, Typography } from '@mui/material';
import LocationStorageKey from '../../Shared/Enum/LocationStorageKey.enum';
import Roles from '../../Shared/Enum/Roles.enum';
import IProtectedRouteProps from './Interface/ProtedtedRouteProps.interface'
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ AllowedRoles, Element }: IProtectedRouteProps) {
  const role = localStorage.getItem(LocationStorageKey.ROLE);
  const isRoleValid = Object.values(Roles).includes(role as Roles);

  const nav = useNavigate()

  const handleGoBack = () => {
    nav("/")
  };

  return isRoleValid && AllowedRoles.includes(role as Roles) ? (
    Element
  ) : (
    <>
      <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "20%" }}>
        <Box>
          <Typography variant="h2" color="error" gutterBottom>
            401 - Unauthorized
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            Sorry, you do not have permission to access this page.
          </Typography>
          <Button variant="contained" color="primary" onClick={handleGoBack}>
            Go Back
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default ProtectedRoute
