// ======================================================
// SITE DESIGN CONTROL PANEL
// Full UI customization: colors, fonts, layout, logo,
// topbar, sidebar, buttons, cards, footer
// ======================================================
export function designPage(): string {
  return `
  <div class="page-header">
    <div class="page-header-left">
      <div class="page-header-title">لوحة تحكم التصميم الشامل</div>
      <div class="page-header-sub">تخصيص كامل لمظهر الموقع — الألوان والخطوط والتخطيط والمكونات</div>
    </div>
    <i class="fas fa-magic page-header-icon"></i>
  </div>

  <!-- Preview bar -->
  <div style="background:linear-gradient(135deg,var(--teal-dark),var(--teal-mid));border-radius:10px;padding:12px 16px;margin-bottom:1.2rem;display:flex;align-items:center;justify-content:space-between">
    <div style="color:#fff;font-size:13px"><i class="fas fa-eye"></i> التغييرات تُطبَّق فوراً — ستظهر في جميع صفحات النظام</div>
    <div style="display:flex;gap:8px">
      <button class="btn btn-sm" onclick="applyAll()" style="background:var(--gold);color:#333;border:none"><i class="fas fa-check"></i> تطبيق الكل</button>
      <button class="btn btn-sm" onclick="resetAll()" style="background:rgba(255,255,255,.2);color:#fff;border:none"><i class="fas fa-undo"></i> استعادة الافتراضي</button>
    </div>
  </div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.2rem">

    <!-- ===== COLORS ===== -->
    <div class="card">
      <div class="card-header"><i class="fas fa-palette" style="color:var(--gold)"></i><span class="card-header-title">الألوان الرئيسية</span></div>
      <div class="card-body" style="display:flex;flex-direction:column;gap:10px">
        <div id="color-rows"></div>
        <button class="btn btn-outline btn-sm" onclick="addCustomColor()"><i class="fas fa-plus"></i> إضافة لون مخصص</button>
      </div>
    </div>

    <!-- ===== TYPOGRAPHY ===== -->
    <div class="card">
      <div class="card-header"><i class="fas fa-font" style="color:var(--teal-mid)"></i><span class="card-header-title">الخطوط والأحجام</span></div>
      <div class="card-body" style="display:flex;flex-direction:column;gap:12px">
        <div class="field">
          <label>خط الواجهة الرئيسي</label>
          <select id="font-body" onchange="applyFont()">
            <option value="Cairo">Cairo (عربي)</option>
            <option value="Tajawal">Tajawal</option>
            <option value="Almarai">Almarai</option>
            <option value="Noto Kufi Arabic">Noto Kufi Arabic</option>
            <option value="IBM Plex Sans Arabic">IBM Plex Sans Arabic</option>
          </select>
        </div>
        <div class="field">
          <label>خط العناوين والأرقام</label>
          <select id="font-heading" onchange="applyFont()">
            <option value="Montserrat">Montserrat</option>
            <option value="Poppins">Poppins</option>
            <option value="Inter">Inter</option>
            <option value="Cairo">Cairo</option>
          </select>
        </div>
        <div class="field">
          <label>حجم الخط الأساسي: <span id="font-size-val">14</span>px</label>
          <input type="range" id="font-size" min="12" max="18" value="14" oninput="applyFontSize()" style="width:100%;accent-color:var(--teal-mid)">
        </div>
        <div class="field">
          <label>تباعد الأسطر: <span id="line-h-val">1.6</span></label>
          <input type="range" id="line-h" min="1.2" max="2.2" step="0.1" value="1.6" oninput="applyLineH()" style="width:100%;accent-color:var(--teal-mid)">
        </div>
      </div>
    </div>

    <!-- ===== TOPBAR ===== -->
    <div class="card">
      <div class="card-header"><i class="fas fa-bars" style="color:var(--teal-mid)"></i><span class="card-header-title">الشريط العلوي (Topbar)</span></div>
      <div class="card-body" style="display:flex;flex-direction:column;gap:12px">
        <div class="field">
          <label>نمط الخلفية</label>
          <select id="topbar-style" onchange="applyTopbar()">
            <option value="gradient-teal">تدرج تيل (افتراضي)</option>
            <option value="solid-dark">لون داكن ثابت</option>
            <option value="solid-light">لون فاتح ثابت</option>
            <option value="gradient-gold">تدرج ذهبي</option>
            <option value="gradient-dark">تدرج داكن</option>
          </select>
        </div>
        <div class="field">
          <label>ارتفاع الـ Topbar: <span id="topbar-h-val">64</span>px</label>
          <input type="range" id="topbar-h" min="48" max="90" value="64" oninput="applyTopbarHeight()" style="width:100%;accent-color:var(--teal-mid)">
        </div>
        <div class="field">
          <label>لون مخصص للـ Topbar</label>
          <div style="display:flex;gap:8px">
            <input type="color" id="topbar-custom-color" value="#1A5C6B" style="width:44px;height:36px;border:none;cursor:pointer;border-radius:6px">
            <button class="btn btn-outline btn-sm" onclick="applyTopbarCustomColor()">تطبيق اللون</button>
          </div>
        </div>
        <div class="field">
          <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
            <input type="checkbox" id="topbar-shadow" checked onchange="applyTopbarShadow()" style="width:16px;height:16px">
            إظهار الظل
          </label>
        </div>
      </div>
    </div>

    <!-- ===== SIDEBAR ===== -->
    <div class="card">
      <div class="card-header"><i class="fas fa-columns" style="color:var(--teal-mid)"></i><span class="card-header-title">الشريط الجانبي (Sidebar)</span></div>
      <div class="card-body" style="display:flex;flex-direction:column;gap:12px">
        <div class="field">
          <label>عرض الـ Sidebar: <span id="sidebar-w-val">220</span>px</label>
          <input type="range" id="sidebar-w" min="160" max="300" value="220" oninput="applySidebarWidth()" style="width:100%;accent-color:var(--teal-mid)">
        </div>
        <div class="field">
          <label>نمط الخلفية</label>
          <select id="sidebar-style" onchange="applySidebarStyle()">
            <option value="white">أبيض (افتراضي)</option>
            <option value="light-teal">تيل فاتح جداً</option>
            <option value="dark-teal">تيل داكن</option>
            <option value="light-gray">رمادي فاتح</option>
          </select>
        </div>
        <div class="field">
          <label>حجم خط القائمة: <span id="nav-font-val">13</span>px</label>
          <input type="range" id="nav-font" min="11" max="16" value="13" oninput="applyNavFont()" style="width:100%;accent-color:var(--teal-mid)">
        </div>
      </div>
    </div>

    <!-- ===== CARDS & RADIUS ===== -->
    <div class="card">
      <div class="card-header"><i class="fas fa-vector-square" style="color:var(--teal-mid)"></i><span class="card-header-title">البطاقات والأشكال</span></div>
      <div class="card-body" style="display:flex;flex-direction:column;gap:12px">
        <div class="field">
          <label>نصف قطر الزوايا (Cards): <span id="radius-val">12</span>px</label>
          <input type="range" id="radius-inp" min="0" max="24" value="12" oninput="applyRadius()" style="width:100%;accent-color:var(--teal-mid)">
        </div>
        <div class="field">
          <label>نصف قطر الأزرار: <span id="btn-radius-val">8</span>px</label>
          <input type="range" id="btn-radius-inp" min="0" max="24" value="8" oninput="applyBtnRadius()" style="width:100%;accent-color:var(--teal-mid)">
        </div>
        <div class="field">
          <label>ظل البطاقات</label>
          <select id="card-shadow" onchange="applyCardShadow()">
            <option value="soft">خفيف (افتراضي)</option>
            <option value="none">بدون ظل</option>
            <option value="medium">متوسط</option>
            <option value="strong">قوي</option>
          </select>
        </div>
        <div class="field">
          <label>لون خلفية الصفحة</label>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button onclick="setBg('#F4F8F9')" style="width:28px;height:28px;background:#F4F8F9;border:2px solid #ddd;border-radius:6px;cursor:pointer" title="فاتح (افتراضي)"></button>
            <button onclick="setBg('#FFFFFF')" style="width:28px;height:28px;background:#FFFFFF;border:2px solid #ddd;border-radius:6px;cursor:pointer" title="أبيض"></button>
            <button onclick="setBg('#EFF3F4')" style="width:28px;height:28px;background:#EFF3F4;border:2px solid #ddd;border-radius:6px;cursor:pointer" title="رمادي تيل"></button>
            <button onclick="setBg('#F8F5EE')" style="width:28px;height:28px;background:#F8F5EE;border:2px solid #ddd;border-radius:6px;cursor:pointer" title="كريمي"></button>
            <input type="color" id="bg-custom" value="#F4F8F9" onchange="setBg(this.value)" style="width:28px;height:28px;border:none;cursor:pointer;border-radius:6px" title="لون مخصص">
          </div>
        </div>
      </div>
    </div>

    <!-- ===== LOGO & IDENTITY ===== -->
    <div class="card">
      <div class="card-header"><i class="fas fa-paint-brush" style="color:var(--gold)"></i><span class="card-header-title">الشعار والهوية</span></div>
      <div class="card-body" style="display:flex;flex-direction:column;gap:12px">
        <div>
          <div style="font-size:11px;color:var(--text-muted);font-weight:600;margin-bottom:8px">الشعار الرسمي</div>
          <div id="design-logo-preview" style="width:100%;height:80px;border:2px dashed var(--border);border-radius:10px;display:flex;align-items:center;justify-content:center;background:var(--bg-light);cursor:pointer" onclick="document.getElementById('design-logo-up').click()">
            <span style="font-size:12px;color:var(--text-muted)">اضغط لرفع الشعار</span>
          </div>
          <input type="file" id="design-logo-up" accept="image/*" style="display:none" onchange="uploadDesignLogo(this)">
          <div style="display:flex;gap:6px;margin-top:6px">
            <button class="btn btn-outline btn-sm" onclick="document.getElementById('design-logo-up').click()"><i class="fas fa-upload"></i> رفع</button>
            <button class="btn btn-danger btn-sm" onclick="removeDesignLogo()"><i class="fas fa-trash"></i> حذف</button>
          </div>
        </div>
        <div class="field"><label>اسم الشركة</label><input id="design-company-name" value="HEG" oninput="applyCompanyName()"></div>
        <div class="field"><label>الشعار النصي (Tagline)</label><input id="design-tagline" value="HOLIDAY TRAVEL SERVICES" oninput="applyTagline()"></div>
        <div class="field">
          <label>لون شعار الـ Topbar</label>
          <div style="display:flex;gap:8px">
            <input type="color" id="logo-bg-color" value="#FFFFFF" onchange="applyLogoBg()" style="width:44px;height:36px;border:none;cursor:pointer;border-radius:6px">
            <input type="color" id="logo-text-color" value="#1A5C6B" onchange="applyLogoTextColor()" style="width:44px;height:36px;border:none;cursor:pointer;border-radius:6px">
          </div>
        </div>
      </div>
    </div>

    <!-- ===== FOOTER ===== -->
    <div class="card">
      <div class="card-header"><i class="fas fa-minus-square" style="color:var(--text-muted)"></i><span class="card-header-title">تذييل الصفحة (Footer)</span></div>
      <div class="card-body" style="display:flex;flex-direction:column;gap:12px">
        <div class="field"><label>نص التذييل</label><input id="footer-text" value="جميع الحقوق محفوظة © 2026 | HEG Holiday Travel Services" oninput="applyFooter()"></div>
        <div class="field">
          <label>لون خلفية الـ Footer</label>
          <input type="color" id="footer-bg" value="#1A5C6B" onchange="applyFooterBg()" style="width:44px;height:36px;border:none;cursor:pointer;border-radius:6px">
        </div>
        <div class="field">
          <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
            <input type="checkbox" id="footer-visible" checked onchange="applyFooterVisibility()" style="width:16px;height:16px">
            إظهار التذييل
          </label>
        </div>
      </div>
    </div>

    <!-- ===== CUSTOM CSS ===== -->
    <div class="card" style="grid-column:1/-1">
      <div class="card-header"><i class="fas fa-code" style="color:var(--teal-mid)"></i><span class="card-header-title">CSS مخصص</span></div>
      <div class="card-body">
        <textarea id="custom-css" rows="6" placeholder="/* أضف أكواد CSS مخصصة هنا */
.topbar { }
.sidebar { }
.card { }" style="width:100%;padding:10px;border-radius:8px;border:1px solid var(--border);font-family:monospace;font-size:12px;background:#1e2530;color:#e0e6ed;resize:vertical;direction:ltr"></textarea>
        <div style="display:flex;gap:8px;margin-top:10px">
          <button class="btn btn-primary btn-sm" onclick="applyCustomCSS()"><i class="fas fa-play"></i> تطبيق CSS</button>
          <button class="btn btn-outline btn-sm" onclick="clearCustomCSS()"><i class="fas fa-trash"></i> مسح</button>
        </div>
      </div>
    </div>

  </div>

  <!-- Live preview mini modal -->
  <div id="preview-modal" style="display:none;position:fixed;bottom:20px;left:20px;background:#fff;border-radius:12px;border:1px solid var(--border);box-shadow:0 8px 32px rgba(0,0,0,.15);padding:16px;width:300px;z-index:500">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
      <div style="font-size:13px;font-weight:600;color:var(--teal-dark)">معاينة مباشرة</div>
      <button onclick="document.getElementById('preview-modal').style.display='none'" style="background:transparent;border:none;cursor:pointer;font-size:16px;color:var(--text-muted)"><i class="fas fa-times"></i></button>
    </div>
    <div id="preview-content" style="font-size:12px;color:var(--text-muted)">قم بتغيير أي إعداد لرؤية المعاينة</div>
  </div>

  <script>
  function getSD(k,d){ try{ return JSON.parse(localStorage.getItem(k)||'null')||d; }catch(e){ return d; } }
  function setSD(k,v){ localStorage.setItem(k, JSON.stringify(v)); }

  var colorDefs = [
    {var:'--teal-dark',   label:'اللون الرئيسي الداكن',  default:'#1A5C6B'},
    {var:'--teal-mid',    label:'اللون الرئيسي المتوسط',  default:'#3A8C9B'},
    {var:'--teal-light',  label:'اللون الرئيسي الفاتح',   default:'#5AAAB8'},
    {var:'--gold',        label:'اللون الذهبي',           default:'#D4AB4B'},
    {var:'--gold-light',  label:'الذهبي الفاتح',          default:'#E8C96A'},
    {var:'--text-dark',   label:'لون النص الداكن',        default:'#163D47'},
    {var:'--text-mid',    label:'لون النص المتوسط',       default:'#2E5F6A'},
    {var:'--text-muted',  label:'لون النص الرمادي',       default:'#6B8C94'},
    {var:'--border',      label:'لون الحدود',             default:'#D0E4E8'},
    {var:'--bg-light',    label:'خلفية الصفحة',           default:'#F4F8F9'},
    {var:'--bg-card',     label:'خلفية البطاقات',         default:'#FFFFFF'},
  ];

  function renderColorRows(){
    var saved = getSD('heg_design_colors', {});
    var html = '';
    colorDefs.forEach(function(c){
      var val = saved[c.var]||c.default;
      html += '<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--bg-light);border-radius:8px;margin-bottom:6px">';
      html += '<div style="display:flex;align-items:center;gap:8px">';
      html += '<div style="width:24px;height:24px;border-radius:5px;background:'+val+';border:1px solid #ddd;flex-shrink:0"></div>';
      html += '<div><div style="font-size:12px;font-weight:600">'+c.label+'</div><div style="font-size:10px;color:var(--text-muted)">'+c.var+'</div></div>';
      html += '</div>';
      html += '<input type="color" value="'+val+'" data-var="'+c.var+'" onchange="saveDesignColor(this)" style="width:36px;height:32px;border:none;cursor:pointer;border-radius:5px">';
      html += '</div>';
    });
    document.getElementById('color-rows').innerHTML = html;
  }

  function saveDesignColor(input){
    var v = input.getAttribute('data-var');
    var val = input.value;
    document.documentElement.style.setProperty(v, val);
    var saved = getSD('heg_design_colors', {});
    saved[v] = val;
    setSD('heg_design_colors', saved);
    // update swatch
    var swatch = input.parentElement.querySelector('div div');
    if(swatch) swatch.style.background = val;
    // sync with heg_colors
    var colors = getSD('heg_colors', {});
    colors[v] = val;
    setSD('heg_colors', colors);
    showToast('تم تغيير اللون');
  }

  function addCustomColor(){
    var name = prompt('اسم متغير CSS (مثال: --my-color):');
    if(!name) return;
    var saved = getSD('heg_design_colors',{});
    saved[name] = '#000000';
    setSD('heg_design_colors', saved);
    renderColorRows();
  }

  function applyFont(){
    var body = document.getElementById('font-body').value;
    var heading = document.getElementById('font-heading').value;
    document.documentElement.style.setProperty('--font-body', "'"+body+"',sans-serif");
    document.documentElement.style.setProperty('--font-heading', "'"+heading+"',sans-serif");
    document.body.style.fontFamily = "'"+body+"',sans-serif";
    saveDesignSetting('font_body', body);
    saveDesignSetting('font_heading', heading);
    showToast('تم تغيير الخط');
  }

  function applyFontSize(){
    var v = document.getElementById('font-size').value;
    document.getElementById('font-size-val').textContent = v;
    document.documentElement.style.fontSize = v+'px';
    saveDesignSetting('font_size', v);
  }

  function applyLineH(){
    var v = document.getElementById('line-h').value;
    document.getElementById('line-h-val').textContent = v;
    document.body.style.lineHeight = v;
    saveDesignSetting('line_h', v);
  }

  function applyTopbar(){
    var style = document.getElementById('topbar-style').value;
    var topbar = document.querySelector('.topbar');
    if(!topbar) return;
    var gradients = {
      'gradient-teal': 'linear-gradient(135deg,var(--teal-dark),var(--teal-mid))',
      'solid-dark': 'var(--teal-dark)',
      'solid-light': 'var(--teal-mid)',
      'gradient-gold': 'linear-gradient(135deg,#B8860B,var(--gold))',
      'gradient-dark': 'linear-gradient(135deg,#0d2b33,var(--teal-dark))'
    };
    topbar.style.background = gradients[style]||gradients['gradient-teal'];
    saveDesignSetting('topbar_style', style);
    showToast('تم تغيير نمط الـ Topbar');
  }

  function applyTopbarHeight(){
    var v = document.getElementById('topbar-h').value;
    document.getElementById('topbar-h-val').textContent = v;
    var topbar = document.querySelector('.topbar');
    if(topbar) topbar.style.height = v+'px';
    saveDesignSetting('topbar_h', v);
  }

  function applyTopbarCustomColor(){
    var c = document.getElementById('topbar-custom-color').value;
    var topbar = document.querySelector('.topbar');
    if(topbar) topbar.style.background = c;
    saveDesignSetting('topbar_custom_color', c);
    showToast('تم تطبيق اللون المخصص');
  }

  function applyTopbarShadow(){
    var checked = document.getElementById('topbar-shadow').checked;
    var topbar = document.querySelector('.topbar');
    if(topbar) topbar.style.boxShadow = checked ? '0 2px 16px rgba(0,0,0,0.15)' : 'none';
    saveDesignSetting('topbar_shadow', checked);
  }

  function applySidebarWidth(){
    var v = document.getElementById('sidebar-w').value;
    document.getElementById('sidebar-w-val').textContent = v;
    var sb = document.querySelector('.sidebar');
    if(sb) sb.style.width = v+'px';
    saveDesignSetting('sidebar_w', v);
  }

  function applySidebarStyle(){
    var style = document.getElementById('sidebar-style').value;
    var sb = document.querySelector('.sidebar');
    if(!sb) return;
    var styles = {
      'white': {bg:'#fff', color:'inherit'},
      'light-teal': {bg:'#EAF6F8', color:'inherit'},
      'dark-teal': {bg:getComputedStyle(document.documentElement).getPropertyValue('--teal-dark'), color:'#fff'},
      'light-gray': {bg:'#F5F5F5', color:'inherit'}
    };
    var s = styles[style]||styles['white'];
    sb.style.background = s.bg;
    saveDesignSetting('sidebar_style', style);
    showToast('تم تغيير نمط السايدبار');
  }

  function applyNavFont(){
    var v = document.getElementById('nav-font').value;
    document.getElementById('nav-font-val').textContent = v;
    document.querySelectorAll('.nav-item').forEach(function(el){ el.style.fontSize = v+'px'; });
    saveDesignSetting('nav_font', v);
  }

  function applyRadius(){
    var v = document.getElementById('radius-inp').value;
    document.getElementById('radius-val').textContent = v;
    document.documentElement.style.setProperty('--radius', v+'px');
    saveDesignSetting('radius', v);
  }

  function applyBtnRadius(){
    var v = document.getElementById('btn-radius-inp').value;
    document.getElementById('btn-radius-val').textContent = v;
    document.documentElement.style.setProperty('--radius-sm', v+'px');
    saveDesignSetting('btn_radius', v);
  }

  function applyCardShadow(){
    var s = document.getElementById('card-shadow').value;
    var shadows = {
      'none': 'none',
      'soft': '0 2px 12px rgba(26,92,107,0.08)',
      'medium': '0 4px 20px rgba(26,92,107,0.14)',
      'strong': '0 8px 32px rgba(26,92,107,0.22)'
    };
    document.documentElement.style.setProperty('--shadow', shadows[s]);
    saveDesignSetting('card_shadow', s);
    showToast('تم تغيير ظل البطاقات');
  }

  function setBg(color){
    document.documentElement.style.setProperty('--bg-light', color);
    document.body.style.background = color;
    var colors = getSD('heg_colors',{});
    colors['--bg-light'] = color;
    setSD('heg_colors', colors);
    saveDesignSetting('bg_color', color);
    showToast('تم تغيير لون الخلفية');
  }

  function uploadDesignLogo(input){
    if(!input.files[0]) return;
    var reader = new FileReader();
    reader.onload = function(e){
      localStorage.setItem('heg_site_logo', e.target.result);
      var box = document.getElementById('design-logo-preview');
      box.innerHTML = '<img src="'+e.target.result+'" style="max-height:70px;max-width:180px;object-fit:contain">';
      var lb = document.getElementById('topbar-logo-box');
      if(lb) lb.innerHTML = '<img src="'+e.target.result+'" style="max-height:44px;max-width:80px;object-fit:contain;vertical-align:middle">';
      showToast('تم رفع الشعار');
    };
    reader.readAsDataURL(input.files[0]);
  }

  function removeDesignLogo(){
    localStorage.removeItem('heg_site_logo');
    document.getElementById('design-logo-preview').innerHTML = '<span style="font-size:12px;color:var(--text-muted)">اضغط لرفع الشعار</span>';
    var lb = document.getElementById('topbar-logo-box');
    if(lb) lb.textContent = 'HEG';
    showToast('تم حذف الشعار');
  }

  function applyCompanyName(){
    var v = document.getElementById('design-company-name').value;
    var el = document.getElementById('topbar-name-main');
    if(el) el.textContent = v;
    var data = getSD('heg_site_data',{});
    data.name = v;
    setSD('heg_site_data', data);
  }

  function applyTagline(){
    var v = document.getElementById('design-tagline').value;
    var el = document.getElementById('topbar-name-sub');
    if(el) el.textContent = v;
    var data = getSD('heg_site_data',{});
    data.tagline = v;
    setSD('heg_site_data', data);
  }

  function applyLogoBg(){
    var c = document.getElementById('logo-bg-color').value;
    var lb = document.getElementById('topbar-logo-box');
    if(lb) lb.style.background = c;
    saveDesignSetting('logo_bg', c);
  }

  function applyLogoTextColor(){
    var c = document.getElementById('logo-text-color').value;
    var lb = document.getElementById('topbar-logo-box');
    if(lb) lb.style.color = c;
    saveDesignSetting('logo_text_color', c);
  }

  function applyFooter(){
    var v = document.getElementById('footer-text').value;
    var f = document.querySelector('.footer-bar');
    if(f) f.innerHTML = v;
    saveDesignSetting('footer_text', v);
  }

  function applyFooterBg(){
    var c = document.getElementById('footer-bg').value;
    var f = document.querySelector('.footer-bar');
    if(f) f.style.background = c;
    saveDesignSetting('footer_bg', c);
  }

  function applyFooterVisibility(){
    var v = document.getElementById('footer-visible').checked;
    var f = document.querySelector('.footer-bar');
    if(f) f.style.display = v ? 'block' : 'none';
    saveDesignSetting('footer_visible', v);
  }

  function applyCustomCSS(){
    var css = document.getElementById('custom-css').value;
    var el = document.getElementById('custom-style-tag');
    if(!el){ el=document.createElement('style'); el.id='custom-style-tag'; document.head.appendChild(el); }
    el.textContent = css;
    saveDesignSetting('custom_css', css);
    showToast('تم تطبيق CSS المخصص');
  }

  function clearCustomCSS(){
    document.getElementById('custom-css').value='';
    var el = document.getElementById('custom-style-tag');
    if(el) el.textContent='';
    saveDesignSetting('custom_css','');
    showToast('تم مسح CSS المخصص');
  }

  function saveDesignSetting(key, value){
    var s = getSD('heg_design_settings',{});
    s[key] = value;
    setSD('heg_design_settings', s);
  }

  function applyAll(){
    applyFont();
    applyTopbar();
    applyRadius();
    applyBtnRadius();
    showToast('تم تطبيق جميع الإعدادات');
  }

  function resetAll(){
    if(!confirm('استعادة جميع إعدادات التصميم الافتراضية؟')) return;
    localStorage.removeItem('heg_design_colors');
    localStorage.removeItem('heg_design_settings');
    localStorage.removeItem('heg_colors');
    location.reload();
  }

  // Load saved settings on init
  function loadDesignSettings(){
    var saved = getSD('heg_design_colors',{});
    Object.keys(saved).forEach(function(k){ document.documentElement.style.setProperty(k, saved[k]); });
    var s = getSD('heg_design_settings',{});
    if(s.font_body){ document.getElementById('font-body').value=s.font_body; }
    if(s.font_heading){ document.getElementById('font-heading').value=s.font_heading; }
    if(s.font_size){ document.getElementById('font-size').value=s.font_size; document.getElementById('font-size-val').textContent=s.font_size; }
    if(s.line_h){ document.getElementById('line-h').value=s.line_h; document.getElementById('line-h-val').textContent=s.line_h; }
    if(s.topbar_style){ document.getElementById('topbar-style').value=s.topbar_style; }
    if(s.topbar_h){ document.getElementById('topbar-h').value=s.topbar_h; document.getElementById('topbar-h-val').textContent=s.topbar_h; }
    if(s.sidebar_w){ document.getElementById('sidebar-w').value=s.sidebar_w; document.getElementById('sidebar-w-val').textContent=s.sidebar_w; }
    if(s.sidebar_style){ document.getElementById('sidebar-style').value=s.sidebar_style; }
    if(s.nav_font){ document.getElementById('nav-font').value=s.nav_font; document.getElementById('nav-font-val').textContent=s.nav_font; }
    if(s.radius){ document.getElementById('radius-inp').value=s.radius; document.getElementById('radius-val').textContent=s.radius; }
    if(s.btn_radius){ document.getElementById('btn-radius-inp').value=s.btn_radius; document.getElementById('btn-radius-val').textContent=s.btn_radius; }
    if(s.card_shadow){ document.getElementById('card-shadow').value=s.card_shadow; }
    if(s.custom_css){ document.getElementById('custom-css').value=s.custom_css; applyCustomCSS(); }
    if(s.footer_text){ document.getElementById('footer-text').value=s.footer_text; }
    // Load logo
    var logo = localStorage.getItem('heg_site_logo');
    if(logo){
      document.getElementById('design-logo-preview').innerHTML = '<img src="'+logo+'" style="max-height:70px;max-width:180px;object-fit:contain">';
    }
    // Load company name
    var data = getSD('heg_site_data',{});
    if(data.name) document.getElementById('design-company-name').value = data.name;
    if(data.tagline) document.getElementById('design-tagline').value = data.tagline;
  }

  renderColorRows();
  loadDesignSettings();
  </script>
  `;
}
