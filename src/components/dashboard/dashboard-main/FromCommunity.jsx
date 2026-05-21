import React from 'react';
import { Users, MessageCircle, Heart, Share2, BookOpen, Award, TrendingUp, Sparkles } from 'lucide-react';

function FromCommunity() {
  const communityPosts = [
    { id: 1, user: { name: "Ahmed Mansour", avatar: "🤲", role: "Quran Memorizer", level: "Advanced" }, content: "Just completed memorizing Surah Al-Mulk! Alhamdulillah! 🎉", likes: 234, comments: 45, shares: 12, time: "2 hours ago", type: "achievement" },
    { id: 2, user: { name: "Fatima Al-Zahra", avatar: "🕌", role: "Islamic Scholar", level: "Expert" }, content: "Today's reflection: 'Indeed, prayer prohibits immorality and wrongdoing' (Quran 29:45). Let's strengthen our connection with Allah through daily prayers.", likes: 567, comments: 89, shares: 34, time: "5 hours ago", type: "reflection" },
    { id: 3, user: { name: "Yusuf Khan", avatar: "📖", role: "Quran Teacher", level: "Professional" }, content: "Tips for memorization: Repeat each verse 5 times in the morning and 5 times in the evening. Consistency is key!", likes: 892, comments: 123, shares: 67, time: "1 day ago", type: "tip" }
  ];

  const communityStats = [
    { icon: Users, label: "Community Members", value: "2,847", change: "+12%" },
    { icon: MessageCircle, label: "Daily Posts", value: "156", change: "+8%" },
    { icon: BookOpen, label: "Quran Sessions", value: "43", change: "+5%" },
    { icon: Award, label: "Active Challengers", value: "892", change: "+15%" }
  ];

  const trendingTopics = [
    { topic: "Surah Al-Kahf", posts: 234, icon: "📖" },
    { topic: "Ramadan Prep", posts: 189, icon: "🌙" },
    { topic: "Tajweed Tips", posts: 156, icon: "🎤" },
    { topic: "Dua Collection", posts: 143, icon: "🤲" }
  ];

  return (
    <div className="py-10 z-50 px-2">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-emerald-400 border-emerald-500 border-l-4 pl-2 text-xl lg:text-2xl font-semibold">Community Feed</h2>
          <button className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 text-emerald-300 text-sm font-medium hover:from-emerald-500/30 hover:to-emerald-600/30 transition-all duration-300 border border-emerald-500/30">
            <Sparkles className="w-4 h-4 inline mr-1" /> New Post
          </button>
        </div>
        <p className="text-gray-400 text-sm mt-2">Connect, share, and grow with fellow Quran enthusiasts</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {communityStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="group relative overflow-hidden bg-gradient-to-br from-black/90 via-emerald-950/30 to-black/90 backdrop-blur-sm rounded-xl p-4 border border-emerald-500/30 hover:border-emerald-400/50 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-emerald-400 text-xs font-semibold">{stat.change}</span>
                </div>
                <h3 className="text-gray-200 text-lg font-bold">{stat.value}</h3>
                <p className="text-gray-500 text-xs">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Posts Feed */}
        <div className="lg:col-span-2 space-y-4">
          {communityPosts.map((post) => (
            <div key={post.id} className="group relative overflow-hidden bg-gradient-to-br from-black/90 via-emerald-950/30 to-black/90 backdrop-blur-sm rounded-2xl border border-emerald-500/30 hover:border-emerald-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
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
                      <button key={i} className="flex items-center gap-1 text-gray-400 hover:text-emerald-400 transition-colors group/btn">
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
          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 hover:from-emerald-500/20 hover:to-emerald-600/20 text-emerald-400 text-sm font-medium transition-all duration-300 border border-emerald-500/30">Load More Posts</button>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trending */}
          <div className="group relative overflow-hidden bg-gradient-to-br from-black/90 via-emerald-950/30 to-black/90 backdrop-blur-sm rounded-2xl border border-emerald-500/30 p-5">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative">
              <div className="flex items-center gap-2 mb-4"><TrendingUp className="w-5 h-5 text-emerald-400" /><h3 className="text-gray-200 font-semibold">Trending Topics</h3></div>
              <div className="space-y-3">
                {trendingTopics.map((topic, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-emerald-500/5 transition-all duration-300 cursor-pointer group/topic">
                    <div className="flex items-center gap-2"><span className="text-lg">{topic.icon}</span><span className="text-gray-300 text-sm group-hover/topic:text-emerald-400 transition-colors">{topic.topic}</span></div>
                    <span className="text-emerald-400 text-xs">{topic.posts} posts</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Guidelines */}
          <div className="group relative overflow-hidden bg-gradient-to-br from-black/90 via-emerald-950/30 to-black/90 backdrop-blur-sm rounded-2xl border border-emerald-500/30 p-5">
            <div className="relative">
              <h3 className="text-gray-200 font-semibold mb-3">Community Guidelines</h3>
              <ul className="space-y-2 text-gray-400 text-xs">
                {["Respect all members and their opinions", "Share authentic Islamic knowledge only", "No spam or promotional content", "Encourage and support fellow members"].map((rule, i) => (
                  <li key={i} className="flex items-start gap-2"><span className="text-emerald-400">•</span><span>{rule}</span></li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="group relative overflow-hidden mb-20 lg:mb-0 md:mb-0 bg-gradient-to-br from-emerald-600/20 via-emerald-500/10 to-emerald-600/20 backdrop-blur-sm rounded-2xl border border-emerald-500/40 p-5">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-emerald-400/30 to-emerald-600/30 flex items-center justify-center"><Users className="w-6 h-6 text-emerald-400" /></div>
              <h3 className="text-gray-200 font-semibold mb-2">Join Our Community</h3>
              <p className="text-gray-400 text-xs mb-3">Be part of our growing family of Quran enthusiasts</p>
              <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300">Join Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FromCommunity;