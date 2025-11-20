import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  IconButton,
  Avatar,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  BookmarkBorder,
  Bookmark,
  Visibility,
  Message,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { calculateAge } from '../../utils/helpers';

const ProfileCard = ({ profile, onInterest, onShortlist, onFavorite, onMessage, isShortlisted, isFavorited }) => {
  const navigate = useNavigate();

  const profilePhoto = profile.photos?.find(p => p.isProfile)?.url || 
                       profile.photos?.[0]?.url || 
                       '/default-avatar.png';

  const age = calculateAge(profile.personalInfo?.dateOfBirth);
  const name = `${profile.personalInfo?.firstName} ${profile.personalInfo?.lastName}`;
  const location = `${profile.location?.city}, ${profile.location?.state}`;

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: 6,
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="300"
          image={profilePhoto}
          alt={name}
          sx={{ objectFit: 'cover' }}
        />
        {profile.verification?.idVerified && (
          <Chip
            label="Verified"
            color="success"
            size="small"
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              fontWeight: 600,
            }}
          />
        )}
        {profile.isPremium && (
          <Chip
            label="Premium"
            color="primary"
            size="small"
            sx={{
              position: 'absolute',
              top: 10,
              left: 10,
              fontWeight: 600,
            }}
          />
        )}
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" fontWeight={600}>
          {name}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
          <Chip label={`${age} years`} size="small" />
          <Chip label={profile.personalInfo?.height ? `${profile.personalInfo.height} cm` : 'N/A'} size="small" />
        </Box>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          📍 {location}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" gutterBottom>
          🎓 {profile.professionalInfo?.education}
        </Typography>
        
        <Typography variant="body2" color="text.secondary">
          💼 {profile.professionalInfo?.occupation}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Box>
          <IconButton
            size="small"
            color="error"
            onClick={() => onFavorite && onFavorite(profile.profileId)}
          >
            {isFavorited ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
          <IconButton
            size="small"
            color="primary"
            onClick={() => onShortlist && onShortlist(profile.profileId)}
          >
            {isShortlisted ? <Bookmark /> : <BookmarkBorder />}
          </IconButton>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            size="small"
            startIcon={<Message />}
            onClick={() => onMessage && onMessage(profile)}
            color="secondary"
          >
            Message
          </Button>
          <Button
            size="small"
            startIcon={<Visibility />}
            onClick={() => navigate(`/profile/${profile.profileId}`)}
          >
            View
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={() => onInterest && onInterest(profile.profileId)}
          >
            Interest
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default ProfileCard;
