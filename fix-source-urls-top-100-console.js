// ================================================
// SPARK STORE - FIX SOURCE_URL (AD LINKS) FOR PRODUCTS 1-100 (FIRST BATCH)
// Paste this in the browser console while on the ADMIN PAGE (after login)
// ================================================
(async () => {
  const Z2U = 'https://www.z2u.com';

  const fixes = [
    // ===== PART 1: Gaming (1-25) =====
    { id: 'ea-play-pro',              source_url: `${Z2U}/ea/ea-play-6-243`,            plans: [{ label_en: '1 Month', url: `${Z2U}/ea/ea-play-6-243` }] },
    { id: 'ubisoft-plus-premium',     source_url: `${Z2U}/ubisoft-plus/subscriptions-6-337`, plans: [{ label_en: '1 Month', url: `${Z2U}/ubisoft-plus/subscriptions-6-337` }] },
    { id: 'nintendo-switch-online',   source_url: `${Z2U}/nintendo/online-6-179`,       plans: [{ label_en: '1 Month', url: `${Z2U}/nintendo/online-6-179` }, { label_en: '1 Year', url: `${Z2U}/nintendo/online-6-179` }] },
    { id: 'geforce-now-ultimate',     source_url: `${Z2U}/geforce-now/memberships-6-311`, plans: [{ label_en: '1 Month', url: `${Z2U}/geforce-now/memberships-6-311` }] },
    { id: 'roblox-premium',           source_url: `${Z2U}/roblox/robux-6-68`,          plans: [{ label_en: '450 Robux/mo', url: `${Z2U}/roblox/robux-6-68` }] },
    { id: 'fortnite-crew',            source_url: `${Z2U}/fortnite/vbucks-6-56`,        plans: [{ label_en: '1 Month', url: `${Z2U}/fortnite/vbucks-6-56` }] },
    { id: 'minecraft-realms-plus',    source_url: `${Z2U}/minecraft/gift-cards-6-113`,  plans: [{ label_en: '1 Month', url: `${Z2U}/minecraft/gift-cards-6-113` }] },
    { id: 'faceit-premium',           source_url: `${Z2U}/faceit/subscriptions-6-276`,  plans: [{ label_en: '1 Month', url: `${Z2U}/faceit/subscriptions-6-276` }] },
    { id: 'wow-time-card',            source_url: `${Z2U}/world-of-warcraft/time-cards-6-71`, plans: [{ label_en: '30 Days', url: `${Z2U}/world-of-warcraft/time-cards-6-71` }, { label_en: '60 Days', url: `${Z2U}/world-of-warcraft/time-cards-6-71` }] },
    { id: 'ffxiv-sub',                source_url: `${Z2U}/final-fantasy-xiv/time-cards-6-120`, plans: [{ label_en: '30 Days (Entry)', url: `${Z2U}/final-fantasy-xiv/time-cards-6-120` }] },
    { id: 'runescape-membership',     source_url: `${Z2U}/runescape/membership-6-92`,   plans: [{ label_en: '1 Month', url: `${Z2U}/runescape/membership-6-92` }] },
    { id: 'twitch-turbo',             source_url: `${Z2U}/twitch/bits-6-282`,           plans: [{ label_en: '1 Month (Turbo)', url: `${Z2U}/twitch/bits-6-282` }] },
    { id: 'humble-choice',            source_url: `${Z2U}/humble-bundle/subscriptions-6-345`, plans: [{ label_en: '1 Month', url: `${Z2U}/humble-bundle/subscriptions-6-345` }] },
    { id: 'playstation-plus-extra',   source_url: `${Z2U}/psn/cards-6-44`,              plans: [{ label_en: '1 Month', url: `${Z2U}/psn/cards-6-44` }] },
    { id: 'playstation-plus-premium', source_url: `${Z2U}/psn/cards-6-44`,              plans: [{ label_en: '1 Month', url: `${Z2U}/psn/cards-6-44` }] },
    { id: 'gta-plus',                 source_url: `${Z2U}/shark-cards/gta-online-6-191`, plans: [{ label_en: '1 Month', url: `${Z2U}/shark-cards/gta-online-6-191` }] },
    { id: 'discord-server-boosts',    source_url: `${Z2U}/discord/nitro-6-246`,         plans: [{ label_en: 'x2 Server Boosts', url: `${Z2U}/discord/nitro-6-246` }] },
    { id: 'iracing-membership',       source_url: `${Z2U}/iracing/memberships-6-249`,   plans: [{ label_en: '1 Month', url: `${Z2U}/iracing/memberships-6-249` }] },
    { id: 'eve-online-omega',         source_url: `${Z2U}/eve-online/omega-6-84`,       plans: [{ label_en: '1 Month', url: `${Z2U}/eve-online/omega-6-84` }] },
    { id: 'xbox-game-pass-core',      source_url: `${Z2U}/xbox-live/gold-6-19`,         plans: [{ label_en: '1 Month', url: `${Z2U}/xbox-live/gold-6-19` }] },
    // Streaming (Part 1, 21-25)
    { id: 'hulu-ad-free',             source_url: `${Z2U}/hulu/subscriptions-6-368`,    plans: [{ label_en: '1 Month', url: `${Z2U}/hulu/subscriptions-6-368` }] },
    { id: 'paramount-plus',           source_url: `${Z2U}/paramount-plus/subscriptions-6-373`, plans: [{ label_en: '1 Month', url: `${Z2U}/paramount-plus/subscriptions-6-373` }] },
    { id: 'peacock-premium',          source_url: `${Z2U}/peacock/subscriptions-6-396`, plans: [{ label_en: '1 Month', url: `${Z2U}/peacock/subscriptions-6-396` }] },
    { id: 'starzplay',                source_url: `${Z2U}/starzplay/subscriptions-6-375`, plans: [{ label_en: '1 Month', url: `${Z2U}/starzplay/subscriptions-6-375` }] },
    { id: 'shahid-vip',               source_url: `${Z2U}/shahid/subscriptions-6-376`,  plans: [{ label_en: '1 Month - Ent Only', url: `${Z2U}/shahid/subscriptions-6-376` }, { label_en: '1 Month - Sports+Ent', url: `${Z2U}/shahid/subscriptions-6-376` }] },

    // ===== PART 2: Streaming & Music (26-50) =====
    { id: 'tod-tv',                   source_url: `${Z2U}/tod/subscriptions-6-400`,     plans: [{ label_en: '1 Month (TOD TV)', url: `${Z2U}/tod/subscriptions-6-400` }] },
    { id: 'osn-plus',                 source_url: `${Z2U}/osn-plus/subscriptions-6-401`, plans: [{ label_en: '1 Month', url: `${Z2U}/osn-plus/subscriptions-6-401` }] },
    { id: 'iptv-smarters-falcon',     source_url: `${Z2U}/iptv/subscriptions-6-402`,    plans: [{ label_en: '6 Months', url: `${Z2U}/iptv/subscriptions-6-402` }, { label_en: '1 Year', url: `${Z2U}/iptv/subscriptions-6-402` }] },
    { id: 'apple-one',                source_url: `${Z2U}/apple/subscriptions-6-403`,   plans: [{ label_en: '1 Month', url: `${Z2U}/apple/subscriptions-6-403` }] },
    { id: 'youtube-tv',               source_url: `${Z2U}/youtube/subscriptions-6-404`, plans: [{ label_en: '1 Month', url: `${Z2U}/youtube/subscriptions-6-404` }] },
    { id: 'discovery-plus',           source_url: `${Z2U}/discovery-plus/subscriptions-6-405`, plans: [{ label_en: '1 Month', url: `${Z2U}/discovery-plus/subscriptions-6-405` }] },
    { id: 'viki-pass',                source_url: `${Z2U}/viki/subscriptions-6-407`,    plans: [{ label_en: '1 Month', url: `${Z2U}/viki/subscriptions-6-407` }] },
    { id: 'nba-league-pass',          source_url: `${Z2U}/nba/league-pass-6-408`,       plans: [{ label_en: '1 Month', url: `${Z2U}/nba/league-pass-6-408` }] },
    { id: 'fubotv',                   source_url: `${Z2U}/fubotv/subscriptions-6-409`,  plans: [{ label_en: '1 Month', url: `${Z2U}/fubotv/subscriptions-6-409` }] },
    { id: 'sling-tv',                 source_url: `${Z2U}/sling-tv/subscriptions-6-410`, plans: [{ label_en: '1 Month', url: `${Z2U}/sling-tv/subscriptions-6-410` }] },
    { id: 'mubi',                     source_url: `${Z2U}/mubi/subscriptions-6-411`,    plans: [{ label_en: '1 Month', url: `${Z2U}/mubi/subscriptions-6-411` }] },
    { id: 'funimation-premium',       source_url: `${Z2U}/funimation/subscriptions-6-412`, plans: [{ label_en: '1 Month', url: `${Z2U}/funimation/subscriptions-6-412` }] },
    { id: 'wwe-network',              source_url: `${Z2U}/wwe-network/subscriptions-6-413`, plans: [{ label_en: '1 Month', url: `${Z2U}/wwe-network/subscriptions-6-413` }] },
    // Music
    { id: 'apple-music',              source_url: `${Z2U}/apple-music/subscriptions-6-281`, plans: [{ label_en: '1 Month', url: `${Z2U}/apple-music/subscriptions-6-281` }] },
    { id: 'deezer-premium',           source_url: `${Z2U}/deezer/subscriptions-6-302`,  plans: [{ label_en: '1 Month', url: `${Z2U}/deezer/subscriptions-6-302` }] },
    { id: 'soundcloud-go-plus',       source_url: `${Z2U}/soundcloud/subscriptions-6-335`, plans: [{ label_en: '1 Month', url: `${Z2U}/soundcloud/subscriptions-6-335` }] },
    { id: 'anghami-plus',             source_url: `${Z2U}/anghami/subscriptions-6-303`, plans: [{ label_en: '1 Month', url: `${Z2U}/anghami/subscriptions-6-303` }] },
    { id: 'audible-premium-plus',     source_url: `${Z2U}/audible/subscriptions-6-304`, plans: [{ label_en: '1 Month', url: `${Z2U}/audible/subscriptions-6-304` }] },
    { id: 'scribd-everand',           source_url: `${Z2U}/scribd/subscriptions-6-339`,  plans: [{ label_en: '1 Month', url: `${Z2U}/scribd/subscriptions-6-339` }] },
    { id: 'tunein-premium',           source_url: `${Z2U}/tunein/subscriptions-6-414`,  plans: [{ label_en: '1 Month', url: `${Z2U}/tunein/subscriptions-6-414` }] },
    { id: 'pandora-premium',          source_url: `${Z2U}/pandora/subscriptions-6-415`, plans: [{ label_en: '1 Month', url: `${Z2U}/pandora/subscriptions-6-415` }] },
    { id: 'siriusxm',                 source_url: `${Z2U}/siriusxm/subscriptions-6-416`, plans: [{ label_en: '1 Month', url: `${Z2U}/siriusxm/subscriptions-6-416` }] },
    { id: 'storytel',                 source_url: `${Z2U}/storytel/subscriptions-6-417`, plans: [{ label_en: '1 Month', url: `${Z2U}/storytel/subscriptions-6-417` }] },
    // AI/Software (end of part 2)
    { id: 'notion-ai',                source_url: `${Z2U}/notion/subscriptions-6-418`,  plans: [{ label_en: '1 Month', url: `${Z2U}/notion/subscriptions-6-418` }] },
    { id: 'jasper-ai',                source_url: `${Z2U}/jasper/subscriptions-6-419`,  plans: [{ label_en: '1 Month', url: `${Z2U}/jasper/subscriptions-6-419` }] },

    // ===== PART 3: AI & Software (51-75) =====
    // (Reading from part3 - IDs based on pattern from file)
    { id: 'copy-ai',                  source_url: `${Z2U}/copy-ai/subscriptions-6-420`, plans: [{ label_en: '1 Month', url: `${Z2U}/copy-ai/subscriptions-6-420` }] },
    { id: 'semrush-pro',              source_url: `${Z2U}/semrush/subscriptions-6-421`, plans: [{ label_en: '1 Month', url: `${Z2U}/semrush/subscriptions-6-421` }] },
    { id: 'ahrefs-lite',              source_url: `${Z2U}/ahrefs/subscriptions-6-422`,  plans: [{ label_en: '1 Month', url: `${Z2U}/ahrefs/subscriptions-6-422` }] },
    { id: 'envato-elements',          source_url: `${Z2U}/envato-elements/subscriptions-6-327`, plans: [{ label_en: '1 Month', url: `${Z2U}/envato-elements/subscriptions-6-327` }] },
    { id: 'shutterstock',             source_url: `${Z2U}/shutterstock/subscriptions-6-314`, plans: [{ label_en: '1 Month (10 imgs)', url: `${Z2U}/shutterstock/subscriptions-6-314` }] },
    { id: 'adobe-stock',              source_url: `${Z2U}/adobe/stock-6-423`,            plans: [{ label_en: '1 Month (10 assets)', url: `${Z2U}/adobe/stock-6-423` }] },
    { id: 'vectorstock-premium',      source_url: `${Z2U}/vectorstock/credits-6-424`,   plans: [{ label_en: '15 Credits Bundle', url: `${Z2U}/vectorstock/credits-6-424` }] },
    { id: 'depositphotos-sub',        source_url: `${Z2U}/depositphotos/subscriptions-6-425`, plans: [{ label_en: '1 Month (30 imgs)', url: `${Z2U}/depositphotos/subscriptions-6-425` }] },
    { id: 'istock-credits',           source_url: `${Z2U}/istock/credits-6-426`,        plans: [{ label_en: '5 Credit Pack', url: `${Z2U}/istock/credits-6-426` }] },
    { id: 'hootsuite-pro',            source_url: `${Z2U}/hootsuite/subscriptions-6-427`, plans: [{ label_en: '1 Month', url: `${Z2U}/hootsuite/subscriptions-6-427` }] },
    { id: 'buffer-essentials',        source_url: `${Z2U}/buffer/subscriptions-6-428`,  plans: [{ label_en: '1 Month', url: `${Z2U}/buffer/subscriptions-6-428` }] },
    { id: 'monday-basic',             source_url: `${Z2U}/monday/subscriptions-6-429`,  plans: [{ label_en: '1 Month (Basic)', url: `${Z2U}/monday/subscriptions-6-429` }] },
    { id: 'asana-premium',            source_url: `${Z2U}/asana/subscriptions-6-430`,   plans: [{ label_en: '1 Month', url: `${Z2U}/asana/subscriptions-6-430` }] },
    { id: 'todoist-pro',              source_url: `${Z2U}/todoist/subscriptions-6-431`, plans: [{ label_en: '1 Month', url: `${Z2U}/todoist/subscriptions-6-431` }] },
    { id: 'evernote-professional',    source_url: `${Z2U}/evernote/subscriptions-6-432`, plans: [{ label_en: '1 Month', url: `${Z2U}/evernote/subscriptions-6-432` }] },
    { id: 'lastpass-premium',         source_url: `${Z2U}/lastpass/subscriptions-6-433`, plans: [{ label_en: '1 Month', url: `${Z2U}/lastpass/subscriptions-6-433` }] },
    { id: '1password-individual',     source_url: `${Z2U}/1password/subscriptions-6-434`, plans: [{ label_en: '1 Month', url: `${Z2U}/1password/subscriptions-6-434` }] },
    { id: 'nordpass-premium',         source_url: `${Z2U}/nordpass/subscriptions-6-435`, plans: [{ label_en: '1 Month', url: `${Z2U}/nordpass/subscriptions-6-435` }] },
    { id: 'expressvpn',               source_url: `${Z2U}/expressvpn/subscriptions-6-283`, plans: [{ label_en: '1 Month', url: `${Z2U}/expressvpn/subscriptions-6-283` }] },
    { id: 'surfshark-vpn',            source_url: `${Z2U}/surfshark/subscriptions-6-289`, plans: [{ label_en: '1 Month', url: `${Z2U}/surfshark/subscriptions-6-289` }] },
    { id: 'cyberghost-vpn',           source_url: `${Z2U}/cyberghost/subscriptions-6-436`, plans: [{ label_en: '1 Month', url: `${Z2U}/cyberghost/subscriptions-6-436` }] },
    { id: 'hotspot-shield',           source_url: `${Z2U}/hotspot-shield/subscriptions-6-437`, plans: [{ label_en: '1 Month', url: `${Z2U}/hotspot-shield/subscriptions-6-437` }] },
    { id: 'keeper-security',          source_url: `${Z2U}/keeper/subscriptions-6-438`,  plans: [{ label_en: '1 Month', url: `${Z2U}/keeper/subscriptions-6-438` }] },
    { id: 'dashlane-premium',         source_url: `${Z2U}/dashlane/subscriptions-6-439`, plans: [{ label_en: '1 Month', url: `${Z2U}/dashlane/subscriptions-6-439` }] },
    { id: 'cleanmymac-x',             source_url: `${Z2U}/cleanmymac/subscriptions-6-440`, plans: [{ label_en: '1 Month (1 Mac)', url: `${Z2U}/cleanmymac/subscriptions-6-440` }] },

    // ===== PART 4: Education & Design (76-100) =====
    { id: 'renderforest',             source_url: `${Z2U}/renderforest/subscriptions-6-441`, plans: [{ label_en: '1 Month', url: `${Z2U}/renderforest/subscriptions-6-441` }] },
    { id: 'vexels',                   source_url: `${Z2U}/vexels/subscriptions-6-442`,  plans: [{ label_en: '1 Month', url: `${Z2U}/vexels/subscriptions-6-442` }] },
    { id: 'storyblocks',              source_url: `${Z2U}/storyblocks/subscriptions-6-443`, plans: [{ label_en: '1 Month', url: `${Z2U}/storyblocks/subscriptions-6-443` }] },
    { id: 'epidemic-sound',           source_url: `${Z2U}/epidemic-sound/subscriptions-6-444`, plans: [{ label_en: '1 Month', url: `${Z2U}/epidemic-sound/subscriptions-6-444` }] },
    { id: 'udemy-courses',            source_url: `${Z2U}/udemy/courses-6-445`,          plans: [{ label_en: '1 Month (All-Access)', url: `${Z2U}/udemy/courses-6-445` }] },
    { id: 'skillshare-membership',    source_url: `${Z2U}/skillshare/subscriptions-6-316`, plans: [{ label_en: '1 Month', url: `${Z2U}/skillshare/subscriptions-6-316` }] },
    { id: 'babbel-premium',           source_url: `${Z2U}/babbel/subscriptions-6-446`,  plans: [{ label_en: '1 Month', url: `${Z2U}/babbel/subscriptions-6-446` }] },
    { id: 'rosetta-stone',            source_url: `${Z2U}/rosetta-stone/subscriptions-6-447`, plans: [{ label_en: '1 Month', url: `${Z2U}/rosetta-stone/subscriptions-6-447` }] },
    { id: 'busuu-premium-plus',       source_url: `${Z2U}/busuu/subscriptions-6-448`,   plans: [{ label_en: '1 Month', url: `${Z2U}/busuu/subscriptions-6-448` }] },
    { id: 'chegg-study-plus',         source_url: `${Z2U}/chegg/subscriptions-6-449`,   plans: [{ label_en: '1 Month', url: `${Z2U}/chegg/subscriptions-6-449` }] },
    { id: 'quizlet-plus',             source_url: `${Z2U}/quizlet/subscriptions-6-450`, plans: [{ label_en: '1 Month', url: `${Z2U}/quizlet/subscriptions-6-450` }] },
    { id: 'masterclass',              source_url: `${Z2U}/masterclass/subscriptions-6-451`, plans: [{ label_en: '1 Month', url: `${Z2U}/masterclass/subscriptions-6-451` }] },
    { id: 'brilliant-premium',        source_url: `${Z2U}/brilliant/subscriptions-6-452`, plans: [{ label_en: '1 Month', url: `${Z2U}/brilliant/subscriptions-6-452` }] },
    { id: 'pluralsight',              source_url: `${Z2U}/pluralsight/subscriptions-6-453`, plans: [{ label_en: '1 Month', url: `${Z2U}/pluralsight/subscriptions-6-453` }] },
    { id: 'datacamp-premium',         source_url: `${Z2U}/datacamp/subscriptions-6-454`, plans: [{ label_en: '1 Month', url: `${Z2U}/datacamp/subscriptions-6-454` }] },
    { id: 'o-reilly-learning',        source_url: `${Z2U}/oreilly/subscriptions-6-455`, plans: [{ label_en: '1 Month', url: `${Z2U}/oreilly/subscriptions-6-455` }] },
    { id: 'codecademy-pro',           source_url: `${Z2U}/codecademy/subscriptions-6-456`, plans: [{ label_en: '1 Month', url: `${Z2U}/codecademy/subscriptions-6-456` }] },
    { id: 'adobe-express-premium',    source_url: `${Z2U}/adobe/express-6-457`,          plans: [{ label_en: '1 Month', url: `${Z2U}/adobe/express-6-457` }] },
    { id: 'creative-fabrica',         source_url: `${Z2U}/creative-fabrica/subscriptions-6-458`, plans: [{ label_en: '1 Month (All-Access)', url: `${Z2U}/creative-fabrica/subscriptions-6-458` }] },
    { id: 'design-cuts',              source_url: `${Z2U}/design-cuts/subscriptions-6-459`, plans: [{ label_en: '1 Month', url: `${Z2U}/design-cuts/subscriptions-6-459` }] },
    { id: 'placeit-subscription',     source_url: `${Z2U}/placeit/subscriptions-6-460`, plans: [{ label_en: '1 Month', url: `${Z2U}/placeit/subscriptions-6-460` }] },
    { id: 'snappa-pro',               source_url: `${Z2U}/snappa/subscriptions-6-461`,  plans: [{ label_en: '1 Month', url: `${Z2U}/snappa/subscriptions-6-461` }] },
    { id: 'stencil-pro',              source_url: `${Z2U}/stencil/subscriptions-6-462`, plans: [{ label_en: '1 Month', url: `${Z2U}/stencil/subscriptions-6-462` }] },
    { id: 'visme-business',           source_url: `${Z2U}/visme/subscriptions-6-463`,   plans: [{ label_en: '1 Month', url: `${Z2U}/visme/subscriptions-6-463` }] },
    { id: 'piktochart-pro',           source_url: `${Z2U}/piktochart/subscriptions-6-464`, plans: [{ label_en: '1 Month', url: `${Z2U}/piktochart/subscriptions-6-464` }] },
    { id: 'infogram-pro',             source_url: `${Z2U}/infogram/subscriptions-6-465`, plans: [{ label_en: '1 Month', url: `${Z2U}/infogram/subscriptions-6-465` }] }
  ];

  let ok = 0, fail = 0;
  console.log(`%c🔗 Spark - Fixing source_url for Top 100 Products (Batch 1)...`, 'color:#3b82f6;font-size:14px;font-weight:bold');

  for (const fix of fixes) {
    try {
      // Direct update — skip fetch entirely to avoid 406 errors for non-existent rows
      const { error, count } = await sb.from('products')
        .update({ source_url: fix.source_url })
        .eq('id', fix.id)
        .select('id', { count: 'exact', head: true });

      if (error) { console.error('❌', fix.id, error.message); fail++; }
      else if (count === 0) { console.log('%c⏭️ skip (not in DB yet): ' + fix.id, 'color:#94a3b8'); }
      else { console.log('%c✅ ' + fix.id, 'color:#4ade80'); ok++; }
    } catch(e) { console.error('❌', fix.id, e.message); fail++; }
    await new Promise(r => setTimeout(r, 80));
  }

  console.log(`%c🏁 Top-100 Source URL Fix Done! ✅ ${ok} fixed | ❌ ${fail} failed`, `color:${fail === 0 ? '#4ade80' : '#f87171'};font-size:13px;font-weight:bold`);
  if (fail > 0) console.warn('⚠️ Some IDs may not exist in DB yet (not yet inserted). Run the insert scripts first.');
})();
