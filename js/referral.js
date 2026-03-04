(function () {
  'use strict';

  const REF_KEY = 'referral_code';
  const VID_KEY = 'visitor_id';

  function init() {
    const params = new URLSearchParams(window.location.search);
    const refCode = params.get('ref');
    if (refCode) {
      localStorage.setItem(REF_KEY, refCode);
      trackVisit(refCode);
      params.delete('ref');
      const clean = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
      window.history.replaceState({}, '', clean);
    }
  }

  async function trackVisit(code) {
    if (typeof sb === 'undefined' || !isSupabaseConfigured()) return;
    try {
      let visitorId = localStorage.getItem(VID_KEY);
      if (!visitorId) {
        visitorId = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substr(2, 12);
        localStorage.setItem(VID_KEY, visitorId);
      }
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      await sb.from('referral_visits').insert({
        referral_code: code,
        visitor_id: visitorId,
        country: tz
      });
    } catch (e) {
      console.warn('Referral track failed:', e);
    }
  }

  window.ReferralTracker = {
    getCode() {
      return localStorage.getItem(REF_KEY) || '';
    },
    appendToMessage(msg) {
      const code = localStorage.getItem(REF_KEY);
      return code ? msg + ` [Ref: ${code}]` : msg;
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
