import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    dateOfBirth: {
        type: Date,
    },
    lastActive: {
        type: Date,
    },
    avatar: {
        type: String,
        trim: true
    },
    consultations: {
        type: [mongoose.Schema.Types.Mixed],
        default: []
    },
    preferences: {
        notification: {
            type: Boolean,
            default: true
        },
        dataSharing: {
            type: Boolean,
            default: false
        },
        reminder: {
            type: Boolean,
            default: true
        }
    }
}, {
    timestamps: true,
});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
