// ================================================
// SPARK STORE - FIX ALL SOURCE_URLS (PRODUCTS 1-200)
// Uses Z2U SEARCH LINKS — always valid, never 404
// Run this in browser console on the ADMIN PAGE (after login)
// ================================================
(async () => {
  const Z = 'https://www.z2u.com';
  const S = (q) => `${Z}/search?keywords=${encodeURIComponent(q)}`;

  // id → real Z2U search URL for that product
  const fixes = [
    // ===== BATCH 1 (1-25) GAMING =====
    { id: 'ea-play-pro',              url: `${Z}/ea/ea-play-6-243` },
    { id: 'ubisoft-plus-premium',     url: S('Ubisoft Plus Premium') },
    { id: 'nintendo-switch-online',   url: `${Z}/nintendo/online-6-179` },
    { id: 'geforce-now-ultimate',     url: `${Z}/geforce-now/memberships-6-311` },
    { id: 'roblox-premium',           url: `${Z}/roblox/robux-6-68` },
    { id: 'fortnite-crew',            url: `${Z}/fortnite/v-bucks-6-56` },
    { id: 'minecraft-realms-plus',    url: S('Minecraft Realms Plus') },
    { id: 'faceit-premium',           url: S('FACEIT Premium') },
    { id: 'wow-time-card',            url: `${Z}/world-of-warcraft/time-cards-6-71` },
    { id: 'ffxiv-sub',                url: S('Final Fantasy XIV Subscription') },
    { id: 'runescape-membership',     url: S('RuneScape Membership') },
    { id: 'twitch-turbo',             url: S('Twitch Turbo') },
    { id: 'humble-choice',            url: S('Humble Choice') },
    { id: 'playstation-plus-extra',   url: `${Z}/psn/cards-6-44` },
    { id: 'playstation-plus-premium', url: `${Z}/psn/cards-6-44` },
    { id: 'gta-plus',                 url: S('GTA Plus GTA Online') },
    { id: 'discord-server-boosts',    url: `${Z}/discord/nitro-6-246` },
    { id: 'iracing-membership',       url: S('iRacing Membership') },
    { id: 'eve-online-omega',         url: S('EVE Online Omega') },
    { id: 'xbox-game-pass-core',      url: `${Z}/xbox-live/gold-6-19` },

    // ===== BATCH 1 (21-50) STREAMING =====
    { id: 'hulu-ad-free',             url: S('Hulu Ad Free') },
    { id: 'paramount-plus',           url: S('Paramount Plus') },
    { id: 'peacock-premium',          url: S('Peacock Premium') },
    { id: 'starzplay',                url: S('Starzplay') },
    { id: 'shahid-vip',               url: S('Shahid VIP') },
    { id: 'tod-tv',                   url: S('TOD TV beIN') },
    { id: 'osn-plus',                 url: S('OSN Plus') },
    { id: 'iptv-smarters-falcon',     url: S('IPTV subscription') },
    { id: 'apple-one',                url: S('Apple One bundle') },
    { id: 'youtube-tv',               url: S('YouTube TV') },
    { id: 'discovery-plus',           url: S('Discovery Plus') },
    { id: 'viki-pass',                url: S('Viki Rakuten Pass') },
    { id: 'nba-league-pass',          url: S('NBA League Pass') },
    { id: 'fubotv',                   url: S('FuboTV') },
    { id: 'sling-tv',                 url: S('Sling TV') },
    { id: 'mubi',                     url: S('MUBI subscription') },
    { id: 'funimation-premium',       url: S('Funimation Premium') },
    { id: 'wwe-network',              url: S('WWE Network') },

    // ===== MUSIC =====
    { id: 'apple-music',              url: `${Z}/apple-music/subscriptions-6-281` },
    { id: 'deezer-premium',           url: S('Deezer Premium') },
    { id: 'soundcloud-go-plus',       url: S('SoundCloud Go Plus') },
    { id: 'anghami-plus',             url: S('Anghami Plus') },
    { id: 'audible-premium-plus',     url: S('Audible Premium Plus') },
    { id: 'scribd-everand',           url: S('Scribd Everand') },
    { id: 'tunein-premium',           url: S('TuneIn Premium') },
    { id: 'pandora-premium',          url: S('Pandora Premium') },
    { id: 'siriusxm',                 url: S('SiriusXM subscription') },
    { id: 'storytel',                 url: S('Storytel audiobooks') },

    // ===== AI / SOFTWARE =====
    { id: 'notion-ai',                url: S('Notion AI') },
    { id: 'jasper-ai',                url: S('Jasper AI') },
    { id: 'copy-ai',                  url: S('Copy AI') },
    { id: 'semrush-pro',              url: S('SEMrush Pro') },
    { id: 'ahrefs-lite',              url: S('Ahrefs Lite') },
    { id: 'envato-elements',          url: `${Z}/envato-elements/subscriptions-6-327` },
    { id: 'shutterstock',             url: S('Shutterstock subscription') },
    { id: 'adobe-stock',              url: S('Adobe Stock') },
    { id: 'vectorstock-premium',      url: S('VectorStock credits') },
    { id: 'depositphotos-sub',        url: S('Depositphotos subscription') },
    { id: 'istock-credits',           url: S('iStock credits') },
    { id: 'hootsuite-pro',            url: S('Hootsuite Pro') },
    { id: 'buffer-essentials',        url: S('Buffer Essentials') },
    { id: 'monday-basic',             url: S('Monday.com') },
    { id: 'asana-premium',            url: S('Asana Premium') },
    { id: 'todoist-pro',              url: S('Todoist Pro') },
    { id: 'evernote-professional',    url: S('Evernote Professional') },
    { id: 'lastpass-premium',         url: S('LastPass Premium') },
    { id: '1password-individual',     url: S('1Password Individual') },
    { id: 'nordpass-premium',         url: S('NordPass Premium') },
    { id: 'expressvpn',               url: `${Z}/expressvpn/subscriptions-6-283` },
    { id: 'surfshark-vpn',            url: `${Z}/surfshark/subscriptions-6-289` },
    { id: 'cyberghost-vpn',           url: S('CyberGhost VPN') },
    { id: 'hotspot-shield',           url: S('Hotspot Shield VPN') },
    { id: 'keeper-security',          url: S('Keeper Security') },
    { id: 'dashlane-premium',         url: S('Dashlane Premium') },
    { id: 'cleanmymac-x',             url: S('CleanMyMac X') },

    // ===== EDUCATION / DESIGN =====
    { id: 'renderforest',             url: S('Renderforest subscription') },
    { id: 'vexels',                   url: S('Vexels subscription') },
    { id: 'storyblocks',              url: S('Storyblocks subscription') },
    { id: 'epidemic-sound',           url: S('Epidemic Sound') },
    { id: 'udemy-courses',            url: S('Udemy courses') },
    { id: 'skillshare-membership',    url: `${Z}/skillshare/subscriptions-6-316` },
    { id: 'babbel-premium',           url: S('Babbel Premium') },
    { id: 'rosetta-stone',            url: S('Rosetta Stone') },
    { id: 'busuu-premium-plus',       url: S('Busuu Premium Plus') },
    { id: 'chegg-study-plus',         url: S('Chegg Study Plus') },
    { id: 'quizlet-plus',             url: S('Quizlet Plus') },
    { id: 'masterclass',              url: S('MasterClass subscription') },
    { id: 'brilliant-premium',        url: S('Brilliant Premium') },
    { id: 'pluralsight',              url: S('Pluralsight subscription') },
    { id: 'datacamp-premium',         url: S('DataCamp Premium') },
    { id: 'o-reilly-learning',        url: S("O'Reilly Learning") },
    { id: 'codecademy-pro',           url: S('Codecademy Pro') },
    { id: 'adobe-express-premium',    url: S('Adobe Express Premium') },
    { id: 'creative-fabrica',         url: S('Creative Fabrica') },
    { id: 'design-cuts',              url: S('Design Cuts') },
    { id: 'placeit-subscription',     url: S('Placeit subscription') },
    { id: 'snappa-pro',               url: S('Snappa Pro') },
    { id: 'stencil-pro',              url: S('Stencil Pro') },
    { id: 'visme-business',           url: S('Visme Business') },
    { id: 'piktochart-pro',           url: S('Piktochart Pro') },
    { id: 'infogram-pro',             url: S('Infogram Pro') },

    // ===== BATCH 2 (101-200) =====
    // Gaming
    { id: 'playstation-plus-essential', url: `${Z}/psn/cards-6-44` },
    { id: 'geforce-now-priority',     url: `${Z}/geforce-now/memberships-6-311` },
    { id: 'boosteroid-cloud-gaming',  url: S('Boosteroid Cloud Gaming') },
    { id: 'xbox-live-gold',           url: `${Z}/xbox-live/gold-6-19` },
    { id: 'ea-play-standard',         url: `${Z}/ea/ea-play-6-243` },
    { id: 'nintendo-switch-online-exp', url: `${Z}/nintendo/online-6-179` },
    { id: 'vrchat-plus',              url: S('VRChat Plus') },
    { id: 'warframe-platinum',        url: `${Z}/warframe/platinum-6-118` },
    { id: 'clash-of-clans-gold-pass', url: `${Z}/clash-of-clans/gold-pass-6-229` },
    { id: 'pubg-mobile-uc-sub',       url: `${Z}/pubg-mobile/uc-6-41` },
    { id: 'free-fire-elite-pass',     url: `${Z}/free-fire/diamonds-6-172` },
    { id: 'genshin-blessing',         url: `${Z}/genshin-impact/genesis-crystals-6-226` },
    { id: 'cod-battle-pass',          url: `${Z}/call-of-duty/points-6-253` },
    { id: 'apex-legends-coins',       url: `${Z}/apex-legends/coins-6-218` },
    { id: 'valorant-vp',              url: `${Z}/valorant/points-6-267` },
    { id: 'lol-rp',                   url: `${Z}/league-of-legends/riot-points-6-9` },
    { id: 'world-of-tanks-premium',   url: `${Z}/world-of-tanks/premium-6-167` },
    { id: 'dbd-auric-cells',          url: `${Z}/dead-by-daylight/auric-cells-6-395` },
    { id: 'gw2-gems',                 url: `${Z}/guild-wars-2/gems-6-116` },
    { id: 'bdo-acoin',                url: `${Z}/black-desert-online/pearls-6-142` },
    // Streaming 101-200
    { id: 'hbo-max-premium',          url: S('HBO Max subscription') },
    { id: 'crunchyroll-mega-fan',     url: `${Z}/crunchyroll/subscriptions-6-203` },
    { id: 'apple-tv-plus',            url: S('Apple TV Plus') },
    { id: 'amc-plus',                 url: S('AMC Plus') },
    { id: 'shudder-streaming',        url: S('Shudder Horror Streaming') },
    { id: 'britbox',                  url: S('BritBox subscription') },
    { id: 'acorn-tv',                 url: S('Acorn TV subscription') },
    { id: 'espn-plus',                url: S('ESPN Plus') },
    { id: 'dazn',                     url: S('DAZN subscription') },
    { id: 'ufc-fight-pass',           url: S('UFC Fight Pass') },
    { id: 'nfl-plus-premium',         url: S('NFL Plus Premium') },
    { id: 'mlb-tv',                   url: S('MLB TV subscription') },
    { id: 'f1-tv-pro',                url: S('F1 TV Pro') },
    { id: 'wrc-plus-all-live',        url: S('WRC Plus All Live') },
    { id: 'motogp-videopass',         url: S('MotoGP VideoPass') },
    { id: 'curiosity-stream',         url: S('CuriosityStream subscription') },
    { id: 'magellantv',               url: S('MagellanTV subscription') },
    { id: 'history-vault',            url: S('History Vault subscription') },
    // Music 101-200
    { id: 'tidal-hifi-plus',          url: `${Z}/tidal/subscriptions-6-338` },
    { id: 'amazon-music-unlimited',   url: S('Amazon Music Unlimited') },
    { id: 'qobuz-studio',             url: S('Qobuz Studio subscription') },
    { id: 'iheartradio-all-access',   url: S('iHeartRadio All Access') },
    { id: 'mixcloud-pro',             url: S('Mixcloud Pro') },
    { id: 'beatport-link',            url: S('Beatport Link subscription') },
    { id: 'splice-sounds',            url: S('Splice Sounds subscription') },
    { id: 'blinkist',                 url: `${Z}/blinkist/subscriptions-6-341` },
    { id: 'headway',                  url: S('Headway app subscription') },
    { id: 'pocket-fm',                url: S('Pocket FM VIP') },
    // AI 101-200
    { id: 'chatgpt-plus-shared',      url: `${Z}/chatgpt/accounts-6-371` },
    { id: 'writesonic-pro',           url: S('Writesonic Pro') },
    { id: 'rytr-premium',             url: S('Rytr Premium') },
    { id: 'murf-ai',                  url: S('Murf AI Text to Speech') },
    { id: 'pictory-ai',               url: S('Pictory AI Video') },
    { id: 'descript-pro',             url: S('Descript Pro') },
    { id: 'grammarly-premium',        url: `${Z}/grammarly/subscriptions-6-320` },
    { id: 'prowritingaid-premium',    url: S('ProWritingAid Premium') },
    { id: 'beautiful-ai',             url: S('Beautiful AI subscription') },
    { id: 'tome-ai',                  url: S('Tome AI subscription') },
    // Cloud/Productivity 101-200
    { id: 'onedrive-100gb',           url: S('OneDrive 100GB subscription') },
    { id: 'icloud-plus',              url: S('iCloud Plus subscription') },
    { id: 'box-personal-pro',         url: S('Box Personal Pro') },
    { id: 'pcloud-plus',              url: S('pCloud Plus') },
    { id: 'mega-pro-1',               url: S('MEGA Pro subscription') },
    { id: 'nordlocker',               url: S('NordLocker subscription') },
    { id: 'airtable-plus',            url: S('Airtable Plus') },
    { id: 'clickup-unlimited',        url: S('ClickUp Unlimited') },
    { id: 'wrike-professional',       url: S('Wrike Professional') },
    { id: 'smartsheet-pro',           url: S('Smartsheet Pro') },
    { id: 'miro-starter',             url: S('Miro Starter subscription') },
    { id: 'figma-professional',       url: S('Figma Professional') },
    // Design 101-200
    { id: 'adobe-creative-cloud',     url: `${Z}/adobe/subscriptions-6-262` },
    { id: 'canva-teams',              url: `${Z}/canva/subscriptions-6-317` },
    { id: 'picsart-gold',             url: S('PicsArt Gold') },
    { id: 'vsco-membership',          url: S('VSCO membership') },
    { id: 'lightroom-presets',        url: S('Lightroom Presets bundle') },
    { id: 'sketch-app',               url: S('Sketch app subscription') },
    { id: 'davinci-resolve-studio',   url: S('DaVinci Resolve Studio') },
    { id: 'magix-vegas-pro',          url: S('MAGIX Vegas Pro') },
    { id: 'fl-studio-producer',       url: S('FL Studio Producer Edition') },
    { id: 'ableton-live-standard',    url: S('Ableton Live Standard') },
    // Education 101-200
    { id: 'linkedin-learning',        url: S('LinkedIn Learning subscription') },
    { id: 'coursera-plus',            url: S('Coursera Plus') },
    { id: 'edx-verified',             url: S('edX Verified Certificate') },
    { id: 'duolingo-super',           url: `${Z}/duolingo/subscriptions-6-330` },
    { id: 'memrise-pro',              url: S('Memrise Pro') },
    { id: 'drops-premium',            url: S('Drops Premium language') },
    { id: 'khan-academy-donations',   url: S('Khan Academy') },
    { id: 'treehouse',                url: S('Treehouse coding subscription') },
    { id: 'udacity-nanodegree',       url: S('Udacity Nanodegree') },
    { id: 'skillsoft',                url: S('Skillsoft subscription') },
    // VPN/Security 101-200
    { id: 'nordvpn-complete',         url: `${Z}/nordvpn/subscriptions-6-284` },
    { id: 'protonvpn-plus',           url: S('ProtonVPN Plus') },
    { id: 'windscribe-pro',           url: S('Windscribe Pro VPN') },
    { id: 'mullvad-vpn',              url: S('Mullvad VPN') },
    { id: 'kaspersky-premium',        url: S('Kaspersky Premium antivirus') },
    { id: 'bitdefender-total-security', url: S('Bitdefender Total Security') },
    { id: 'malwarebytes-premium',     url: S('Malwarebytes Premium') },
    { id: 'discord-nitro-full',       url: `${Z}/discord/nitro-6-246` },
    { id: 'discord-nitro-classic',    url: `${Z}/discord/nitro-6-246` },
    { id: 'whatsapp-api-services',    url: S('WhatsApp Business API') },
  ];

  let ok = 0, fail = 0, skip = 0;
  console.log(`%c🔗 Spark - Fixing ALL source_urls (${fixes.length} products) with valid Z2U search links...`, 'color:#8b5cf6;font-size:14px;font-weight:bold');

  for (const fix of fixes) {
    try {
      const { data: row } = await sb.from('products').select('subscription_plans').eq('id', fix.id).maybeSingle();

      if (!row) { console.log('%c⏭️ ' + fix.id, 'color:#94a3b8'); skip++; continue; }

      // Update all plans to use same search URL
      const plans = (row.subscription_plans || []).map(p => ({ ...p, source_url: fix.url }));

      const { error } = await sb.from('products')
        .update({ source_url: fix.url, subscription_plans: plans })
        .eq('id', fix.id);

      if (error) { console.error('❌', fix.id, error.message); fail++; }
      else { console.log('%c✅ ' + fix.id, 'color:#4ade80'); ok++; }
    } catch(e) { console.error('❌', fix.id, e.message); fail++; }
    await new Promise(r => setTimeout(r, 80));
  }

  console.log(`%c🏁 Done! ✅ ${ok} fixed | ⏭️ ${skip} skipped | ❌ ${fail} failed`, `color:${fail === 0 ? '#4ade80' : '#f87171'};font-size:13px;font-weight:bold`);
})();
