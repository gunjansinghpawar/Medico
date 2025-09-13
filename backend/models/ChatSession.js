import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['user', 'bot'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  messageType: {
    type: String,
    enum: ['text', 'form', 'button', 'table', 'health-form'],
    default: 'text'
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
});

const chatSessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: function() {
      return !this.isGuest;
    }
  },
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    default: 'New Chat'
  },
  messages: [messageSchema],
  isGuest: {
    type: Boolean,
    default: false
  },
  guestId: {
    type: String,
    required: function() {
      return this.isGuest;
    }
  },
  preferences: {
    theme: {
      type: String,
      enum: ['dark', 'light'],
      default: 'dark'
    },
    fontSize: {
      type: String,
      enum: ['small', 'medium', 'large'],
      default: 'medium'
    }
  },
  lastActivity: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better query performance
chatSessionSchema.index({ user: 1, createdAt: -1 });
chatSessionSchema.index({ sessionId: 1 });
chatSessionSchema.index({ guestId: 1 });

// Update last activity on message add
chatSessionSchema.methods.addMessage = function(message) {
  this.messages.push(message);
  this.lastActivity = new Date();
  
  // Auto-generate title from first user message
  if (this.messages.length === 1 && message.role === 'user') {
    this.title = message.content.slice(0, 50) + (message.content.length > 50 ? '...' : '');
  }
  
  return this.save();
};

// Method to update session activity
chatSessionSchema.methods.updateActivity = function() {
  this.lastActivity = new Date();
  return this.save();
};

// Virtual for message count
chatSessionSchema.virtual('messageCount').get(function() {
  return this.messages.length;
});

// Ensure virtual fields are serialized
chatSessionSchema.set('toJSON', { virtuals: true });
export default mongoose.model('ChatSession', chatSessionSchema);