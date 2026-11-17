(() => {
  const counter = document.getElementById('visit-counter');
  const tally = counter.dataset.site + '-home';
  const storageKey = tally + ':visit-day';
  const day = new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit'
  }).format(new Date());

  function firstVisitToday() {
    try {
      if (localStorage.getItem(storageKey) === day) return false;
      // Record before sending requests so a quick reload stays read-only.
      localStorage.setItem(storageKey, day);
      return true;
    } catch {
      return false;
    }
  }

  function showCounts(increment) {
    const badges = counter.querySelectorAll('img');
    const labels = ['Today', 'Total'];
    const ids = [tally + '-' + day, tally + '-total'];
    badges.forEach((badge, index) => {
      const url = new URL('https://vbr.nathanchung.dev/badge');
      url.search = new URLSearchParams({
        page_id: ids[index],
        text: labels[index],
        hit: increment ? 'true' : 'off',
        style: 'flat-square',
        color: '175c42'
      });
      badge.addEventListener('error', () => { badge.hidden = true; });
      badge.src = url.href;
    });
    counter.hidden = false;
  }

  if (navigator.locks) {
    navigator.locks.request(storageKey, () => showCounts(firstVisitToday()))
      .catch(() => showCounts(false));
  } else {
    showCounts(firstVisitToday());
  }
})();
