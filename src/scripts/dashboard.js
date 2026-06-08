// ===== BTC Market Indicator Dashboard =====
// Extracted and adapted for Astro Scholar embedding

// ===== Zone Classification Logic =====
const PROXY_BASE = 'https://proxy.liushuoan.com/?url=';  // 你的 Worker 地址
function classifyZone(name, value) {
  const n = name.toLowerCase();
  if (n.includes('mvrv')) {
    if (value < 0) return 'bottom';
    if (value < 1.5) return 'dca';
    if (value < 3.5) return 'normal';
    return 'mania';
  }
  if (n.includes('nupl')) {
    if (value < 0) return 'bottom';
    if (value < 0.25) return 'dca';
    if (value < 0.5) return 'normal';
    return 'mania';
  }
  if (n.includes('mpi')) {
    if (value < 0) return 'bottom';
    if (value < 1.5) return 'dca';
    if (value < 3.0) return 'normal';
    return 'mania';
  }
  if (n.includes('sopr') && n.includes('lth')) {
    if (value < 1.0) return 'bottom';
    if (value < 1.2) return 'dca';
    if (value < 2.0) return 'normal';
    return 'mania';
  }
  if (n.includes('puell')) {
    if (value < 0.5) return 'bottom';
    if (value < 1.0) return 'dca';
    if (value < 3.0) return 'normal';
    return 'mania';
  }
  if (n.includes('funding')) {
    if (value < -0.05) return 'bottom';
    if (value < 0) return 'dca';
    if (value < 0.05) return 'normal';
    return 'mania';
  }
  if (n.includes('open interest') || n === 'oi') {
    if (value < 20) return 'bottom';
    if (value < 30) return 'dca';
    if (value < 50) return 'normal';
    return 'mania';
  }
  if (n.includes('200wma') || n.includes('200 wma') || n.includes('200-week')) {
    if (value < 0.8) return 'bottom';
    if (value < 1.0) return 'dca';
    if (value < 2.2) return 'normal';
    return 'mania';
  }
  if (n.includes('etf') && n.includes('flow')) {
    if (value > 5000) return 'bottom';
    if (value > 1000) return 'dca';
    if (value > -3000) return 'normal';
    return 'mania';
  }
  if (n.includes('lth') && n.includes('supply') && (n.includes('change') || n.includes('net'))) {
    if (value > 50000) return 'bottom';
    if (value > 0) return 'dca';
    if (value > -100000) return 'normal';
    return 'mania';
  }
  if (n.includes('rhodl')) {
    if (value < 500) return 'bottom';
    if (value < 1500) return 'dca';
    if (value < 8000) return 'normal';
    return 'mania';
  }
  if (n.includes('fear') || n.includes('greed')) {
    if (value < 25) return 'bottom';
    if (value < 50) return 'dca';
    if (value < 75) return 'normal';
    return 'mania';
  }
  if (n.includes('ahr999')) {
    if (value < 0.45) return 'bottom';
    if (value < 1.2) return 'dca';
    if (value < 5.0) return 'normal';
    return 'mania';
  }
  if (n.includes('exchange') && n.includes('netflow')) {
    if (value < -15000) return 'bottom';
    if (value < 0) return 'dca';
    if (value < 15000) return 'normal';
    return 'mania';
  }
  if (n.includes('options') || n.includes('dvol') || n.includes('atmiv')) {
    if (value > 75) return 'bottom';
    if (value > 50) return 'dca';
    if (value > 35) return 'normal';
    return 'mania';
  }
  if (n.includes('l/s') || n.includes('long/short') || (n.includes('futures') && n.includes('ratio'))) {
    if (value < 0.6) return 'bottom';
    if (value < 0.9) return 'dca';
    if (value < 1.3) return 'normal';
    return 'mania';
  }
  if (n.includes('hashrate') || n.includes('hash rate')) {
    if (value < 400) return 'bottom';
    if (value < 550) return 'dca';
    if (value < 800) return 'normal';
    return 'mania';
  }
  if (n.includes('pi cycle') || n.includes('pi-cycle')) {
    if (value < 0.5) return 'bottom';
    if (value < 0.8) return 'dca';
    if (value < 1.0) return 'normal';
    return 'mania';
  }
  if ((n.includes('lth') && n.includes('%')) || (n.includes('lth supply') && n.includes('percent'))) {
    if (value > 70) return 'bottom';
    if (value > 65) return 'dca';
    if (value > 60) return 'normal';
    return 'mania';
  }
  if (n.includes('halving')) {
    if (value > 85) return 'bottom';
    if (value > 60) return 'dca';
    if (value > 15) return 'normal';
    return 'mania';
  }
  if (n.includes('mstr') && n.includes('supply')) {
    if (value > 5.0) return 'mania';
    if (value > 3.0) return 'normal';
    if (value > 2.0) return 'dca';
    return 'bottom';
  }
  if (n.includes('fed') || n.includes('federal funds')) {
    if (value > 4.75) return 'bottom';
    if (value > 4.0) return 'dca';
    if (value > 2.0) return 'normal';
    return 'mania';
  }
  if (n.includes('pce') || n.includes('cpi')) {
    if (value > 4.5) return 'bottom';
    if (value > 3.0) return 'dca';
    if (value > 2.0) return 'normal';
    return 'mania';
  }
  if (n.includes('dxy') || n.includes('dollar')) {
    if (value > 110) return 'bottom';
    if (value > 105) return 'dca';
    if (value > 95) return 'normal';
    return 'mania';
  }
  return 'normal';
}

const zoneLabels = {
  bottom: { text: 'Bottom', class: 'bottom' },
  dca: { text: 'DCA', class: 'dca' },
  normal: { text: 'Normal', class: 'normal' },
  mania: { text: 'Mania', class: 'mania' },
  extapi: { text: 'External API', class: 'extapi' }
};

// ===== Category Definitions =====
const categories = [
  { key: 'onchain', label: 'On-Chain Data', color: '#00D4AA' },
  { key: 'sentiment', label: 'Market Sentiment', color: '#A855F7' },
  { key: 'trend', label: 'Trend Signals', color: '#38BDF8' },
  { key: 'macro', label: 'Macro Data', color: '#F59E0B' },
];

// ===== Indicator Configurations =====
const indicators = [
  // 1. On-Chain Data (11)
  {
    name: 'MVRV-ZScore',
    sub: 'Market Value / Realized Value Z-Score',
    category: 'onchain',
    source: 'bgeometrics',
    endpoint: 'https://api.bitcoin-data.com/v1/mvrv-zscore/last',
    formatter: v => parseFloat(v).toFixed(4),
    parseValue: d => d.mvrvZscore
  },
  {
    name: 'NUPL',
    sub: 'Net Unrealized Profit/Loss',
    category: 'onchain',
    source: 'bgeometrics',
    endpoint: 'https://api.bitcoin-data.com/v1/nupl/last',
    formatter: v => parseFloat(v).toFixed(4),
    parseValue: d => d.nupl
  },
  {
    name: 'MPI',
    sub: 'Miner Position Index (365d MA)',
    category: 'onchain',
    source: 'bgeometrics',
    endpoint: 'https://api.bitcoin-data.com/v1/miner-position-index/last',
    formatter: v => parseFloat(v).toFixed(4),
    parseValue: d => d.mpi
  },
  {
    name: 'LTH Supply %',
    sub: 'Long-Term Holder Supply Percentage',
    category: 'onchain',
    source: 'bgeometrics',
    endpoint: 'https://api.bitcoin-data.com/v1/hodl-waves-supply/last',
    formatter: (v, d) => {
      const lthKeys = ['age_6m_1y','age_1y_2y','age_2y_3y','age_3y_4y','age_4y_5y','age_5y_7y','age_7y_10y','age_10y'];
      const allKeys = ['age_0d_1d','age_1d_1w','age_1w_1m','age_1m_3m','age_3m_6m',...lthKeys];
      const lth = lthKeys.reduce((s,k)=>s+(parseFloat(d[k])||0),0);
      const total = allKeys.reduce((s,k)=>s+(parseFloat(d[k])||0),0);
      return `${(lth/total*100).toFixed(2)}%`;
    },
    parseValue: d => {
      const lthKeys = ['age_6m_1y','age_1y_2y','age_2y_3y','age_3y_4y','age_4y_5y','age_5y_7y','age_7y_10y','age_10y'];
      const allKeys = ['age_0d_1d','age_1d_1w','age_1w_1m','age_1m_3m','age_3m_6m',...lthKeys];
      const lth = lthKeys.reduce((s,k)=>s+(parseFloat(d[k])||0),0);
      const total = allKeys.reduce((s,k)=>s+(parseFloat(d[k])||0),0);
      return (lth/total*100);
    },
    useRawData: true
  },
  {
    name: 'LTH Supply Change',
    sub: 'LTH Net Position Change (30d, BTC)',
    category: 'onchain',
    source: 'bgeometrics',
    endpoint: 'https://api.bitcoin-data.com/v1/lth-net-position-change-30d-btc/last',
    formatter: v => {
      const n = parseFloat(v);
      return n >= 0 ? `+${n.toLocaleString('en-US',{maximumFractionDigits:0})}` : n.toLocaleString('en-US',{maximumFractionDigits:0});
    },
    parseValue: d => d.lthNetPositionChange30dBtc
  },
  {
    name: 'LTH-SOPR',
    sub: 'Long-Term Holder Spent Output Profit Ratio',
    category: 'onchain',
    source: 'bgeometrics',
    endpoint: 'https://api.bitcoin-data.com/v1/lth-sopr/last',
    formatter: v => parseFloat(v).toFixed(4),
    parseValue: d => d.lthSopr
  },
  {
    name: 'Puell Multiple',
    sub: 'Daily Issuance Value / 365d MA',
    category: 'onchain',
    source: 'bgeometrics',
    endpoint: 'https://api.bitcoin-data.com/v1/puell-multiple/last',
    formatter: v => parseFloat(v).toFixed(4),
    parseValue: d => d.puellMultiple
  },
  {
    name: 'RHODL Ratio',
    sub: 'Realized HODL Ratio (LTH/STH cost basis)',
    category: 'onchain',
    source: 'bgeometrics',
    endpoint: 'https://api.bitcoin-data.com/v1/rhodl-ratio/last',
    formatter: v => parseFloat(v).toFixed(2),
    parseValue: d => d.rhodlRatio
  },
  {
    name: 'Ahr999 Index',
    sub: 'Ahr999 Accumulation Index',
    category: 'onchain',
    source: 'ahr999',
    endpoint: 'https://9992100.xyz/api/ahr999',
    formatter: v => parseFloat(v).toFixed(4),
    parseValue: d => d.ahr999
  },
  {
    name: 'Exchange Netflow',
    sub: 'Exchange BTC Netflow (Daily)',
    category: 'onchain',
    source: 'bgeometrics',
    endpoint: 'https://api.bitcoin-data.com/v1/exchange-netflow-btc/last',
    formatter: v => {
      const n = parseFloat(v);
      return n >= 0 ? `+${n.toLocaleString('en-US',{maximumFractionDigits:0})}` : n.toLocaleString('en-US',{maximumFractionDigits:0});
    },
    parseValue: d => d.exchangeNetflowBtc
  },
  // 2. Market Sentiment (5)
  {
    name: 'Funding Rate',
    sub: 'Binance Perpetual Funding Rate',
    category: 'sentiment',
    source: 'bgeometrics',
    endpoint: 'https://api.bitcoin-data.com/v1/funding-rate/last',
    formatter: v => {
      const n = parseFloat(v) * 100;
      return `${n >= 0 ? '+' : ''}${n.toFixed(4)}%`;
    },
    parseValue: d => d.fundingRate
  },
  {
    name: 'Open Interest',
    sub: 'Perpetual Futures Open Interest (USD)',
    category: 'sentiment',
    source: 'bgeometrics',
    endpoint: 'https://api.bitcoin-data.com/v1/open-interest/last',
    formatter: (v, d) => `$${(d.sumOpenInterestValue / 1e9).toFixed(2)}B`,
    parseValue: d => d.sumOpenInterestValue / 1e9,
    useRawData: true
  },
  {
    name: 'Fear & Greed',
    sub: 'Crypto Fear & Greed Index (0-100)',
    category: 'sentiment',
    source: 'bgeometrics',
    endpoint: 'https://api.bitcoin-data.com/v1/fear-greed/last',
    formatter: v => `${parseFloat(v).toFixed(0)} / 100`,
    parseValue: d => d.fearGreed
  },
  {
    name: 'atmIv (Options Day)',
    sub: 'BTC 30-Day ATM Implied Volatility',
    category: 'sentiment',
    source: 'bgeometrics',
    endpoint: 'https://api.bitcoin-data.com/v1/options-day/last',
    formatter: v => `${parseFloat(v).toFixed(2)}%`,
    parseValue: d => d.atmIv * 100,
    parseTime: d => d.d
  },
  {
    name: 'Futures L/S Ratio',
    sub: 'Binance Futures Global Long/Short Accounts Ratio',
    category: 'sentiment',
    source: 'binance',
    endpoint: 'https://fapi.binance.com/futures/data/globalLongShortAccountRatio?symbol=BTCUSDT&period=1d&limit=1',
    formatter: v => parseFloat(v).toFixed(4),
    parseValue: d => {
      const arr = Array.isArray(d) ? d : (d.data || []);
      if (arr.length === 0) return null;
      return parseFloat(arr[0].longShortRatio);
    },
    parseTime: d => {
      const arr = Array.isArray(d) ? d : (d.data || []);
      if (arr.length === 0) return null;
      const ts = arr[0].timestamp;
      return ts ? new Date(ts).toISOString().slice(0, 10) : 'N/A';
    }
  },
  // 3. Trend Signals (5)
  {
    name: 'Price / 200WMA',
    sub: 'BTC Price / 200-Week Moving Average Ratio',
    category: 'trend',
    source: 'bgeometrics',
    endpoint: 'https://api.bitcoin-data.com/v1/200-week-ma/last',
    formatter: (v, d) => (d.priceUsd / d.ma200w).toFixed(4),
    parseValue: d => d.priceUsd / d.ma200w,
    useRawData: true
  },
  {
    name: 'ETF Flow',
    sub: 'Bitcoin ETF Net Daily Flow (BTC)',
    category: 'trend',
    source: 'bgeometrics',
    endpoint: 'https://api.bitcoin-data.com/v1/etf-flow-btc/last',
    formatter: v => {
      const n = parseFloat(v);
      return n >= 0 ? `+${n.toLocaleString('en-US',{maximumFractionDigits:0})}` : n.toLocaleString('en-US',{maximumFractionDigits:0});
    },
    parseValue: d => d.etfFlow
  },
  {
    name: 'Pi Cycle',
    sub: '111 DMA vs 350 DMA x2 (Top Signal)',
    category: 'trend',
    source: 'bgeometrics',
    endpoint: 'https://api.bitcoin-data.com/v1/pi-cycle/last',
    formatter: (v, d) => d.piSignal ? 'Top Signal' : `${(d.piSma111 / d.piSma350x2 * 100).toFixed(1)}%`,
    parseValue: d => d.piSma111 / d.piSma350x2,
    useRawData: true
  },
  {
    name: 'Halving Cycle',
    sub: 'Progress to Next Halving (Apr 2028)',
    category: 'trend',
    source: 'computed',
    type: 'computed',
    compute: () => {
      const lastH = new Date('2024-04-19').getTime();
      const nextH = new Date('2028-04-18').getTime();
      const now = Date.now();
      const total = nextH - lastH;
      const elapsed = now - lastH;
      const pct = (elapsed / total) * 100;
      return { value: pct, display: `${pct.toFixed(1)}%`, time: new Date().toISOString().slice(0,10) };
    }
  },
  // 4. Macro Data (4)
  {
    name: 'Fed Funds Rate',
    sub: 'US Federal Funds Target Rate (%)',
    category: 'macro',
    source: 'fred',
    type: 'fred-target',
    fredLower: 'DFEDTARL',
    fredUpper: 'DFEDTARU',
    formatter: (lo, hi) => `${parseFloat(lo).toFixed(2)}% - ${parseFloat(hi).toFixed(2)}%`
  },
  {
    name: 'Core PCE YoY',
    sub: 'Core PCE Price Index YoY Change (%)',
    category: 'macro',
    source: 'fred',
    type: 'fred-yoy',
    fredId: 'PCEPILFE',
    formatter: v => `${parseFloat(v).toFixed(2)}%`
  },
  {
    name: 'DXY',
    sub: 'US Dollar Index (DXY)',
    category: 'macro',
    source: 'bgeometrics',
    endpoint: 'https://api.bitcoin-data.com/v1/macro/last',
    formatter: v => parseFloat(v).toFixed(2),
    parseValue: d => d.dxy
  },
];

// ===== BGeometrics Premium Token =====
const BG_TOKEN = 'gVUvdqqWr7';

// ===== localStorage Cache =====
const CACHE_KEY = 'btc_dashboard_cache_v2';
const CACHE_TTL_BG = 24 * 60 * 60 * 1000;
const CACHE_TTL_FRED = 6 * 60 * 60 * 1000;
const CACHE_VERSION = '5.1';

function loadCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cache = JSON.parse(raw);
    if (cache.version !== CACHE_VERSION) return null;
    return cache;
  } catch (e) {
    return null;
  }
}

function saveCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      version: CACHE_VERSION,
      timestamp: Date.now(),
      data: data
    }));
  } catch (e) {
    console.warn('Cache save failed:', e);
  }
}

function getCachedEntry(cache, name, source) {
  if (!cache || !cache.data) return null;
  const entry = cache.data[name];
  if (!entry) return null;
  const ttl = (source === 'bgeometrics' || source === 'ahr999' || source === 'deribit' || source === 'binance') ? CACHE_TTL_BG : CACHE_TTL_FRED;
  if (Date.now() - entry.cachedAt > ttl) return null;
  return entry;
}

function cacheResult(name, result) {
  const cache = loadCache() || { version: CACHE_VERSION, data: {} };
  cache.data[name] = { ...result, cachedAt: Date.now() };
  saveCache(cache.data);
}

// ===== Fetch with Timeout =====
async function fetchWithTimeout(url, options = {}, timeoutMs = 8000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (e) {
    clearTimeout(timeoutId);
    if (e.name === 'AbortError') throw new Error('Request timeout');
    throw e;
  }
}

// ===== FRED Fallback Data =====
const FRED_FALLBACK = {
  'DFEDTARL': { value: '3.50', date: '2026-05-08' },
  'DFEDTARU': { value: '3.75', date: '2026-05-08' },
  'PCEPILFE': { value: '3.20', date: '2026-03-01' },
  'DGS10':    { value: '4.41', date: '2026-05-07' },
  'DTWEXBGS': { value: '118.3926', date: '2026-05-01' }
};

// ===== Fetch FRED Data =====
async function fetchFredData(seriesId, mode = 'latest') {
  const proxyUrls = [
    `https://api.codetabs.com/v1/proxy?quest=https://fred.stlouisfed.org/graph/fredgraph.csv?id=${seriesId}`,
  ];

  for (const url of proxyUrls) {
    try {
      const response = await fetchWithTimeout(url, {}, 10000);
      if (!response.ok) continue;
      const text = await response.text();
      if (!text.includes('DATE,')) continue;
      const lines = text.trim().split('\n');
      const dataLines = [];
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line || line.endsWith('.')) continue;
        const parts = line.split(',');
        if (parts.length >= 2 && parts[1].trim()) {
          dataLines.push({ date: parts[0], value: parts[1].trim() });
        }
      }

      if (mode === 'yoy' && dataLines.length >= 13) {
        const current = dataLines[dataLines.length - 1];
        const y12m = dataLines[dataLines.length - 13];
        const yoyPct = ((parseFloat(current.value) - parseFloat(y12m.value)) / parseFloat(y12m.value) * 100).toFixed(2);
        return { value: yoyPct, date: current.date };
      }

      const latest = dataLines[dataLines.length - 1];
      if (latest) return latest;
    } catch (e) {
      console.warn(`[FRED] Proxy failed for ${seriesId}:`, e.message || e);
    }
  }

  const fallback = FRED_FALLBACK[seriesId];
  if (fallback) return { ...fallback, isFallback: true };
  return null;
}

// ===== Fetch Single Indicator =====
async function fetchIndicator(indicator, index, cache, forceRefresh) {
  const loadingStatus = document.getElementById('db-loading-status');
  if (loadingStatus) loadingStatus.textContent = `Fetching ${indicator.name} (${index + 1}/22)...`;

  if (indicator.type === 'extapi') {
    return { name: indicator.name, sub: indicator.sub, value: 'External API', zone: 'extapi', time: 'Requires API Key', source: 'static', isPlaceholder: true };
  }

  if (indicator.type === 'computed') {
    try {
      const result = indicator.compute();
      const zone = classifyZone(indicator.name, result.value);
      return { name: indicator.name, sub: indicator.sub, value: result.display, zone, time: result.time, source: 'computed', isPlaceholder: false };
    } catch (e) {
      return { name: indicator.name, sub: indicator.sub, value: 'Error', zone: 'normal', time: 'Error', source: 'computed', isPlaceholder: false, isError: true };
    }
  }

  if (!forceRefresh && cache) {
    const cached = getCachedEntry(cache, indicator.name, indicator.source);
    if (cached) {
      const t = cached.time || '';
      const hasLabel = t.includes('(cached)') || t.includes('(embedded)') || t.includes('(stale)');
      return { ...cached, time: hasLabel ? t : t + ' (cached)' };
    }
  }

  if (indicator.type === 'fred-target') {
    const [loData, hiData] = await Promise.all([
      fetchFredData(indicator.fredLower),
      fetchFredData(indicator.fredUpper)
    ]);
    if (!loData || !hiData) {
      const cached = cache ? cache.data[indicator.name] : null;
      if (cached) return { ...cached, time: cached.time + ' (stale)' };
      return { name: indicator.name, sub: indicator.sub, value: 'Error', zone: 'normal', time: 'FRED Error', source: 'fred', isPlaceholder: false, isError: true };
    }
    const midVal = (parseFloat(loData.value) + parseFloat(hiData.value)) / 2;
    const zone = classifyZone(indicator.name, midVal);
    const isFb = loData.isFallback || hiData.isFallback;
    return { name: indicator.name, sub: indicator.sub, value: indicator.formatter(loData.value, hiData.value), zone, time: hiData.date + (isFb ? ' (embedded)' : ''), source: 'fred', isPlaceholder: false };
  }

  if (indicator.type === 'fred-yoy') {
    const data = await fetchFredData(indicator.fredId, 'yoy');
    if (!data) {
      const cached = cache ? cache.data[indicator.name] : null;
      if (cached) return { ...cached, time: cached.time + ' (stale)' };
      return { name: indicator.name, sub: indicator.sub, value: 'Error', zone: 'normal', time: 'FRED Error', source: 'fred', isPlaceholder: false, isError: true };
    }
    const numVal = parseFloat(data.value);
    const zone = classifyZone(indicator.name, numVal);
    return { name: indicator.name, sub: indicator.sub, value: indicator.formatter(data.value), zone, time: data.date + (data.isFallback ? ' (embedded)' : ''), source: 'fred', isPlaceholder: false };
  }

  if (indicator.type === 'fred') {
    const data = await fetchFredData(indicator.fredId);
    if (!data) {
      const cached = cache ? cache.data[indicator.name] : null;
      if (cached) return { ...cached, time: cached.time + ' (stale)' };
      return { name: indicator.name, sub: indicator.sub, value: 'Error', zone: 'normal', time: 'FRED Error', source: 'fred', isPlaceholder: false, isError: true };
    }
    const numVal = parseFloat(data.value);
    const zone = classifyZone(indicator.name, numVal);
    return { name: indicator.name, sub: indicator.sub, value: indicator.formatter(data.value), zone, time: data.date + (data.isFallback ? ' (embedded)' : ''), source: 'fred', isPlaceholder: false };
  }

  if (indicator.source === 'deribit') {
    try {
      const now = Date.now();
      const startMs = now - 7 * 24 * 60 * 60 * 1000;
      const directUrl = `${indicator.endpoint}?currency=BTC&start_timestamp=${startMs}&end_timestamp=${now}&resolution=1D`;
      const proxyUrl = PROXY_BASE + encodeURIComponent(directUrl);
      const response = await fetchWithTimeout(proxyUrl, {}, 12000);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      const rawValue = indicator.parseValue(data);
      if (rawValue == null) throw new Error('No data');
      const timeStr = indicator.parseTime(data) || 'N/A';
      const formattedValue = indicator.formatter(rawValue);
      const zone = classifyZone(indicator.name, rawValue);
      return { name: indicator.name, sub: indicator.sub, value: formattedValue, zone, time: timeStr, source: 'deribit', isPlaceholder: false };
    } catch (e) {
      const cached = cache ? cache.data[indicator.name] : null;
      if (cached) return { ...cached, time: cached.time + ' (stale)' };
      return { name: indicator.name, sub: indicator.sub, value: 'API Error', zone: 'normal', time: 'Fetch Failed', source: 'deribit', isPlaceholder: false, isError: true };
    }
  }

  if (indicator.source === 'binance') {
    try {
      const proxyUrl = PROXY_BASE + encodeURIComponent(indicator.endpoint);
      const response = await fetchWithTimeout(proxyUrl, {}, 12000);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      const rawValue = indicator.parseValue(data);
      if (rawValue == null) throw new Error('No data');
      const timeStr = indicator.parseTime(data) || 'N/A';
      const formattedValue = indicator.formatter(rawValue);
      const zone = classifyZone(indicator.name, rawValue);
      return { name: indicator.name, sub: indicator.sub, value: formattedValue, zone, time: timeStr, source: 'binance', isPlaceholder: false };
    } catch (e) {
      const cached = cache ? cache.data[indicator.name] : null;
      if (cached) return { ...cached, time: cached.time + ' (stale)' };
      return { name: indicator.name, sub: indicator.sub, value: 'API Error', zone: 'normal', time: 'Fetch Failed', source: 'binance', isPlaceholder: false, isError: true };
    }
  }

  if (indicator.source === 'ahr999') {
    try {
      const proxyUrl = PROXY_BASE + encodeURIComponent(indicator.endpoint);
      const response = await fetchWithTimeout(proxyUrl, {}, 10000);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      const rawValue = indicator.parseValue(data);
      const formattedValue = indicator.formatter(rawValue);
      const zone = classifyZone(indicator.name, rawValue);
      const ts = data.updated_at_unix;
      const timeStr = ts ? new Date(ts * 1000).toISOString().slice(0, 10) : 'N/A';
      return { name: indicator.name, sub: indicator.sub, value: formattedValue, zone, time: timeStr, source: 'ahr999', isPlaceholder: false };
    } catch (e) {
      const cached = cache ? cache.data[indicator.name] : null;
      if (cached) return { ...cached, time: cached.time + ' (stale)' };
      return { name: indicator.name, sub: indicator.sub, value: 'API Error', zone: 'normal', time: 'Fetch Failed', source: 'ahr999', isPlaceholder: false, isError: true };
    }
  }

  try {
    const sep = indicator.endpoint.includes('?') ? '&' : '?';
    const response = await fetchWithTimeout(indicator.endpoint + sep + 'token=' + BG_TOKEN, {}, 8000);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    let rawValue = indicator.parseValue(data);
    let time = data.d || 'N/A';
    if (rawValue == null && indicator.macroField) {
      const fallbacks = { dxy: 98.02 };
      rawValue = fallbacks[indicator.macroField];
      time = time + ' (embedded)';
    }
    const formattedValue = indicator.useRawData ? indicator.formatter(rawValue, data) : indicator.formatter(rawValue);
    const zone = classifyZone(indicator.name, rawValue);
    return { name: indicator.name, sub: indicator.sub, value: formattedValue, zone, time, source: 'bgeometrics', isPlaceholder: false };
  } catch (e) {
    const cached = cache ? cache.data[indicator.name] : null;
    if (cached) return { ...cached, time: cached.time + ' (stale)' };
    return { name: indicator.name, sub: indicator.sub, value: 'API Error', zone: 'normal', time: 'Fetch Failed', source: 'bgeometrics', isPlaceholder: false, isError: true };
  }
}

// ===== Render Card =====
function renderCard(result) {
  const z = zoneLabels[result.zone] || zoneLabels.normal;
  let sourceDotClass = 'db-source-dot';
  let sourceText = '';
  if (result.source === 'bgeometrics') { sourceDotClass += ' bgeometrics'; sourceText = 'BGeometrics'; }
  else if (result.source === 'fred') { sourceDotClass += ' fred'; sourceText = 'FRED'; }
  else if (result.source === 'computed') { sourceDotClass += ' computed'; sourceText = 'Computed'; }
  else if (result.source === 'ahr999') { sourceDotClass += ' ahr999'; sourceText = 'AHR999'; }
  else if (result.source === 'deribit') { sourceDotClass += ' deribit'; sourceText = 'Deribit'; }
  else if (result.source === 'binance') { sourceDotClass += ' binance'; sourceText = 'Binance'; }
  else { sourceDotClass += ' static'; sourceText = 'STATIC'; }

  let valueDisplay;
  if (result.isPlaceholder) {
    valueDisplay = '<div class="db-indicator-value extapi">External API</div>';
  } else if (result.isError) {
    valueDisplay = '<div class="db-indicator-value error">API Error</div>';
  } else {
    valueDisplay = `<div class="db-indicator-value">${result.value}</div>`;
  }

  return `
    <div class="db-card" data-name="${result.name}">
      <div class="db-card-header">
        <div>
          <div class="db-indicator-name">${result.name}</div>
          <div class="db-indicator-sub">${result.sub}</div>
        </div>
        <div class="db-led ${z.class}"></div>
      </div>
      ${valueDisplay}
      <div class="db-indicator-time">${result.time}</div>
      <div class="db-api-source"><span class="${sourceDotClass}"></span> ${sourceText}</div>
      <div class="db-zone-label ${z.class}">${z.text}</div>
    </div>
  `;
}

// ===== Render Grid with Section Headers =====
function renderGridContent(results) {
  let html = '';
  let currentCat = null;
  for (let i = 0; i < results.length; i++) {
    const ind = indicators[i];
    const catKey = ind.category;
    if (catKey && catKey !== currentCat) {
      currentCat = catKey;
      const cat = categories.find(c => c.key === catKey);
      if (cat) {
        html += `
          <div class="db-section-header" style="--section-color: ${cat.color}">
            <div class="db-section-dot"></div>
            <div class="db-section-label">${cat.label}</div>
            <div class="db-section-line"></div>
          </div>
        `;
      }
    }
    html += renderCard(results[i]);
  }
  return html;
}

// ===== Update Zone Counts =====
function updateZoneCounts(results) {
  const counts = { bottom: 0, dca: 0, normal: 0, mania: 0, extapi: 0 };
  for (const r of results) {
    if (r && r.zone && counts.hasOwnProperty(r.zone)) counts[r.zone]++;
  }
  const ids = { bottom: 'count-bottom', dca: 'count-dca', normal: 'count-normal', mania: 'count-mania' };
  for (const [zone, id] of Object.entries(ids)) {
    const el = document.getElementById(id);
    if (el) el.textContent = String(counts[zone]);
  }
}

// ===== Main Init =====
async function init() {
  const loadingOverlay = document.getElementById('db-loading-overlay');
  const loadingStatus = document.getElementById('db-loading-status');
  const grid = document.getElementById('db-indicator-grid');
  const noticeBar = document.getElementById('db-notice-bar');

  if (!grid) return;

  const cache = loadCache();
  let results = [];
  let hasExtApi = false;

  const needsRefresh = [];
  for (let i = 0; i < indicators.length; i++) {
    const ind = indicators[i];
    if (ind.type === 'extapi' || ind.type === 'computed') continue;
    const cached = cache ? getCachedEntry(cache, ind.name, ind.source) : null;
    if (!cached) needsRefresh.push(i);
  }

  const allCached = needsRefresh.length === 0 && cache !== null;

  if (allCached) {
    for (let i = 0; i < indicators.length; i++) {
      const ind = indicators[i];
      if (ind.type === 'computed' || ind.type === 'dxy') {
        results[i] = await fetchIndicator(ind, i, cache, false);
      } else if (ind.type === 'extapi') {
        results[i] = { name: ind.name, sub: ind.sub, value: 'External API', zone: 'extapi', time: 'Requires API Key', source: 'static', isPlaceholder: true };
        hasExtApi = true;
      } else {
        const cached = getCachedEntry(cache, ind.name, ind.source);
        if (cached) {
          const t = cached.time || '';
          const hasLabel = t.includes('(cached)') || t.includes('(embedded)') || t.includes('(stale)');
          results[i] = { ...cached, time: hasLabel ? t : t + ' (cached)' };
        }
      }
    }

    grid.innerHTML = renderGridContent(results);
    if (loadingOverlay) loadingOverlay.classList.add('hidden');

    const cacheAge = Math.round((Date.now() - cache.timestamp) / 60000);
    const updateTime = document.getElementById('db-update-time');
    if (updateTime) updateTime.textContent = `Cache: ${cacheAge} min ago`;
    const liveDot = document.getElementById('db-live-dot');
    if (liveDot) liveDot.className = 'db-warn-dot';

    if (hasExtApi && noticeBar) noticeBar.style.display = 'block';
    updateZoneCounts(results);
    return;
  }

  // No full cache - render skeletons and fetch
  const skeletons = indicators.map(ind => ({
    name: ind.name, sub: ind.sub, value: '', zone: 'normal', time: 'Fetching...', source: ind.source, isPlaceholder: false
  }));
  grid.innerHTML = renderGridContent(skeletons);

  let apiCallCount = 0;

  for (let i = 0; i < indicators.length; i++) {
    const ind = indicators[i];
    let useCache = false;

    if (ind.type !== 'computed' && ind.type !== 'extapi' && cache) {
      const cached = getCachedEntry(cache, ind.name, ind.source);
      if (cached) {
        const t = cached.time || '';
        const hasLabel = t.includes('(cached)') || t.includes('(embedded)') || t.includes('(stale)');
        results[i] = { ...cached, time: hasLabel ? t : t + ' (cached)' };
        useCache = true;
      }
    }

    if (!useCache) {
      results[i] = await fetchIndicator(ind, i, cache, false);
      if (!results[i].isPlaceholder && !results[i].isError && ind.type !== 'computed') apiCallCount++;
    }

    if (results[i].isPlaceholder) hasExtApi = true;

    const card = grid.querySelector(`.db-card[data-name="${ind.name}"]`);
    if (card) card.outerHTML = renderCard(results[i]);

    if (i < indicators.length - 1) await new Promise(r => setTimeout(r, 200));
  }

  const cacheData = {};
  for (const result of results) {
    if (!result.isPlaceholder && !result.isError && result.source !== 'computed') {
      cacheData[result.name] = result;
    }
  }
  saveCache(cacheData);

  if (hasExtApi && noticeBar) noticeBar.style.display = 'block';
  updateZoneCounts(results);

  const updateTime = document.getElementById('db-update-time');
  if (updateTime) {
    const now = new Date();
    updateTime.textContent = `Updated: ${now.toISOString().replace('T',' ').slice(0,16)} UTC (${apiCallCount} API calls)`;
  }

  setTimeout(() => { if (loadingOverlay) loadingOverlay.classList.add('hidden'); }, 500);
}

// ===== Refresh All Data =====
async function refreshAll() {
  const loadingOverlay = document.getElementById('db-loading-overlay');
  const loadingStatus = document.getElementById('db-loading-status');
  const loadingText = document.querySelector('.db-loading-text');
  const grid = document.getElementById('db-indicator-grid');
  const noticeBar = document.getElementById('db-notice-bar');
  const refreshBtn = document.getElementById('db-refresh-btn');
  const updateTime = document.getElementById('db-update-time');
  const liveDot = document.getElementById('db-live-dot');

  if (!grid || !refreshBtn || refreshBtn.classList.contains('refreshing')) return;

  refreshBtn.classList.add('refreshing');

  // 1. 清除本地缓存
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch (e) {
    console.warn('Cache clear failed:', e);
  }

  // 2. 显示 Loading 遮罩
  if (loadingOverlay) loadingOverlay.classList.remove('hidden');
  if (loadingStatus) loadingStatus.textContent = 'Clearing cache...';
  if (loadingText) loadingText.textContent = 'Refreshing 22 Metrics...';

  let results = [];
  let hasExtApi = false;
  let apiCallCount = 0;

  // 3. 先渲染骨架屏
  const skeletons = indicators.map(ind => ({
    name: ind.name, sub: ind.sub, value: '', zone: 'normal', time: 'Fetching...', source: ind.source, isPlaceholder: false
  }));
  grid.innerHTML = renderGridContent(skeletons);

  // 4. 强制逐个重新获取（null cache + forceRefresh=true）
  for (let i = 0; i < indicators.length; i++) {
    const ind = indicators[i];

    if (ind.type === 'extapi') {
      results[i] = { name: ind.name, sub: ind.sub, value: 'External API', zone: 'extapi', time: 'Requires API Key', source: 'static', isPlaceholder: true };
      hasExtApi = true;
    } else {
      results[i] = await fetchIndicator(ind, i, null, true);
      if (!results[i].isPlaceholder && !results[i].isError && ind.type !== 'computed') apiCallCount++;
    }

    if (results[i].isPlaceholder) hasExtApi = true;

    // 实时更新单张卡片
    const card = grid.querySelector(`.db-card[data-name="${ind.name}"]`);
    if (card) card.outerHTML = renderCard(results[i]);

    if (i < indicators.length - 1) await new Promise(r => setTimeout(r, 200));
  }

  // 5. 保存新缓存
  const cacheData = {};
  for (const result of results) {
    if (!result.isPlaceholder && !result.isError && result.source !== 'computed') {
      cacheData[result.name] = result;
    }
  }
  saveCache(cacheData);

  // 6. 更新 UI 状态
  if (hasExtApi && noticeBar) noticeBar.style.display = 'block';
  updateZoneCounts(results);

  if (updateTime) {
    const now = new Date();
    updateTime.textContent = `Updated: ${now.toISOString().replace('T',' ').slice(0,16)} UTC (${apiCallCount} API calls)`;
  }
  if (liveDot) liveDot.className = 'db-live-dot';

  // 7. 结束
  setTimeout(() => {
    if (loadingOverlay) loadingOverlay.classList.add('hidden');
    refreshBtn.classList.remove('refreshing');
  }, 500);
}

function setupRefreshButton() {
  const btn = document.getElementById('db-refresh-btn');
  if (btn) {
    btn.addEventListener('click', refreshAll);
  }
}

// ===== Initialize on DOM ready =====
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    init();
    setupRefreshButton();
  });
} else {
  init();
  setupRefreshButton();
}