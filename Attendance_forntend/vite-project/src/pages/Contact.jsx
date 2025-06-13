import React from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";

const Contact = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Contact Us
      </Typography>

      <Card elevation={3}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center">
                <BusinessIcon color="primary" sx={{ mr: 2 }} />
                <Typography variant="h6">ITCareService</Typography>
              </Box>
              <Typography sx={{ ml: 5 }} color="text.secondary">
                ITCareService Pvt. Ltd.
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center">
                <EmailIcon color="primary" sx={{ mr: 2 }} />
                <Typography variant="h6">Email</Typography>
              </Box>
              <Typography sx={{ ml: 5 }} color="text.secondary">
                ITCareService@solutions.com
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center">
                <PhoneIcon color="primary" sx={{ mr: 2 }} />
                <Typography variant="h6">Contact Number</Typography>
              </Box>
              <Typography sx={{ ml: 5 }} color="text.secondary">
                +91 98765 43210
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center">
                <LocationOnIcon color="primary" sx={{ mr: 2 }} />
                <Typography variant="h6">Location</Typography>
              </Box>
              <Typography sx={{ ml: 5 }} color="text.secondary">
                Basundhara, Kathmandu
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Contact;
