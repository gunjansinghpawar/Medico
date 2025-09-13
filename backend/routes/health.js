import express from 'express';
import HealthProfile from '../models/HealthProfile.js';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Create or update health profile
router.post('/profile', auth, async (req, res) => {
  try {
    const {
      personalInfo,
      medicalHistory,
      lifestyle,
      vitals,
      emergencyContact,
      privacySettings
    } = req.body;

    // Find existing profile or create new
    let healthProfile = await HealthProfile.findOne({ user: req.user.userId });

    if (healthProfile) {
      // Update existing profile
      if (personalInfo) Object.assign(healthProfile.personalInfo, personalInfo);
      if (medicalHistory) Object.assign(healthProfile.medicalHistory, medicalHistory);
      if (lifestyle) Object.assign(healthProfile.lifestyle, lifestyle);
      if (vitals) Object.assign(healthProfile.vitals, vitals);
      if (emergencyContact) Object.assign(healthProfile.emergencyContact, emergencyContact);
      if (privacySettings) Object.assign(healthProfile.privacySettings, privacySettings);

      await healthProfile.save();
    } else {
      // Create new profile
      healthProfile = new HealthProfile({
        user: req.user.userId,
        personalInfo: personalInfo || {},
        medicalHistory: medicalHistory || {},
        lifestyle: lifestyle || {},
        vitals: vitals || {},
        emergencyContact: emergencyContact || {},
        privacySettings: privacySettings || {}
      });

      await healthProfile.save();

      // Link to user
      await User.findByIdAndUpdate(req.user.userId, {
        healthProfile: healthProfile._id
      });
    }

    res.json({
      message: 'Health profile successfully update हो गया! (Health profile updated successfully!)',
      healthProfile
    });
  } catch (error) {
    console.error('Health profile error:', error);
    res.status(500).json({ message: 'Health profile save करने में error (Error saving health profile)' });
  }
});

// Get health profile
router.get('/profile', auth, async (req, res) => {
  try {
    const healthProfile = await HealthProfile.findOne({ user: req.user.userId });

    if (!healthProfile) {
      return res.status(404).json({ 
        message: 'Health profile अभी तक नहीं बनाया गया (Health profile not created yet)' 
      });
    }

    res.json({
      message: 'Health profile मिल गया! (Health profile retrieved!)',
      healthProfile
    });
  } catch (error) {
    console.error('Get health profile error:', error);
    res.status(500).json({ message: 'Health profile load करने में error (Error loading health profile)' });
  }
});

// Add medical condition
router.post('/profile/conditions', auth, async (req, res) => {
  try {
    const { name, diagnosedDate, status } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Condition name required है (Condition name is required)' });
    }

    let healthProfile = await HealthProfile.findOne({ user: req.user.userId });

    if (!healthProfile) {
      healthProfile = new HealthProfile({ user: req.user.userId });
    }

    healthProfile.medicalHistory.conditions.push({
      name,
      diagnosedDate: diagnosedDate ? new Date(diagnosedDate) : new Date(),
      status: status || 'active'
    });

    await healthProfile.save();

    res.json({
      message: 'Medical condition add हो गया! (Medical condition added!)',
      condition: healthProfile.medicalHistory.conditions.slice(-1)[0]
    });
  } catch (error) {
    console.error('Add condition error:', error);
    res.status(500).json({ message: 'Condition add करने में error (Error adding condition)' });
  }
});

// Add medication
router.post('/profile/medications', auth, async (req, res) => {
  try {
    const { name, dosage, frequency, startDate, endDate } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Medication name required है (Medication name is required)' });
    }

    let healthProfile = await HealthProfile.findOne({ user: req.user.userId });

    if (!healthProfile) {
      healthProfile = new HealthProfile({ user: req.user.userId });
    }

    healthProfile.medicalHistory.medications.push({
      name,
      dosage: dosage || '',
      frequency: frequency || '',
      startDate: startDate ? new Date(startDate) : new Date(),
      endDate: endDate ? new Date(endDate) : null,
      isActive: !endDate
    });

    await healthProfile.save();

    res.json({
      message: 'Medication add हो गई! (Medication added!)',
      medication: healthProfile.medicalHistory.medications.slice(-1)[0]
    });
  } catch (error) {
    console.error('Add medication error:', error);
    res.status(500).json({ message: 'Medication add करने में error (Error adding medication)' });
  }
});

// Record vital signs
router.post('/profile/vitals', auth, async (req, res) => {
  try {
    const { bloodPressure, heartRate, temperature } = req.body;

    let healthProfile = await HealthProfile.findOne({ user: req.user.userId });

    if (!healthProfile) {
      healthProfile = new HealthProfile({ user: req.user.userId });
    }

    const now = new Date();

    if (bloodPressure) {
      healthProfile.vitals.bloodPressure = {
        systolic: bloodPressure.systolic,
        diastolic: bloodPressure.diastolic,
        recordedAt: now
      };
    }

    if (heartRate) {
      healthProfile.vitals.heartRate = {
        value: heartRate.value,
        recordedAt: now
      };
    }

    if (temperature) {
      healthProfile.vitals.temperature = {
        value: temperature.value,
        unit: temperature.unit || 'celsius',
        recordedAt: now
      };
    }

    await healthProfile.save();

    res.json({
      message: 'Vitals record हो गए! (Vitals recorded!)',
      vitals: healthProfile.vitals
    });
  } catch (error) {
    console.error('Record vitals error:', error);
    res.status(500).json({ message: 'Vitals record करने में error (Error recording vitals)' });
  }
});

export default router;