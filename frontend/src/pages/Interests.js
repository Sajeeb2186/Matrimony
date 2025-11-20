import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
  Card,
  CardContent,
  Avatar,
  Button,
  Chip,
  IconButton,
  CircularProgress,
} from '@mui/material';
import {
  ThumbUp,
  ThumbDown,
  Message,
  Favorite,
  AccessTime,
  CheckCircle,
  Cancel,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Interests = () => {
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    loadInterests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const loadInterests = () => {
    setLoading(true);
    setTimeout(() => {
      const mockInterests = [
        {
          id: 1,
          name: 'Rachel Green',
          age: 27,
          occupation: 'Fashion Designer',
          location: 'Los Angeles, USA',
          status: 'pending',
          sentDate: '2 hours ago',
          image: null,
        },
        {
          id: 2,
          name: 'Monica Geller',
          age: 29,
          occupation: 'Chef',
          location: 'New York, USA',
          status: 'accepted',
          sentDate: '1 day ago',
          image: null,
        },
        {
          id: 3,
          name: 'Phoebe Buffay',
          age: 28,
          occupation: 'Musician',
          location: 'San Diego, USA',
          status: 'rejected',
          sentDate: '3 days ago',
          image: null,
        },
      ];

      const filtered = mockInterests.filter((interest) => {
        if (tab === 0) return true; // All
        if (tab === 1) return interest.status === 'pending'; // Received
        if (tab === 2) return interest.status === 'accepted' || interest.status === 'rejected'; // Sent
        return true;
      });

      setInterests(filtered);
      setLoading(false);
    }, 800);
  };

  const handleAccept = (id) => {
    setInterests(
      interests.map((i) =>
        i.id === id ? { ...i, status: 'accepted' } : i
      )
    );
  };

  const handleReject = (id) => {
    setInterests(
      interests.map((i) =>
        i.id === id ? { ...i, status: 'rejected' } : i
      )
    );
  };

  const getStatusChip = (status) => {
    switch (status) {
      case 'pending':
        return <Chip label="Pending" size="small" color="warning" icon={<AccessTime />} />;
      case 'accepted':
        return <Chip label="Accepted" size="small" color="success" icon={<CheckCircle />} />;
      case 'rejected':
        return <Chip label="Declined" size="small" color="error" icon={<Cancel />} />;
      default:
        return null;
    }
  };

  const InterestCard = ({ interest }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card elevation={2}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
            <Avatar
              sx={{
                width: 60,
                height: 60,
                mr: 2,
                bgcolor: 'primary.main',
                fontSize: '1.5rem',
              }}
            >
              {interest.name.charAt(0)}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight={600}>
                {interest.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {interest.age} yrs, {interest.occupation}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {interest.location}
              </Typography>
              <Box sx={{ mt: 1 }}>
                {getStatusChip(interest.status)}
              </Box>
            </Box>
            <Typography variant="caption" color="text.secondary">
              {interest.sentDate}
            </Typography>
          </Box>

          {interest.status === 'pending' && (
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <Button
                variant="contained"
                startIcon={<ThumbUp />}
                onClick={() => handleAccept(interest.id)}
                fullWidth
              >
                Accept
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<ThumbDown />}
                onClick={() => handleReject(interest.id)}
                fullWidth
              >
                Decline
              </Button>
            </Box>
          )}

          {interest.status === 'accepted' && (
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <Button
                variant="contained"
                startIcon={<Message />}
                fullWidth
              >
                Send Message
              </Button>
              <IconButton color="primary">
                <Favorite />
              </IconButton>
            </Box>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Interests
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage interest requests from other members
        </Typography>
      </Box>

      <Paper elevation={2} sx={{ mb: 3 }}>
        <Tabs
          value={tab}
          onChange={(e, newValue) => setTab(newValue)}
          variant="fullWidth"
        >
          <Tab label="All Interests" />
          <Tab label="Received" />
          <Tab label="Sent" />
        </Tabs>
      </Paper>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : interests.length === 0 ? (
        <Paper elevation={2} sx={{ p: 8, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            No interests to show
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Start exploring profiles to send or receive interest requests
          </Typography>
          <Button variant="contained" sx={{ mt: 3 }} href="/search">
            Browse Profiles
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {interests.map((interest) => (
            <Grid item xs={12} md={6} key={interest.id}>
              <InterestCard interest={interest} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Interests;
