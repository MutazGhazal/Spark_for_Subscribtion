// ================================================
// SPARK STORE - FIX SOURCE_URL (AD LINKS) FOR PRODUCTS 101-200
// Paste this in the browser console while on the ADMIN PAGE (after login)
// This fixes the "🔗 مصدر الشراء" links for all recently added 100 products
// ================================================
(async () => {
  const Z2U = 'https://www.z2u.com';
  
  // Each entry: { id, source_url, plans }
  // plans = array of { label_en, source_url } to match subscription_plans by label
  const fixes = [
    // ===== GAMING =====
    {
      id: 'playstation-plus-essential',
      source_url: `${Z2U}/psn/cards-6-44`,
      plans: [
        { label_en: '1 Month', source_url: `${Z2U}/product-11390/PlayStation-Plus-Essential-1-Month-PSN-Key-United-States.html` }
      ]
    },
    {
      id: 'geforce-now-priority',
      source_url: `${Z2U}/geforce-now/memberships-6-311`,
      plans: [
        { label_en: '1 Month', source_url: `${Z2U}/geforce-now/memberships-6-311` }
      ]
    },
    {
      id: 'boosteroid-cloud-gaming',
      source_url: `${Z2U}/boosteroid/memberships-6-316`,
      plans: [
        { label_en: '1 Month', source_url: `${Z2U}/boosteroid/memberships-6-316` }
      ]
    },
    {
      id: 'xbox-live-gold',
      source_url: `${Z2U}/xbox-live/gold-6-19`,
      plans: [
        { label_en: '1 Month', source_url: `${Z2U}/xbox-live/gold-6-19` }
      ]
    },
    {
      id: 'ea-play-standard',
      source_url: `${Z2U}/ea/ea-play-6-243`,
      plans: [
        { label_en: '1 Month', source_url: `${Z2U}/ea/ea-play-6-243` }
      ]
    },
    {
      id: 'nintendo-switch-online-exp',
      source_url: `${Z2U}/nintendo/online-6-179`,
      plans: [
        { label_en: '1 Year', source_url: `${Z2U}/nintendo/online-6-179` }
      ]
    },
    {
      id: 'vrchat-plus',
      source_url: `${Z2U}/vrchat/plus-6-502`,
      plans: [
        { label_en: '1 Month', source_url: `${Z2U}/vrchat/plus-6-502` }
      ]
    },
    {
      id: 'warframe-platinum',
      source_url: `${Z2U}/warframe/platinum-6-118`,
      plans: [
        { label_en: '1000 Platinum', source_url: `${Z2U}/warframe/platinum-6-118` }
      ]
    },
    {
      id: 'clash-of-clans-gold-pass',
      source_url: `${Z2U}/clash-of-clans/gold-pass-6-229`,
      plans: [
        { label_en: '1 Full Season Pass', source_url: `${Z2U}/clash-of-clans/gold-pass-6-229` }
      ]
    },
    {
      id: 'pubg-mobile-uc-sub',
      source_url: `${Z2U}/pubg-mobile/uc-6-41`,
      plans: [
        { label_en: 'Prime Plus (Monthly)', source_url: `${Z2U}/pubg-mobile/uc-6-41` }
      ]
    },
    {
      id: 'free-fire-elite-pass',
      source_url: `${Z2U}/free-fire/diamonds-6-172`,
      plans: [
        { label_en: 'Monthly VIP', source_url: `${Z2U}/free-fire/diamonds-6-172` }
      ]
    },
    {
      id: 'genshin-blessing',
      source_url: `${Z2U}/genshin-impact/genesis-crystals-6-226`,
      plans: [
        { label_en: 'Welkin Moon (30 Days)', source_url: `${Z2U}/genshin-impact/genesis-crystals-6-226` }
      ]
    },
    {
      id: 'cod-battle-pass',
      source_url: `${Z2U}/call-of-duty/points-6-253`,
      plans: [
        { label_en: 'TopUp 1100 CP', source_url: `${Z2U}/call-of-duty/points-6-253` }
      ]
    },
    {
      id: 'apex-legends-coins',
      source_url: `${Z2U}/apex-legends/coins-6-218`,
      plans: [
        { label_en: '1000 Apex Coins', source_url: `${Z2U}/apex-legends/coins-6-218` }
      ]
    },
    {
      id: 'valorant-vp',
      source_url: `${Z2U}/valorant/points-6-267`,
      plans: [
        { label_en: '1000 VP (EU)', source_url: `${Z2U}/valorant/points-6-267` }
      ]
    },
    {
      id: 'lol-rp',
      source_url: `${Z2U}/league-of-legends/riot-points-6-9`,
      plans: [
        { label_en: '10$ RP Card', source_url: `${Z2U}/league-of-legends/riot-points-6-9` }
      ]
    },
    {
      id: 'world-of-tanks-premium',
      source_url: `${Z2U}/world-of-tanks/premium-6-167`,
      plans: [
        { label_en: '30 Premium Days', source_url: `${Z2U}/world-of-tanks/premium-6-167` }
      ]
    },
    {
      id: 'dbd-auric-cells',
      source_url: `${Z2U}/dead-by-daylight/auric-cells-6-395`,
      plans: [
        { label_en: '1000 Auric Pack', source_url: `${Z2U}/dead-by-daylight/auric-cells-6-395` }
      ]
    },
    {
      id: 'gw2-gems',
      source_url: `${Z2U}/guild-wars-2/gems-6-116`,
      plans: [
        { label_en: '800 Gem Card', source_url: `${Z2U}/guild-wars-2/gems-6-116` }
      ]
    },
    {
      id: 'bdo-acoin',
      source_url: `${Z2U}/black-desert-online/pearls-6-142`,
      plans: [
        { label_en: '1000 Acoin Card', source_url: `${Z2U}/black-desert-online/pearls-6-142` }
      ]
    },

    // ===== STREAMING =====
    {
      id: 'hbo-max-premium',
      source_url: `${Z2U}/hbo-max/subscriptions-6-365`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/hbo-max/subscriptions-6-365` }]
    },
    {
      id: 'crunchyroll-mega-fan',
      source_url: `${Z2U}/crunchyroll/subscriptions-6-203`,
      plans: [{ label_en: '1 Month (Mega Fan)', source_url: `${Z2U}/crunchyroll/subscriptions-6-203` }]
    },
    {
      id: 'apple-tv-plus',
      source_url: `${Z2U}/apple-tv-plus/subscriptions-6-469`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/apple-tv-plus/subscriptions-6-469` }]
    },
    {
      id: 'amc-plus',
      source_url: `${Z2U}/amc-plus/subscriptions-6-500`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/amc-plus/subscriptions-6-500` }]
    },
    {
      id: 'shudder-streaming',
      source_url: `${Z2U}/shudder/subscriptions-6-501`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/shudder/subscriptions-6-501` }]
    },
    {
      id: 'britbox',
      source_url: `${Z2U}/britbox/subscriptions-6-460`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/britbox/subscriptions-6-460` }]
    },
    {
      id: 'acorn-tv',
      source_url: `${Z2U}/acorn-tv/subscriptions-6-461`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/acorn-tv/subscriptions-6-461` }]
    },
    {
      id: 'espn-plus',
      source_url: `${Z2U}/espn-plus/subscriptions-6-462`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/espn-plus/subscriptions-6-462` }]
    },
    {
      id: 'dazn',
      source_url: `${Z2U}/dazn/subscriptions-6-406`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/dazn/subscriptions-6-406` }]
    },
    {
      id: 'ufc-fight-pass',
      source_url: `${Z2U}/ufc-fight-pass/subscriptions-6-463`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/ufc-fight-pass/subscriptions-6-463` }]
    },
    {
      id: 'nfl-plus-premium',
      source_url: `${Z2U}/nfl-plus/subscriptions-6-464`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/nfl-plus/subscriptions-6-464` }]
    },
    {
      id: 'mlb-tv',
      source_url: `${Z2U}/mlb-tv/subscriptions-6-465`,
      plans: [{ label_en: '1 Month (All Teams)', source_url: `${Z2U}/mlb-tv/subscriptions-6-465` }]
    },
    {
      id: 'f1-tv-pro',
      source_url: `${Z2U}/f1-tv/subscriptions-6-466`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/f1-tv/subscriptions-6-466` }]
    },
    {
      id: 'wrc-plus-all-live',
      source_url: `${Z2U}/wrc-plus/subscriptions-6-467`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/wrc-plus/subscriptions-6-467` }]
    },
    {
      id: 'motogp-videopass',
      source_url: `${Z2U}/motogp/videopass-6-468`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/motogp/videopass-6-468` }]
    },
    {
      id: 'curiosity-stream',
      source_url: `${Z2U}/curiositystream/subscriptions-6-360`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/curiositystream/subscriptions-6-360` }]
    },
    {
      id: 'magellantv',
      source_url: `${Z2U}/magellantv/subscriptions-6-470`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/magellantv/subscriptions-6-470` }]
    },
    {
      id: 'history-vault',
      source_url: `${Z2U}/history-vault/subscriptions-6-471`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/history-vault/subscriptions-6-471` }]
    },

    // ===== MUSIC =====
    {
      id: 'tidal-hifi-plus',
      source_url: `${Z2U}/tidal/subscriptions-6-338`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/tidal/subscriptions-6-338` }]
    },
    {
      id: 'amazon-music-unlimited',
      source_url: `${Z2U}/amazon-music/subscriptions-6-472`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/amazon-music/subscriptions-6-472` }]
    },
    {
      id: 'qobuz-studio',
      source_url: `${Z2U}/qobuz/subscriptions-6-473`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/qobuz/subscriptions-6-473` }]
    },
    {
      id: 'iheartradio-all-access',
      source_url: `${Z2U}/iheartradio/subscriptions-6-474`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/iheartradio/subscriptions-6-474` }]
    },
    {
      id: 'mixcloud-pro',
      source_url: `${Z2U}/mixcloud/subscriptions-6-475`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/mixcloud/subscriptions-6-475` }]
    },
    {
      id: 'beatport-link',
      source_url: `${Z2U}/beatport/subscriptions-6-476`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/beatport/subscriptions-6-476` }]
    },
    {
      id: 'splice-sounds',
      source_url: `${Z2U}/splice/subscriptions-6-477`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/splice/subscriptions-6-477` }]
    },
    {
      id: 'blinkist',
      source_url: `${Z2U}/blinkist/subscriptions-6-341`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/blinkist/subscriptions-6-341` }]
    },
    {
      id: 'headway',
      source_url: `${Z2U}/headway/subscriptions-6-478`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/headway/subscriptions-6-478` }]
    },
    {
      id: 'pocket-fm',
      source_url: `${Z2U}/pocket-fm/subscriptions-6-479`,
      plans: [{ label_en: '1 Month VIP', source_url: `${Z2U}/pocket-fm/subscriptions-6-479` }]
    },

    // ===== AI TOOLS =====
    {
      id: 'chatgpt-plus-shared',
      source_url: `${Z2U}/chatgpt/accounts-6-371`,
      plans: [{ label_en: '1 Month (Shared Acc)', source_url: `${Z2U}/chatgpt/accounts-6-371` }]
    },
    {
      id: 'writesonic-pro',
      source_url: `${Z2U}/writesonic/subscriptions-6-480`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/writesonic/subscriptions-6-480` }]
    },
    {
      id: 'rytr-premium',
      source_url: `${Z2U}/rytr/subscriptions-6-481`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/rytr/subscriptions-6-481` }]
    },
    {
      id: 'murf-ai',
      source_url: `${Z2U}/murf/subscriptions-6-482`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/murf/subscriptions-6-482` }]
    },
    {
      id: 'pictory-ai',
      source_url: `${Z2U}/pictory/subscriptions-6-483`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/pictory/subscriptions-6-483` }]
    },
    {
      id: 'descript-pro',
      source_url: `${Z2U}/descript/subscriptions-6-484`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/descript/subscriptions-6-484` }]
    },
    {
      id: 'grammarly-premium',
      source_url: `${Z2U}/grammarly/subscriptions-6-320`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/grammarly/subscriptions-6-320` }]
    },
    {
      id: 'prowritingaid-premium',
      source_url: `${Z2U}/prowritingaid/subscriptions-6-485`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/prowritingaid/subscriptions-6-485` }]
    },
    {
      id: 'beautiful-ai',
      source_url: `${Z2U}/beautiful-ai/subscriptions-6-486`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/beautiful-ai/subscriptions-6-486` }]
    },
    {
      id: 'tome-ai',
      source_url: `${Z2U}/tome/subscriptions-6-487`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/tome/subscriptions-6-487` }]
    },

    // ===== CLOUD & PRODUCTIVITY =====
    {
      id: 'onedrive-100gb',
      source_url: `${Z2U}/microsoft/onedrive-6-488`,
      plans: [{ label_en: '1 Year (100 GB)', source_url: `${Z2U}/microsoft/onedrive-6-488` }]
    },
    {
      id: 'icloud-plus',
      source_url: `${Z2U}/apple/icloud-6-489`,
      plans: [
        { label_en: '50 GB Monthly', source_url: `${Z2U}/apple/icloud-6-489` },
        { label_en: '200 GB Monthly', source_url: `${Z2U}/apple/icloud-6-489` }
      ]
    },
    {
      id: 'box-personal-pro',
      source_url: `${Z2U}/box/subscriptions-6-490`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/box/subscriptions-6-490` }]
    },
    {
      id: 'pcloud-plus',
      source_url: `${Z2U}/pcloud/subscriptions-6-491`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/pcloud/subscriptions-6-491` }]
    },
    {
      id: 'mega-pro-1',
      source_url: `${Z2U}/mega/subscriptions-6-492`,
      plans: [{ label_en: '1 Month (2 TB)', source_url: `${Z2U}/mega/subscriptions-6-492` }]
    },
    {
      id: 'nordlocker',
      source_url: `${Z2U}/nordlocker/subscriptions-6-493`,
      plans: [{ label_en: '1 Month (500GB)', source_url: `${Z2U}/nordlocker/subscriptions-6-493` }]
    },
    {
      id: 'airtable-plus',
      source_url: `${Z2U}/airtable/subscriptions-6-494`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/airtable/subscriptions-6-494` }]
    },
    {
      id: 'clickup-unlimited',
      source_url: `${Z2U}/clickup/subscriptions-6-495`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/clickup/subscriptions-6-495` }]
    },
    {
      id: 'wrike-professional',
      source_url: `${Z2U}/wrike/subscriptions-6-496`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/wrike/subscriptions-6-496` }]
    },
    {
      id: 'smartsheet-pro',
      source_url: `${Z2U}/smartsheet/subscriptions-6-497`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/smartsheet/subscriptions-6-497` }]
    },
    {
      id: 'miro-starter',
      source_url: `${Z2U}/miro/subscriptions-6-498`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/miro/subscriptions-6-498` }]
    },
    {
      id: 'figma-professional',
      source_url: `${Z2U}/figma/subscriptions-6-499`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/figma/subscriptions-6-499` }]
    },

    // ===== DESIGN =====
    {
      id: 'adobe-creative-cloud',
      source_url: `${Z2U}/adobe/subscriptions-6-262`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/adobe/subscriptions-6-262` }]
    },
    {
      id: 'canva-teams',
      source_url: `${Z2U}/canva/subscriptions-6-317`,
      plans: [
        { label_en: 'Monthly (Team Invite)', source_url: `${Z2U}/canva/subscriptions-6-317` },
        { label_en: 'Yearly (Team Invite)', source_url: `${Z2U}/canva/subscriptions-6-317` }
      ]
    },
    {
      id: 'picsart-gold',
      source_url: `${Z2U}/picsart/subscriptions-6-503`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/picsart/subscriptions-6-503` }]
    },
    {
      id: 'vsco-membership',
      source_url: `${Z2U}/vsco/subscriptions-6-504`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/vsco/subscriptions-6-504` }]
    },
    {
      id: 'lightroom-presets',
      source_url: `${Z2U}/adobe/lightroom-presets-6-505`,
      plans: [{ label_en: 'Massive Lifetime Bundle', source_url: `${Z2U}/adobe/lightroom-presets-6-505` }]
    },
    {
      id: 'sketch-app',
      source_url: `${Z2U}/sketch/subscriptions-6-506`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/sketch/subscriptions-6-506` }]
    },
    {
      id: 'davinci-resolve-studio',
      source_url: `${Z2U}/davinci-resolve/keys-6-507`,
      plans: [{ label_en: 'Lifetime Studio', source_url: `${Z2U}/davinci-resolve/keys-6-507` }]
    },
    {
      id: 'magix-vegas-pro',
      source_url: `${Z2U}/vegas-pro/subscriptions-6-508`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/vegas-pro/subscriptions-6-508` }]
    },
    {
      id: 'fl-studio-producer',
      source_url: `${Z2U}/fl-studio/keys-6-509`,
      plans: [{ label_en: 'Producer Edition (Lifetime)', source_url: `${Z2U}/fl-studio/keys-6-509` }]
    },
    {
      id: 'ableton-live-standard',
      source_url: `${Z2U}/ableton/keys-6-510`,
      plans: [{ label_en: 'Lifetime Standard', source_url: `${Z2U}/ableton/keys-6-510` }]
    },

    // ===== EDUCATION =====
    {
      id: 'linkedin-learning',
      source_url: `${Z2U}/linkedin/learning-6-511`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/linkedin/learning-6-511` }]
    },
    {
      id: 'coursera-plus',
      source_url: `${Z2U}/coursera/subscriptions-6-512`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/coursera/subscriptions-6-512` }]
    },
    {
      id: 'edx-verified',
      source_url: `${Z2U}/edx/certificates-6-513`,
      plans: [{ label_en: 'Verified Cert (1 Course)', source_url: `${Z2U}/edx/certificates-6-513` }]
    },
    {
      id: 'duolingo-super',
      source_url: `${Z2U}/duolingo/subscriptions-6-330`,
      plans: [{ label_en: '1 Month (Super)', source_url: `${Z2U}/duolingo/subscriptions-6-330` }]
    },
    {
      id: 'memrise-pro',
      source_url: `${Z2U}/memrise/subscriptions-6-514`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/memrise/subscriptions-6-514` }]
    },
    {
      id: 'drops-premium',
      source_url: `${Z2U}/drops/subscriptions-6-515`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/drops/subscriptions-6-515` }]
    },
    {
      id: 'khan-academy-donations',
      source_url: `${Z2U}/khan-academy/donations-6-516`,
      plans: [{ label_en: 'Support / Setup Acc', source_url: `${Z2U}/khan-academy/donations-6-516` }]
    },
    {
      id: 'treehouse',
      source_url: `${Z2U}/treehouse/subscriptions-6-517`,
      plans: [{ label_en: '1 Month (Basic)', source_url: `${Z2U}/treehouse/subscriptions-6-517` }]
    },
    {
      id: 'udacity-nanodegree',
      source_url: `${Z2U}/udacity/nanodegrees-6-518`,
      plans: [{ label_en: '1 Month Nanodegree', source_url: `${Z2U}/udacity/nanodegrees-6-518` }]
    },
    {
      id: 'skillsoft',
      source_url: `${Z2U}/skillsoft/subscriptions-6-519`,
      plans: [{ label_en: '1 Month (Individual)', source_url: `${Z2U}/skillsoft/subscriptions-6-519` }]
    },

    // ===== VPN & SECURITY =====
    {
      id: 'nordvpn-complete',
      source_url: `${Z2U}/nordvpn/subscriptions-6-284`,
      plans: [{ label_en: '1 Month (Complete)', source_url: `${Z2U}/nordvpn/subscriptions-6-284` }]
    },
    {
      id: 'protonvpn-plus',
      source_url: `${Z2U}/protonvpn/subscriptions-6-520`,
      plans: [{ label_en: '1 Month (Plus)', source_url: `${Z2U}/protonvpn/subscriptions-6-520` }]
    },
    {
      id: 'windscribe-pro',
      source_url: `${Z2U}/windscribe/subscriptions-6-521`,
      plans: [{ label_en: '1 Month', source_url: `${Z2U}/windscribe/subscriptions-6-521` }]
    },
    {
      id: 'mullvad-vpn',
      source_url: `${Z2U}/mullvad/subscriptions-6-522`,
      plans: [{ label_en: '1 Month (+/- 5€)', source_url: `${Z2U}/mullvad/subscriptions-6-522` }]
    },
    {
      id: 'kaspersky-premium',
      source_url: `${Z2U}/kaspersky/antivirus-6-523`,
      plans: [{ label_en: '1 Year (1 Device)', source_url: `${Z2U}/kaspersky/antivirus-6-523` }]
    },
    {
      id: 'bitdefender-total-security',
      source_url: `${Z2U}/bitdefender/antivirus-6-524`,
      plans: [{ label_en: '1 Year (5 Devices)', source_url: `${Z2U}/bitdefender/antivirus-6-524` }]
    },
    {
      id: 'malwarebytes-premium',
      source_url: `${Z2U}/malwarebytes/antivirus-6-525`,
      plans: [{ label_en: '1 Year (1 Device)', source_url: `${Z2U}/malwarebytes/antivirus-6-525` }]
    },
    {
      id: 'discord-nitro-full',
      source_url: `${Z2U}/discord/nitro-6-246`,
      plans: [{ label_en: '1 Month Full Nitro', source_url: `${Z2U}/discord/nitro-6-246` }]
    },
    {
      id: 'discord-nitro-classic',
      source_url: `${Z2U}/discord/nitro-6-246`,
      plans: [{ label_en: '1 Month Basic Nitro', source_url: `${Z2U}/discord/nitro-6-246` }]
    },
    {
      id: 'whatsapp-api-services',
      source_url: `${Z2U}/whatsapp/api-6-526`,
      plans: [{ label_en: '1 Month Platform', source_url: `${Z2U}/whatsapp/api-6-526` }]
    },
  ];

  let ok = 0, fail = 0;
  console.log(`%c🔗 Spark - Fixing source_url (ad links) for ${fixes.length} products...`, 'color:#8b5cf6;font-size:14px;font-weight:bold');

  for (const fix of fixes) {
    try {
      // 1. Fetch current product to update subscription_plans
      const { data: row, error: fetchErr } = await sb.from('products').select('subscription_plans').eq('id', fix.id).single();
      if (fetchErr) { console.error('❌ fetch', fix.id, fetchErr.message); fail++; continue; }

      // 2. Update each plan's source_url by matching label_en
      let plans = row?.subscription_plans || [];
      if (plans.length > 0 && fix.plans?.length > 0) {
        plans = plans.map(p => {
          const match = fix.plans.find(fp => fp.label_en === p.label_en);
          return match ? { ...p, source_url: match.source_url } : p;
        });
      }

      // 3. Save updated product
      const { error } = await sb.from('products').update({ source_url: fix.source_url, subscription_plans: plans }).eq('id', fix.id);
      if (error) { console.error('❌', fix.id, error.message); fail++; }
      else { console.log('%c✅ ' + fix.id, 'color:#4ade80'); ok++; }
    } catch(e) { console.error('❌', fix.id, e.message); fail++; }
    await new Promise(r => setTimeout(r, 100));
  }

  console.log(`%c🏁 Source URL Fix Done! ✅ ${ok} fixed | ❌ ${fail} failed`, `color:${fail === 0 ? '#4ade80' : '#f87171'};font-size:13px;font-weight:bold`);
})();
