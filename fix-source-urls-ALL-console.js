// ================================================
// SPARK STORE - FIX SOURCE_URLS (BATCH-WISE PROCESSING)
// Uses STABLE CATEGORY LINKS — most reliable, never 404
// ================================================
(async () => {
  const Z = 'https://www.z2u.com';
  
  // Mapping of Product IDs to stable Z2U category URLs
  // This is BATCH 1 (1-10)
  const stableLinks = {
    'shahid-vip': `${Z}/shahid/accounts-5-20081`,
    'netflix-premium': `${Z}/netflix/accounts-5-8229`, // Ensure ID matches your Supabase DB
    'spotify-premium': `${Z}/spt/subscriptions-12-10207`,
    'chatgpt-plus': `${Z}/chatgpt/accounts-5-20670`,
    'xbox-game-pass': `${Z}/xbox/subscriptions-12-10189`,
    'discord-nitro': `${Z}/discord/subscriptions-12-15127`,
    'canva-pro': `${Z}/canva/subscriptions-12-16486`,
    'adobe-creative-cloud': `${Z}/adobe/subscriptions-12-16487`,
    'youtube-premium': `${Z}/youtube/accounts-5-8242`,
    'steam-gift-card': `${Z}/steam/gift-cards-10-8221`
  };

  const productIds = Object.keys(stableLinks);
  let ok = 0, fail = 0, skip = 0;
  
  console.log(`%c🔗 Spark - Fixing Batch 1 (1-10)...`, 'color:#8b5cf6;font-size:14px;font-weight:bold');

  for (const id of productIds) {
    try {
      const url = stableLinks[id];
      // Fetch the product to update its specific plans
      const { data: row } = await sb.from('products').select('subscription_plans').eq('id', id).maybeSingle();

      if (!row) { 
        console.log('%c⏭️ Product ID not found in DB: ' + id, 'color:#94a3b8'); 
        skip++; continue; 
      }

      // Update all nested plans to use the new stable source_url
      const plans = (row.subscription_plans || []).map(p => ({ ...p, source_url: url }));

      // Update the main product row
      const { error } = await sb.from('products')
        .update({ source_url: url, subscription_plans: plans })
        .eq('id', id);

      if (error) { console.error('❌ Error updating ' + id + ':', error.message); fail++; }
      else { console.log('%c✅ Fixed: ' + id, 'color:#4ade80'); ok++; }
    } catch(e) { console.error('❌ Exception for ' + id + ':', e.message); fail++; }
    await new Promise(r => setTimeout(r, 100)); // Small delay for safety
  }

  console.log(`%c🏁 Batch 1 Complete! ✅ ${ok} Fixed | ⏭️ ${skip} Skipped | ❌ ${fail} Failed`, `color:${fail === 0 ? '#4ade80' : '#f87171'};font-size:13px;font-weight:bold`);
  console.log('%cيرجى التأكد من النتائج وإخباري للانتقال للدفعة التالية.', 'color:#3b82f6;font-weight:bold');
})();
