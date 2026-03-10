// ================================================
// SPARK STORE - INSERT CLAUDE AI
// Source: wmcentre.su -> https://wmcentre.su/en/item/claude-ai-anthropic-lichnyy-akk-3955439
// Paste this in the browser console while on the ADMIN PAGE (after login)
// ================================================
(async () => {
  const WM = 'https://wmcentre.su/en';
  const now = new Date().toISOString();
  
  const products = [
    {
      id: 'claude-ai-pro',
      name_ar: 'كلود الذكاء الاصطناعي (Claude AI)',
      name_en: 'Claude AI by Anthropic',
      description_ar: 'حساب شخصي لـ Claude AI من شركة Anthropic، البديل الأقوى لـ ChatGPT والمتميز في تحليل المستندات البرمجة والكتابة الإبداعية.',
      description_en: 'Personal Claude AI account by Anthropic, the most powerful alternative to ChatGPT, excelling in document analysis, coding, and creative writing.',
      features_ar: 'مستوى ذكاء اصطناعي فائق (Claude 3.5 Sonnet)\nنافذة سياق ضخمة لتحليل الملفات الطويلة\nالقدرة على كتابة أكواد برمجية معقدة جداً\nكتابة وتحليل النصوص بدقة عالية وإبداع\nتسليم سريع لحساب شخصي خاص بك',
      features_en: 'Super advanced AI model (Claude 3.5 Sonnet)\nMassive context window for long documents\nAbility to write highly complex code\nAccurate and creative text writing & analysis\nFast delivery of your own personal account',
      price: 3.99, // Selling price
      currency: 'USD',
      category: 'software',
      available: true,
      featured: true,
      image: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Claude_AI_logo.svg', // Claude Logo
      duration_ar: 'حساب شخصي دائم (الخطة المجانية المتقدمة)', duration_en: 'Personal Account', 
      requirements_ar: 'استلام كامل لمعلومات الدخول للحساب', requirements_en: 'Full access details will be provided',
      source_url: `${WM}/item/claude-ai-anthropic-lichnyy-akk-3955439`,
      subscription_plans: [
        { label_ar: 'حساب شخصي جاهز', label_en: 'Ready Personal Account', price: 3.99, source_url: `${WM}/item/claude-ai-anthropic-lichnyy-akk-3955439` }
      ],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
      sort_order: 35, // Putting it near other AI products like DeepSeek
      updated_at: now
    }
  ];

  let ok = 0, fail = 0;
  console.log('%c⚡ Spark - Inserting Claude AI product...', 'color:#d97757;font-size:14px;font-weight:bold');
  for (const p of products) {
    try {
      const { error } = await sb.from('products').upsert(p, { onConflict: 'id' });
      if (error) { console.error('❌', p.name_ar, error.message); fail++; }
      else { console.log('%c✅ ' + p.name_ar, 'color:#4ade80'); ok++; }
    } catch(e) { console.error('❌', p.name_ar, e.message); fail++; }
  }
  console.log(`%c🏁 Done! ✅ ${ok} added | ❌ ${fail} failed`, `color:${ok > 0 ? '#4ade80' : '#f87171'};font-size:13px;font-weight:bold`);
})();
