// ================================================
// SPARK STORE - FIX IMAGE URLS FOR PRODUCTS 101-200
// Paste this in the browser console while on the ADMIN PAGE (after login)
// ================================================
(async () => {
  const updates = [
    // ===== GAMING (101-120) =====
    { id: 'playstation-plus-essential', image: 'https://www.logo.wine/a/logo/PlayStation_Plus/PlayStation_Plus-Logo.wine.svg' },
    { id: 'geforce-now-priority',       image: 'https://images.nvidia.com/aem-dam/Solutions/geforce/gfn-logo.jpg' },
    { id: 'boosteroid-cloud-gaming',    image: 'https://boosteroid.com/wp-content/uploads/2021/09/boosteroid-logo-white.svg' },
    { id: 'xbox-live-gold',             image: 'https://download.microsoft.com/download/7/d/0/7d00b757-d12a-4065-8b30-2abf35a0613e/Xbox_Logo_rgb_white.png' },
    { id: 'ea-play-standard',           image: 'https://media.direct.playstation.com/is/image/sierialto/ea-play-logo-01?$Background_Large$' },
    { id: 'nintendo-switch-online-exp', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Nintendo_Switch_Online_logo.svg/1024px-Nintendo_Switch_Online_logo.svg.png' },
    { id: 'vrchat-plus',                image: 'https://assets.vrchat.com/www/brand/vrchat-logo-full-white.png' },
    { id: 'warframe-platinum',          image: 'https://www.warframe.com/images/home/warframe-logo-2023.png' },
    { id: 'clash-of-clans-gold-pass',   image: 'https://supercell.com/images/b8eb74a5fa17b73e0dd22d97cca24db7.png' },
    { id: 'pubg-mobile-uc-sub',         image: 'https://www.pubgmobile.com/a/pubgmobile/img/logo.png' },
    { id: 'free-fire-elite-pass',       image: 'https://ff.garena.com/images/logo.png' },
    { id: 'genshin-blessing',           image: 'https://webstatic.hoyoverse.com/upload/op-public/2023/08/28/73b77e2da19a4bf83c3b1ae81d49c4fc_2327628218023700534.png' },
    { id: 'cod-battle-pass',            image: 'https://www.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/hero/mwiii/MWIII-FULL-TOUT.jpg' },
    { id: 'apex-legends-coins',         image: 'https://media.contentapi.ea.com/content/dam/apex-legends/images/2019/01/apex-featured-image-16x9.jpg.adapt.crop16x9.431p.jpg' },
    { id: 'valorant-vp',                image: 'https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/065e2d83e4bba4fdc979acb76ce3ef64e4fc17b5-5944x3344.png' },
    { id: 'lol-rp',                     image: 'https://cmsassets.rgpub.io/sanity/images/dsfx7636/universe/e8a76b45f41b5c9ece72e8742beda13f48c99e49-1920x1081.jpg' },
    { id: 'world-of-tanks-premium',     image: 'https://eu.wargaming.net/static/2.112.0/img/wg-logo.svg' },
    { id: 'dbd-auric-cells',            image: 'https://www.deadbydaylight.com/wp-content/uploads/2023/04/DBD_LOGO_02.png' },
    { id: 'gw2-gems',                   image: 'https://www.guildwars2.com/wp-content/themes/gw2-2019/dist/images/logo/GW2_Logo_RGB.svg' },
    { id: 'bdo-acoin',                  image: 'https://www.naeu.playblackdesert.com/img/logo_bdo.png' },

    // ===== STREAMING (121-138) =====
    { id: 'hbo-max-premium',            image: 'https://www.max.com/static-assets/images/maxLogo_white.svg' },
    { id: 'crunchyroll-mega-fan',       image: 'https://www.crunchyroll.com/build/assets/img/header/logo.svg' },
    { id: 'apple-tv-plus',              image: 'https://www.apple.com/v/apple-tv-plus/q/images/overview/ogimage_overview__d4g17dtaqwyy_og.jpg' },
    { id: 'amc-plus',                   image: 'https://www.amc.com/images/amcplus-logo-white.png' },
    { id: 'shudder-streaming',          image: 'https://images.ctfassets.net/4cd45et68cgf/6I2e4yjOxEBifbQMU5BXNR/a0a4aca72f6b58e1a8c079e7a78c7ca1/shudder_logo_white.png' },
    { id: 'britbox',                    image: 'https://www.britbox.com/assets/svgs/logo-britbox-white.svg' },
    { id: 'acorn-tv',                   image: 'https://acorn.tv/wp-content/themes/acorn/img/logos/acorn-logo.png' },
    { id: 'espn-plus',                  image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/ESPN_Plus_logo.svg/1024px-ESPN_Plus_logo.svg.png' },
    { id: 'dazn',                       image: 'https://brand.assets.dazn.com/dazn/images/DAZN_Logo_White.svg' },
    { id: 'ufc-fight-pass',             image: 'https://cdn.ufcfightpass.com/images/logos/ufc-fight-pass-logo-white.png' },
    { id: 'nfl-plus-premium',           image: 'https://static.www.nfl.com/image/upload/v1554321393/league/nvfr7ogywjjsvfaotyp.svg' },
    { id: 'mlb-tv',                     image: 'https://www.mlbstatic.com/team-logos/league-on-dark/1.svg' },
    { id: 'f1-tv-pro',                  image: 'https://www.formula1.com/etc/designs/fom-website/images/f1_logo.png' },
    { id: 'wrc-plus-all-live',          image: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/fa/World_Rally_Championship_logo.svg/800px-World_Rally_Championship_logo.svg.png' },
    { id: 'motogp-videopass',           image: 'https://assets.motogp.com/2023/01/MotoGP-Logo-White.svg' },
    { id: 'curiosity-stream',           image: 'https://curiositystream.com/wp-content/themes/cs-2023/src/images/cs-logo-hz-white.svg' },
    { id: 'magellantv',                 image: 'https://images.ctfassets.net/wc253ashgrfy/5eBRH1qChiXVAtjzsmvJJZ/6cdcef9e7d8e30e9e8b52f0b3f9a7abb/MagellanTV_Logo.png' },
    { id: 'history-vault',              image: 'https://www.history.com/.image/t_share/MTU1MDAwMzA3NjM5ODgzMTk1/history-logo.png' },

    // ===== MUSIC (139-148) =====
    { id: 'tidal-hifi-plus',            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Tidal_logo.svg/1024px-Tidal_logo.svg.png' },
    { id: 'amazon-music-unlimited',     image: 'https://m.media-amazon.com/images/G/01/digital/music/player/web/Amazonmusic_FullColor_FullLockup.svg' },
    { id: 'qobuz-studio',              image: 'https://www.qobuz.com/img/qobuz-logo.svg' },
    { id: 'iheartradio-all-access',     image: 'https://brand.iheart.com/logos/iHeartRadio_Logo_Stacked_White.svg' },
    { id: 'mixcloud-pro',               image: 'https://www.mixcloud.com/media/images/www/logos/mixcloud-logo-white.svg' },
    { id: 'beatport-link',              image: 'https://geo-media.beatport.com/image/750x750.png/2cf2424c-dc2d-4a91-9b8b-5c0f9aa47c74.jpg' },
    { id: 'splice-sounds',              image: 'https://creative-assets.splice.com/landing-page/splice-logo-text-white.svg' },
    { id: 'blinkist',                   image: 'https://media.blinkist.com/cdn-cgi/image/width=200/assets/homepage-2021/logo-blinkist.svg' },
    { id: 'headway',                    image: 'https://dn721803.ca.archive.org/0/items/headway-app-logo/Headway%20App%20Icon.png' },
    { id: 'pocket-fm',                  image: 'https://pocketfm.com/images/logo/pocket-fm-logo.png' },

    // ===== AI TOOLS (149-158) =====
    { id: 'chatgpt-plus-shared',        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1024px-ChatGPT_logo.svg.png' },
    { id: 'writesonic-pro',             image: 'https://writesonic.com/static/images/writesonic-logo-white.svg' },
    { id: 'rytr-premium',               image: 'https://rytr.me/img/rytr-logo.png' },
    { id: 'murf-ai',                    image: 'https://murf.ai/resources/images/murf-logo-white.svg' },
    { id: 'pictory-ai',                 image: 'https://pictory.ai/wp-content/uploads/2023/04/Pictory-Logo-Full-White.svg' },
    { id: 'descript-pro',               image: 'https://www.descript.com/images/brand/descript-logo-white.svg' },
    { id: 'grammarly-premium',          image: 'https://brand.grammarly.com/assets/primary-logo-white.svg' },
    { id: 'prowritingaid-premium',      image: 'https://prowritingaid.com/images/logos/prowritingaid-logo-white.svg' },
    { id: 'beautiful-ai',               image: 'https://www.beautiful.ai/assets/beautiful-logo-white.svg' },
    { id: 'tome-ai',                    image: 'https://tome.app/assets/tome-logo.svg' },

    // ===== CLOUD & PRODUCTIVITY (159-170) =====
    { id: 'onedrive-100gb',             image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/OneDrive_Cloud_Logo_2022.svg/1024px-OneDrive_Cloud_Logo_2022.svg.png' },
    { id: 'icloud-plus',               image: 'https://www.apple.com/v/icloud/h/images/overview/og__c14cvxmjmhk2_og.png' },
    { id: 'box-personal-pro',           image: 'https://www.box.com/assets/boxlogo2.png' },
    { id: 'pcloud-plus',                image: 'https://my.pcloud.com/res/images/pcloud_logo_white.svg' },
    { id: 'mega-pro-1',                 image: 'https://mega.io/wp-content/themes/meganz/images/mega-logo-white.svg' },
    { id: 'nordlocker',                 image: 'https://nordvpn.com/wp-content/uploads/2022/11/NordLocker_Logo_White.svg' },
    { id: 'airtable-plus',             image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Airtable_Logo.svg/1024px-Airtable_Logo.svg.png' },
    { id: 'clickup-unlimited',          image: 'https://clickup.com/landing/img/brand/clickup-logo-white.svg' },
    { id: 'wrike-professional',         image: 'https://www.wrike.com/assets/images/wrike-logo-white.svg' },
    { id: 'smartsheet-pro',             image: 'https://www.smartsheet.com/sites/default/files/smar-logo-white-2015-01.svg' },
    { id: 'miro-starter',               image: 'https://miro.com/static/images/logo.svg' },
    { id: 'figma-professional',         image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Figma-logo.svg/1024px-Figma-logo.svg.png' },

    // ===== DESIGN (171-180) =====
    { id: 'adobe-creative-cloud',       image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Adobe_Creative_Cloud_rainbow_icon.svg/1024px-Adobe_Creative_Cloud_rainbow_icon.svg.png' },
    { id: 'canva-teams',                image: 'https://static.canva.com/web/images/8439b51bb7a19f6e65ce1064bc37c908.svg' },
    { id: 'picsart-gold',               image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Picsart_logo.svg/1024px-Picsart_logo.svg.png' },
    { id: 'vsco-membership',            image: 'https://vsco.co/oe-assets/art/svg/vsco-logo-white.svg' },
    { id: 'lightroom-presets',          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Adobe_Photoshop_Lightroom_CC_logo.svg/1024px-Adobe_Photoshop_Lightroom_CC_logo.svg.png' },
    { id: 'sketch-app',                 image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Sketch_Logo.svg/1024px-Sketch_Logo.svg.png' },
    { id: 'davinci-resolve-studio',     image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/DaVinci_Resolve_17_logo.svg/1024px-DaVinci_Resolve_17_logo.svg.png' },
    { id: 'magix-vegas-pro',            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Vegas_Pro_logo.png/1024px-Vegas_Pro_logo.png' },
    { id: 'fl-studio-producer',         image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/FL_Studio_logo.svg/1024px-FL_Studio_logo.svg.png' },
    { id: 'ableton-live-standard',      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Ableton_Logo.svg/1024px-Ableton_Logo.svg.png' },

    // ===== EDUCATION (181-190) =====
    { id: 'linkedin-learning',          image: 'https://static-exp1.licdn.com/sc/h/8s162nmbcnfkg7a0k8nq9wwqo' },
    { id: 'coursera-plus',              image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Coursera-Logo_600x600.svg/1024px-Coursera-Logo_600x600.svg.png' },
    { id: 'edx-verified',               image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/EdX.svg/1024px-EdX.svg.png' },
    { id: 'duolingo-super',             image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Duolingo_logo.svg/1024px-Duolingo_logo.svg.png' },
    { id: 'memrise-pro',                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Memrise_logo.svg/1024px-Memrise_logo.svg.png' },
    { id: 'drops-premium',              image: 'https://learn.languagedrops.com/static/logo-drops.png' },
    { id: 'khan-academy-donations',     image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Khan_Academy_logo.svg/1024px-Khan_Academy_logo.svg.png' },
    { id: 'treehouse',                  image: 'https://teamtreehouse.com/assets/nav/treehouse-logo-white-4f29e37c06a5a4af1aab23d61bcacb24ca4a1e286a66a64b94c43e7c6c0eba52.svg' },
    { id: 'udacity-nanodegree',         image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Udacity_logo.svg/1024px-Udacity_logo.svg.png' },
    { id: 'skillsoft',                  image: 'https://www.skillsoft.com/images/logos/skillsoft-logo-white.svg' },

    // ===== VPN & SECURITY (191-200) =====
    { id: 'nordvpn-complete',           image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/NordVPN_logo.svg/1024px-NordVPN_logo.svg.png' },
    { id: 'protonvpn-plus',             image: 'https://protonvpn.com/blog/wp-content/uploads/protonvpn_logo.svg' },
    { id: 'windscribe-pro',             image: 'https://windscribe.com/img/assets/wordmark-white.svg' },
    { id: 'mullvad-vpn',                image: 'https://mullvad.net/media/uploads/2021/02/11/mullvad-logo.svg' },
    { id: 'kaspersky-premium',          image: 'https://www.kaspersky.com/content/en-global/images/campaign/design/Kaspersky_Logo_White.svg' },
    { id: 'bitdefender-total-security', image: 'https://www.bitdefender.com/content/dam/bitdefender/consumers/general/logos/bd-logo-white.svg' },
    { id: 'malwarebytes-premium',       image: 'https://www.malwarebytes.com/staticc/images/brand/logo-byline-white.svg' },
    { id: 'discord-nitro-full',         image: 'https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a69f118df70ad7828d4_icon_clyde_blurple_RGB.svg' },
    { id: 'discord-nitro-classic',      image: 'https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a69f118df70ad7828d4_icon_clyde_blurple_RGB.svg' },
    { id: 'whatsapp-api-services',      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1024px-WhatsApp.svg.png' },
  ];

  let ok = 0, fail = 0;
  const total = updates.length;
  console.log(`%c🔧 Spark - Fixing Image URLs for ${total} products...`, 'color:#f59e0b;font-size:14px;font-weight:bold');

  for (const { id, image } of updates) {
    try {
      const { error } = await sb.from('products').update({ image }).eq('id', id);
      if (error) { console.error('❌', id, error.message); fail++; }
      else { console.log('%c✅ ' + id, 'color:#4ade80'); ok++; }
    } catch(e) { console.error('❌', id, e.message); fail++; }
    await new Promise(r => setTimeout(r, 80));
  }

  console.log(`%c🏁 Image Fix Done! ✅ ${ok} fixed | ❌ ${fail} failed`, `color:${fail === 0 ? '#4ade80' : '#f87171'};font-size:13px;font-weight:bold`);
})();
