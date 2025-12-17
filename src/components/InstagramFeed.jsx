import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Instagram, ExternalLink } from 'lucide-react';

const InstagramFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Instagram Basic Display API (FREE - No cost)
  // Get these from: https://developers.facebook.com/apps/
  const INSTAGRAM_ACCESS_TOKEN = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN;
  const INSTAGRAM_USER_ID = import.meta.env.VITE_INSTAGRAM_USER_ID;

  useEffect(() => {
    if (INSTAGRAM_ACCESS_TOKEN && INSTAGRAM_USER_ID) {
      fetchInstagramPosts();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchInstagramPosts = async () => {
    try {
      setLoading(true);
      // Instagram Basic Display API - FREE
      const response = await fetch(
        `https://graph.instagram.com/${INSTAGRAM_USER_ID}/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${INSTAGRAM_ACCESS_TOKEN}&limit=6`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to fetch Instagram posts');
      }

      const data = await response.json();
      setPosts(data.data || []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching Instagram posts:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <section id="instagram" className="py-16 md:py-20 lg:py-24 bg-[#000000]">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Instagram className="h-8 w-8 text-[#C9A24D]" />
            <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Follow Our Journey
            </h2>
          </div>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
            See what's happening at The Club Bali on Instagram
          </p>
          <a
            href="https://www.instagram.com/theclub_bali/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 text-[#C9A24D] hover:text-[#d6b15b] transition-colors font-sans"
          >
            @theclub_bali
          </a>
        </motion.div>

        {/* Loading State */}
        {loading && INSTAGRAM_ACCESS_TOKEN && (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-[#C9A24D] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-gray-900/50 rounded-lg p-8 text-center max-w-2xl mx-auto">
            <p className="text-red-400 mb-4">Error: {error}</p>
            <p className="text-gray-300 text-sm mb-4">
              Check your API credentials or see INSTAGRAM_FEED_GUIDE.md for setup instructions
            </p>
            <a
              href="https://www.instagram.com/theclub_bali/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#C9A24D] hover:underline"
            >
              Visit our Instagram <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        )}

        {/* Instagram Posts Grid */}
        {!loading && !error && posts.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {posts.map((post, index) => (
              <motion.a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group aspect-square overflow-hidden rounded-lg bg-gray-900"
              >
                <img
                  src={post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url}
                  alt={post.caption?.substring(0, 100) || 'Instagram post'}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  {post.media_type === 'VIDEO' && (
                    <div className="text-white text-2xl">▶️</div>
                  )}
                  {post.media_type !== 'VIDEO' && (
                    <ExternalLink className="h-6 w-6 text-white" />
                  )}
                </div>
              </motion.a>
            ))}
          </div>
        )}

        {/* Setup Instructions - Show if API not configured */}
        {!INSTAGRAM_ACCESS_TOKEN && !loading && (
          <div className="bg-gray-900/50 rounded-lg p-8 text-center max-w-3xl mx-auto">
            <p className="text-gray-300 mb-6">
              Set up your free Instagram feed using Instagram's Basic Display API (100% FREE)
            </p>
            <div className="bg-gray-800/50 rounded-lg p-6 text-left space-y-4">
              <h3 className="text-[#C9A24D] font-semibold text-lg mb-4">Quick Setup (5 minutes):</h3>
              <ol className="text-gray-300 text-sm space-y-3 list-decimal list-inside">
                <li>
                  Go to <a href="https://developers.facebook.com/apps/" target="_blank" rel="noopener noreferrer" className="text-[#C9A24D] hover:underline">Facebook Developers</a> and create a new app
                </li>
                <li>Add "Instagram Basic Display" product to your app</li>
                <li>Create an OAuth redirect URI (can be any URL, e.g., https://yourdomain.com)</li>
                <li>Generate a token using the Instagram Basic Display API tester</li>
                <li>Copy your User ID from the API response</li>
                <li>Add these to your <code className="bg-gray-900 px-2 py-1 rounded">.env</code> file:
                  <pre className="bg-gray-900 p-3 rounded mt-2 text-xs overflow-x-auto">
{`VITE_INSTAGRAM_ACCESS_TOKEN=your_token_here
VITE_INSTAGRAM_USER_ID=your_user_id_here`}
                  </pre>
                </li>
              </ol>
              <p className="text-gray-400 text-xs mt-4">
                📖 See INSTAGRAM_FEED_GUIDE.md for detailed step-by-step instructions
              </p>
            </div>
            <a
              href="https://www.instagram.com/theclub_bali/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-[#C9A24D] hover:underline"
            >
              Visit our Instagram in the meantime <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        )}

        {/* No Posts State */}
        {!loading && !error && INSTAGRAM_ACCESS_TOKEN && posts.length === 0 && (
          <div className="text-center text-gray-400">
            <p>No posts available. Check back soon!</p>
            <a
              href="https://www.instagram.com/theclub_bali/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-[#C9A24D] hover:underline"
            >
              Visit our Instagram <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default InstagramFeed;

