'use client'
import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, MapPin, Edit3, Save, X, Camera, Shield, Activity, Heart, Clock } from 'lucide-react';
import Image from 'next/image';

interface UserProfile {
    id: string;
    name: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    location: string;
    avatar: string;
    joinDate: string;
    lastActive: string;
    healthScore: number;
    consultations: number;
    preferences: {
        notifications: boolean;
        dataSharing: boolean;
        reminders: boolean;
    };
}

const Profile: React.FC = () => {
    const [editing, setEditing] = useState(false);
    const [profile, setProfile] = useState<UserProfile>({
        id: '',
        name: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        location: '',
        avatar: '',
        joinDate: '',
        lastActive: '',
        healthScore: 0,
        consultations: 0,
        preferences: {
            notifications: false,
            dataSharing: false,
            reminders: false,
        },
    });
    const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);

    const handleEdit = () => {
        setEditedProfile(profile);
        setEditing(true);
    };

    const handleSave = () => {
        setProfile(editedProfile);
        setEditing(false);
    };

    const handleCancel = () => {
        setEditedProfile(profile);
        setEditing(false);
    };

    const handleInputChange = <K extends keyof UserProfile>(field: K, value: UserProfile[K]) => {
        setEditedProfile(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handlePreferenceChange = (preference: keyof UserProfile['preferences']) => {
        setEditedProfile(prev => ({
            ...prev,
            preferences: {
                ...prev.preferences,
                [preference]: !prev.preferences[preference]
            }
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                    <div className="bg-gradient-to-r from-blue-600 to-green-600 h-32 relative">
                        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                        <div className="absolute bottom-4 right-4">
                            {!editing ? (
                                <button
                                    onClick={handleEdit}
                                    className="bg-white text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2 shadow-md"
                                >
                                    <Edit3 className="h-4 w-4" />
                                    <span>Edit Profile</span>
                                </button>
                            ) : (
                                <div className="flex space-x-2">
                                    <button
                                        onClick={handleSave}
                                        className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2 shadow-md"
                                    >
                                        <Save className="h-4 w-4" />
                                        <span>Save</span>
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center space-x-2 shadow-md"
                                    >
                                        <X className="h-4 w-4" />
                                        <span>Cancel</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="px-8 pb-8">
                        <div className="flex flex-col sm:flex-row items-center sm:items-end space-y-4 sm:space-y-0 sm:space-x-6 -mt-16">
                            <div className="relative">
                                <Image
                                    src={profile.avatar}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                                />
                                {editing && (
                                    <button className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors shadow-md">
                                        <Camera className="h-4 w-4" />
                                    </button>
                                )}
                            </div>

                            <div className="text-center sm:text-left flex-1">
                                {editing ? (
                                    <input
                                        type="text"
                                        value={editedProfile.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        className="text-3xl font-bold text-gray-900 bg-transparent border-b-2 border-blue-600 focus:outline-none focus:border-green-600 transition-colors"
                                    />
                                ) : (
                                    <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
                                )}
                                <p className="text-gray-600 mt-1">Member since {new Date(profile.joinDate).toLocaleDateString()}</p>
                                <div className="flex items-center justify-center sm:justify-start space-x-4 mt-3">
                                    <div className="flex items-center space-x-1 text-green-600">
                                        <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                                        <span className="text-sm font-medium">Active</span>
                                    </div>
                                    <div className="text-gray-400">•</div>
                                    <div className="text-sm text-gray-600">
                                        Last seen {new Date(profile.lastActive).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Personal Information */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                <User className="h-6 w-6 mr-3 text-blue-600" />
                                Personal Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                    {editing ? (
                                        <input
                                            type="email"
                                            value={editedProfile.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    ) : (
                                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                            <Mail className="h-5 w-5 text-gray-400" />
                                            <span className="text-gray-900">{profile.email}</span>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                    {editing ? (
                                        <input
                                            type="tel"
                                            value={editedProfile.phone}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    ) : (
                                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                            <Phone className="h-5 w-5 text-gray-400" />
                                            <span className="text-gray-900">{profile.phone}</span>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                                    {editing ? (
                                        <input
                                            type="date"
                                            value={editedProfile.dateOfBirth}
                                            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    ) : (
                                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                            <Calendar className="h-5 w-5 text-gray-400" />
                                            <span className="text-gray-900">{new Date(profile.dateOfBirth).toLocaleDateString()}</span>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                                    {editing ? (
                                        <input
                                            type="text"
                                            value={editedProfile.location}
                                            onChange={(e) => handleInputChange('location', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    ) : (
                                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                            <MapPin className="h-5 w-5 text-gray-400" />
                                            <span className="text-gray-900">{profile.location}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Privacy Preferences */}
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                <Shield className="h-6 w-6 mr-3 text-blue-600" />
                                Privacy Preferences
                            </h2>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Email Notifications</h3>
                                        <p className="text-sm text-gray-600">Receive health tips and updates via email</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={editing ? editedProfile.preferences.notifications : profile.preferences.notifications}
                                            onChange={() => editing && handlePreferenceChange('notifications')}
                                            disabled={!editing}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Data Sharing</h3>
                                        <p className="text-sm text-gray-600">Share anonymized data for medical research</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={editing ? editedProfile.preferences.dataSharing : profile.preferences.dataSharing}
                                            onChange={() => editing && handlePreferenceChange('dataSharing')}
                                            disabled={!editing}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Health Reminders</h3>
                                        <p className="text-sm text-gray-600">Get reminders for health checkups and medications</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={editing ? editedProfile.preferences.reminders : profile.preferences.reminders}
                                            onChange={() => editing && handlePreferenceChange('reminders')}
                                            disabled={!editing}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Health Stats */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                <Activity className="h-5 w-5 mr-2 text-green-600" />
                                Health Overview
                            </h3>

                            <div className="space-y-4">
                                <div className="text-center">
                                    <div className="relative w-24 h-24 mx-auto mb-3">
                                        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                                            <path
                                                className="text-gray-200"
                                                stroke="currentColor"
                                                strokeWidth="3"
                                                fill="none"
                                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                            />
                                            <path
                                                className="text-green-600"
                                                stroke="currentColor"
                                                strokeWidth="3"
                                                strokeDasharray={`${profile.healthScore}, 100`}
                                                strokeLinecap="round"
                                                fill="none"
                                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-2xl font-bold text-gray-900">{profile.healthScore}</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600">Health Score</p>
                                </div>

                                <div className="border-t pt-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-gray-600">Consultations</span>
                                        <span className="font-semibold text-gray-900">{profile.consultations}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">This Month</span>
                                        <span className="font-semibold text-green-600">3</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                <Heart className="h-5 w-5 mr-2 text-red-500" />
                                Recent Activity
                            </h3>

                            <div className="space-y-3">
                                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">Health consultation</p>
                                        <p className="text-xs text-gray-600">2 hours ago</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">Profile updated</p>
                                        <p className="text-xs text-gray-600">1 day ago</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">Health reminder set</p>
                                        <p className="text-xs text-gray-600">3 days ago</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg shadow-lg p-6 text-white">
                            <h3 className="text-lg font-bold mb-2 flex items-center">
                                <Clock className="h-5 w-5 mr-2" />
                                Quick Actions
                            </h3>
                            <div className="space-y-3">
                                <button className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors rounded-lg p-3 text-left">
                                    <p className="font-medium">Schedule Consultation</p>
                                    <p className="text-sm opacity-90">Book your next health check</p>
                                </button>
                                <button className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors rounded-lg p-3 text-left">
                                    <p className="font-medium">Health Assessment</p>
                                    <p className="text-sm opacity-90">Take a quick health quiz</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;