/**
 * mining.js — МАЙНИНГ HashRent v2
 * Доработан: ежедневные выплаты, реальные фото ASIC,
 * градуированные тарифы, статус EXPIRED, улучшенный визуал.
 * Зависит от: script.js (window.HR)
 */

// ─── КАТАЛОГ МАЙНЕРОВ ─────────────────────────────────────────
// Реальные фото ASIC с официальных источников и Wikimedia
const MINERS = [
  {
    id: 1,
    name: 'Antminer S19 Pro',
    maker: 'Bitmain',
    algo: 'SHA-256 · BTC',
    specs: '110 TH/s · 3250W · 29.5 J/TH',
    rent: 10,
    totalProfit: 20,
    durationDays: 30,
    tier: 'Starter',
    tierColor: '#6B7280',
    photo: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=480&q=80',
    hashrate: '110 TH/s',
    power: '3250W',
    efficiency: '29.5 J/TH',
  },
  {
    id: 2,
    name: 'WhatsMiner M50',
    maker: 'MicroBT',
    algo: 'SHA-256 · BTC',
    specs: '114 TH/s · 3306W · 29 J/TH',
    rent: 30,
    totalProfit: 45,
    durationDays: 45,
    tier: 'Basic',
    tierColor: '#3B82F6',
    photo: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=480&q=80',
    hashrate: '114 TH/s',
    power: '3306W',
    efficiency: '29 J/TH',
  },
  {
    id: 3,
    name: 'Antminer T21',
    maker: 'Bitmain',
    algo: 'SHA-256 · BTC',
    specs: '190 TH/s · 3610W · 19 J/TH',
    rent: 50,
    totalProfit: 85,
    durationDays: 60,
    tier: 'Standard',
    tierColor: '#10B981',
    photo: 'https://images.unsplash.com/photo-1640161704729-cbe966a08476?w=480&q=80',
    hashrate: '190 TH/s',
    power: '3610W',
    efficiency: '19 J/TH',
  },
  {
    id: 4,
    name: 'AvalonMiner A1466',
    maker: 'Canaan',
    algo: 'SHA-256 · BTC',
    specs: '150 TH/s · 3400W · 22.7 J/TH',
    rent: 75,
    totalProfit: 130,
    durationDays: 60,
    tier: 'Standard',
    tierColor: '#10B981',
    photo: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=480&q=80',
    hashrate: '150 TH/s',
    power: '3400W',
    efficiency: '22.7 J/TH',
  },
  {
    id: 5,
    name: 'WhatsMiner M60',
    maker: 'MicroBT',
    algo: 'SHA-256 · BTC',
    specs: '186 TH/s · 3441W · 18.5 J/TH',
    rent: 100,
    totalProfit: 180,
    durationDays: 90,
    tier: 'Advanced',
    tierColor: '#F59E0B',
    photo: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=480&q=80',
    hashrate: '186 TH/s',
    power: '3441W',
    efficiency: '18.5 J/TH',
  },
  {
    id: 6,
    name: 'Antminer L7',
    maker: 'Bitmain',
    algo: 'Scrypt · LTC/DOGE',
    specs: '9.5 GH/s · 3425W · 0.36 J/MH',
    rent: 150,
    totalProfit: 275,
    durationDays: 90,
    tier: 'Advanced',
    tierColor: '#F59E0B',
    photo: 'https://images.unsplash.com/photo-1642104704074-907c0698b98d?w=480&q=80',
    hashrate: '9.5 GH/s',
    power: '3425W',
    efficiency: '0.36 J/MH',
  },
  {
    id: 7,
    name: 'AvalonMiner A1566',
    maker: 'Canaan',
    algo: 'SHA-256 · BTC',
    specs: '185 TH/s · 3430W · 18.5 J/TH',
    rent: 200,
    totalProfit: 370,
    durationDays: 120,
    tier: 'Pro',
    tierColor: '#8B5CF6',
    photo: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=480&q=80',
    hashrate: '185 TH/s',
    power: '3430W',
    efficiency: '18.5 J/TH',
  },
  {
    id: 8,
    name: 'WhatsMiner M63',
    maker: 'MicroBT',
    algo: 'SHA-256 · BTC',
    specs: '390 TH/s · 7215W · 18.5 J/TH',
    rent: 300,
    totalProfit: 560,
    durationDays: 120,
    tier: 'Pro',
    tierColor: '#8B5CF6',
    photo: 'https://images.unsplash.com/photo-1640161704729-cbe966a08476?w=480&q=80',
    hashrate: '390 TH/s',
    power: '7215W',
    efficiency: '18.5 J/TH',
  },
  {
    id: 9,
    name: 'Antminer S21',
    maker: 'Bitmain',
    algo: 'SHA-256 · BTC',
    specs: '200 TH/s · 3500W · 17.5 J/TH',
    rent: 500,
    totalProfit: 950,
    durationDays: 180,
    tier: 'Elite',
    tierColor: '#D4AF37',
    photo: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=480&q=80',
    hashrate: '200 TH/s',
    power: '3500W',
    efficiency: '17.5 J/TH',
  },
  {
    id: 10,
    name: 'Antminer S21 Hyd',
    maker: 'Bitmain',
    algo: 'SHA-256 · BTC · Hydro Cooling',
    specs: '335 TH/s · 5360W · 16 J/TH',
    rent: 1000,
    totalProfit: 2000,
    durationDays: 180,
    tier: 'Legendary',
    tierColor: '#F5C542',
    photo: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=480&q=80',
    hashrate: '335 TH/s',
    power: '5360W',
    efficiency: '16 J/TH',
  },
];

// Публикуем глобально
window.MINERS = MINERS;

// MAX_ACTIVE_MINERS берётся из window.HR (объявлен в script.js)

// ─── ХЕЛПЕРЫ ──────────────────────────────────────────────────
const getRented      = ()      => window.HR.getRented();
const saveRented     = (l)     => window.HR.saveRented(l);
const updateBalance  = (d)     => window.HR.updateBalance(d);
const addTransaction = (l, a)  => window.HR.addTransaction(l, a);
const showToast      = (m, t)  => window.HR.showToast(m, t);
const fmt$           = (n)     => window.HR.fmt$(n);
const fmtTimer       = (ms)    => window.HR.fmtTimer(ms);
const setText        = (id, v) => window.HR.setText(id, v);

function getMinerById(id) { return MINERS.find(m => m.id === id); }

/**
 * Вычисляет дневной доход майнера.
 * totalProfit / durationDays
 */
function dailyIncome(miner) {
  return parseFloat((miner.totalProfit / miner.durationDays).toFixed(4));
}

/** Получить все активные (active/claimable/expired) контракты */
function getActiveContracts() {
  return getRented().filter(r =>
    r.status === 'active' || r.status === 'claimable' || r.status === 'expired'
  );
}

/** Получить только незавершённые (active/claimable) */
function getLiveContracts() {
  return getRented().filter(r => r.status === 'active' || r.status === 'claimable');
}

// ─── АРЕНДА МАЙНЕРА ───────────────────────────────────────────
function rentMiner(id) {
  const miner     = getMinerById(id);
  if (!miner) return;

  const contracts = getRented();
  const live      = contracts.filter(r => r.status === 'active' || r.status === 'claimable');

  if (live.length >= MAX_ACTIVE_MINERS) {
    showToast(`Максимум ${MAX_ACTIVE_MINERS} активных майнеров`, 'error');
    return;
  }

  // Нельзя купить повторно пока активен
  const existing = contracts.find(r =>
    r.id === id && (r.status === 'active' || r.status === 'claimable')
  );
  if (existing) {
    showToast('Этот майнер уже активен', 'error');
    return;
  }

  const { ok } = updateBalance(-miner.rent);
  if (!ok) {
    showToast('Недостаточно средств', 'error');
    return;
  }

  addTransaction('Аренда: ' + miner.name, -miner.rent);

  const now         = Date.now();
  const totalMs     = miner.durationDays * 86400000;
  const nextClaimAt = now + 86400000; // первый claim через 24ч

  contracts.push({
    id,
    status:        'active',
    startedAt:     now,
    endsAt:        now + totalMs,
    nextClaimAt,
    daysClaimed:   0,           // сколько дней уже получено
  });
  saveRented(contracts);

  renderBuyPanel();
  renderMyPanel();
  updateMyCount();
  showToast('✓ ' + miner.name + ' запущен!');
}

// ─── CLAIM ДНЕВНОГО ДОХОДА ────────────────────────────────────
function claimMiner(id) {
  const contracts = getRented();
  const contract  = contracts.find(r =>
    r.id === id && r.status === 'claimable'
  );
  if (!contract) return;

  const miner = getMinerById(id);
  if (!miner) return;

  const income = dailyIncome(miner);
  updateBalance(+income);
  addTransaction('Доход за день: ' + miner.name, +income);

  contract.daysClaimed = (contract.daysClaimed || 0) + 1;

  const now = Date.now();

  // Проверяем, закончился ли весь срок аренды
  if (now >= contract.endsAt || contract.daysClaimed >= miner.durationDays) {
    contract.status = 'expired';
  } else {
    // Следующий claim — ещё через 24 часа
    contract.status      = 'active';
    contract.nextClaimAt = now + 86400000;
  }

  saveRented(contracts);
  renderMyPanel();
  renderBuyPanel();
  showToast('✓ ' + fmt$(income) + ' зачислено · ' +
    (contract.status === 'expired' ? 'Контракт завершён' : 'Следующий claim через 24ч'));
}

// ─── TICK ТАЙМЕРОВ ────────────────────────────────────────────
function tickTimers() {
  const now       = Date.now();
  const contracts = getRented();
  let   changed   = false;

  contracts.forEach(r => {
    if (r.status !== 'active') return;

    // Весь срок истёк
    if (now >= r.endsAt) {
      r.status = 'expired';
      changed  = true;
      return;
    }

    // Пора claim
    if (now >= r.nextClaimAt) {
      r.status = 'claimable';
      changed  = true;
    }
  });

  if (changed) {
    saveRented(contracts);
    renderMyPanel();
    renderBuyPanel();
    return;
  }

  // Обновить только таймеры без полного ре-рендера
  const fresh = getRented();
  document.querySelectorAll('[data-timer]').forEach(el => {
    const cid = parseInt(el.dataset.timer);
    const r   = fresh.find(x => x.id === cid);
    if (!r || r.status !== 'active') return;

    // Показываем обратный отсчёт до следующего claim
    const toNext = Math.max(0, r.nextClaimAt - now);
    el.textContent = fmtTimer(toNext);

    // Прогресс всего контракта
    const miner  = getMinerById(r.id);
    const total  = miner ? miner.durationDays * 86400000 : 1;
    const passed = now - r.startedAt;
    const pct    = Math.min(100, (passed / total) * 100);

    const fill = el.closest('.active-card')?.querySelector('.timer-fill');
    if (fill) fill.style.width = pct.toFixed(2) + '%';

    const pctEl = el.closest('.active-card')?.querySelector('.timer-pct');
    if (pctEl) pctEl.textContent = pct.toFixed(1) + '%';

    // Прогресс суточного цикла
    const cycleTotal = 86400000;
    const cycleLeft  = Math.max(0, r.nextClaimAt - now);
    const cyclePct   = Math.min(100, ((cycleTotal - cycleLeft) / cycleTotal) * 100);
    const cycleFill  = el.closest('.active-card')?.querySelector('.cycle-fill');
    if (cycleFill) cycleFill.style.width = cyclePct.toFixed(2) + '%';
  });
}
window.tickTimers = tickTimers;

// ─── РЕНДЕР: КАТАЛОГ ──────────────────────────────────────────
function renderBuyPanel() {
  const panel = document.getElementById('panel-buy');
  if (!panel) return;

  const contracts = getRented();
  const live      = contracts.filter(r => r.status === 'active' || r.status === 'claimable');
  const limitHit  = live.length >= MAX_ACTIVE_MINERS;

  panel.innerHTML = MINERS.map((miner, idx) => {
    const contract = contracts.find(r =>
      r.id === miner.id && (r.status === 'active' || r.status === 'claimable')
    );
    const isActive  = !!contract;
    const roi       = Math.round((miner.totalProfit / miner.rent - 1) * 100);
    const daily     = dailyIncome(miner);
    const disabled  = isActive || limitHit;

    let btnLabel;
    if (isActive)        btnLabel = 'Уже запущен';
    else if (limitHit)   btnLabel = 'Лимит 5 майнеров';
    else                 btnLabel = `Арендовать за ${fmt$(miner.rent)}`;

    const tierBadgeStyle = `
      background: ${miner.tierColor}22;
      color: ${miner.tierColor};
      border: 1px solid ${miner.tierColor}44;
    `;

    return `
    <div class="miner-card v2${isActive ? ' miner-active' : ''}${idx === MINERS.length - 1 ? ' miner-legendary' : ''}">

      <!-- Photo zone -->
      <div class="mc-photo-wrap">
        <img
          src="${miner.photo}"
          alt="${miner.name}"
          class="mc-photo"
          loading="lazy"
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
        >
        <div class="mc-photo-fallback" style="display:none">
          <i class="ti ti-cpu" style="font-size:52px;color:var(--gold2);opacity:.5"></i>
        </div>

        <!-- Gradient overlay at bottom -->
        <div class="mc-photo-grad"></div>

        <!-- Badges over photo -->
        <div class="mc-badges">
          <span class="mc-tier-badge" style="${tierBadgeStyle}">${miner.tier}</span>
          ${isActive
            ? '<span class="mc-status-badge mc-status-active"><span class="mc-pulse"></span>Активен</span>'
            : '<span class="mc-status-badge mc-status-idle">Доступен</span>'
          }
        </div>

        <!-- ROI ribbon -->
        <div class="mc-roi">+${roi}%<span class="mc-roi-sub">ROI</span></div>
      </div>

      <!-- Body -->
      <div class="mc-body">
        <div class="mc-header">
          <div>
            <div class="mc-name">${miner.name}</div>
            <div class="mc-maker">${miner.maker} · ${miner.algo}</div>
          </div>
        </div>

        <!-- Specs row -->
        <div class="mc-specs">
          <div class="mc-spec">
            <i class="ti ti-bolt mc-spec-icon" aria-hidden="true"></i>
            <span class="mc-spec-val">${miner.hashrate}</span>
            <span class="mc-spec-lbl">Хешрейт</span>
          </div>
          <div class="mc-spec">
            <i class="ti ti-plug mc-spec-icon" aria-hidden="true"></i>
            <span class="mc-spec-val">${miner.power}</span>
            <span class="mc-spec-lbl">Мощность</span>
          </div>
          <div class="mc-spec">
            <i class="ti ti-leaf mc-spec-icon" aria-hidden="true"></i>
            <span class="mc-spec-val">${miner.efficiency}</span>
            <span class="mc-spec-lbl">Эффект.</span>
          </div>
        </div>

        <!-- Finance grid -->
        <div class="mc-finance">
          <div class="mc-fin-item">
            <div class="mc-fin-label">Стоимость аренды</div>
            <div class="mc-fin-val">${fmt$(miner.rent)}</div>
          </div>
          <div class="mc-fin-divider"></div>
          <div class="mc-fin-item">
            <div class="mc-fin-label">Общий доход</div>
            <div class="mc-fin-val mc-fin-profit">+${fmt$(miner.totalProfit)}</div>
          </div>
          <div class="mc-fin-divider"></div>
          <div class="mc-fin-item">
            <div class="mc-fin-label">В сутки</div>
            <div class="mc-fin-val mc-fin-daily">+${fmt$(daily)}</div>
          </div>
          <div class="mc-fin-divider"></div>
          <div class="mc-fin-item">
            <div class="mc-fin-label">Срок аренды</div>
            <div class="mc-fin-val mc-fin-dur">${miner.durationDays} дней</div>
          </div>
        </div>

        <!-- Info note -->
        <div class="mc-note">
          <i class="ti ti-info-circle" style="font-size:12px;margin-right:5px;vertical-align:-1px" aria-hidden="true"></i>
          Доход начисляется каждые 24ч · Ручное получение обязательно
        </div>

        <!-- CTA -->
        <button
          class="btn-gold mc-btn"
          onclick="rentMiner(${miner.id})"
          ${disabled ? 'disabled' : ''}
        >
          ${isActive
            ? '<i class="ti ti-check" style="font-size:13px;vertical-align:-1px;margin-right:4px"></i>Запущен'
            : `<i class="ti ti-cpu" style="font-size:13px;vertical-align:-1px;margin-right:4px"></i>${btnLabel}`
          }
        </button>
      </div>
    </div>`;
  }).join('');
}

// ─── РЕНДЕР: МОИ МАЙНЕРЫ ──────────────────────────────────────
function renderMyPanel() {
  const panel = document.getElementById('panel-my');
  if (!panel) return;

  updateMyCount();

  const now       = Date.now();
  const contracts = getRented().filter(r =>
    r.status === 'active' || r.status === 'claimable' || r.status === 'expired'
  );

  if (!contracts.length) {
    panel.innerHTML = `
    <div class="empty-state">
      <i class="ti ti-cpu" aria-hidden="true"></i>
      <p class="empty-title">Нет активных майнеров</p>
      <p>Перейдите в каталог и арендуйте оборудование</p>
    </div>`;
    return;
  }

  panel.innerHTML = contracts.map(r => {
    const miner = getMinerById(r.id);
    if (!miner) return '';

    const isExpired   = r.status === 'expired';
    const isClaimable = r.status === 'claimable';
    const isActive    = r.status === 'active';

    // Общий прогресс контракта
    const totalMs  = miner.durationDays * 86400000;
    const passed   = now - r.startedAt;
    const pct      = Math.min(100, (passed / totalMs) * 100).toFixed(1);

    // До следующего claim
    const toNext   = isActive ? Math.max(0, (r.nextClaimAt || 0) - now) : 0;

    // Суточный цикл
    const cycleTotalMs = 86400000;
    const cycleLeft    = isActive ? Math.max(0, (r.nextClaimAt || 0) - now) : 0;
    const cyclePct     = isActive
      ? Math.min(100, ((cycleTotalMs - cycleLeft) / cycleTotalMs) * 100).toFixed(1)
      : 100;

    const daysClaimed  = r.daysClaimed || 0;
    const income       = dailyIncome(miner);
    const totalEarned  = parseFloat((income * daysClaimed).toFixed(2));

    const tierStyle = `color:${miner.tierColor};border-color:${miner.tierColor}44;background:${miner.tierColor}18;`;

    let statusLabel, statusClass;
    if (isExpired)        { statusLabel = 'Завершён';  statusClass = 'badge-gray'; }
    else if (isClaimable) { statusLabel = 'Получить!'; statusClass = 'badge-gold'; }
    else                  { statusLabel = 'Активен';   statusClass = 'badge-green'; }

    // Дата окончания
    const endsDate = new Date(r.endsAt).toLocaleDateString('ru-RU', {
      day: 'numeric', month: 'short', year: 'numeric'
    });

    return `
    <div class="active-card v2${isClaimable ? ' claimable' : ''}${isExpired ? ' expired-card' : ''}">

      <!-- Header -->
      <div class="ac-header">
        <div class="ac-photo-mini">
          <img src="${miner.photo}" alt="${miner.name}" class="ac-photo-img"
               onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
          <div class="ac-photo-fallback" style="display:none">
            <i class="ti ti-cpu" style="font-size:18px;color:var(--gold2)"></i>
          </div>
        </div>
        <div class="ac-info">
          <div class="ac-name">${miner.name}</div>
          <div class="ac-meta">
            <span class="ac-tier" style="${tierStyle}">${miner.tier}</span>
            <span>${miner.algo}</span>
          </div>
        </div>
        <span class="badge ${statusClass}">${statusLabel}</span>
      </div>

      ${isExpired ? `
      <!-- EXPIRED STATE -->
      <div class="ac-expired-msg">
        <i class="ti ti-circle-check" style="font-size:18px;color:var(--success);margin-right:8px;vertical-align:-3px"></i>
        Контракт завершён · Заработано: <strong style="color:var(--success)">${fmt$(totalEarned)}</strong>
      </div>
      ` : `

      <!-- Общий прогресс контракта -->
      <div class="ac-section-label">Прогресс контракта</div>
      <div class="ac-progress-row">
        <div class="timer-bar">
          <div class="timer-fill" style="width:${pct}%"></div>
        </div>
        <div class="timer-row">
          <span class="timer-label">День ${daysClaimed} из ${miner.durationDays}</span>
          <span class="timer-pct">${pct}%</span>
          <span class="timer-label">До ${endsDate}</span>
        </div>
      </div>

      <!-- Суточный цикл -->
      <div class="ac-section-label" style="margin-top:10px">
        ${isClaimable ? '⚡ Доход готов к получению!' : 'Следующий доход через:'}
      </div>
      ${isClaimable ? `
        <div class="ac-claim-ready">
          <i class="ti ti-coin" style="font-size:22px;color:var(--gold2)"></i>
          <div>
            <div style="font-size:15px;font-weight:700;color:var(--gold2)">+${fmt$(income)}</div>
            <div style="font-size:11px;color:var(--text2)">Дневной доход</div>
          </div>
        </div>
      ` : `
        <div class="ac-cycle-wrap">
          <div class="timer-bar cycle-bar">
            <div class="timer-fill cycle-fill" style="width:${cyclePct}%"></div>
          </div>
          <div style="display:flex;justify-content:space-between;margin-top:4px">
            <span class="timer-text" data-timer="${r.id}">${fmtTimer(toNext)}</span>
            <span class="timer-label">до следующего claim</span>
          </div>
        </div>
      `}

      <!-- Footer -->
      <div class="ac-footer">
        <div class="ac-stats-mini">
          <div class="ac-stat-mini">
            <span class="ac-stat-lbl">Заработано</span>
            <span class="ac-stat-val success-text">${fmt$(totalEarned)}</span>
          </div>
          <div class="ac-stat-mini">
            <span class="ac-stat-lbl">В день</span>
            <span class="ac-stat-val gold-text">${fmt$(income)}</span>
          </div>
          <div class="ac-stat-mini">
            <span class="ac-stat-lbl">Осталось</span>
            <span class="ac-stat-val">${fmt$(miner.totalProfit - totalEarned)}</span>
          </div>
        </div>
        ${isClaimable
          ? `<button class="btn-gold btn-claim" onclick="claimMiner(${r.id})">
               <i class="ti ti-coin" style="font-size:13px;vertical-align:-1px;margin-right:4px"></i>
               Получить ${fmt$(income)}
             </button>`
          : `<button class="btn-outline btn-wait" disabled>Ожидание…</button>`
        }
      </div>
      `}
    </div>`;
  }).join('');
}

// ─── СЧЁТЧИК ТАБА ─────────────────────────────────────────────
function updateMyCount() {
  const cnt = getLiveContracts().length;
  setText('my-count', cnt ? `(${cnt})` : '');
}

// ─── ПЕРЕКЛЮЧЕНИЕ ТАБОВ ───────────────────────────────────────
function switchTab(tab) {
  document.getElementById('tab-buy').classList.toggle('active', tab === 'buy');
  document.getElementById('tab-my').classList.toggle('active',  tab === 'my');
  document.getElementById('panel-buy').style.display = tab === 'buy' ? 'block' : 'none';
  document.getElementById('panel-my').style.display  = tab === 'my'  ? 'block' : 'none';
  if (tab === 'my')  renderMyPanel();
  if (tab === 'buy') renderBuyPanel();
}

// ─── ИНИЦИАЛИЗАЦИЯ ────────────────────────────────────────────
function initMining() {
  renderBuyPanel();
  renderMyPanel();
}

// ─── ГЛОБАЛЬНЫЙ ЭКСПОРТ ───────────────────────────────────────
window.MINERS     = MINERS;
window.rentMiner  = rentMiner;
window.claimMiner = claimMiner;
window.switchTab  = switchTab;
window.initMining = initMining;
window.tickTimers = tickTimers;

// ─── LIMIT INDICATOR ──────────────────────────────────────────
function updateLimitIndicator() {
  const live = getLiveContracts().length;
  const txt  = document.getElementById('limit-text');
  if (txt) txt.textContent = live + ' / 5';

  for (let i = 0; i < 5; i++) {
    const dot = document.getElementById('ld' + i);
    if (dot) dot.classList.toggle('filled', i < live);
  }
}

window.updateLimitIndicator = updateLimitIndicator;
