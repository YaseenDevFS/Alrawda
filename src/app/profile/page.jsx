// frontend/src/app/profile/page.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { 
  User, Calendar, MapPin, Link as LinkIcon, 
  Heart, MessageCircle, Share2, BookOpen, Award, 
  Users, Edit2, Check, X, Mail, 
  Activity, Target, LogOut, Loader2, Trophy
} from 'lucide-react';
import { useRouter } from 'next/navigation';

function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    location: '',
    website: '',
    role: 'Quran Learner',
    level: 'Beginner'
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const response = await fetch('https://alrawda-backend.vercel.app/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          setFormData({
            name: data.user.name || '',
            email: data.user.email || '',
            bio: data.user.bio || 'Passionate about learning and memorizing the Quran.',
            location: data.user.location || '',
            website: data.user.website || '',
            role: data.user.role || 'Quran Learner',
            level: data.user.level || 'Beginner'
          });
        } else {
          localStorage.removeItem('token');
          router.push('/login');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
        location: user.location || '',
        website: user.website || '',
        role: user.role || 'Quran Learner',
        level: user.level || 'Beginner'
      });
    }
    setIsEditing(false);
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('https://alrawda-backend.vercel.app/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#051410]">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-emerald-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400 text-base">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const stats = [
    { icon: BookOpen, label: "Quran Completed", value: "0", total: "30", unit: "Juz", color: "emerald" },
    { icon: Award, label: "Memorization Streak", value: "0", unit: "days", color: "amber" },
    { icon: Users, label: "Followers", value: "0", change: "+0%", color: "blue" },
    { icon: Heart, label: "Posts Likes", value: "0", change: "+0%", color: "rose" }
  ];

  const communityPosts = [
    { id: 1, user: { name: user.name, avatar: "🤲", role: user.role || "Quran Learner", level: user.level || "Beginner" }, content: "Started my Quran journey today! 🤲", likes: 0, comments: 0, shares: 0, time: "Just now", type: "achievement" }
  ];

  return (
    <div className="h-screen bg-[#051410] sm:mb-10 overflow-hidden">
      {/* Main Scrollable Content */}
      <div className="h-full overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-emerald-500/20">
        <div className="py-6 px-4 max-w-7xl mx-auto">
          
          {/* Cover Photo & Avatar Section */}
          <div className="relative mb-20">
            <div className="h-40 lg:h-48 rounded-xl bg-gradient-to-r from-emerald-600/30 to-emerald-800/30 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1584551246679-258d75b120e6?w=1200')] bg-cover bg-center opacity-20"></div>
            </div>
            
            {/* Avatar */}
            <div className="absolute -bottom-10 left-6 lg:left-8">
              <div className="relative">
                <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-xl bg-gradient-to-br from-emerald-400/30 to-emerald-600/30 flex items-center justify-center text-4xl border-4 border-black shadow-xl">
                  🤲
                </div>
              </div>
            </div>
          </div>

          {/* Profile Info Section */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap mb-2">
                <h1 className="text-2xl lg:text-3xl font-bold text-white">{user.name}</h1>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium border border-emerald-500/30">
                  {formData.role}
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium border border-blue-500/30">
                  Level: {formData.level}
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-3">@{user.name?.toLowerCase().replace(/\s/g, '_')}</p>
              
              {!isEditing ? (
                <>
                  <p className="text-gray-300 text-sm leading-relaxed max-w-2xl mb-4">{formData.bio}</p>
                  <div className="flex flex-wrap gap-4 text-gray-400 text-sm">
                    {formData.location && (
                      <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {formData.location}</div>
                    )}
                    <div className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> {user.email}</div>
                    <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Joined {new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
                    {formData.website && (
                      <div className="flex items-center gap-1.5"><LinkIcon className="w-4 h-4" /> <a href="#" className="text-emerald-400 hover:underline">{formData.website}</a></div>
                    )}
                  </div>
                </>
              ) : (
                <div className="space-y-4 max-w-2xl">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-gray-400 text-sm block mb-1">Name</label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-black/50 border border-emerald-500/30 text-white text-sm focus:outline-none focus:border-emerald-400" />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm block mb-1">Email</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-black/50 border border-emerald-500/30 text-white text-sm focus:outline-none focus:border-emerald-400" />
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm block mb-1">Bio</label>
                    <textarea name="bio" rows={3} value={formData.bio} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-black/50 border border-emerald-500/30 text-white text-sm focus:outline-none focus:border-emerald-400"></textarea>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-gray-400 text-sm block mb-1">Location</label>
                      <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-black/50 border border-emerald-500/30 text-white text-sm focus:outline-none focus:border-emerald-400" />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm block mb-1">Website</label>
                      <input type="text" name="website" value={formData.website} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-black/50 border border-emerald-500/30 text-white text-sm focus:outline-none focus:border-emerald-400" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-gray-400 text-sm block mb-1">Role</label>
                      <select name="role" value={formData.role} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-black/50 border border-emerald-500/30 text-white text-sm focus:outline-none focus:border-emerald-400">
                        <option>Quran Learner</option>
                        <option>Quran Memorizer</option>
                        <option>Quran Teacher</option>
                        <option>Islamic Scholar</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm block mb-1">Level</label>
                      <select name="level" value={formData.level} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-black/50 border border-emerald-500/30 text-white text-sm focus:outline-none focus:border-emerald-400">
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                        <option>Expert</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex gap-3">
              {!isEditing ? (
                <>
                  <button onClick={handleEditToggle} className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 text-emerald-400 text-sm font-medium hover:from-emerald-500/30 hover:to-emerald-600/30 transition-all duration-300 border border-emerald-500/30">
                    <Edit2 className="w-4 h-4 inline ml-1" /> Edit Profile
                  </button>
                  <button onClick={handleLogout} className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-400 text-sm font-medium hover:from-red-500/30 hover:to-red-600/30 transition-all duration-300 border border-red-500/30">
                    <LogOut className="w-4 h-4 inline ml-1" /> Logout
                  </button>
                </>
              ) : (
                <>
                  <button onClick={handleSave} className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300">
                    <Check className="w-4 h-4 inline ml-1" /> Save
                  </button>
                  <button onClick={handleCancel} className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-gray-500/20 to-gray-600/20 text-gray-400 text-sm font-medium hover:from-gray-500/30 hover:to-gray-600/30 transition-all duration-300 border border-gray-500/30">
                    <X className="w-4 h-4 inline ml-1" /> Cancel
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="group relative overflow-hidden bg-gradient-to-br from-black/90 via-emerald-950/30 to-black/90 backdrop-blur-sm rounded-xl p-4 border border-emerald-500/30 hover:border-emerald-400/50 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-emerald-400" />
                      </div>
                      {stat.change && <span className="text-emerald-400 text-xs font-semibold">{stat.change}</span>}
                    </div>
                    <h3 className="text-gray-200 text-xl font-bold">{stat.value}{stat.total && <span className="text-gray-500 text-sm">/{stat.total}</span>}</h3>
                    <p className="text-gray-500 text-sm">{stat.label}{stat.unit && ` • ${stat.unit}`}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Posts Section */}
          <div className="space-y-4 mb-6">
            <h3 className="text-white font-semibold text-lg mb-3">My Posts</h3>
            
            {communityPosts.map((post) => (
              <div key={post.id} className="group relative overflow-hidden bg-gradient-to-br from-black/90 via-emerald-950/30 to-black/90 backdrop-blur-sm rounded-xl border border-emerald-500/30 hover:border-emerald-400/50 transition-all duration-500">
                <div className="relative p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400/30 to-emerald-600/30 flex items-center justify-center text-xl border border-emerald-500/30">{post.user.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-gray-200 font-semibold text-sm">{post.user.name}</h4>
                        <span className="text-emerald-400 text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">{post.user.role}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <span>{post.time}</span><span>•</span><span>Level: {post.user.level}</span>
                      </div>
                    </div>
                    <button className="text-emerald-400/70 hover:text-emerald-300 transition-colors"><Heart className="w-4 h-4" /></button>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">{post.content}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-emerald-500/20">
                    <div className="flex items-center gap-4">
                      {[Heart, MessageCircle, Share2].map((Icon, i) => (
                        <button key={i} className="flex items-center gap-1.5 text-gray-400 hover:text-emerald-400 transition-colors group/btn">
                          <Icon className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                          <span className="text-xs">{i === 0 ? post.likes : i === 1 ? post.comments : post.shares}</span>
                        </button>
                      ))}
                    </div>
                    <span className="text-emerald-400 text-xs px-2 py-1 rounded-full bg-emerald-500/10">{post.type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Guidelines Section */}
          <div className="group relative overflow-hidden bg-gradient-to-br from-black/90 via-emerald-950/30 to-black/90 backdrop-blur-sm rounded-xl border border-emerald-500/30 p-5 mb-4">
            <div className="relative">
              <h3 className="text-gray-200 font-semibold text-base mb-3">Community Guidelines</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                {["Respect all members and their opinions", "Share authentic Islamic knowledge only", "No spam or promotional content", "Encourage and support fellow members"].map((rule, i) => (
                  <li key={i} className="flex items-start gap-2"><span className="text-emerald-400">•</span><span>{rule}</span></li>
                ))}
              </ul>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;