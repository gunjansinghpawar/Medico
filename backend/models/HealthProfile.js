import mongoose from 'mongoose';

const healthProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  personalInfo: {
    age: {
      type: Number,
      min: 1,
      max: 120
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other', 'prefer-not-to-say']
    },
    height: {
      value: Number,
      unit: {
        type: String,
        enum: ['cm', 'ft'],
        default: 'cm'
      }
    },
    weight: {
      value: Number,
      unit: {
        type: String,
        enum: ['kg', 'lbs'],
        default: 'kg'
      }
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'unknown']
    }
  },
  medicalHistory: {
    conditions: [{
      name: String,
      diagnosedDate: Date,
      status: {
        type: String,
        enum: ['active', 'resolved', 'managed']
      }
    }],
    allergies: [{
      allergen: String,
      severity: {
        type: String,
        enum: ['mild', 'moderate', 'severe']
      }
    }],
    medications: [{
      name: String,
      dosage: String,
      frequency: String,
      startDate: Date,
      endDate: Date,
      isActive: {
        type: Boolean,
        default: true
      }
    }],
    surgeries: [{
      procedure: String,
      date: Date,
      hospital: String
    }]
  },
  lifestyle: {
    smokingStatus: {
      type: String,
      enum: ['never', 'former', 'current', 'occasional']
    },
    alcoholConsumption: {
      type: String,
      enum: ['never', 'rarely', 'moderate', 'heavy']
    },
    exerciseFrequency: {
      type: String,
      enum: ['none', 'rarely', 'weekly', 'daily']
    },
    dietType: {
      type: String,
      enum: ['omnivore', 'vegetarian', 'vegan', 'other']
    },
    sleepHours: {
      type: Number,
      min: 0,
      max: 24
    },
    stressLevel: {
      type: Number,
      min: 1,
      max: 10
    }
  },
  vitals: {
    bloodPressure: {
      systolic: Number,
      diastolic: Number,
      recordedAt: Date
    },
    heartRate: {
      value: Number,
      recordedAt: Date
    },
    temperature: {
      value: Number,
      unit: {
        type: String,
        enum: ['celsius', 'fahrenheit'],
        default: 'celsius'
      },
      recordedAt: Date
    }
  },
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String,
    email: String
  },
  privacySettings: {
    shareWithDoctors: {
      type: Boolean,
      default: false
    },
    shareForResearch: {
      type: Boolean,
      default: false
    }
  }
}, {
  timestamps: true
});

// Index for better query performance
healthProfileSchema.index({ user: 1 });

export default mongoose.model('HealthProfile', healthProfileSchema);