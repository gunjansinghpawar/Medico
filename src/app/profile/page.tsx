'use client';
import React, { useState, useEffect, ChangeEvent } from 'react';
import {
    User, Mail, Phone, Calendar, MapPin,
    Edit3, Save, X, Camera, Shield,
    Activity, Heart, Clock
} from 'lucide-react';
import Image from 'next/image';

interface UserProfile {
    id: string;
    firstname: string;
    lastname: string;
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
    const [loading, setLoading] = useState(false);
    const [fetchingData, setFetchingData] = useState(true);
    const [profile, setProfile] = useState<UserProfile>({
        id: '',
        firstname: '',
        lastname: '',
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

    // New state to hold selected profile image file and preview URL
    const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
    const [profileImagePreview, setProfileImagePreview] = useState<string>('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setFetchingData(true);
                const response = await fetch('/api/auth/me', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });

                if (response.ok) {
                    const userDetails = await response.json();
                    const userData = userDetails.user;
                    const mappedProfile: UserProfile = {
                        id: userData.id || '',
                        firstname: userData.firstname || userData.name?.split(' ')[0] || '',
                        lastname: userData.lastname || userData.name?.split(' ').slice(1).join(' ') || '',
                        email: userData.email || '',
                        phone: userData.phone || '',
                        dateOfBirth: userData.dateOfBirth || '',
                        location: userData.location || '',
                        avatar: userData.avatar || userData.profilePicture || '',
                        joinDate: userData.joinDate || userData.createdAt || '',
                        lastActive: userData.lastActive || userData.updatedAt || new Date().toISOString(),
                        healthScore: userData.healthScore || 0,
                        consultations: userData.consultations || 0,
                        preferences: {
                            notifications: userData.preferences?.notifications ?? false,
                            dataSharing: userData.preferences?.dataSharing ?? false,
                            reminders: userData.preferences?.reminders ?? false,
                        },
                    };
                    setProfile(mappedProfile);
                    setEditedProfile(mappedProfile);
                    setProfileImagePreview(mappedProfile.avatar);
                } else {
                    if (response.status === 401) {
                        console.error('User not authenticated');
                        // Optionally redirect to login
                    } else {
                        throw new Error('Failed to fetch user data');
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setFetchingData(false);
            }
        };

        fetchUserData();
    }, []);

    const handleEdit = () => {
        setEditedProfile(profile);
        setProfileImagePreview(profile.avatar);
        setProfileImageFile(null);
        setEditing(true);
    };

    // Handle file selection and create preview URL
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setProfileImageFile(e.target.files[0]);
            setProfileImagePreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            // If user selected a new image file, send FormData; else send JSON
            let response: Response;

            if (profileImageFile) {
                const formData = new FormData();

                formData.append('profileImage', profileImageFile);
                formData.append('firstname', editedProfile.firstname);
                formData.append('lastname', editedProfile.lastname);
                formData.append('name', `${editedProfile.firstname} ${editedProfile.lastname}`.trim());
                formData.append('email', editedProfile.email);
                formData.append('phone', editedProfile.phone);
                formData.append('dateOfBirth', editedProfile.dateOfBirth);
                formData.append('location', editedProfile.location);

                // Append preferences as JSON string
                formData.append('preferences', JSON.stringify(editedProfile.preferences));

                response = await fetch('/api/auth/updateDetails', {
                    method: 'PUT',
                    credentials: 'include',
                    body: formData,
                    // IMPORTANT: DO NOT set Content-Type header when sending FormData!
                });
            } else {
                response = await fetch('/api/auth/updateDetails', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({
                        firstname: editedProfile.firstname,
                        lastname: editedProfile.lastname,
                        name: `${editedProfile.firstname} ${editedProfile.lastname}`.trim(),
                        email: editedProfile.email,
                        phone: editedProfile.phone,
                        dateOfBirth: editedProfile.dateOfBirth,
                        location: editedProfile.location,
                        preferences: editedProfile.preferences,
                    }),
                });
            }

            if (response.ok) {
                const updated = await response.json();
                const updatedProfile = updated.user || updated;

                const mappedProfile: UserProfile = {
                    ...editedProfile,
                    id: updatedProfile.id || updatedProfile._id || editedProfile.id,
                    firstname: updatedProfile.firstname || editedProfile.firstname,
                    lastname: updatedProfile.lastname || editedProfile.lastname,
                    email: updatedProfile.email || editedProfile.email,
                    phone: updatedProfile.phone || editedProfile.phone,
                    dateOfBirth: updatedProfile.dateOfBirth || editedProfile.dateOfBirth,
                    location: updatedProfile.location || editedProfile.location,
                    avatar: updatedProfile.avatar || updatedProfile.profileImage || editedProfile.avatar,
                    joinDate: updatedProfile.joinDate || updatedProfile.createdAt || editedProfile.joinDate,
                    lastActive: updatedProfile.lastActive || updatedProfile.updatedAt || editedProfile.lastActive,
                    healthScore: updatedProfile.healthScore ?? editedProfile.healthScore,
                    consultations: updatedProfile.consultations ?? editedProfile.consultations,
                    preferences: updatedProfile.preferences || editedProfile.preferences,
                };

                setProfile(mappedProfile);
                setEditedProfile(mappedProfile);
                setProfileImagePreview(mappedProfile.avatar);
                setProfileImageFile(null);
                setEditing(false);
            } else {
                throw new Error('Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setEditedProfile(profile);
        setProfileImagePreview(profile.avatar);
        setProfileImageFile(null);
        setEditing(false);
    };

    const handleInputChange = <K extends keyof UserProfile>(field: K, value: UserProfile[K]) => {
        setEditedProfile(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const handlePreferenceChange = (preference: keyof UserProfile['preferences']) => {
        setEditedProfile(prev => ({
            ...prev,
            preferences: {
                ...prev.preferences,
                [preference]: !prev.preferences[preference],
            },
        }));
    };

    const getInitials = (firstname: string, lastname: string) => {
        return `${firstname.charAt(0)}${lastname.charAt(0)}`.toUpperCase();
    };

    const displayProfile = editing ? editedProfile : profile;
    const fullName = `${displayProfile.firstname} ${displayProfile.lastname}`.trim();

    return (
        <div className="min-h-screen py-4 sm:py-8 px-4 sm:px-6 lg:px-8 mt-20 fade-in" style={{ backgroundColor: 'rgb(var(--background))' }}>
            <div className="max-w-7xl mx-auto">
                {fetchingData ? (
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2" style={{ borderColor: 'rgb(var(--primary))' }}></div>
                    </div>
                ) : (
                    <>
                        <div className="rounded-xl shadow-lg overflow-hidden mb-6 sm:mb-8" style={{ backgroundColor: 'rgb(var(--background))' }}>
                            <div className="h-32 sm:h-40 relative" style={{ background: 'linear-gradient(to right, rgb(var(--primary)), rgb(var(--accent)))' }}>
                                <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                                    {!editing ? (
                                        <button
                                            onClick={handleEdit}
                                            className="px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 shadow-md text-sm hover:opacity-90"
                                            style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white' }}
                                        >
                                            <Edit3 className="h-4 w-4" />
                                            <span>Edit Profile</span>
                                        </button>
                                    ) : (
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={handleSave}
                                                disabled={loading}
                                                className="px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-colors flex items-center space-x-2 shadow-md disabled:opacity-50 text-sm"
                                                style={{ backgroundColor: 'rgb(var(--primary))', color: 'rgb(var(--primary-foreground))' }}
                                            >
                                                <Save className="h-4 w-4" />
                                                <span>{loading ? 'Saving...' : 'Save'}</span>
                                            </button>
                                            <button
                                                onClick={handleCancel}
                                                disabled={loading}
                                                className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center space-x-2 shadow-md disabled:opacity-50 text-sm"
                                            >
                                                <X className="h-4 w-4" />
                                                <span>Cancel</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="px-6 sm:px-8 pb-6 sm:pb-8 text-white" style={{ backgroundColor: 'rgb(30, 41, 59)' }}>
                                <div className="flex flex-col sm:flex-row items-center sm:items-end space-y-4 sm:space-y-0 sm:space-x-6 -mt-16 sm:-mt-20">
                                    <div className="relative flex-shrink-0">
                                        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg overflow-hidden flex items-center justify-center" style={{ backgroundColor: 'rgb(71, 85, 105)' }}>
                                            {profileImagePreview ? (
                                                <Image
                                                    src={profileImagePreview}
                                                    alt="Profile"
                                                    className="w-full h-full object-cover"
                                                    width={128}
                                                    height={128}
                                                    unoptimized // Optional: remove if you want Next.js optimization
                                                />
                                            ) : (
                                                <div className="text-white text-2xl sm:text-4xl font-bold">
                                                    {getInitials(displayProfile.firstname || 'U', displayProfile.lastname || 'U')}
                                                </div>
                                            )}
                                        </div>
                                        {editing && (
                                            <>
                                                {/* Hidden file input */}
                                                <input
                                                    id="profileImageInput"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                    className="hidden"
                                                />
                                                {/* Button triggers file input */}
                                                <label
                                                    htmlFor="profileImageInput"
                                                    className="absolute bottom-2 right-2 p-2 text-white rounded-full hover:opacity-90 transition-colors shadow-md cursor-pointer"
                                                    style={{ backgroundColor: 'rgb(var(--primary))' }}
                                                    title="Change profile image"
                                                >
                                                    <Camera className="h-4 w-4" />
                                                </label>
                                            </>
                                        )}
                                    </div>
                                    <div className="text-center sm:text-left flex-1 min-w-0">
                                        <h1 className="text-xl sm:text-3xl font-bold text-white mb-1">
                                            {fullName || 'User Name'}
                                        </h1>
                                        <p className="text-sm sm:text-base mb-2" style={{ color: 'rgb(134, 239, 172)' }}>
                                            Member since {profile.joinDate ? new Date(profile.joinDate).toLocaleDateString() : 'N/A'}
                                        </p>
                                        <div className="flex items-center justify-center sm:justify-start space-x-4 text-sm">
                                            <div className="flex items-center space-x-2" style={{ color: 'rgb(134, 239, 172)' }}>
                                                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'rgb(74, 222, 128)' }}></div>
                                                <span className="font-medium">Active</span>
                                            </div>
                                            <div className="text-slate-300">•</div>
                                            <div className="text-slate-300">
                                                Last seen {profile.lastActive ? new Date(profile.lastActive).toLocaleDateString() : 'N/A'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
                            {/* Personal Information */}
                            <div className="xl:col-span-2 space-y-6 sm:space-y-8">
                                <div className="rounded-xl shadow-lg p-6 sm:p-8" style={{ backgroundColor: 'rgb(var(--background))' }}>
                                    <h2 className="text-xl sm:text-2xl font-bold mb-6 flex items-center" style={{ color: 'rgb(var(--foreground))' }}>
                                        <User className="h-6 w-6 mr-3" style={{ color: 'rgb(var(--primary))' }} />
                                        Personal Information
                                    </h2>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        {/* First Name */}
                                        <div>
                                            <label className="block text-sm font-medium mb-2" style={{ color: 'rgb(var(--muted-foreground))' }}>First Name</label>
                                            {editing ? (
                                                <input
                                                    type="text"
                                                    value={editedProfile.firstname}
                                                    onChange={(e) => handleInputChange('firstname', e.target.value)}
                                                    className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-offset-0 transition-all"
                                                    style={{
                                                        backgroundColor: 'rgb(var(--background))',
                                                        color: 'rgb(var(--foreground))',
                                                        border: '1px solid rgb(var(--border))'
                                                    }}
                                                    placeholder="Enter first name"
                                                />
                                            ) : (
                                                <div className="flex items-center space-x-3 p-3 rounded-lg" style={{ backgroundColor: 'rgb(var(--muted))' }}>
                                                    <User className="h-5 w-5" style={{ color: 'rgb(var(--muted-foreground))' }} />
                                                    <span style={{ color: 'rgb(var(--foreground))' }}>
                                                        {profile.firstname || 'Add first name'}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        {/* Last Name */}
                                        <div>
                                            <label className="block text-sm font-medium mb-2" style={{ color: 'rgb(var(--muted-foreground))' }}>Last Name</label>
                                            {editing ? (
                                                <input
                                                    type="text"
                                                    value={editedProfile.lastname}
                                                    onChange={(e) => handleInputChange('lastname', e.target.value)}
                                                    className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-offset-0 transition-all"
                                                    style={{
                                                        backgroundColor: 'rgb(var(--background))',
                                                        color: 'rgb(var(--foreground))',
                                                        border: '1px solid rgb(var(--border))'
                                                    }}
                                                    placeholder="Enter last name"
                                                />
                                            ) : (
                                                <div className="flex items-center space-x-3 p-3 rounded-lg" style={{ backgroundColor: 'rgb(var(--muted))' }}>
                                                    <User className="h-5 w-5" style={{ color: 'rgb(var(--muted-foreground))' }} />
                                                    <span style={{ color: 'rgb(var(--foreground))' }}>
                                                        {profile.lastname || 'Add last name'}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        {/* Email Address */}
                                        <div>
                                            <label className="block text-sm font-medium mb-2" style={{ color: 'rgb(var(--muted-foreground))' }}>Email Address</label>
                                            {editing ? (
                                                <input
                                                    type="email"
                                                    value={editedProfile.email}
                                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                                    className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-offset-0 transition-all"
                                                    style={{
                                                        backgroundColor: 'rgb(var(--background))',
                                                        color: 'rgb(var(--foreground))',
                                                        border: '1px solid rgb(var(--border))'
                                                    }}
                                                    placeholder="Enter email address"
                                                />
                                            ) : (
                                                <div className="flex items-center space-x-3 p-3 rounded-lg" style={{ backgroundColor: 'rgb(var(--muted))' }}>
                                                    <Mail className="h-5 w-5" style={{ color: 'rgb(var(--muted-foreground))' }} />
                                                    <span className="truncate" style={{ color: 'rgb(var(--foreground))' }}>
                                                        {profile.email || 'Add email address'}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        {/* Phone */}
                                        <div>
                                            <label className="block text-sm font-medium mb-2" style={{ color: 'rgb(var(--muted-foreground))' }}>Phone Number</label>
                                            {editing ? (
                                                <input
                                                    type="tel"
                                                    value={editedProfile.phone}
                                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                                    className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-offset-0 transition-all"
                                                    style={{
                                                        backgroundColor: 'rgb(var(--background))',
                                                        color: 'rgb(var(--foreground))',
                                                        border: '1px solid rgb(var(--border))'
                                                    }}
                                                    placeholder="Enter phone number"
                                                />
                                            ) : (
                                                <div className="flex items-center space-x-3 p-3 rounded-lg" style={{ backgroundColor: 'rgb(var(--muted))' }}>
                                                    <Phone className="h-5 w-5" style={{ color: 'rgb(var(--muted-foreground))' }} />
                                                    <span style={{ color: 'rgb(var(--foreground))' }}>
                                                        {profile.phone || 'Add phone number'}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        {/* DOB */}
                                        <div>
                                            <label className="block text-sm font-medium mb-2" style={{ color: 'rgb(var(--muted-foreground))' }}>Date of Birth</label>
                                            {editing ? (
                                                <input
                                                    type="date"
                                                    value={editedProfile.dateOfBirth}
                                                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                                                    className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-offset-0 transition-all"
                                                    style={{
                                                        backgroundColor: 'rgb(var(--background))',
                                                        color: 'rgb(var(--foreground))',
                                                        border: '1px solid rgb(var(--border))'
                                                    }}
                                                />
                                            ) : (
                                                <div className="flex items-center space-x-3 p-3 rounded-lg" style={{ backgroundColor: 'rgb(var(--muted))' }}>
                                                    <Calendar className="h-5 w-5" style={{ color: 'rgb(var(--muted-foreground))' }} />
                                                    <span style={{ color: 'rgb(var(--foreground))' }}>
                                                        {profile.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString() : 'Add date of birth'}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        {/* Location */}
                                        <div>
                                            <label className="block text-sm font-medium mb-2" style={{ color: 'rgb(var(--muted-foreground))' }}>Location</label>
                                            {editing ? (
                                                <input
                                                    type="text"
                                                    value={editedProfile.location}
                                                    onChange={(e) => handleInputChange('location', e.target.value)}
                                                    className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-offset-0 transition-all"
                                                    style={{
                                                        backgroundColor: 'rgb(var(--background))',
                                                        color: 'rgb(var(--foreground))',
                                                        border: '1px solid rgb(var(--border))'
                                                    }}
                                                    placeholder="Enter location"
                                                />
                                            ) : (
                                                <div className="flex items-center space-x-3 p-3 rounded-lg" style={{ backgroundColor: 'rgb(var(--muted))' }}>
                                                    <MapPin className="h-5 w-5" style={{ color: 'rgb(var(--muted-foreground))' }} />
                                                    <span style={{ color: 'rgb(var(--foreground))' }}>
                                                        {profile.location || 'Add location'}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {/* Privacy Preferences */}
                                <div className="rounded-xl shadow-lg p-6 sm:p-8" style={{ backgroundColor: 'rgb(var(--background))' }}>
                                    <h2 className="text-xl sm:text-2xl font-bold mb-6 flex items-center" style={{ color: 'rgb(var(--foreground))' }}>
                                        <Shield className="h-6 w-6 mr-3" style={{ color: 'rgb(var(--primary))' }} />
                                        Privacy Preferences
                                    </h2>

                                    <div className="space-y-6">
                                        {[
                                            { key: 'notifications', title: 'Email Notifications', desc: 'Receive health tips and updates via email' },
                                            { key: 'dataSharing', title: 'Data Sharing', desc: 'Share anonymized data for medical research' },
                                            { key: 'reminders', title: 'Health Reminders', desc: 'Get reminders for health checkups and medications' }
                                        ].map((pref) => (
                                            <div key={pref.key} className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'rgb(var(--muted))' }}>
                                                <div className="flex-1 min-w-0 mr-4">
                                                    <h3 className="font-semibold" style={{ color: 'rgb(var(--foreground))' }}>
                                                        {pref.title}
                                                    </h3>
                                                    <p className="text-sm mt-1" style={{ color: 'rgb(var(--muted-foreground))' }}>
                                                        {pref.desc}
                                                    </p>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={editing ? editedProfile.preferences[pref.key as keyof UserProfile['preferences']] : profile.preferences[pref.key as keyof UserProfile['preferences']]}
                                                        onChange={() => editing && handlePreferenceChange(pref.key as keyof UserProfile['preferences'])}
                                                        disabled={!editing}
                                                        className="sr-only peer"
                                                    />
                                                    <div
                                                        className="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"
                                                        style={{
                                                            backgroundColor: (editing && editedProfile.preferences[pref.key as keyof UserProfile['preferences']]) || (!editing && profile.preferences[pref.key as keyof UserProfile['preferences']]) ? 'rgb(var(--primary))' : 'rgb(var(--muted))'
                                                        }}
                                                    ></div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {/* Health Stats Sidebar */}
                            <div className="space-y-6 sm:space-y-8">
                                <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'rgb(var(--background))' }}>
                                    <h3 className="text-lg font-bold mb-4 flex items-center" style={{ color: 'rgb(var(--foreground))' }}>
                                        <Activity className="h-5 w-5 mr-2" style={{ color: 'rgb(var(--primary))' }} />
                                        Health Overview
                                    </h3>

                                    <div className="space-y-4">
                                        <div className="text-center">
                                            <div className="relative w-24 h-24 mx-auto mb-3">
                                                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                                                    <path
                                                        stroke="rgb(var(--muted))"
                                                        strokeWidth="3"
                                                        fill="none"
                                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                    />
                                                    <path
                                                        stroke="rgb(var(--primary))"
                                                        strokeWidth="3"
                                                        strokeDasharray={`${profile.healthScore}, 100`}
                                                        strokeLinecap="round"
                                                        fill="none"
                                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                    />
                                                </svg>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="text-2xl font-bold" style={{ color: 'rgb(var(--foreground))' }}>
                                                        {profile.healthScore}
                                                    </span>
                                                </div>
                                            </div>
                                            <p className="text-sm" style={{ color: 'rgb(var(--muted-foreground))' }}>Health Score</p>
                                        </div>

                                        <div className="border-t pt-4" style={{ borderColor: 'rgb(var(--border))' }}>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm" style={{ color: 'rgb(var(--muted-foreground))' }}>Total Consultations</span>
                                                <span className="font-semibold" style={{ color: 'rgb(var(--foreground))' }}>
                                                    {profile.consultations}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm" style={{ color: 'rgb(var(--muted-foreground))' }}>This Month</span>
                                                <span className="font-semibold" style={{ color: 'rgb(var(--primary))' }}>3</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'rgb(var(--background))' }}>
                                    <h3 className="text-lg font-bold mb-4 flex items-center" style={{ color: 'rgb(var(--foreground))' }}>
                                        <Heart className="h-5 w-5 mr-2 text-red-500" />
                                        Recent Activity
                                    </h3>
                                    <div className="space-y-3">
                                        {[
                                            { text: 'Health consultation', time: '2 hours ago', color: 'rgb(var(--primary))' },
                                            { text: 'Profile updated', time: '1 day ago', color: 'rgb(var(--accent))' },
                                            { text: 'Health reminder set', time: '3 days ago', color: 'rgb(234, 179, 8)' },
                                        ].map((activity, index) => (
                                            <div key={index} className="flex items-center space-x-3 p-3 rounded-lg" style={{ backgroundColor: 'rgb(var(--muted))' }}>
                                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: activity.color }}></div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium truncate" style={{ color: 'rgb(var(--foreground))' }}>
                                                        {activity.text}
                                                    </p>
                                                    <p className="text-xs" style={{ color: 'rgb(var(--muted-foreground))' }}>{activity.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'rgb(var(--background))' }}>
                                    <h3 className="text-lg font-bold mb-4 flex items-center" style={{ color: 'rgb(var(--foreground))' }}>
                                        <Clock className="h-5 w-5 mr-2" style={{ color: 'rgb(var(--primary))' }} />
                                        Quick Actions
                                    </h3>
                                    <div className="space-y-3">
                                        <button
                                            className="w-full transition-colors rounded-lg p-3 text-left"
                                            style={{
                                                backgroundColor: 'rgb(var(--muted))',
                                                color: 'rgb(var(--foreground))',
                                                border: '1px solid rgb(var(--border))',
                                            }}
                                        >
                                            <p className="font-medium">Schedule Consultation</p>
                                            <p className="text-sm" style={{ color: 'rgb(var(--muted-foreground))' }}>
                                                Book your next health check
                                            </p>
                                        </button>
                                        <button
                                            className="w-full transition-colors rounded-lg p-3 text-left"
                                            style={{
                                                backgroundColor: 'rgb(var(--muted))',
                                                color: 'rgb(var(--foreground))',
                                                border: '1px solid rgb(var(--border))',
                                            }}
                                        >
                                            <p className="font-medium">Health Assessment</p>
                                            <p className="text-sm" style={{ color: 'rgb(var(--muted-foreground))' }}>
                                                Take a quick health quiz
                                            </p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Profile;
