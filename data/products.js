// Static seed data for the server-side product store
const products = [
  {
    id: 1,
    icon: "🔵",
    iconBg: "#e8f4ff",
    name: { en: "Veo3 + Anti Ultra 25K (no watermark) credit warranty 24 hours", bn: "Veo3 + অ্যান্টি আলট্রা ২৫K (ওয়াটারমার্ক ছাড়া) ক্রেডিট ওয়ারেন্টি ২৪ ঘণ্টা" },
    shortDesc: { en: "Credits can only be used for veo3, not for antigravity. Note: This product can be used with anti, but the quality is not guaranteed.", bn: "ক্রেডিট শুধুমাত্র Veo3 এ ব্যবহার করা যাবে। মান নিশ্চিত নয়।" },
    fullDesc: { en: "Google Veo3 Ultra account with 25,000 credits and Antigravity access. 24-hour warranty period.", bn: "Google Veo3 Ultra অ্যাকাউন্ট, ২৫,০০০ ক্রেডিট ও Antigravity অ্যাক্সেস সহ। ২৪ ঘণ্টার ওয়ারেন্টি।" },
    stock: 47, sold: 7174, usdt: 2.50, bdt: 259,
  },
  {
    id: 2,
    icon: "🔵",
    iconBg: "#e8f4ff",
    name: { en: "Veo3 + Anti Ultra 25k (no watermark) 30-Day credit guarantee", bn: "Veo3 + অ্যান্টি আলট্রা ২৫K (ওয়াটারমার্ক ছাড়া) ৩০ দিনের ক্রেডিট গ্যারান্টি" },
    shortDesc: { en: "Google Veo3 Ultra account with 25,000 credits and Antigravity access. Extended 30-day warranty period.", bn: "Google Veo3 Ultra অ্যাকাউন্ট, ২৫,০০০ ক্রেডিট ও Antigravity অ্যাক্সেস সহ। ৩০ দিনের ওয়ারেন্টি।" },
    fullDesc: { en: "Full Google Veo3 Ultra account including Antigravity access with 25,000 credits. 30-day credit guarantee.", bn: "সম্পূর্ণ Google Veo3 Ultra অ্যাকাউন্ট, Antigravity অ্যাক্সেস ও ২৫,০০০ ক্রেডিট সহ। ৩০ দিনের ক্রেডিট গ্যারান্টি।" },
    stock: 55, sold: 1527, usdt: 10.50, bdt: 1129,
  },
  {
    id: 3,
    icon: "🅰️",
    iconBg: "#eef0ff",
    name: { en: "Admin Family Ultra 25k Credit 1 month with 3 days warranty", bn: "অ্যাডমিন ফ্যামিলি আলট্রা ২৫K ক্রেডিট ১ মাস, ৩ দিনের ওয়ারেন্টি সহ" },
    shortDesc: { en: "Premium Google Workspace family slot with Antigravity Ultra, 25,000 credits, 30TB Google Drive.", bn: "Antigravity Ultra সহ প্রিমিয়াম Google Workspace ফ্যামিলি স্লট, ২৫,০০০ ক্রেডিট, ৩০TB Google Drive।" },
    fullDesc: { en: "Admin-level Google Workspace family slot with Antigravity Ultra access and 25,000 credits. 3-day replacement warranty.", bn: "Antigravity Ultra অ্যাক্সেস ও ২৫,০০০ ক্রেডিট সহ অ্যাডমিন লেভেলের Google Workspace স্লট। ৩ দিনের ওয়ারেন্টি।" },
    stock: 2, sold: 1, usdt: 44.50, bdt: 4459,
  },
  {
    id: 4,
    icon: "🟠",
    iconBg: "#fff3e8",
    name: { en: "ChatGPT Plus 1 Month Shared Account", bn: "ChatGPT Plus ১ মাস শেয়ার্ড অ্যাকাউন্ট" },
    shortDesc: { en: "Access to ChatGPT Plus features including GPT-4, DALL-E image generation, and priority access.", bn: "GPT-4, DALL-E ইমেজ জেনারেশন এবং পিক টাইমে অগ্রাধিকার অ্যাক্সেস সহ ChatGPT Plus।" },
    fullDesc: { en: "Shared ChatGPT Plus account for 1 month. Includes full GPT-4, DALL-E 3, Browse with Bing, Advanced Data Analysis.", bn: "১ মাসের শেয়ার্ড ChatGPT Plus অ্যাকাউন্ট। GPT-4, DALL-E 3, Browse with Bing অন্তর্ভুক্ত।" },
    stock: 30, sold: 892, usdt: 5.00, bdt: 529,
  },
  {
    id: 5,
    icon: "🎵",
    iconBg: "#edfff3",
    name: { en: "Spotify Premium 3 Months Individual", bn: "Spotify প্রিমিয়াম ৩ মাস ইন্ডিভিজুয়াল" },
    shortDesc: { en: "Ad-free music streaming with offline downloads and unlimited skips.", bn: "অফলাইন ডাউনলোড ও আনলিমিটেড স্কিপ সহ বিজ্ঞাপনমুক্ত মিউজিক স্ট্রিমিং।" },
    fullDesc: { en: "3 months Spotify Premium Individual. Ad-free, offline on 5 devices, 320kbps quality.", bn: "৩ মাসের Spotify Premium। বিজ্ঞাপনমুক্ত, ৫ ডিভাইসে অফলাইন, ৩২০kbps।" },
    stock: 88, sold: 3410, usdt: 4.50, bdt: 469,
  },
  {
    id: 6,
    icon: "📺",
    iconBg: "#fff0f0",
    name: { en: "Netflix Premium UHD 1 Month", bn: "Netflix প্রিমিয়াম UHD ১ মাস" },
    shortDesc: { en: "4K Ultra HD Netflix Premium plan for 1 month — watch on 4 screens simultaneously.", bn: "১ মাসের 4K Ultra HD Netflix Premium — একই সময়ে ৪টি স্ক্রিনে দেখুন।" },
    fullDesc: { en: "Full Netflix Premium UHD subscription for 1 month. 4K on 4 devices simultaneously. Instant delivery.", bn: "১ মাসের সম্পূর্ণ Netflix Premium UHD সাবস্ক্রিপশন। ৪ ডিভাইসে 4K। তাৎক্ষণিক ডেলিভারি।" },
    stock: 45, sold: 5620, usdt: 6.50, bdt: 679,
  },
]

module.exports = { products }
