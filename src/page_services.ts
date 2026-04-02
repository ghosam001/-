// ======================================================
// SERVICES PAGE - Hierarchical: Category > Sub > Programs
// With direct booking → invoice + quick client add
// Uses data-* attributes to avoid onclick quote issues
// ======================================================
export function servicesPage(): string {
  return `
  <div class="page-header">
    <div class="page-header-left">
      <div class="page-header-title">إدارة الخدمات السياحية</div>
      <div class="page-header-sub">أقسام رئيسية — فرعية — برامج قابلة للتعديل والحجز المباشر</div>
    </div>
    <i class="fas fa-concierge-bell page-header-icon"></i>
  </div>

  <!-- KPI strip -->
  <div class="kpi-grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:1rem">
    <div class="kpi-card">
      <div class="kpi-icon" style="background:#E5F3F5;color:var(--teal-dark)"><i class="fas fa-layer-group"></i></div>
      <div class="kpi-info"><div class="kpi-label">الأقسام الرئيسية</div><div class="kpi-value" id="kpi-cats">0</div></div>
    </div>
    <div class="kpi-card">
      <div class="kpi-icon" style="background:#FAEEDA;color:#BA7517"><i class="fas fa-folder-open"></i></div>
      <div class="kpi-info"><div class="kpi-label">الأقسام الفرعية</div><div class="kpi-value" id="kpi-subs">0</div></div>
    </div>
    <div class="kpi-card">
      <div class="kpi-icon" style="background:#E1F5EE;color:#085041"><i class="fas fa-box-open"></i></div>
      <div class="kpi-info"><div class="kpi-label">البرامج والخدمات</div><div class="kpi-value" id="kpi-progs">0</div></div>
    </div>
    <div class="kpi-card">
      <div class="kpi-icon" style="background:#EEEDFE;color:#534AB7"><i class="fas fa-calendar-check"></i></div>
      <div class="kpi-info"><div class="kpi-label">الحجوزات اليوم</div><div class="kpi-value" id="kpi-bookings">0</div></div>
    </div>
  </div>

  <!-- Toolbar -->
  <div class="action-bar" style="margin-bottom:1rem">
    <div class="search-wrap" style="max-width:300px">
      <i class="fas fa-search"></i>
      <input id="svc-search" placeholder="بحث في الخدمات..." oninput="renderTree()">
    </div>
    <button class="btn btn-primary" id="btn-add-cat"><i class="fas fa-plus"></i> قسم رئيسي</button>
    <button class="btn btn-outline" id="btn-add-sub"><i class="fas fa-folder-plus"></i> قسم فرعي</button>
    <button class="btn btn-gold" id="btn-add-prog"><i class="fas fa-plus-circle"></i> برنامج / خدمة</button>
    <button class="btn btn-outline" id="btn-expand-all" style="margin-right:auto"><i class="fas fa-expand-alt"></i> توسيع الكل</button>
  </div>

  <!-- Tree view -->
  <div id="svc-tree"></div>

  <!-- ===================== MODALS ===================== -->

  <!-- Category Modal -->
  <div class="modal-overlay" id="cat-modal">
    <div class="modal" style="max-width:440px">
      <div class="modal-header">
        <div class="modal-title" id="cat-modal-title">قسم رئيسي جديد</div>
        <button class="modal-close" id="btn-close-cat"><i class="fas fa-times"></i></button>
      </div>
      <div class="modal-body">
        <input type="hidden" id="cat-edit-id">
        <div class="form-grid" style="grid-template-columns:1fr 1fr">
          <div class="field full"><label>اسم القسم الرئيسي *</label><input id="cat-name" placeholder="مثال: السياحة الداخلية"></div>
          <div class="field"><label>الأيقونة</label><input id="cat-icon" placeholder="fas fa-mountain" value="fas fa-star"></div>
          <div class="field"><label>اللون</label>
            <select id="cat-color">
              <option value="#1A5C6B">تيل داكن</option>
              <option value="#3A8C9B">تيل فاتح</option>
              <option value="#D4AB4B">ذهبي</option>
              <option value="#0F6E56">أخضر</option>
              <option value="#534AB7">بنفسجي</option>
              <option value="#A32D2D">أحمر</option>
            </select>
          </div>
          <div class="field full"><label>وصف مختصر</label><textarea id="cat-desc" rows="2" placeholder="وصف القسم..."></textarea></div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline" id="btn-cancel-cat">إلغاء</button>
        <button class="btn btn-primary" id="btn-save-cat"><i class="fas fa-save"></i> حفظ</button>
      </div>
    </div>
  </div>

  <!-- Sub-Category Modal -->
  <div class="modal-overlay" id="sub-modal">
    <div class="modal" style="max-width:440px">
      <div class="modal-header">
        <div class="modal-title" id="sub-modal-title">قسم فرعي جديد</div>
        <button class="modal-close" id="btn-close-sub"><i class="fas fa-times"></i></button>
      </div>
      <div class="modal-body">
        <input type="hidden" id="sub-edit-id">
        <div class="form-grid" style="grid-template-columns:1fr">
          <div class="field"><label>القسم الرئيسي *</label>
            <select id="sub-parent"></select>
          </div>
          <div class="field"><label>اسم القسم الفرعي *</label><input id="sub-name" placeholder="مثال: جبال الحجر"></div>
          <div class="field"><label>الأيقونة</label><input id="sub-icon" placeholder="fas fa-folder" value="fas fa-folder"></div>
          <div class="field"><label>وصف مختصر</label><textarea id="sub-desc" rows="2" placeholder="وصف القسم الفرعي..."></textarea></div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline" id="btn-cancel-sub">إلغاء</button>
        <button class="btn btn-primary" id="btn-save-sub"><i class="fas fa-save"></i> حفظ</button>
      </div>
    </div>
  </div>

  <!-- Program Modal -->
  <div class="modal-overlay" id="prog-modal">
    <div class="modal" style="max-width:620px">
      <div class="modal-header">
        <div class="modal-title" id="prog-modal-title">برنامج / خدمة جديدة</div>
        <button class="modal-close" id="btn-close-prog"><i class="fas fa-times"></i></button>
      </div>
      <div class="modal-body">
        <input type="hidden" id="prog-edit-id">
        <div class="form-grid" style="grid-template-columns:1fr 1fr">
          <div class="field"><label>القسم الرئيسي *</label>
            <select id="prog-cat" onchange="fillProgSubs()"></select>
          </div>
          <div class="field"><label>القسم الفرعي *</label>
            <select id="prog-sub"></select>
          </div>
          <div class="field full"><label>اسم البرنامج / الخدمة *</label><input id="prog-name" placeholder="مثال: باقة وادي شاب 3 أيام"></div>
          <div class="field"><label>السعر (ر.ع)</label><input id="prog-price" placeholder="150" type="number"></div>
          <div class="field"><label>المدة</label><input id="prog-dur" placeholder="3 أيام / يومان"></div>
          <div class="field"><label>الطاقة الاستيعابية</label><input id="prog-cap" placeholder="2-20 شخص"></div>
          <div class="field"><label>الحالة</label>
            <select id="prog-status">
              <option value="active">نشط</option>
              <option value="seasonal">موسمي</option>
              <option value="paused">متوقف</option>
            </select>
          </div>
          <div class="field full"><label>وصف البرنامج</label><textarea id="prog-desc" rows="3" placeholder="وصف تفصيلي للبرنامج..."></textarea></div>
          <div class="field full"><label>ما يشمله البرنامج (افصل بفاصلة)</label><input id="prog-includes" placeholder="نقل، إقامة، وجبات، مرشد سياحي"></div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline" id="btn-cancel-prog">إلغاء</button>
        <button class="btn btn-primary" id="btn-save-prog"><i class="fas fa-save"></i> حفظ البرنامج</button>
      </div>
    </div>
  </div>

  <!-- Booking Modal -->
  <div class="modal-overlay" id="booking-modal">
    <div class="modal" style="max-width:580px">
      <div class="modal-header" style="background:linear-gradient(135deg,var(--teal-dark),var(--teal-mid));color:#fff">
        <div class="modal-title" style="color:#fff">
          <i class="fas fa-calendar-check"></i> حجز جديد
        </div>
        <button class="modal-close" style="color:#fff" id="btn-close-booking"><i class="fas fa-times"></i></button>
      </div>
      <div class="modal-body">
        <div id="booking-prog-info" style="background:var(--bg-light);border-radius:8px;padding:12px;margin-bottom:14px;border-right:4px solid var(--teal-mid)"></div>

        <div style="margin-bottom:12px">
          <label style="font-size:11px;color:var(--text-muted);font-weight:600;display:block;margin-bottom:6px">العميل *</label>
          <div style="display:flex;gap:8px;align-items:center">
            <select id="bk-client" style="flex:1;padding:8px 10px;border-radius:8px;border:1px solid var(--border);font-size:13px;font-family:Cairo,sans-serif">
              <option value="">-- اختر عميل --</option>
            </select>
            <button class="btn btn-outline btn-sm" id="btn-toggle-qc"><i class="fas fa-user-plus"></i> عميل جديد</button>
          </div>
        </div>

        <div id="quick-client-box" style="display:none;background:#F0F8FA;border-radius:10px;padding:14px;margin-bottom:12px;border:1px dashed var(--teal-mid)">
          <div style="font-size:12px;font-weight:600;color:var(--teal-dark);margin-bottom:10px"><i class="fas fa-user-plus"></i> إضافة عميل سريعة</div>
          <div class="form-grid" style="grid-template-columns:1fr 1fr">
            <div class="field"><label>الاسم الكامل *</label><input id="qc-name" placeholder="اسم العميل"></div>
            <div class="field"><label>رقم الهاتف *</label><input id="qc-phone" placeholder="+968XXXXXXXX" dir="ltr"></div>
            <div class="field"><label>البريد الإلكتروني</label><input id="qc-email" placeholder="email@example.com" dir="ltr"></div>
            <div class="field"><label>الجنسية</label><input id="qc-nat" placeholder="عُماني"></div>
          </div>
          <button class="btn btn-primary btn-sm" id="btn-add-qc"><i class="fas fa-save"></i> إضافة وتحديد</button>
        </div>

        <div class="form-grid" style="grid-template-columns:1fr 1fr">
          <div class="field"><label>تاريخ الحجز *</label><input id="bk-date" type="date"></div>
          <div class="field"><label>عدد المشاركين</label><input id="bk-pax" type="number" min="1" value="1" oninput="calcBookingTotal()"></div>
          <div class="field"><label>السعر للفرد (ر.ع)</label><input id="bk-unit-price" type="number" oninput="calcBookingTotal()"></div>
          <div class="field"><label>خصم (ر.ع)</label><input id="bk-discount" type="number" value="0" oninput="calcBookingTotal()"></div>
          <div class="field"><label>الإجمالي (ر.ع)</label><input id="bk-total" readonly style="font-weight:700;color:var(--teal-dark)"></div>
          <div class="field"><label>حالة الدفع</label>
            <select id="bk-pay-status">
              <option value="pending">معلق</option>
              <option value="partial">جزئي</option>
              <option value="paid">مدفوع</option>
            </select>
          </div>
          <div class="field full"><label>ملاحظات</label><textarea id="bk-notes" rows="2" placeholder="أي تفاصيل إضافية..."></textarea></div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline" id="btn-cancel-booking">إلغاء</button>
        <button class="btn btn-gold" id="btn-save-booking"><i class="fas fa-file-invoice"></i> إنشاء حجز وفاتورة</button>
      </div>
    </div>
  </div>

  <script>
  (function(){
  // ============================================================
  // DATA LAYER
  // ============================================================
  function getSD(key, def){ try{ return JSON.parse(localStorage.getItem(key)||'null')||def; }catch(e){ return def; } }
  function setSD(key, val){ localStorage.setItem(key, JSON.stringify(val)); }
  function getCategories(){ return getSD('heg_svc_cats', []); }
  function getSubs(){ return getSD('heg_svc_subs', []); }
  function getProgs(){ return getSD('heg_svc_progs', []); }

  // ============================================================
  // SEED DEFAULT DATA
  // ============================================================
  function seedDefaults(){
    if(getCategories().length > 0) return;
    var cats = [
      {id:'c1', name:'السياحة الداخلية', icon:'fas fa-mountain', color:'#1A5C6B', desc:'استكشاف عُمان الجميلة'},
      {id:'c2', name:'السياحة الخارجية', icon:'fas fa-plane', color:'#0F6E56', desc:'رحلات دولية متميزة'},
      {id:'c3', name:'خدمات السفر', icon:'fas fa-suitcase', color:'#534AB7', desc:'تأشيرات وتذاكر وفنادق'},
      {id:'c4', name:'السياحة الدينية', icon:'fas fa-mosque', color:'#BA7517', desc:'العمرة والحج والزيارات الدينية'}
    ];
    var subs = [
      {id:'s1', catId:'c1', name:'جبال الحجر', icon:'fas fa-hiking', desc:'رحلات الجبال والوديان'},
      {id:'s2', catId:'c1', name:'الصحراء والرمال', icon:'fas fa-sun', desc:'مغامرات الصحراء'},
      {id:'s3', catId:'c1', name:'الشواطئ والبحر', icon:'fas fa-umbrella-beach', desc:'استجمام على الشاطئ'},
      {id:'s4', catId:'c2', name:'أوروبا', icon:'fas fa-globe-europe', desc:'رحلات أوروبية'},
      {id:'s5', catId:'c2', name:'آسيا', icon:'fas fa-globe-asia', desc:'رحلات آسيوية'},
      {id:'s6', catId:'c3', name:'التأشيرات', icon:'fas fa-stamp', desc:'خدمات التأشيرة'},
      {id:'s7', catId:'c4', name:'العمرة', icon:'fas fa-kaaba', desc:'برامج العمرة'}
    ];
    var progs = [
      {id:'p1', catId:'c1', subId:'s1', name:'باقة جبل شمس 3 أيام', price:180, dur:'3 أيام', cap:'2-15 شخص', status:'active', desc:'استكشاف أعلى قمة في سلطنة عُمان مع إقامة مريحة', includes:'نقل,إقامة,وجبات,مرشد'},
      {id:'p2', catId:'c1', subId:'s1', name:'وادي شاب رحلة يومية', price:45, dur:'يوم كامل', cap:'4-20 شخص', status:'active', desc:'رحلة يومية إلى الوادي الخلاب', includes:'نقل,غداء,مرشد'},
      {id:'p3', catId:'c1', subId:'s2', name:'ليلة في الصحراء', price:95, dur:'ليلة واحدة', cap:'2-10 أشخاص', status:'active', desc:'تجربة فريدة في رمال الصحراء العُمانية', includes:'نقل,مخيم,عشاء وفطور'},
      {id:'p4', catId:'c4', subId:'s7', name:'باقة العمرة 15 يوم', price:1200, dur:'15 يوم', cap:'لا حد', status:'active', desc:'باقة متكاملة للعمرة مع إقامة قريبة من الحرم', includes:'طيران,فندق,تنقلات,مرشد'}
    ];
    setSD('heg_svc_cats', cats);
    setSD('heg_svc_subs', subs);
    setSD('heg_svc_progs', progs);
  }
  seedDefaults();

  // ============================================================
  // BUILD HTML HELPERS (no inline onclick - use data-* attrs)
  // ============================================================
  function esc(str){ return String(str||'').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  function buildCatHeader(cat, catSubs, catProgs){
    var h = '';
    h += '<div style="background:'+cat.color+';color:#fff;padding:12px 16px;display:flex;align-items:center;justify-content:space-between;cursor:pointer" data-action="toggle-cat" data-id="'+esc(cat.id)+'">';
    h += '<div style="display:flex;align-items:center;gap:10px">';
    h += '<i class="'+esc(cat.icon)+'" style="font-size:18px"></i>';
    h += '<div><div style="font-size:14px;font-weight:700">'+esc(cat.name)+'</div>';
    h += '<div style="font-size:11px;opacity:.8">'+catSubs.length+' قسم فرعي &mdash; '+catProgs.length+' برنامج</div></div></div>';
    h += '<div style="display:flex;gap:6px" onclick="event.stopPropagation()">';
    h += '<button data-action="open-sub" data-cat="'+esc(cat.id)+'" style="background:rgba(255,255,255,.2);color:#fff;border:none;border-radius:6px;padding:4px 10px;cursor:pointer;font-size:11px;font-family:Cairo,sans-serif"><i class="fas fa-folder-plus"></i> قسم فرعي</button>';
    h += '<button data-action="open-prog" data-cat="'+esc(cat.id)+'" style="background:rgba(255,255,255,.2);color:#fff;border:none;border-radius:6px;padding:4px 10px;cursor:pointer;font-size:11px;font-family:Cairo,sans-serif"><i class="fas fa-plus"></i> برنامج</button>';
    h += '<button data-action="edit-cat" data-id="'+esc(cat.id)+'" style="background:rgba(255,255,255,.15);color:#fff;border:none;border-radius:6px;padding:4px 8px;cursor:pointer"><i class="fas fa-edit"></i></button>';
    h += '<button data-action="delete-cat" data-id="'+esc(cat.id)+'" style="background:rgba(255,255,255,.15);color:#fff;border:none;border-radius:6px;padding:4px 8px;cursor:pointer"><i class="fas fa-trash"></i></button>';
    h += '<i class="fas fa-chevron-down cat-chevron" id="chev-'+esc(cat.id)+'" style="font-size:12px;transition:.2s"></i>';
    h += '</div></div>';
    return h;
  }

  function buildSubHeader(sub, cat){
    var h = '';
    h += '<div style="padding:10px 16px 10px 24px;display:flex;align-items:center;justify-content:space-between;background:#FAFCFD;cursor:pointer" data-action="toggle-sub" data-id="'+esc(sub.id)+'">';
    h += '<div style="display:flex;align-items:center;gap:8px">';
    h += '<i class="'+esc(sub.icon)+'" style="color:'+esc(cat.color)+';font-size:14px"></i>';
    h += '<div style="font-size:13px;font-weight:600;color:var(--text-dark)">'+esc(sub.name)+'</div>';
    h += '</div><div style="display:flex;gap:6px;align-items:center" onclick="event.stopPropagation()">';
    h += '<button data-action="open-prog" data-cat="'+esc(cat.id)+'" data-sub="'+esc(sub.id)+'" style="background:'+esc(cat.color)+';color:#fff;border:none;border-radius:5px;padding:3px 8px;cursor:pointer;font-size:11px;font-family:Cairo,sans-serif"><i class="fas fa-plus"></i> برنامج</button>';
    h += '<button data-action="edit-sub" data-id="'+esc(sub.id)+'" style="background:transparent;border:1px solid var(--border);color:var(--text-muted);border-radius:5px;padding:3px 8px;cursor:pointer;font-size:10px"><i class="fas fa-edit"></i></button>';
    h += '<button data-action="delete-sub" data-id="'+esc(sub.id)+'" style="background:transparent;border:1px solid #f09595;color:#a32d2d;border-radius:5px;padding:3px 8px;cursor:pointer;font-size:10px"><i class="fas fa-trash"></i></button>';
    h += '<i class="fas fa-chevron-down sub-chevron" id="schev-'+esc(sub.id)+'" style="font-size:11px;transition:.2s;color:var(--text-muted)"></i>';
    h += '</div></div>';
    return h;
  }

  function buildProgCard(p, color){
    var statusMap = {active:'نشط',seasonal:'موسمي',paused:'متوقف'};
    var statusBg  = {active:'#E1F5EE',seasonal:'#FAEEDA',paused:'#FCEBEB'};
    var statusTxt = {active:'#085041',seasonal:'#412402',paused:'#791F1F'};
    var st = p.status||'active';
    var includes = p.includes ? p.includes.split(',').slice(0,3).map(function(i){
      return '<span style="background:#f0f4f5;border-radius:4px;padding:1px 6px;font-size:10px">'+esc(i.trim())+'</span>';
    }).join(' ') : '';
    var h = '';
    h += '<div style="background:#fff;border:1px solid #e8f2f4;border-radius:10px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.05)">';
    h += '<div style="padding:12px;border-bottom:1px solid #f0f4f5">';
    h += '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px">';
    h += '<div style="font-size:13px;font-weight:600;color:var(--text-dark);flex:1">'+esc(p.name)+'</div>';
    h += '<span style="background:'+statusBg[st]+';color:'+statusTxt[st]+';border-radius:4px;padding:2px 7px;font-size:10px;font-weight:600;flex-shrink:0;margin-right:6px">'+statusMap[st]+'</span>';
    h += '</div>';
    h += '<div style="font-size:11px;color:var(--text-muted);margin-bottom:8px;line-height:1.5">'+esc(p.desc)+'</div>';
    h += '<div style="display:flex;gap:4px;flex-wrap:wrap">'+includes+'</div>';
    h += '</div>';
    h += '<div style="padding:10px 12px;display:flex;align-items:center;justify-content:space-between">';
    h += '<div>';
    h += '<div style="font-size:14px;font-weight:700;color:'+esc(color)+'">'+p.price+' ر.ع</div>';
    h += '<div style="font-size:10px;color:var(--text-muted)">'+esc(p.dur)+' &mdash; '+esc(p.cap)+'</div>';
    h += '</div>';
    h += '<div style="display:flex;gap:4px">';
    h += '<button data-action="edit-prog" data-id="'+esc(p.id)+'" style="background:transparent;border:1px solid var(--border);border-radius:5px;padding:4px 8px;cursor:pointer;font-size:10px;color:var(--text-muted)"><i class="fas fa-edit"></i></button>';
    h += '<button data-action="delete-prog" data-id="'+esc(p.id)+'" style="background:transparent;border:1px solid #f09595;border-radius:5px;padding:4px 8px;cursor:pointer;font-size:10px;color:#a32d2d"><i class="fas fa-trash"></i></button>';
    h += '<button data-action="open-booking" data-id="'+esc(p.id)+'" style="background:'+esc(color)+';color:#fff;border:none;border-radius:5px;padding:4px 12px;cursor:pointer;font-size:11px;font-family:Cairo,sans-serif;font-weight:600"><i class="fas fa-calendar-check"></i> حجز</button>';
    h += '</div></div></div>';
    return h;
  }

  // ============================================================
  // RENDER TREE
  // ============================================================
  function renderTree(){
    var q = (document.getElementById('svc-search').value||'').trim().toLowerCase();
    var cats = getCategories();
    var subs = getSubs();
    var progs = getProgs();
    var tree = document.getElementById('svc-tree');

    document.getElementById('kpi-cats').textContent = cats.length;
    document.getElementById('kpi-subs').textContent = subs.length;
    document.getElementById('kpi-progs').textContent = progs.length;
    var bookings = getSD('heg_bookings', []);
    var today = new Date().toISOString().split('T')[0];
    document.getElementById('kpi-bookings').textContent = bookings.filter(function(b){ return b.date===today; }).length;

    if(!cats.length){
      tree.innerHTML = '<div class="empty-state"><i class="fas fa-layer-group"></i><p>لا توجد أقسام بعد — اضغط "قسم رئيسي" لإضافة أول قسم</p></div>';
      return;
    }

    var html = '';
    cats.forEach(function(cat){
      var catSubs = subs.filter(function(s){ return s.catId===cat.id; });
      var catProgs = progs.filter(function(p){ return p.catId===cat.id; });
      if(q){
        var match = cat.name.toLowerCase().indexOf(q)>=0
          || catSubs.some(function(s){ return s.name.toLowerCase().indexOf(q)>=0; })
          || catProgs.some(function(p){ return p.name.toLowerCase().indexOf(q)>=0; });
        if(!match) return;
      }

      html += '<div class="cat-block" id="cat-block-'+esc(cat.id)+'" style="margin-bottom:1rem;border-radius:12px;overflow:hidden;border:1px solid rgba(0,0,0,.08);box-shadow:0 2px 8px rgba(0,0,0,.06)">';
      html += buildCatHeader(cat, catSubs, catProgs);
      html += '<div class="cat-body" id="cat-body-'+esc(cat.id)+'" style="background:#fff">';

      if(!catSubs.length && !catProgs.length){
        html += '<div style="padding:16px;text-align:center;color:var(--text-muted);font-size:12px">لا توجد أقسام فرعية بعد</div>';
      }

      catSubs.forEach(function(sub){
        var subProgs = progs.filter(function(p){ return p.subId===sub.id; });
        html += '<div style="border-bottom:1px solid #f0f4f5;padding:0">';
        html += buildSubHeader(sub, cat);
        html += '<div class="sub-body" id="sub-body-'+esc(sub.id)+'" style="padding:12px 16px;display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:10px">';
        if(!subProgs.length){
          html += '<div style="grid-column:1/-1;text-align:center;padding:12px;color:var(--text-muted);font-size:12px">لا توجد برامج — اضغط "+ برنامج" لإضافة</div>';
        }
        subProgs.forEach(function(p){ html += buildProgCard(p, cat.color); });
        html += '</div>';
        html += '</div>';
      });

      html += '</div>';
      html += '</div>';
    });

    tree.innerHTML = html || '<div class="empty-state"><i class="fas fa-search"></i><p>لا توجد نتائج للبحث</p></div>';
  }

  // ============================================================
  // TOGGLE HELPERS
  // ============================================================
  function toggleCat(id){
    var body = document.getElementById('cat-body-'+id);
    var chev = document.getElementById('chev-'+id);
    if(!body) return;
    var hidden = body.style.display==='none';
    body.style.display = hidden ? 'block' : 'none';
    if(chev) chev.style.transform = hidden ? 'rotate(0)' : 'rotate(-90deg)';
  }
  function toggleSub(id){
    var body = document.getElementById('sub-body-'+id);
    var chev = document.getElementById('schev-'+id);
    if(!body) return;
    var hidden = body.style.display==='none';
    body.style.display = hidden ? 'grid' : 'none';
    if(chev) chev.style.transform = hidden ? 'rotate(0)' : 'rotate(-90deg)';
  }
  function expandAll(){
    document.querySelectorAll('.cat-body').forEach(function(el){ el.style.display='block'; });
    document.querySelectorAll('.sub-body').forEach(function(el){ el.style.display='grid'; });
    document.querySelectorAll('.cat-chevron,.sub-chevron').forEach(function(el){ el.style.transform='rotate(0)'; });
  }

  // ============================================================
  // EVENT DELEGATION - single listener on document
  // ============================================================
  document.addEventListener('click', function(e){
    var el = e.target;
    // Walk up to find data-action
    while(el && el !== document && !el.dataset.action){
      el = el.parentElement;
    }
    if(!el || !el.dataset) return;
    var action = el.dataset.action;
    if(!action) return;

    switch(action){
      case 'toggle-cat': toggleCat(el.dataset.id); break;
      case 'toggle-sub': toggleSub(el.dataset.id); break;
      case 'open-sub':   openSubModal(el.dataset.cat); break;
      case 'open-prog':  openProgModal(el.dataset.cat, el.dataset.sub); break;
      case 'edit-cat':   editCat(el.dataset.id); break;
      case 'delete-cat': deleteCat(el.dataset.id); break;
      case 'edit-sub':   editSub(el.dataset.id); break;
      case 'delete-sub': deleteSub(el.dataset.id); break;
      case 'edit-prog':  editProg(el.dataset.id); break;
      case 'delete-prog':deleteProg(el.dataset.id); break;
      case 'open-booking':openBooking(el.dataset.id); break;
    }
  });

  // Toolbar buttons
  document.getElementById('btn-add-cat').addEventListener('click', function(){ openCatModal(); });
  document.getElementById('btn-add-sub').addEventListener('click', function(){ openSubModal(); });
  document.getElementById('btn-add-prog').addEventListener('click', function(){ openProgModal(); });
  document.getElementById('btn-expand-all').addEventListener('click', expandAll);

  // Modal close buttons
  document.getElementById('btn-close-cat').addEventListener('click', closeCatModal);
  document.getElementById('btn-cancel-cat').addEventListener('click', closeCatModal);
  document.getElementById('btn-save-cat').addEventListener('click', saveCat);

  document.getElementById('btn-close-sub').addEventListener('click', closeSubModal);
  document.getElementById('btn-cancel-sub').addEventListener('click', closeSubModal);
  document.getElementById('btn-save-sub').addEventListener('click', saveSub);

  document.getElementById('btn-close-prog').addEventListener('click', closeProgModal);
  document.getElementById('btn-cancel-prog').addEventListener('click', closeProgModal);
  document.getElementById('btn-save-prog').addEventListener('click', saveProg);

  document.getElementById('btn-close-booking').addEventListener('click', closeBooking);
  document.getElementById('btn-cancel-booking').addEventListener('click', closeBooking);
  document.getElementById('btn-save-booking').addEventListener('click', saveBooking);
  document.getElementById('btn-toggle-qc').addEventListener('click', toggleQuickClient);
  document.getElementById('btn-add-qc').addEventListener('click', addQuickClient);

  // ============================================================
  // CATEGORY CRUD
  // ============================================================
  function openCatModal(){
    document.getElementById('cat-edit-id').value = '';
    document.getElementById('cat-name').value = '';
    document.getElementById('cat-icon').value = 'fas fa-star';
    document.getElementById('cat-color').value = '#1A5C6B';
    document.getElementById('cat-desc').value = '';
    document.getElementById('cat-modal-title').textContent = 'قسم رئيسي جديد';
    document.getElementById('cat-modal').classList.add('show');
  }
  function closeCatModal(){ document.getElementById('cat-modal').classList.remove('show'); }

  function editCat(id){
    var cat = getCategories().find(function(c){ return c.id===id; });
    if(!cat) return;
    document.getElementById('cat-edit-id').value = id;
    document.getElementById('cat-name').value = cat.name;
    document.getElementById('cat-icon').value = cat.icon||'fas fa-star';
    document.getElementById('cat-color').value = cat.color||'#1A5C6B';
    document.getElementById('cat-desc').value = cat.desc||'';
    document.getElementById('cat-modal-title').textContent = 'تعديل القسم';
    document.getElementById('cat-modal').classList.add('show');
  }

  function saveCat(){
    var name = document.getElementById('cat-name').value.trim();
    if(!name){ window.showToast('أدخل اسم القسم'); return; }
    var id = document.getElementById('cat-edit-id').value;
    var cats = getCategories();
    var data = {
      id: id||'c'+Date.now(),
      name: name,
      icon: document.getElementById('cat-icon').value||'fas fa-star',
      color: document.getElementById('cat-color').value||'#1A5C6B',
      desc: document.getElementById('cat-desc').value
    };
    if(id){ var idx=cats.findIndex(function(c){ return c.id===id; }); if(idx>=0) cats[idx]=data; }
    else cats.push(data);
    setSD('heg_svc_cats', cats);
    closeCatModal();
    renderTree();
    window.showToast('تم حفظ القسم الرئيسي');
  }

  function deleteCat(id){
    if(!confirm('حذف هذا القسم وكل ما بداخله؟')) return;
    setSD('heg_svc_cats', getCategories().filter(function(c){ return c.id!==id; }));
    setSD('heg_svc_subs', getSubs().filter(function(s){ return s.catId!==id; }));
    setSD('heg_svc_progs', getProgs().filter(function(p){ return p.catId!==id; }));
    renderTree();
    window.showToast('تم حذف القسم');
  }

  // ============================================================
  // SUB-CATEGORY CRUD
  // ============================================================
  function fillSubParent(selectedId){
    var sel = document.getElementById('sub-parent');
    sel.innerHTML = getCategories().map(function(c){
      return '<option value="'+esc(c.id)+'"'+(c.id===selectedId?' selected':'')+'>'+esc(c.name)+'</option>';
    }).join('');
  }

  function openSubModal(catId){
    document.getElementById('sub-edit-id').value = '';
    document.getElementById('sub-name').value = '';
    document.getElementById('sub-icon').value = 'fas fa-folder';
    document.getElementById('sub-desc').value = '';
    document.getElementById('sub-modal-title').textContent = 'قسم فرعي جديد';
    fillSubParent(catId||'');
    document.getElementById('sub-modal').classList.add('show');
  }
  function closeSubModal(){ document.getElementById('sub-modal').classList.remove('show'); }

  function editSub(id){
    var sub = getSubs().find(function(s){ return s.id===id; });
    if(!sub) return;
    document.getElementById('sub-edit-id').value = id;
    document.getElementById('sub-name').value = sub.name;
    document.getElementById('sub-icon').value = sub.icon||'fas fa-folder';
    document.getElementById('sub-desc').value = sub.desc||'';
    document.getElementById('sub-modal-title').textContent = 'تعديل القسم الفرعي';
    fillSubParent(sub.catId);
    document.getElementById('sub-modal').classList.add('show');
  }

  function saveSub(){
    var name = document.getElementById('sub-name').value.trim();
    var catId = document.getElementById('sub-parent').value;
    if(!name||!catId){ window.showToast('أدخل الاسم والقسم الرئيسي'); return; }
    var id = document.getElementById('sub-edit-id').value;
    var subs = getSubs();
    var data = {
      id: id||'s'+Date.now(),
      catId: catId,
      name: name,
      icon: document.getElementById('sub-icon').value||'fas fa-folder',
      desc: document.getElementById('sub-desc').value
    };
    if(id){ var idx=subs.findIndex(function(s){ return s.id===id; }); if(idx>=0) subs[idx]=data; }
    else subs.push(data);
    setSD('heg_svc_subs', subs);
    closeSubModal();
    renderTree();
    window.showToast('تم حفظ القسم الفرعي');
  }

  function deleteSub(id){
    if(!confirm('حذف هذا القسم الفرعي وكل برامجه؟')) return;
    setSD('heg_svc_subs', getSubs().filter(function(s){ return s.id!==id; }));
    setSD('heg_svc_progs', getProgs().filter(function(p){ return p.subId!==id; }));
    renderTree();
    window.showToast('تم حذف القسم الفرعي');
  }

  // ============================================================
  // PROGRAM CRUD
  // ============================================================
  function fillProgCats(selectedCatId){
    var sel = document.getElementById('prog-cat');
    sel.innerHTML = getCategories().map(function(c){
      return '<option value="'+esc(c.id)+'"'+(c.id===selectedCatId?' selected':'')+'>'+esc(c.name)+'</option>';
    }).join('');
  }

  function fillProgSubs(selectedSubId){
    var catId = document.getElementById('prog-cat').value;
    var sel = document.getElementById('prog-sub');
    var subs = getSubs().filter(function(s){ return s.catId===catId; });
    sel.innerHTML = subs.map(function(s){
      return '<option value="'+esc(s.id)+'"'+(s.id===selectedSubId?' selected':'')+'>'+esc(s.name)+'</option>';
    }).join('');
    if(!subs.length) sel.innerHTML = '<option value="">لا توجد أقسام فرعية</option>';
  }
  window.fillProgSubs = fillProgSubs;

  function openProgModal(catId, subId){
    document.getElementById('prog-edit-id').value = '';
    document.getElementById('prog-name').value = '';
    document.getElementById('prog-price').value = '';
    document.getElementById('prog-dur').value = '';
    document.getElementById('prog-cap').value = '';
    document.getElementById('prog-desc').value = '';
    document.getElementById('prog-includes').value = '';
    document.getElementById('prog-status').value = 'active';
    document.getElementById('prog-modal-title').textContent = 'برنامج / خدمة جديدة';
    fillProgCats(catId||'');
    fillProgSubs(subId||'');
    document.getElementById('prog-modal').classList.add('show');
  }
  function closeProgModal(){ document.getElementById('prog-modal').classList.remove('show'); }

  function editProg(id){
    var p = getProgs().find(function(x){ return x.id===id; });
    if(!p) return;
    document.getElementById('prog-edit-id').value = id;
    document.getElementById('prog-name').value = p.name;
    document.getElementById('prog-price').value = p.price;
    document.getElementById('prog-dur').value = p.dur;
    document.getElementById('prog-cap').value = p.cap;
    document.getElementById('prog-desc').value = p.desc;
    document.getElementById('prog-includes').value = p.includes||'';
    document.getElementById('prog-status').value = p.status||'active';
    document.getElementById('prog-modal-title').textContent = 'تعديل البرنامج';
    fillProgCats(p.catId);
    fillProgSubs(p.subId);
    document.getElementById('prog-modal').classList.add('show');
  }

  function saveProg(){
    var name = document.getElementById('prog-name').value.trim();
    var catId = document.getElementById('prog-cat').value;
    var subId = document.getElementById('prog-sub').value;
    if(!name||!catId){ window.showToast('أدخل اسم البرنامج والقسم'); return; }
    var id = document.getElementById('prog-edit-id').value;
    var progs = getProgs();
    var data = {
      id: id||'p'+Date.now(),
      catId: catId,
      subId: subId,
      name: name,
      price: parseFloat(document.getElementById('prog-price').value)||0,
      dur: document.getElementById('prog-dur').value,
      cap: document.getElementById('prog-cap').value,
      status: document.getElementById('prog-status').value,
      desc: document.getElementById('prog-desc').value,
      includes: document.getElementById('prog-includes').value
    };
    if(id){ var idx=progs.findIndex(function(x){ return x.id===id; }); if(idx>=0) progs[idx]=data; }
    else progs.push(data);
    setSD('heg_svc_progs', progs);
    closeProgModal();
    renderTree();
    window.showToast('تم حفظ البرنامج');
  }

  function deleteProg(id){
    if(!confirm('حذف هذا البرنامج؟')) return;
    setSD('heg_svc_progs', getProgs().filter(function(p){ return p.id!==id; }));
    renderTree();
    window.showToast('تم حذف البرنامج');
  }

  // ============================================================
  // BOOKING
  // ============================================================
  var currentProgId = '';

  function openBooking(progId){
    currentProgId = progId;
    var p = getProgs().find(function(x){ return x.id===progId; });
    if(!p) return;
    var cat = getCategories().find(function(c){ return c.id===p.catId; })||{name:'—'};
    var sub = getSubs().find(function(s){ return s.id===p.subId; })||{name:'—'};
    document.getElementById('booking-prog-info').innerHTML =
      '<div style="font-size:14px;font-weight:700;color:var(--teal-dark);margin-bottom:4px">'+esc(p.name)+'</div>'+
      '<div style="font-size:12px;color:var(--text-muted)">'+esc(cat.name)+' / '+esc(sub.name)+' — '+esc(p.dur)+' — '+p.price+' ر.ع</div>';
    document.getElementById('bk-unit-price').value = p.price;
    document.getElementById('bk-pax').value = 1;
    document.getElementById('bk-discount').value = 0;
    document.getElementById('bk-notes').value = '';
    document.getElementById('bk-pay-status').value = 'pending';
    document.getElementById('bk-date').value = new Date().toISOString().split('T')[0];
    document.getElementById('quick-client-box').style.display = 'none';
    calcBookingTotal();
    fillClientSelect();
    document.getElementById('booking-modal').classList.add('show');
  }
  function closeBooking(){ document.getElementById('booking-modal').classList.remove('show'); }

  function calcBookingTotal(){
    var pax  = parseFloat(document.getElementById('bk-pax').value)||1;
    var unit = parseFloat(document.getElementById('bk-unit-price').value)||0;
    var disc = parseFloat(document.getElementById('bk-discount').value)||0;
    document.getElementById('bk-total').value = ((pax*unit)-disc).toFixed(2);
  }
  window.calcBookingTotal = calcBookingTotal;

  function fillClientSelect(){
    var clients = getSD('heg_clients', []);
    var sel = document.getElementById('bk-client');
    sel.innerHTML = '<option value="">-- اختر عميل --</option>' +
      clients.map(function(c){
        return '<option value="'+esc(c.id)+'">'+esc(c.name)+' — '+esc(c.phone)+'</option>';
      }).join('');
  }

  function toggleQuickClient(){
    var box = document.getElementById('quick-client-box');
    box.style.display = box.style.display==='none' ? 'block' : 'none';
  }

  function addQuickClient(){
    var name  = (document.getElementById('qc-name').value||'').trim();
    var phone = (document.getElementById('qc-phone').value||'').trim();
    if(!name||!phone){ window.showToast('أدخل الاسم والهاتف'); return; }
    var clients = getSD('heg_clients', []);
    var newClient = {
      id: 'cl'+Date.now(),
      name: name,
      phone: phone,
      email: document.getElementById('qc-email').value||'',
      nationality: document.getElementById('qc-nat').value||'',
      status: 'عميل',
      date: new Date().toLocaleDateString('ar-EG'),
      totalTrips: 0,
      totalSpent: 0,
      notes: ''
    };
    clients.push(newClient);
    setSD('heg_clients', clients);
    fillClientSelect();
    document.getElementById('bk-client').value = newClient.id;
    document.getElementById('quick-client-box').style.display = 'none';
    document.getElementById('qc-name').value = '';
    document.getElementById('qc-phone').value = '';
    document.getElementById('qc-email').value = '';
    document.getElementById('qc-nat').value = '';
    window.showToast('تم إضافة العميل وتحديده');
  }

  function saveBooking(){
    var clientId = document.getElementById('bk-client').value;
    var date     = document.getElementById('bk-date').value;
    if(!clientId){ window.showToast('اختر عميلاً'); return; }
    if(!date){ window.showToast('أدخل تاريخ الحجز'); return; }

    var clients  = getSD('heg_clients', []);
    var client   = clients.find(function(c){ return c.id===clientId; });
    var p        = getProgs().find(function(x){ return x.id===currentProgId; });
    var total    = parseFloat(document.getElementById('bk-total').value)||0;

    var bookings  = getSD('heg_bookings', []);
    var bookingId = 'BK'+Date.now();
    var booking   = {
      id: bookingId,
      progId: currentProgId,
      progName: p ? p.name : '',
      clientId: clientId,
      clientName: client ? client.name : '',
      date: date,
      pax: parseInt(document.getElementById('bk-pax').value)||1,
      unitPrice: parseFloat(document.getElementById('bk-unit-price').value)||0,
      discount: parseFloat(document.getElementById('bk-discount').value)||0,
      total: total,
      payStatus: document.getElementById('bk-pay-status').value,
      notes: document.getElementById('bk-notes').value,
      createdAt: new Date().toISOString(),
      invoiceId: ''
    };

    var invoices = getSD('heg_invoices', []);
    var invNum   = 'INV-' + String(invoices.length+1).padStart(4,'0');
    var invoice  = {
      id: 'inv'+Date.now(),
      num: invNum,
      client: client ? client.name : '',
      clientId: clientId,
      service: p ? p.name : '',
      bookingId: bookingId,
      amount: total,
      discount: parseFloat(document.getElementById('bk-discount').value)||0,
      total: total,
      method: 'نقد',
      status: document.getElementById('bk-pay-status').value==='paid' ? 'مدفوعة' : (document.getElementById('bk-pay-status').value==='partial' ? 'جزئي' : 'معلقة'),
      dueDate: date,
      notes: document.getElementById('bk-notes').value,
      date: new Date().toLocaleDateString('ar-EG')
    };
    invoices.push(invoice);
    setSD('heg_invoices', invoices);
    booking.invoiceId = invoice.id;
    bookings.push(booking);
    setSD('heg_bookings', bookings);

    if(client){
      client.totalTrips = (client.totalTrips||0) + 1;
      client.totalSpent = (client.totalSpent||0) + total;
      var ci = clients.findIndex(function(c){ return c.id===clientId; });
      if(ci>=0) clients[ci] = client;
      setSD('heg_clients', clients);
    }

    closeBooking();
    renderTree();
    window.showToast('تم الحجز وإنشاء الفاتورة ' + invNum + ' بنجاح!');
  }

  // ============================================================
  // INIT
  // ============================================================
  renderTree();

  })();
  </script>
  `;
}
