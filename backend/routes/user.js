import express from 'express';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Update user preferences
router.patch('/preferences', auth, async (req, res) => {
  try {
    const { theme, fontSize, language, notifications } = req.body;
    
    const updateData = {};
    if (theme) updateData['preferences.theme'] = theme;
    if (fontSize) updateData['preferences.fontSize'] = fontSize;
    if (language) updateData['preferences.language'] = language;
    if (typeof notifications === 'boolean') updateData['preferences.notifications'] = notifications;

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User नहीं मिला (User not found)' });
    }

    res.json({
      message: 'Preferences update हो गई! (Preferences updated!)',
      preferences: user.preferences
    });
  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({ message: 'Preferences update करने में error (Error updating preferences)' });
  }
});

// Update user profile
router.patch('/profile', auth, async (req, res) => {
  try {
    const { name, avatar } = req.body;
    
    const updateData = {};
    if (name?.trim()) updateData.name = name.trim();
    if (avatar) updateData.avatar = avatar;

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User नहीं मिला (User not found)' });
    }

    res.json({
      message: 'Profile update हो गया! (Profile updated!)',
      user
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Profile update करने में error (Error updating profile)' });
  }
});

// Get user stats
router.get('/stats', auth, async (req, res) => {
  try {
    const ChatSession = (await import('../models/ChatSession.js')).default;
    
    const stats = await ChatSession.aggregate([
      { $match: { user: req.user.userId } },
      {
        $group: {
          _id: null,
          totalSessions: { $sum: 1 },
          totalMessages: { $sum: { $size: '$messages' } },
          averageMessagesPerSession: { $avg: { $size: '$messages' } }
        }
      }
    ]);

    const userStats = stats[0] || {
      totalSessions: 0,
      totalMessages: 0,
      averageMessagesPerSession: 0
    };

    res.json({
      message: 'Stats मिल गए! (Stats retrieved!)',
      stats: userStats
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Stats load करने में error (Error loading stats)' });
  }
});

export default router;