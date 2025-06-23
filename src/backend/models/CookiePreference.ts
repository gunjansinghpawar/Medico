import mongoose from 'mongoose';

const CookiePreferenceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    necessary: {
        type: Boolean,
        default: true
    },
    analytics: {
        type: Boolean,
        default: false
    },
    marketing: {
        type: Boolean,
        default: false
    },
    functional: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true,
});

export const CookiePreference = mongoose.models.CookiePreference || mongoose.model('CookiePreference', CookiePreferenceSchema);
