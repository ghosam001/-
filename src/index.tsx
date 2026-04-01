import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Static files
app.use('/static/*', serveStatic({ root: './' }))

// ======== MAIN LAYOUT ========
const layout = (title: string, activeNav: string, content: string) => `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — HEG Holiday Travel Services</title>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&family=Cairo:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='16' fill='%231A5C6B'/><text y='.9em' font-size='62' font-family='Arial' font-weight='900' fill='white' x='8'>H</text><rect y='78' width='100' height='6' rx='3' fill='%23D4AB4B'/></svg>">
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <style>
    :root {
      --teal-dark:   #1A5C6B;
      --teal-mid:    #3A8C9B;
      --teal-light:  #5AAAB8;
      --gold:        #D4AB4B;
      --gold-light:  #E8C96A;
      --text-dark:   #163D47;
      --text-mid:    #2E5F6A;
      --text-muted:  #6B8C94;
      --bg-white:    #FFFFFF;
      --bg-light:    #F4F8F9;
      --bg-card:     #FFFFFF;
      --border:      #D0E4E8;
      --border-light:#E8F2F4;
      --shadow:      0 2px 12px rgba(26,92,107,0.08);
      --shadow-hover:0 6px 24px rgba(26,92,107,0.16);
      --radius:      12px;
      --radius-sm:   8px;
    }
    *{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth}
    body{
      font-family:'Cairo',sans-serif;
      background:var(--bg-light);
      color:var(--text-dark);
      direction:rtl;
      min-height:100vh;
      display:flex;
      flex-direction:column;
    }

    /* ===== TOPBAR ===== */
    .topbar{
      background:linear-gradient(135deg, var(--teal-dark) 0%, var(--teal-mid) 100%);
      color:#fff;
      padding:0 2rem;
      height:64px;
      display:flex;
      align-items:center;
      justify-content:space-between;
      box-shadow:0 2px 16px rgba(0,0,0,0.15);
      position:sticky;top:0;z-index:100;
      flex-shrink:0;
    }
    .topbar-brand{display:flex;align-items:center;gap:12px;text-decoration:none;color:#fff}
    .topbar-logo{
      width:44px;height:44px;
      background:linear-gradient(135deg,#fff 0%,#e8f8fa 100%);
      border-radius:10px;
      display:flex;align-items:center;justify-content:center;
      font-size:22px;font-weight:800;
      color:var(--teal-dark);
      font-family:'Montserrat',sans-serif;
      box-shadow:0 2px 8px rgba(0,0,0,0.15);
      flex-shrink:0;
    }
    .topbar-name{display:flex;flex-direction:column;line-height:1.2}
    .topbar-name-main{font-family:'Montserrat',sans-serif;font-size:20px;font-weight:800;letter-spacing:1px}
    .topbar-name-sub{font-size:10px;font-weight:400;opacity:.85;letter-spacing:.5px}
    .topbar-gold-line{
      width:3px;height:32px;
      background:linear-gradient(to bottom,var(--gold),var(--gold-light));
      border-radius:2px;margin:0 4px;
    }
    .topbar-right{display:flex;align-items:center;gap:8px}
    .topbar-date{font-size:12px;opacity:.75}

    /* ===== SIDEBAR ===== */
    .layout{display:flex;flex:1;min-height:0}
    .sidebar{
      width:220px;
      background:var(--bg-white);
      border-left:1px solid var(--border-light);
      padding:1.2rem 0;
      flex-shrink:0;
      display:flex;flex-direction:column;
      box-shadow:inset -1px 0 0 var(--border-light);
    }
    .nav-section{margin-bottom:.5rem}
    .nav-section-label{
      font-size:10px;font-weight:600;
      color:var(--text-muted);
      letter-spacing:.8px;
      text-transform:uppercase;
      padding:0 1.2rem;
      margin-bottom:.3rem;
      margin-top:.8rem;
    }
    .nav-item{
      display:flex;align-items:center;gap:10px;
      padding:9px 1.2rem;
      color:var(--text-mid);
      text-decoration:none;
      font-size:13px;font-weight:500;
      border-right:3px solid transparent;
      transition:all .15s;
      position:relative;
    }
    .nav-item:hover{
      background:#F0F8FA;
      color:var(--teal-dark);
      border-right-color:var(--teal-light);
    }
    .nav-item.active{
      background:linear-gradient(to left,#EAF5F7,#F7FBFC);
      color:var(--teal-dark);
      border-right-color:var(--teal-dark);
      font-weight:600;
    }
    .nav-item i{width:18px;text-align:center;font-size:14px}
    .nav-divider{height:1px;background:var(--border-light);margin:.5rem 1rem}

    /* ===== MAIN CONTENT ===== */
    .main{flex:1;padding:1.5rem;overflow-y:auto;min-width:0}

    /* ===== PAGE HEADER ===== */
    .page-header{
      background:linear-gradient(135deg,var(--teal-dark) 0%,var(--teal-mid) 60%,var(--teal-light) 100%);
      border-radius:var(--radius);
      padding:1.4rem 1.6rem;
      color:#fff;
      margin-bottom:1.4rem;
      display:flex;align-items:center;justify-content:space-between;
      position:relative;overflow:hidden;
    }
    .page-header::after{
      content:'';
      position:absolute;top:-20px;left:-20px;
      width:120px;height:120px;
      background:rgba(255,255,255,0.05);
      border-radius:50%;
    }
    .page-header-left{position:relative;z-index:1}
    .page-header-title{font-size:20px;font-weight:700;font-family:'Montserrat',sans-serif}
    .page-header-sub{font-size:12px;opacity:.8;margin-top:2px}
    .page-header-icon{font-size:36px;opacity:.25;position:absolute;left:1.6rem;top:50%;transform:translateY(-50%)}

    /* ===== CARDS ===== */
    .card{
      background:var(--bg-card);
      border-radius:var(--radius);
      border:1px solid var(--border-light);
      box-shadow:var(--shadow);
      overflow:hidden;
    }
    .card-header{
      padding:.9rem 1.2rem;
      border-bottom:1px solid var(--border-light);
      display:flex;align-items:center;gap:8px;
      background:linear-gradient(to left,#FAFCFD,var(--bg-card));
    }
    .card-header-title{font-size:14px;font-weight:600;color:var(--text-dark)}
    .card-body{padding:1.2rem}

    /* ===== KPI CARDS ===== */
    .kpi-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:1rem;margin-bottom:1.4rem}
    .kpi-card{
      background:var(--bg-card);
      border-radius:var(--radius);
      border:1px solid var(--border-light);
      padding:1rem 1.2rem;
      display:flex;align-items:center;gap:12px;
      box-shadow:var(--shadow);
      transition:box-shadow .2s,transform .2s;
    }
    .kpi-card:hover{box-shadow:var(--shadow-hover);transform:translateY(-2px)}
    .kpi-icon{
      width:44px;height:44px;border-radius:10px;
      display:flex;align-items:center;justify-content:center;
      font-size:20px;flex-shrink:0;
    }
    .kpi-info{}
    .kpi-label{font-size:11px;color:var(--text-muted);margin-bottom:3px}
    .kpi-value{font-size:22px;font-weight:700;font-family:'Montserrat',sans-serif;color:var(--teal-dark)}
    .kpi-sub{font-size:10px;color:var(--text-muted)}

    /* ===== BUTTONS ===== */
    .btn{
      padding:8px 18px;border-radius:var(--radius-sm);
      border:none;cursor:pointer;
      font-size:13px;font-family:'Cairo',sans-serif;font-weight:500;
      transition:all .15s;display:inline-flex;align-items:center;gap:6px;
    }
    .btn-primary{background:var(--teal-dark);color:#fff}
    .btn-primary:hover{background:var(--teal-mid)}
    .btn-gold{background:var(--gold);color:var(--text-dark)}
    .btn-gold:hover{background:var(--gold-light)}
    .btn-outline{background:transparent;border:1px solid var(--border);color:var(--text-mid)}
    .btn-outline:hover{background:var(--bg-light)}
    .btn-danger{background:transparent;border:1px solid #F09595;color:#A32D2D}
    .btn-danger:hover{background:#FCEBEB}
    .btn-sm{padding:5px 12px;font-size:11px}

    /* ===== BADGES ===== */
    .badge{display:inline-block;padding:2px 8px;border-radius:5px;font-size:10px;font-weight:600}
    .b-active{background:#E1F5EE;color:#085041}
    .b-seasonal{background:#FAEEDA;color:#412402}
    .b-custom{background:#EEEDFE;color:#26215C}
    .b-exp{background:#FCEBEB;color:#791F1F}
    .b-inc{background:#E1F5EE;color:#085041}
    .b-pend{background:#FAEEDA;color:#412402}
    .b-paid{background:#EAF3DE;color:#173404}
    .b-part{background:#EEEDFE;color:#26215C}

    /* ===== TABLE ===== */
    .tbl-wrap{border-radius:var(--radius-sm);overflow:hidden;border:1px solid var(--border-light)}
    table{width:100%;border-collapse:collapse;font-size:12px}
    th{
      background:linear-gradient(to left,#F4F8F9,#EDF4F6);
      padding:9px 12px;text-align:right;
      font-weight:600;font-size:11px;color:var(--text-mid);
      border-bottom:1px solid var(--border);
    }
    td{
      padding:9px 12px;text-align:right;
      border-bottom:1px solid var(--border-light);
      color:var(--text-dark);font-size:12px;
    }
    tr:last-child td{border-bottom:none}
    tr:hover td{background:#F7FBFC}

    /* ===== FORMS ===== */
    .form-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;margin-bottom:1rem;align-items:end}
    .form-grid .full{grid-column:1/-1}
    .field label{display:block;font-size:11px;color:var(--text-muted);margin-bottom:4px;font-weight:500}
    .field input,.field select,.field textarea{
      width:100%;padding:8px 10px;
      border-radius:var(--radius-sm);
      border:1px solid var(--border);
      background:var(--bg-card);color:var(--text-dark);
      font-size:13px;font-family:'Cairo',sans-serif;
      transition:border-color .15s;
    }
    .field input:focus,.field select:focus,.field textarea:focus{
      outline:none;border-color:var(--teal-mid);
      box-shadow:0 0 0 3px rgba(58,140,155,0.1);
    }
    .field textarea{resize:vertical;min-height:70px}

    /* ===== MODAL ===== */
    .modal-overlay{
      display:none;position:fixed;inset:0;
      background:rgba(22,61,71,0.45);
      z-index:200;align-items:flex-start;justify-content:center;
      padding-top:60px;backdrop-filter:blur(2px);
    }
    .modal-overlay.show{display:flex}
    .modal{
      background:var(--bg-card);border-radius:14px;
      border:1px solid var(--border);
      box-shadow:0 20px 60px rgba(0,0,0,0.2);
      width:100%;max-width:600px;
      max-height:85vh;overflow-y:auto;
      animation:modalIn .2s ease;
    }
    @keyframes modalIn{from{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}
    .modal-header{
      padding:1.2rem 1.4rem;
      border-bottom:1px solid var(--border-light);
      display:flex;align-items:center;justify-content:space-between;
      background:linear-gradient(to left,#F4F8F9,var(--bg-card));
    }
    .modal-title{font-size:15px;font-weight:700;color:var(--teal-dark)}
    .modal-close{
      width:28px;height:28px;border-radius:6px;border:none;
      background:transparent;color:var(--text-muted);cursor:pointer;
      font-size:16px;display:flex;align-items:center;justify-content:center;
    }
    .modal-close:hover{background:var(--bg-light);color:var(--text-dark)}
    .modal-body{padding:1.4rem}
    .modal-footer{
      padding:1rem 1.4rem;
      border-top:1px solid var(--border-light);
      display:flex;gap:8px;justify-content:flex-end;
      background:linear-gradient(to left,var(--bg-card),#F4F8F9);
    }

    /* ===== FILTERS ===== */
    .filter-bar{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:1rem}
    .filter-btn{
      padding:5px 14px;border-radius:20px;
      border:1px solid var(--border);
      background:transparent;color:var(--text-muted);
      cursor:pointer;font-size:12px;font-family:'Cairo',sans-serif;
      transition:all .15s;
    }
    .filter-btn.on{
      background:#E5F3F5;border-color:var(--teal-mid);
      color:var(--teal-dark);font-weight:600;
    }

    /* ===== SERVICE CARDS ===== */
    .service-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1rem}
    .scard{
      background:var(--bg-card);border-radius:var(--radius);
      border:1px solid var(--border-light);
      box-shadow:var(--shadow);
      overflow:hidden;transition:all .2s;
    }
    .scard:hover{border-color:var(--teal-light);box-shadow:var(--shadow-hover);transform:translateY(-2px)}
    .scard-head{padding:14px 14px 10px;display:flex;align-items:flex-start;gap:10px}
    .scard-icon{
      width:42px;height:42px;border-radius:10px;
      display:flex;align-items:center;justify-content:center;
      font-size:20px;flex-shrink:0;
    }
    .scard-info{flex:1;min-width:0}
    .scard-title{font-size:13px;font-weight:600;color:var(--text-dark)}
    .scard-cat{font-size:11px;color:var(--text-muted);margin-top:2px}
    .scard-desc{padding:0 14px 10px;font-size:12px;color:var(--text-muted);line-height:1.7}
    .scard-foot{
      display:flex;align-items:center;justify-content:space-between;
      padding:9px 14px;
      border-top:1px solid var(--border-light);
      background:linear-gradient(to left,#FAFCFD,var(--bg-card));
    }
    .scard-price{font-size:12px;font-weight:600;color:var(--teal-dark)}

    /* ===== ORG CHART ===== */
    .org-box{
      border-radius:10px;border:1px solid;padding:10px 16px;
      text-align:center;cursor:pointer;
      transition:transform .15s,box-shadow .15s;
      min-width:130px;
    }
    .org-box:hover{transform:translateY(-2px);box-shadow:var(--shadow-hover)}
    .org-title{font-size:13px;font-weight:600;line-height:1.3}
    .org-sub{font-size:10px;margin-top:2px;opacity:.8;line-height:1.3}
    .lvl0{background:#FAEEDA;border-color:#BA7517;color:#412402}
    .lvl1{background:#E5F3F5;border-color:var(--teal-mid);color:var(--text-dark)}
    .lvl2{background:#E1F5EE;border-color:#0F6E56;color:#04342C}
    .lvl3a{background:#EEEDFE;border-color:#534AB7;color:#26215C}
    .lvl3b{background:#E5F3F5;border-color:var(--teal-mid);color:var(--text-dark)}
    .lvl3c{background:#EAF3DE;border-color:#3B6D11;color:#173404}
    .lvl3d{background:#F1EFE8;border-color:#8A8780;color:#2C2C2A}
    .lvl4{background:var(--bg-light);border-color:var(--border);color:var(--text-muted)}

    .org-tier{display:flex;justify-content:center;gap:12px;margin-bottom:0;flex-wrap:wrap}
    .org-tier-label{font-size:10px;color:var(--text-muted);text-align:center;margin-bottom:6px;letter-spacing:.4px;font-weight:500}
    .org-connector-v{height:24px;display:flex;justify-content:center;position:relative}
    .org-connector-v::before{content:'';position:absolute;top:0;bottom:0;left:50%;width:1px;background:var(--border)}
    .org-branch{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;justify-items:center}
    .org-branch-col{display:flex;flex-direction:column;align-items:center;gap:8px}
    .detail-panel{
      margin-top:1rem;border-radius:var(--radius);
      border:1px solid var(--border-light);
      background:var(--bg-card);padding:1.2rem;
      display:none;
      border-right:4px solid var(--teal-mid);
    }
    .detail-panel.visible{display:block}

    /* ===== LEGEND ===== */
    .legend{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:1.2rem;justify-content:center}
    .leg-item{display:flex;align-items:center;gap:6px;font-size:11px;color:var(--text-muted)}
    .leg-dot{width:12px;height:12px;border-radius:3px;flex-shrink:0}

    /* ===== EMPTY STATE ===== */
    .empty-state{
      text-align:center;padding:3rem;
      color:var(--text-muted);font-size:13px;
      grid-column:1/-1;
    }
    .empty-state i{font-size:36px;margin-bottom:.8rem;opacity:.3;display:block}

    /* ===== SEARCH BAR ===== */
    .search-wrap{flex:1;position:relative}
    .search-wrap i{position:absolute;right:10px;top:50%;transform:translateY(-50%);color:var(--text-muted);font-size:13px}
    .search-wrap input{width:100%;padding:8px 32px 8px 12px;border-radius:var(--radius-sm);border:1px solid var(--border);background:var(--bg-card);color:var(--text-dark);font-size:13px;font-family:'Cairo',sans-serif}
    .search-wrap input:focus{outline:none;border-color:var(--teal-mid);box-shadow:0 0 0 3px rgba(58,140,155,0.1)}

    /* ===== ACTION BAR ===== */
    .action-bar{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:1rem}

    /* ===== FOOTER ===== */
    .footer-bar{
      background:var(--teal-dark);color:rgba(255,255,255,0.6);
      font-size:11px;text-align:center;
      padding:.5rem;
      flex-shrink:0;
    }
    .footer-bar span{color:var(--gold)}

    /* ===== RESPONSIVE ===== */
    @media(max-width:768px){
      .sidebar{display:none}
      .main{padding:1rem}
      .kpi-grid{grid-template-columns:repeat(2,1fr)}
      .topbar{padding:0 1rem}
    }
    @media(max-width:480px){
      .kpi-grid{grid-template-columns:1fr 1fr}
      .org-branch{grid-template-columns:repeat(2,1fr)}
    }
    
    /* ===== GOLD ACCENT LINE ===== */
    .gold-bar{height:3px;background:linear-gradient(to left,var(--gold),var(--gold-light),var(--gold));border-radius:2px;margin-bottom:1.4rem}

    /* ===== TOAST ===== */
    #toast{
      position:fixed;bottom:1.5rem;left:50%;transform:translateX(-50%) translateY(80px);
      background:var(--teal-dark);color:#fff;
      padding:10px 20px;border-radius:8px;font-size:13px;
      box-shadow:0 4px 16px rgba(0,0,0,.2);
      opacity:0;transition:all .3s;z-index:999;
      border-right:4px solid var(--gold);
    }
    #toast.show{opacity:1;transform:translateX(-50%) translateY(0)}

    /* ===== SCROLLBAR ===== */
    ::-webkit-scrollbar{width:6px;height:6px}
    ::-webkit-scrollbar-track{background:transparent}
    ::-webkit-scrollbar-thumb{background:var(--border);border-radius:3px}
    ::-webkit-scrollbar-thumb:hover{background:var(--teal-light)}
  </style>
</head>
<body>
  <!-- TOPBAR -->
  <div class="topbar">
    <a class="topbar-brand" href="/">
      <div class="topbar-logo">HEG</div>
      <div class="topbar-gold-line"></div>
      <div class="topbar-name">
        <span class="topbar-name-main">HEG</span>
        <span class="topbar-name-sub">HOLIDAY TRAVEL SERVICES</span>
      </div>
    </a>
    <div class="topbar-right">
      <span class="topbar-date" id="top-date"></span>
    </div>
  </div>

  <div class="layout">
    <!-- SIDEBAR -->
    <aside class="sidebar">
      <div class="nav-section">
        <div class="nav-section-label">الرئيسية</div>
        <a href="/" class="nav-item ${activeNav === 'dashboard' ? 'active' : ''}">
          <i class="fas fa-home"></i> لوحة التحكم
        </a>
      </div>
      <div class="nav-divider"></div>
      <div class="nav-section">
        <div class="nav-section-label">إدارة الأعمال</div>
        <a href="/services" class="nav-item ${activeNav === 'services' ? 'active' : ''}">
          <i class="fas fa-concierge-bell"></i> الخدمات
        </a>
        <a href="/finance" class="nav-item ${activeNav === 'finance' ? 'active' : ''}">
          <i class="fas fa-coins"></i> المالية
        </a>
      </div>
      <div class="nav-divider"></div>
      <div class="nav-section">
        <div class="nav-section-label">التنظيم</div>
        <a href="/structure" class="nav-item ${activeNav === 'structure' ? 'active' : ''}">
          <i class="fas fa-sitemap"></i> الهيكل التنظيمي
        </a>
      </div>
    </aside>

    <!-- MAIN -->
    <main class="main">
      <div class="gold-bar"></div>
      ${content}
    </main>
  </div>

  <div class="footer-bar">
    جميع الحقوق محفوظة © 2026 &nbsp;|&nbsp; <span>HEG Holiday Travel Services</span>
  </div>

  <div id="toast"></div>

  <script>
    // Date
    const d = new Date();
    document.getElementById('top-date').textContent =
      d.toLocaleDateString('ar-EG',{weekday:'long',year:'numeric',month:'long',day:'numeric'});

    // Toast helper
    window.showToast = function(msg){
      const t=document.getElementById('toast');
      t.textContent=msg;t.classList.add('show');
      setTimeout(()=>t.classList.remove('show'),3000);
    }
  </script>
</body>
</html>`

// ======== DASHBOARD PAGE ========
app.get('/', (c) => {
  const content = `
  <div class="page-header">
    <div class="page-header-left">
      <div class="page-header-title">لوحة التحكم الرئيسية</div>
      <div class="page-header-sub">مرحباً بك في نظام إدارة HEG للسياحة</div>
    </div>
    <i class="fas fa-tachometer-alt page-header-icon"></i>
  </div>

  <div class="kpi-grid">
    <div class="kpi-card">
      <div class="kpi-icon" style="background:#E5F3F5;color:var(--teal-dark)"><i class="fas fa-concierge-bell"></i></div>
      <div class="kpi-info">
        <div class="kpi-label">إجمالي الخدمات</div>
        <div class="kpi-value">8</div>
        <div class="kpi-sub">خدمة نشطة</div>
      </div>
    </div>
    <div class="kpi-card">
      <div class="kpi-icon" style="background:#E1F5EE;color:#085041"><i class="fas fa-arrow-up"></i></div>
      <div class="kpi-info">
        <div class="kpi-label">إجمالي الواردات</div>
        <div class="kpi-value" style="color:#085041" id="dash-inc">—</div>
        <div class="kpi-sub">ر.ع هذا الشهر</div>
      </div>
    </div>
    <div class="kpi-card">
      <div class="kpi-icon" style="background:#FCEBEB;color:#A32D2D"><i class="fas fa-arrow-down"></i></div>
      <div class="kpi-info">
        <div class="kpi-label">إجمالي المصروفات</div>
        <div class="kpi-value" style="color:#A32D2D" id="dash-exp">—</div>
        <div class="kpi-sub">ر.ع هذا الشهر</div>
      </div>
    </div>
    <div class="kpi-card">
      <div class="kpi-icon" style="background:#FAEEDA;color:#BA7517"><i class="fas fa-chart-line"></i></div>
      <div class="kpi-info">
        <div class="kpi-label">صافي الربح</div>
        <div class="kpi-value" id="dash-net">—</div>
        <div class="kpi-sub">ر.ع</div>
      </div>
    </div>
  </div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
    <!-- Quick Nav -->
    <div class="card">
      <div class="card-header">
        <i class="fas fa-rocket" style="color:var(--teal-mid)"></i>
        <span class="card-header-title">الوصول السريع</span>
      </div>
      <div class="card-body" style="display:flex;flex-direction:column;gap:8px">
        <a href="/services" style="text-decoration:none;display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:8px;background:var(--bg-light);color:var(--text-dark);transition:.15s" onmouseover="this.style.background='#E5F3F5'" onmouseout="this.style.background='var(--bg-light)'">
          <div style="width:36px;height:36px;border-radius:8px;background:var(--teal-dark);color:#fff;display:flex;align-items:center;justify-content:center"><i class="fas fa-concierge-bell"></i></div>
          <div><div style="font-size:13px;font-weight:600">إدارة الخدمات</div><div style="font-size:11px;color:var(--text-muted)">إضافة وتعديل الخدمات السياحية</div></div>
          <i class="fas fa-chevron-left" style="margin-right:auto;color:var(--text-muted)"></i>
        </a>
        <a href="/finance" style="text-decoration:none;display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:8px;background:var(--bg-light);color:var(--text-dark);transition:.15s" onmouseover="this.style.background='#E5F3F5'" onmouseout="this.style.background='var(--bg-light)'">
          <div style="width:36px;height:36px;border-radius:8px;background:#0F6E56;color:#fff;display:flex;align-items:center;justify-content:center"><i class="fas fa-coins"></i></div>
          <div><div style="font-size:13px;font-weight:600">المالية والحسابات</div><div style="font-size:11px;color:var(--text-muted)">تتبع المصروفات والواردات</div></div>
          <i class="fas fa-chevron-left" style="margin-right:auto;color:var(--text-muted)"></i>
        </a>
        <a href="/structure" style="text-decoration:none;display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:8px;background:var(--bg-light);color:var(--text-dark);transition:.15s" onmouseover="this.style.background='#E5F3F5'" onmouseout="this.style.background='var(--bg-light)'">
          <div style="width:36px;height:36px;border-radius:8px;background:#534AB7;color:#fff;display:flex;align-items:center;justify-content:center"><i class="fas fa-sitemap"></i></div>
          <div><div style="font-size:13px;font-weight:600">الهيكل التنظيمي</div><div style="font-size:11px;color:var(--text-muted)">مخطط الإدارة والأقسام</div></div>
          <i class="fas fa-chevron-left" style="margin-right:auto;color:var(--text-muted)"></i>
        </a>
      </div>
    </div>

    <!-- Brand Identity -->
    <div class="card">
      <div class="card-header">
        <i class="fas fa-palette" style="color:var(--gold)"></i>
        <span class="card-header-title">الهوية البصرية</span>
      </div>
      <div class="card-body">
        <div style="font-size:11px;color:var(--text-muted);margin-bottom:10px">لوحة الألوان الرسمية</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <div style="text-align:center">
            <div style="width:48px;height:48px;border-radius:50%;background:#1A5C6B;margin:0 auto 4px;box-shadow:var(--shadow)"></div>
            <div style="font-size:9px;color:var(--text-muted)">#1A5C6B</div>
          </div>
          <div style="text-align:center">
            <div style="width:48px;height:48px;border-radius:50%;background:#3A8C9B;margin:0 auto 4px;box-shadow:var(--shadow)"></div>
            <div style="font-size:9px;color:var(--text-muted)">#3A8C9B</div>
          </div>
          <div style="width:1px;background:var(--border-light);margin:0 4px"></div>
          <div style="text-align:center">
            <div style="width:48px;height:48px;border-radius:50%;background:#D4AB4B;margin:0 auto 4px;box-shadow:var(--shadow)"></div>
            <div style="font-size:9px;color:var(--text-muted)">#D4AB4B</div>
          </div>
          <div style="text-align:center">
            <div style="width:48px;height:48px;border-radius:50%;background:#163D47;margin:0 auto 4px;box-shadow:var(--shadow)"></div>
            <div style="font-size:9px;color:var(--text-muted)">#163D47</div>
          </div>
          <div style="text-align:center">
            <div style="width:48px;height:48px;border-radius:50%;background:#fff;border:1px solid var(--border);margin:0 auto 4px;box-shadow:var(--shadow)"></div>
            <div style="font-size:9px;color:var(--text-muted)">#FFFFFF</div>
          </div>
        </div>
        <div style="margin-top:14px;padding-top:12px;border-top:1px solid var(--border-light)">
          <div style="font-size:11px;color:var(--text-muted);margin-bottom:6px">الخط الرسمي</div>
          <div style="font-family:'Montserrat',sans-serif;font-size:22px;font-weight:700;color:var(--teal-dark)">Montserrat</div>
          <div style="font-size:11px;color:var(--text-muted)">Bold · Regular · Light</div>
        </div>
      </div>
    </div>
  </div>

  <script>
    // Sync KPIs from localStorage
    const exp = JSON.parse(localStorage.getItem('heg_expenses')||'[]');
    const inc = JSON.parse(localStorage.getItem('heg_incomes')||'[]');
    const totalE = exp.reduce((s,r)=>s+r.amt,0);
    const totalI = inc.reduce((s,r)=>s+r.amt,0);
    const net = totalI - totalE;
    document.getElementById('dash-exp').textContent = totalE.toFixed(3)+' ر.ع';
    document.getElementById('dash-inc').textContent = totalI.toFixed(3)+' ر.ع';
    const nel = document.getElementById('dash-net');
    nel.textContent = net.toFixed(3)+' ر.ع';
    nel.style.color = net>=0 ? '#085041' : '#A32D2D';
  </script>
  `
  return c.html(layout('لوحة التحكم', 'dashboard', content))
})


// ======== SERVICES PAGE ========
app.get('/services', (c) => {
  const content = `
  <div class="page-header">
    <div class="page-header-left">
      <div class="page-header-title">إدارة الخدمات السياحية</div>
      <div class="page-header-sub">أضف وعدّل خدمات شركة HEG للسياحة</div>
    </div>
    <i class="fas fa-concierge-bell page-header-icon"></i>
  </div>

  <div class="action-bar">
    <div class="search-wrap">
      <i class="fas fa-search"></i>
      <input id="srch" placeholder="بحث في الخدمات..." oninput="render()">
    </div>
    <button class="btn btn-primary" onclick="openModal()">
      <i class="fas fa-plus"></i> إضافة خدمة
    </button>
  </div>

  <div class="filter-bar" id="frow"></div>
  <div id="count-bar" style="font-size:12px;color:var(--text-muted);margin-bottom:.8rem"></div>
  <div class="service-grid" id="grid"></div>

  <!-- MODAL -->
  <div class="modal-overlay" id="modal-overlay">
    <div class="modal">
      <div class="modal-header">
        <div class="modal-title" id="modal-title">إضافة خدمة جديدة</div>
        <button class="modal-close" onclick="closeModal()"><i class="fas fa-times"></i></button>
      </div>
      <div class="modal-body">
        <div class="form-grid">
          <div class="field full"><label>اسم الخدمة *</label><input id="f-title" placeholder="مثال: باقة سياحة داخلية"></div>
          <div class="field">
            <label>التصنيف</label>
            <select id="f-cat">
              <option>سياحة داخلية</option><option>سياحة خارجية</option>
              <option>خدمات سفر</option><option>سياحة دينية</option><option>أعمال وشركات</option>
            </select>
          </div>
          <div class="field">
            <label>الحالة</label>
            <select id="f-status"><option>نشط</option><option>موسمي</option><option>مخصص</option></select>
          </div>
          <div class="field"><label>الأيقونة</label><input id="f-icon" placeholder="✈️" maxlength="4"></div>
          <div class="field"><label>السعر</label><input id="f-price" placeholder="من 45 ر.ع للشخص"></div>
          <div class="field"><label>المدة</label><input id="f-dur" placeholder="يوم – أسبوع"></div>
          <div class="field"><label>الفئة المستهدفة</label><input id="f-target" placeholder="أفراد، عائلات"></div>
          <div class="field"><label>الطاقة الاستيعابية</label><input id="f-cap" placeholder="2–50 شخص"></div>
          <div class="field full"><label>وصف الخدمة</label><textarea id="f-desc" placeholder="وصف مختصر..."></textarea></div>
          <div class="field full"><label>ما تشمله (افصل بفاصلة)</label><input id="f-inc" placeholder="نقل، إقامة، مرشد سياحي"></div>
          <div class="field full"><label>خطوات التنفيذ (افصل بفاصلة)</label><input id="f-steps" placeholder="استقبال الطلب، إعداد العرض، تأكيد الحجز"></div>
          <div class="field full"><label>الأكثر طلباً (افصل بفاصلة)</label><input id="f-pop" placeholder="جبل شمس، وادي شاب، نزوى"></div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline" onclick="closeModal()">إلغاء</button>
        <button class="btn btn-primary" onclick="saveService()"><i class="fas fa-save"></i> حفظ الخدمة</button>
      </div>
    </div>
  </div>

  <script>
  const iconBgs={'سياحة داخلية':'#E5F3F5','سياحة خارجية':'#E1F5EE','خدمات سفر':'#FAEEDA','سياحة دينية':'#EEEDFE','أعمال وشركات':'#FAECE7'};
  const catIcons={'سياحة داخلية':'🏔️','سياحة خارجية':'✈️','خدمات سفر':'🛂','سياحة دينية':'🕌','أعمال وشركات':'🤝'};
  const defaultServices=[
    {id:1,title:'باقات سياحة داخلية',cat:'سياحة داخلية',icon:'🏔️',status:'نشط',price:'من 45 ر.ع للشخص',dur:'يوم – أسبوع',target:'أفراد، عائلات، مجموعات',cap:'2–50 شخص',desc:'برامج سياحية متكاملة داخل سلطنة عُمان تشمل الوجهات الطبيعية والتاريخية.',inc:['نقل ذهاب وإياب','مرشد سياحي معتمد','وجبات خلال الجولة'],steps:['استقبال الطلب','إعداد العرض','تأكيد الحجز','تنفيذ البرنامج'],pop:['جبل شمس','وادي شاب','نزوى','صلالة']},
    {id:2,title:'باقات سياحة خارجية',cat:'سياحة خارجية',icon:'✈️',status:'نشط',price:'من 350 ر.ع للشخص',dur:'5 أيام – 3 أسابيع',target:'أفراد، عائلات، أزواج',cap:'2–30 شخص',desc:'برامج سفر منظمة لوجهات دولية مع تأمين الطيران والإقامة والجولات.',inc:['تذاكر الطيران','فندق 3–5 نجوم','جولات منظمة','تأمين سفر'],steps:['تحديد الوجهة','إصدار العرض','دفع 50% مقدم','تسليم مستندات السفر'],pop:['تركيا','جورجيا','تايلاند','الأردن']},
    {id:3,title:'خدمة التأشيرات',cat:'خدمات سفر',icon:'🛂',status:'نشط',price:'من 15 ر.ع رسوم خدمة',dur:'3–15 يوم عمل',target:'الأفراد والشركات',cap:'غير محدود',desc:'استخراج التأشيرات لمختلف الدول مع متابعة الطلب حتى الموافقة.',inc:['مراجعة المستندات','تقديم الطلب','متابعة الطلب'],steps:['تقديم جواز السفر','مراجعة المتطلبات','دفع الرسوم','استلام التأشيرة'],pop:['شنغن','أمريكا','المملكة المتحدة','كندا']},
    {id:4,title:'حجوزات الفنادق',cat:'خدمات سفر',icon:'🏨',status:'نشط',price:'حسب الفندق + 5% عمولة',dur:'فوري',target:'الأفراد والشركات',cap:'غير محدود',desc:'حجز الفنادق محلياً ودولياً بأسعار تنافسية من خلال شراكات مباشرة.',inc:['مقارنة أسعار','تأكيد فوري','سياسة إلغاء واضحة'],steps:['تحديد الوجهة','عرض الخيارات','الدفع','إرسال التأكيد'],pop:['فنادق مسقط','صلالة','دبي']},
    {id:5,title:'السياحة الدينية',cat:'سياحة دينية',icon:'🕌',status:'موسمي',price:'من 650 ر.ع للشخص',dur:'7–14 يوم',target:'الأفراد والعائلات',cap:'10–40 شخص',desc:'برامج العمرة والزيارات الدينية وجولات المواقع الإسلامية.',inc:['تذاكر طيران','إقامة قرب الحرم','مرشد ديني'],steps:['تسجيل الطلب','دفع كامل المبلغ','استخراج التصريح','تنفيذ البرنامج'],pop:['عمرة رمضان','عمرة شعبان','المدينة المنورة']},
    {id:6,title:'سياحة الأعمال والمؤتمرات',cat:'أعمال وشركات',icon:'🤝',status:'نشط',price:'حسب العقد',dur:'يوم – أسبوع',target:'الشركات والمؤسسات',cap:'10–200 شخص',desc:'تنظيم رحلات العمل ومؤتمرات الشركات وبرامج تحفيز الموظفين.',inc:['تنظيم كامل','نقل وإقامة','كاترينج وتجهيزات'],steps:['اجتماع تحديد الاحتياجات','إصدار عرض','توقيع العقد','تنفيذ الفعالية'],pop:['تيم بيلدنج','مؤتمرات سنوية','احتفاليات شركات']},
    {id:7,title:'تأجير الحافلات والنقل',cat:'خدمات سفر',icon:'🚌',status:'نشط',price:'من 80 ر.ع/يوم',dur:'حسب الطلب',target:'المجموعات والشركات',cap:'10–50 شخص',desc:'خدمات نقل سياحي بحافلات مجهزة مع سائقين محترفين.',inc:['حافلة مكيفة','سائق محترف','تأمين'],steps:['تحديد المسار','إصدار عرض','تأكيد الحجز','تنفيذ النقل'],pop:['استقبال مطار','جولات سياحية','نقل المؤتمرات']},
    {id:8,title:'برامج شهر العسل',cat:'سياحة خارجية',icon:'💑',status:'نشط',price:'من 480 ر.ع للشخصين',dur:'5–10 أيام',target:'الأزواج الجدد',cap:'2 أشخاص',desc:'باقات مخصصة للأزواج الجدد تجمع الرومانسية والترفيه في وجهات فاخرة.',inc:['غرفة ديلوكس','زهور ترحيبية','عشاء رومانسي'],steps:['تحديد الوجهة','تخصيص البرنامج','دفع 50%','تنفيذ البرنامج'],pop:['المالديف','إيطاليا','باريس','بالي']},
  ];

  let services = JSON.parse(localStorage.getItem('heg_services')||'null') || defaultServices;
  let editId=null, activeF='الكل';
  const cats=['الكل','سياحة داخلية','سياحة خارجية','خدمات سفر','سياحة دينية','أعمال وشركات'];

  function save(){localStorage.setItem('heg_services',JSON.stringify(services));}

  function buildFilters(){
    document.getElementById('frow').innerHTML=cats.map(c=>
      \`<button class="filter-btn\${c===activeF?' on':''}" onclick="setF('\${c}')">\${c}</button>\`
    ).join('');
  }
  function setF(c){activeF=c;buildFilters();render();}

  function render(){
    const q=document.getElementById('srch').value.trim().toLowerCase();
    let list=services;
    if(activeF!=='الكل') list=list.filter(s=>s.cat===activeF);
    if(q) list=list.filter(s=>s.title.toLowerCase().includes(q)||s.desc.toLowerCase().includes(q));
    document.getElementById('count-bar').textContent=list.length+' خدمة';
    if(!list.length){
      document.getElementById('grid').innerHTML='<div class="empty-state"><i class="fas fa-search"></i>لا توجد خدمات مطابقة</div>';
      return;
    }
    document.getElementById('grid').innerHTML=list.map(s=>\`
      <div class="scard">
        <div class="scard-head">
          <div class="scard-icon" style="background:\${iconBgs[s.cat]||'#F1EFE8'}">\${s.icon||catIcons[s.cat]||'🔹'}</div>
          <div class="scard-info">
            <div class="scard-title">\${s.title}</div>
            <div class="scard-cat">\${s.cat} · \${s.dur}</div>
          </div>
          <span class="badge \${s.status==='نشط'?'b-active':s.status==='موسمي'?'b-seasonal':'b-custom'}">\${s.status}</span>
        </div>
        <div class="scard-desc">\${s.desc}</div>
        \${s.inc&&s.inc.length?\`<div style="padding:0 14px 8px;display:flex;flex-wrap:wrap;gap:4px">
          \${s.inc.map(i=>\`<span style="font-size:10px;background:var(--bg-light);padding:2px 6px;border-radius:4px;color:var(--text-muted)">\${i}</span>\`).join('')}
        </div>\`:''}
        <div class="scard-foot">
          <div class="scard-price"><i class="fas fa-tag" style="margin-left:4px;opacity:.6"></i>\${s.price}</div>
          <div style="display:flex;gap:6px">
            <button class="btn btn-outline btn-sm" onclick="openEdit(\${s.id})"><i class="fas fa-pen"></i> تعديل</button>
            <button class="btn btn-danger btn-sm" onclick="delService(\${s.id})"><i class="fas fa-trash"></i></button>
          </div>
        </div>
      </div>
    \`).join('');
  }

  function fillForm(s){
    document.getElementById('f-title').value=s?s.title:'';
    document.getElementById('f-cat').value=s?s.cat:'سياحة داخلية';
    document.getElementById('f-status').value=s?s.status:'نشط';
    document.getElementById('f-icon').value=s?s.icon:'';
    document.getElementById('f-price').value=s?s.price:'';
    document.getElementById('f-dur').value=s?s.dur:'';
    document.getElementById('f-target').value=s?s.target:'';
    document.getElementById('f-cap').value=s?s.cap:'';
    document.getElementById('f-desc').value=s?s.desc:'';
    document.getElementById('f-inc').value=s?(s.inc||[]).join('، '):'';
    document.getElementById('f-steps').value=s?(s.steps||[]).join('، '):'';
    document.getElementById('f-pop').value=s?(s.pop||[]).join('، '):'';
  }

  function openModal(){
    editId=null;
    document.getElementById('modal-title').textContent='إضافة خدمة جديدة';
    fillForm(null);
    document.getElementById('modal-overlay').classList.add('show');
  }
  function openEdit(id){
    const s=services.find(x=>x.id===id);
    if(!s)return;
    editId=id;
    document.getElementById('modal-title').textContent='تعديل: '+s.title;
    fillForm(s);
    document.getElementById('modal-overlay').classList.add('show');
  }
  function closeModal(){
    document.getElementById('modal-overlay').classList.remove('show');
    editId=null;
  }
  document.getElementById('modal-overlay').addEventListener('click',function(e){
    if(e.target===this) closeModal();
  });

  function saveService(){
    const title=document.getElementById('f-title').value.trim();
    if(!title){document.getElementById('f-title').focus();return;}
    const split=v=>v.split(/[،,]+/).map(x=>x.trim()).filter(Boolean);
    const obj={
      id:editId||Date.now(),
      title,
      cat:document.getElementById('f-cat').value,
      status:document.getElementById('f-status').value,
      icon:document.getElementById('f-icon').value.trim()||catIcons[document.getElementById('f-cat').value]||'🔹',
      price:document.getElementById('f-price').value.trim(),
      dur:document.getElementById('f-dur').value.trim(),
      target:document.getElementById('f-target').value.trim(),
      cap:document.getElementById('f-cap').value.trim(),
      desc:document.getElementById('f-desc').value.trim(),
      inc:split(document.getElementById('f-inc').value),
      steps:split(document.getElementById('f-steps').value),
      pop:split(document.getElementById('f-pop').value),
    };
    if(editId){const i=services.findIndex(x=>x.id===editId);if(i>=0)services[i]=obj;}
    else{services.push(obj);}
    save();closeModal();render();
    showToast(editId?'✅ تم تعديل الخدمة':'✅ تمت إضافة الخدمة الجديدة');
  }

  function delService(id){
    if(!confirm('هل أنت متأكد من حذف هذه الخدمة؟')) return;
    services=services.filter(x=>x.id!==id);
    save();render();
    showToast('🗑️ تم حذف الخدمة');
  }

  buildFilters();render();
  </script>
  `
  return c.html(layout('الخدمات', 'services', content))
})

// ======== FINANCE PAGE ========
app.get('/finance', (c) => {
  const content = `
  <div class="page-header">
    <div class="page-header-left">
      <div class="page-header-title">نظام المالية والحسابات</div>
      <div class="page-header-sub">تتبع المصروفات والواردات وصافي الأرباح</div>
    </div>
    <i class="fas fa-coins page-header-icon"></i>
  </div>

  <div class="kpi-grid" id="kpi-row">
    <div class="kpi-card">
      <div class="kpi-icon" style="background:#FCEBEB;color:#A32D2D"><i class="fas fa-arrow-down"></i></div>
      <div class="kpi-info"><div class="kpi-label">إجمالي المصروفات</div><div class="kpi-value" style="color:#A32D2D" id="k-exp">0.000 ر.ع</div></div>
    </div>
    <div class="kpi-card">
      <div class="kpi-icon" style="background:#E1F5EE;color:#085041"><i class="fas fa-arrow-up"></i></div>
      <div class="kpi-info"><div class="kpi-label">إجمالي الواردات</div><div class="kpi-value" style="color:#085041" id="k-inc">0.000 ر.ع</div></div>
    </div>
    <div class="kpi-card">
      <div class="kpi-icon" style="background:#E5F3F5;color:var(--teal-dark)"><i class="fas fa-chart-line"></i></div>
      <div class="kpi-info"><div class="kpi-label">صافي الربح</div><div class="kpi-value" id="k-net">0.000 ر.ع</div></div>
    </div>
    <div class="kpi-card">
      <div class="kpi-icon" style="background:#FAEEDA;color:#BA7517"><i class="fas fa-clock"></i></div>
      <div class="kpi-info"><div class="kpi-label">المعلق / غير مسدد</div><div class="kpi-value" style="color:#BA7517" id="k-pend">0.000 ر.ع</div></div>
    </div>
  </div>

  <!-- TABS -->
  <div class="card">
    <div class="card-header" style="padding-bottom:0;border-bottom:none">
      <div style="display:flex;gap:4px">
        <button class="btn btn-primary" id="tab-exp-btn" onclick="switchTab('exp')" style="border-radius:8px 8px 0 0">
          <i class="fas fa-minus-circle"></i> المصروفات
        </button>
        <button class="btn btn-outline" id="tab-inc-btn" onclick="switchTab('inc')" style="border-radius:8px 8px 0 0">
          <i class="fas fa-plus-circle"></i> الواردات
        </button>
      </div>
    </div>
    <div style="border-top:2px solid var(--teal-dark)"></div>

    <!-- EXPENSES PANE -->
    <div id="pane-exp" class="card-body">
      <div class="form-grid" style="background:var(--bg-light);padding:1rem;border-radius:8px;margin-bottom:1rem">
        <div class="field"><label>البند *</label><input id="e-name" placeholder="مثال: رواتب موظفين"></div>
        <div class="field"><label>المبلغ (ر.ع)</label><input id="e-amt" type="number" step="0.001" min="0" placeholder="0.000"></div>
        <div class="field"><label>التاريخ</label><input id="e-date" type="date"></div>
        <div class="field">
          <label>المسؤول</label>
          <select id="e-resp">
            <option>المدير المالي</option><option>مدير العمليات</option>
            <option>مدير التسويق</option><option>المدير العام</option><option>الموارد البشرية</option>
          </select>
        </div>
        <div class="field">
          <label>جهة الموافقة</label>
          <select id="e-appr"><option>CEO</option><option>CFO</option><option>GM</option></select>
        </div>
        <div class="field">
          <label>الدورية</label>
          <select id="e-freq">
            <option>شهري</option><option>أسبوعي</option><option>ربعي</option>
            <option>سنوي</option><option>حسب الحاجة</option>
          </select>
        </div>
        <div class="field">
          <label>الحالة</label>
          <select id="e-status"><option>مسدد</option><option>معلق</option><option>جزئي</option></select>
        </div>
        <div class="field"><label>ملاحظات</label><input id="e-note" placeholder="اختياري"></div>
        <div style="align-self:end">
          <button class="btn btn-primary" id="e-add-btn" onclick="addExpense()" style="width:100%">
            <i class="fas fa-plus"></i> إضافة
          </button>
        </div>
      </div>
      <div class="tbl-wrap">
        <table>
          <thead><tr>
            <th>البند</th><th>المبلغ</th><th>التاريخ</th><th>المسؤول</th>
            <th>الموافقة</th><th>الدورية</th><th>الحالة</th><th>ملاحظات</th><th></th>
          </tr></thead>
          <tbody id="exp-body"></tbody>
        </table>
      </div>
    </div>

    <!-- INCOME PANE -->
    <div id="pane-inc" class="card-body" style="display:none">
      <div class="form-grid" style="background:var(--bg-light);padding:1rem;border-radius:8px;margin-bottom:1rem">
        <div class="field"><label>المصدر *</label><input id="i-name" placeholder="مثال: باقة سياحية"></div>
        <div class="field"><label>المبلغ (ر.ع)</label><input id="i-amt" type="number" step="0.001" min="0" placeholder="0.000"></div>
        <div class="field"><label>التاريخ</label><input id="i-date" type="date"></div>
        <div class="field">
          <label>نوع الوارد</label>
          <select id="i-type">
            <option>مباشر</option><option>عمولة</option><option>رسوم خدمة</option>
            <option>عقد</option><option>دفعة مقدمة</option>
          </select>
        </div>
        <div class="field">
          <label>القناة</label>
          <select id="i-ch">
            <option>مكتب</option><option>أونلاين</option><option>وكيل</option>
            <option>واتساب</option><option>تعاقدي</option>
          </select>
        </div>
        <div class="field">
          <label>الحالة</label>
          <select id="i-status"><option>مستلم</option><option>معلق</option><option>جزئي</option></select>
        </div>
        <div class="field"><label>اسم العميل</label><input id="i-client" placeholder="اختياري"></div>
        <div class="field"><label>ملاحظات</label><input id="i-note" placeholder="اختياري"></div>
        <div style="align-self:end">
          <button class="btn btn-primary" id="i-add-btn" onclick="addIncome()" style="width:100%;background:#0F6E56">
            <i class="fas fa-plus"></i> إضافة
          </button>
        </div>
      </div>
      <div class="tbl-wrap">
        <table>
          <thead><tr>
            <th>المصدر</th><th>المبلغ</th><th>التاريخ</th><th>النوع</th>
            <th>القناة</th><th>الحالة</th><th>العميل</th><th>ملاحظات</th><th></th>
          </tr></thead>
          <tbody id="inc-body"></tbody>
        </table>
      </div>
    </div>
  </div>

  <script>
  let expenses=JSON.parse(localStorage.getItem('heg_expenses')||'null')||[
    {name:'رواتب الموظفين',amt:1800,date:'2026-04-01',resp:'المدير المالي',appr:'CEO',freq:'شهري',status:'مسدد',note:''},
    {name:'تكاليف موردين',amt:620,date:'2026-04-01',resp:'مدير العمليات',appr:'CFO',freq:'حسب الحاجة',status:'معلق',note:'فندق مسقط'},
    {name:'تسويق رقمي',amt:250,date:'2026-04-01',resp:'مدير التسويق',appr:'GM',freq:'شهري',status:'مسدد',note:'إنستجرام'},
  ];
  let incomes=JSON.parse(localStorage.getItem('heg_incomes')||'null')||[
    {name:'باقة سياحة داخلية',amt:1200,date:'2026-04-01',type:'مباشر',ch:'مكتب',status:'مستلم',client:'أحمد الراشدي',note:'3 أفراد'},
    {name:'حجز فندق',amt:380,date:'2026-04-01',type:'عمولة',ch:'أونلاين',status:'مستلم',client:'',note:''},
    {name:'تأشيرات',amt:90,date:'2026-04-01',type:'رسوم خدمة',ch:'مكتب',status:'معلق',client:'نورة السعدي',note:''},
  ];
  let editExpIdx=-1, editIncIdx=-1;
  const today=new Date().toISOString().split('T')[0];
  document.getElementById('e-date').value=today;
  document.getElementById('i-date').value=today;

  function saveData(){
    localStorage.setItem('heg_expenses',JSON.stringify(expenses));
    localStorage.setItem('heg_incomes',JSON.stringify(incomes));
  }
  function fmt(n){return Number(n).toFixed(3);}

  function switchTab(t){
    const isExp=t==='exp';
    document.getElementById('pane-exp').style.display=isExp?'block':'none';
    document.getElementById('pane-inc').style.display=isExp?'none':'block';
    const eBtn=document.getElementById('tab-exp-btn');
    const iBtn=document.getElementById('tab-inc-btn');
    if(isExp){
      eBtn.className='btn btn-primary';eBtn.style.borderRadius='8px 8px 0 0';
      iBtn.className='btn btn-outline';iBtn.style.borderRadius='8px 8px 0 0';
    }else{
      iBtn.className='btn btn-primary';iBtn.style.cssText='border-radius:8px 8px 0 0;background:#0F6E56';
      eBtn.className='btn btn-outline';eBtn.style.borderRadius='8px 8px 0 0';
    }
  }

  function updateKPIs(){
    const tE=expenses.reduce((s,r)=>s+r.amt,0);
    const tI=incomes.reduce((s,r)=>s+r.amt,0);
    const net=tI-tE;
    const pend=expenses.filter(r=>r.status==='معلق'||r.status==='جزئي').reduce((s,r)=>s+r.amt,0)
              +incomes.filter(r=>r.status==='معلق'||r.status==='جزئي').reduce((s,r)=>s+r.amt,0);
    document.getElementById('k-exp').textContent=fmt(tE)+' ر.ع';
    document.getElementById('k-inc').textContent=fmt(tI)+' ر.ع';
    const ne=document.getElementById('k-net');
    ne.textContent=fmt(net)+' ر.ع';
    ne.style.color=net>=0?'#085041':'#A32D2D';
    document.getElementById('k-pend').textContent=fmt(pend)+' ر.ع';
  }

  function sBadge(s){
    const m={'مسدد':'b-paid','معلق':'b-pend','جزئي':'b-part','مستلم':'b-paid'};
    return \`<span class="badge \${m[s]||'b-pend'}">\${s}</span>\`;
  }

  function renderExpenses(){
    const tb=document.getElementById('exp-body');
    if(!expenses.length){
      tb.innerHTML='<tr><td colspan="9" style="text-align:center;padding:20px;color:var(--text-muted)">لا توجد مصروفات — أضف أول بند أعلاه</td></tr>';
      return;
    }
    tb.innerHTML=expenses.map((r,i)=>\`<tr>
      <td><b>\${r.name}</b></td>
      <td style="color:#A32D2D;font-weight:600">\${fmt(r.amt)}</td>
      <td>\${r.date||'—'}</td>
      <td>\${r.resp}</td><td>\${r.appr}</td><td>\${r.freq}</td>
      <td>\${sBadge(r.status)}</td>
      <td style="color:var(--text-muted)">\${r.note||'—'}</td>
      <td style="white-space:nowrap;display:flex;gap:4px">
        <button class="btn btn-outline btn-sm" onclick="editExp(\${i})" style="color:var(--teal-dark)"><i class="fas fa-pen"></i></button>
        <button class="btn btn-danger btn-sm" onclick="delExp(\${i})"><i class="fas fa-trash"></i></button>
      </td>
    </tr>\`).join('');
  }

  function renderIncomes(){
    const tb=document.getElementById('inc-body');
    if(!incomes.length){
      tb.innerHTML='<tr><td colspan="9" style="text-align:center;padding:20px;color:var(--text-muted)">لا توجد واردات — أضف أول وارد أعلاه</td></tr>';
      return;
    }
    tb.innerHTML=incomes.map((r,i)=>\`<tr>
      <td><b>\${r.name}</b></td>
      <td style="color:#0F6E56;font-weight:600">\${fmt(r.amt)}</td>
      <td>\${r.date||'—'}</td>
      <td>\${r.type}</td><td>\${r.ch}</td><td>\${sBadge(r.status)}</td>
      <td style="color:var(--text-muted)">\${r.client||'—'}</td>
      <td style="color:var(--text-muted)">\${r.note||'—'}</td>
      <td style="white-space:nowrap;display:flex;gap:4px">
        <button class="btn btn-outline btn-sm" onclick="editInc(\${i})" style="color:#0F6E56"><i class="fas fa-pen"></i></button>
        <button class="btn btn-danger btn-sm" onclick="delInc(\${i})"><i class="fas fa-trash"></i></button>
      </td>
    </tr>\`).join('');
  }

  function getExpFields(){
    return{name:document.getElementById('e-name').value.trim(),amt:parseFloat(document.getElementById('e-amt').value)||0,
    date:document.getElementById('e-date').value,resp:document.getElementById('e-resp').value,
    appr:document.getElementById('e-appr').value,freq:document.getElementById('e-freq').value,
    status:document.getElementById('e-status').value,note:document.getElementById('e-note').value.trim()};
  }
  function getIncFields(){
    return{name:document.getElementById('i-name').value.trim(),amt:parseFloat(document.getElementById('i-amt').value)||0,
    date:document.getElementById('i-date').value,type:document.getElementById('i-type').value,
    ch:document.getElementById('i-ch').value,status:document.getElementById('i-status').value,
    client:document.getElementById('i-client').value.trim(),note:document.getElementById('i-note').value.trim()};
  }
  function clearExpFields(){['e-name','e-amt','e-note'].forEach(id=>document.getElementById(id).value='');document.getElementById('e-date').value=today;}
  function clearIncFields(){['i-name','i-amt','i-client','i-note'].forEach(id=>document.getElementById(id).value='');document.getElementById('i-date').value=today;}

  function addExpense(){
    const r=getExpFields();
    if(!r.name){document.getElementById('e-name').focus();return;}
    if(editExpIdx>=0){expenses[editExpIdx]=r;editExpIdx=-1;document.getElementById('e-add-btn').innerHTML='<i class="fas fa-plus"></i> إضافة';}
    else expenses.push(r);
    clearExpFields();saveData();renderExpenses();updateKPIs();
    showToast('✅ تم حفظ بند المصروف');
  }
  function addIncome(){
    const r=getIncFields();
    if(!r.name){document.getElementById('i-name').focus();return;}
    if(editIncIdx>=0){incomes[editIncIdx]=r;editIncIdx=-1;document.getElementById('i-add-btn').innerHTML='<i class="fas fa-plus"></i> إضافة';}
    else incomes.push(r);
    clearIncFields();saveData();renderIncomes();updateKPIs();
    showToast('✅ تم حفظ الوارد');
  }

  function editExp(i){
    const r=expenses[i];editExpIdx=i;
    document.getElementById('e-name').value=r.name;document.getElementById('e-amt').value=r.amt;
    document.getElementById('e-date').value=r.date;document.getElementById('e-resp').value=r.resp;
    document.getElementById('e-appr').value=r.appr;document.getElementById('e-freq').value=r.freq;
    document.getElementById('e-status').value=r.status;document.getElementById('e-note').value=r.note;
    document.getElementById('e-add-btn').innerHTML='<i class="fas fa-save"></i> حفظ التعديل';
    document.getElementById('e-name').focus();
    document.getElementById('e-name').scrollIntoView({behavior:'smooth',block:'center'});
  }
  function editInc(i){
    const r=incomes[i];editIncIdx=i;
    document.getElementById('i-name').value=r.name;document.getElementById('i-amt').value=r.amt;
    document.getElementById('i-date').value=r.date;document.getElementById('i-type').value=r.type;
    document.getElementById('i-ch').value=r.ch;document.getElementById('i-status').value=r.status;
    document.getElementById('i-client').value=r.client;document.getElementById('i-note').value=r.note;
    document.getElementById('i-add-btn').innerHTML='<i class="fas fa-save"></i> حفظ التعديل';
    document.getElementById('i-name').focus();
    document.getElementById('i-name').scrollIntoView({behavior:'smooth',block:'center'});
  }

  function delExp(i){
    if(!confirm('حذف هذا البند؟'))return;
    expenses.splice(i,1);saveData();renderExpenses();updateKPIs();showToast('🗑️ تم حذف البند');
  }
  function delInc(i){
    if(!confirm('حذف هذا الوارد؟'))return;
    incomes.splice(i,1);saveData();renderIncomes();updateKPIs();showToast('🗑️ تم حذف الوارد');
  }

  renderExpenses();renderIncomes();updateKPIs();
  </script>
  `
  return c.html(layout('المالية', 'finance', content))
})

// ======== ORG STRUCTURE PAGE ========
app.get('/structure', (c) => {
  const content = `
  <div class="page-header">
    <div class="page-header-left">
      <div class="page-header-title">الهيكل التنظيمي والإداري</div>
      <div class="page-header-sub">مخطط أقسام وإدارات HEG — اضغط على أي خانة لعرض التفاصيل</div>
    </div>
    <i class="fas fa-sitemap page-header-icon"></i>
  </div>

  <div class="card">
    <div class="card-body">
      <!-- LEGEND -->
      <div class="legend">
        <div class="leg-item"><div class="leg-dot" style="background:#BA7517"></div>مجلس الإدارة</div>
        <div class="leg-item"><div class="leg-dot" style="background:var(--teal-mid)"></div>الإدارة التنفيذية</div>
        <div class="leg-item"><div class="leg-dot" style="background:#0F6E56"></div>الإدارة العامة</div>
        <div class="leg-item"><div class="leg-dot" style="background:#534AB7"></div>الإدارة المالية</div>
        <div class="leg-item"><div class="leg-dot" style="background:#3B6D11"></div>التشغيل والتسويق</div>
        <div class="leg-item"><div class="leg-dot" style="background:#8A8780"></div>الأقسام التنفيذية</div>
      </div>

      <!-- L0: Board -->
      <div class="org-tier-label">المستوى الأول — السلطة العليا</div>
      <div class="org-tier">
        <div class="org-box lvl0" onclick="showDetail('board')">
          <div class="org-title">مجلس الإدارة</div>
          <div class="org-sub">HEG Group · القرارات الاستراتيجية</div>
        </div>
      </div>
      <div class="org-connector-v"></div>

      <!-- L1: CEO -->
      <div class="org-tier-label">المستوى الثاني — الإدارة التنفيذية العليا</div>
      <div class="org-tier">
        <div class="org-box lvl1" onclick="showDetail('ceo')">
          <div class="org-title">الرئيس التنفيذي</div>
          <div class="org-sub">CEO · إدارة الشركة كاملاً</div>
        </div>
      </div>
      <div class="org-connector-v"></div>

      <!-- L2: GM -->
      <div class="org-tier-label">المستوى الثالث — الإدارة العامة</div>
      <div class="org-tier">
        <div class="org-box lvl2" onclick="showDetail('gm')">
          <div class="org-title">المدير العام</div>
          <div class="org-sub">General Manager · الإشراف التشغيلي</div>
        </div>
      </div>

      <!-- Branch lines SVG -->
      <div style="height:28px;position:relative">
        <svg width="100%" height="28" style="position:absolute;top:0;left:0;overflow:visible">
          <line x1="50%" y1="0" x2="50%" y2="14" stroke="var(--border)" stroke-width="1.5"/>
          <line x1="12.5%" y1="14" x2="87.5%" y2="14" stroke="var(--border)" stroke-width="1.5"/>
          <line x1="12.5%" y1="14" x2="12.5%" y2="28" stroke="var(--border)" stroke-width="1.5"/>
          <line x1="37.5%" y1="14" x2="37.5%" y2="28" stroke="var(--border)" stroke-width="1.5"/>
          <line x1="62.5%" y1="14" x2="62.5%" y2="28" stroke="var(--border)" stroke-width="1.5"/>
          <line x1="87.5%" y1="14" x2="87.5%" y2="28" stroke="var(--border)" stroke-width="1.5"/>
        </svg>
      </div>

      <!-- L3: 4 Directors -->
      <div class="org-tier-label">المستوى الرابع — رؤساء الإدارات</div>
      <div class="org-branch">
        <div class="org-branch-col">
          <div class="org-box lvl3a" onclick="showDetail('cfo')" style="width:100%">
            <div class="org-title">المدير المالي</div>
            <div class="org-sub">CFO · المال والمحاسبة</div>
          </div>
        </div>
        <div class="org-branch-col">
          <div class="org-box lvl3b" onclick="showDetail('ops')" style="width:100%">
            <div class="org-title">مدير العمليات</div>
            <div class="org-sub">Operations · الرحلات والموردون</div>
          </div>
        </div>
        <div class="org-branch-col">
          <div class="org-box lvl3c" onclick="showDetail('mktg')" style="width:100%">
            <div class="org-title">مدير التسويق</div>
            <div class="org-sub">Marketing · المبيعات والعلامة</div>
          </div>
        </div>
        <div class="org-branch-col">
          <div class="org-box lvl3d" onclick="showDetail('hr')" style="width:100%">
            <div class="org-title">مدير الموارد البشرية</div>
            <div class="org-sub">HR · الموظفون والرواتب</div>
          </div>
        </div>
      </div>

      <!-- Sub lines -->
      <div style="height:22px;position:relative">
        <svg width="100%" height="22" style="position:absolute;top:0;left:0;overflow:visible">
          <line x1="12.5%" y1="0" x2="12.5%" y2="22" stroke="var(--border)" stroke-width="1.5"/>
          <line x1="37.5%" y1="0" x2="37.5%" y2="22" stroke="var(--border)" stroke-width="1.5"/>
          <line x1="62.5%" y1="0" x2="62.5%" y2="22" stroke="var(--border)" stroke-width="1.5"/>
          <line x1="87.5%" y1="0" x2="87.5%" y2="22" stroke="var(--border)" stroke-width="1.5"/>
        </svg>
      </div>

      <!-- L4: Sub departments -->
      <div class="org-tier-label">المستوى الخامس — الأقسام التنفيذية</div>
      <div class="org-branch">
        <div class="org-branch-col" style="gap:8px">
          <div class="org-box lvl4" onclick="showDetail('acc')" style="width:100%">
            <div class="org-title">المحاسبة</div><div class="org-sub">الفواتير والرواتب</div>
          </div>
          <div class="org-box lvl4" onclick="showDetail('audit')" style="width:100%">
            <div class="org-title">المراجعة الداخلية</div><div class="org-sub">التقارير المالية</div>
          </div>
        </div>
        <div class="org-branch-col" style="gap:8px">
          <div class="org-box lvl4" onclick="showDetail('tours')" style="width:100%">
            <div class="org-title">فريق الرحلات</div><div class="org-sub">تصميم الباقات</div>
          </div>
          <div class="org-box lvl4" onclick="showDetail('cs')" style="width:100%">
            <div class="org-title">خدمة العملاء</div><div class="org-sub">الاستقبال والشكاوى</div>
          </div>
        </div>
        <div class="org-branch-col" style="gap:8px">
          <div class="org-box lvl4" onclick="showDetail('digital')" style="width:100%">
            <div class="org-title">الديجيتال والسوشيال</div><div class="org-sub">المحتوى والإعلانات</div>
          </div>
          <div class="org-box lvl4" onclick="showDetail('sales')" style="width:100%">
            <div class="org-title">فريق المبيعات</div><div class="org-sub">الوكلاء والعملاء</div>
          </div>
        </div>
        <div class="org-branch-col" style="gap:8px">
          <div class="org-box lvl4" onclick="showDetail('recruit')" style="width:100%">
            <div class="org-title">التوظيف</div><div class="org-sub">الاستقطاب والعقود</div>
          </div>
          <div class="org-box lvl4" onclick="showDetail('admin')" style="width:100%">
            <div class="org-title">الشؤون الإدارية</div><div class="org-sub">الوثائق والمستندات</div>
          </div>
        </div>
      </div>

      <!-- Detail Panel -->
      <div class="detail-panel" id="detail-panel">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.8rem">
          <div style="font-size:15px;font-weight:700;color:var(--teal-dark)" id="d-title"></div>
          <button class="btn btn-outline btn-sm" onclick="document.getElementById('detail-panel').classList.remove('visible')">
            <i class="fas fa-times"></i> إغلاق
          </button>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:8px;margin-bottom:.8rem">
          <div style="background:var(--bg-light);padding:8px 10px;border-radius:6px">
            <div style="font-size:10px;color:var(--text-muted);margin-bottom:2px">المرجع المباشر</div>
            <div style="font-size:12px;font-weight:600" id="d-reports"></div>
          </div>
          <div style="background:var(--bg-light);padding:8px 10px;border-radius:6px">
            <div style="font-size:10px;color:var(--text-muted);margin-bottom:2px">صلاحية الموافقة</div>
            <div style="font-size:12px;font-weight:600" id="d-approves"></div>
          </div>
          <div style="background:var(--bg-light);padding:8px 10px;border-radius:6px">
            <div style="font-size:10px;color:var(--text-muted);margin-bottom:2px">عدد الموظفين</div>
            <div style="font-size:12px;font-weight:600" id="d-count"></div>
          </div>
          <div style="background:var(--bg-light);padding:8px 10px;border-radius:6px">
            <div style="font-size:10px;color:var(--text-muted);margin-bottom:2px">الأولوية</div>
            <div style="font-size:12px;font-weight:600" id="d-priority"></div>
          </div>
        </div>
        <div style="border-top:1px solid var(--border-light);padding-top:.8rem">
          <div style="font-size:12px;font-weight:600;color:var(--text-dark);margin-bottom:6px">
            <i class="fas fa-tasks" style="color:var(--teal-mid);margin-left:4px"></i> المهام والمسؤوليات:
          </div>
          <ul id="d-tasks" style="padding-right:16px;margin:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:4px"></ul>
        </div>
      </div>
    </div>
  </div>

  <script>
  const orgData={
    board:{title:'مجلس الإدارة — HEG Group',reports:'المساهمون والمؤسسون',approves:'جميع القرارات الكبرى',count:'3–7 أعضاء',priority:'أعلى سلطة',tasks:['اعتماد الاستراتيجية السنوية','الموافقة على الميزانية الكبرى','تعيين وعزل الرئيس التنفيذي','متابعة أداء المجموعة']},
    ceo:{title:'الرئيس التنفيذي — CEO',reports:'مجلس الإدارة',approves:'جميع العمليات التنفيذية',count:'1',priority:'المسؤول الأول',tasks:['تنفيذ توجيهات مجلس الإدارة','الإشراف على جميع المدراء','التوقيع على العقود الكبرى','تمثيل الشركة رسمياً']},
    gm:{title:'المدير العام — General Manager',reports:'الرئيس التنفيذي',approves:'القرارات التشغيلية اليومية',count:'1',priority:'يومي وتشغيلي',tasks:['ربط جميع الإدارات ببعضها','متابعة تنفيذ الخطط الشهرية','حل المشكلات التشغيلية','رفع التقارير للرئيس التنفيذي']},
    cfo:{title:'المدير المالي — CFO',reports:'المدير العام / CEO',approves:'جميع المصروفات المالية',count:'1 + فريق المحاسبة',priority:'حرج — مالي',tasks:['إعداد الميزانيات السنوية والشهرية','مراقبة التدفق النقدي','الموافقة على المصروفات','إعداد التقارير المالية الدورية','الإشراف على المحاسبة والمراجعة']},
    ops:{title:'مدير العمليات السياحية',reports:'المدير العام',approves:'الموردون والرحلات',count:'1 + فريق الرحلات',priority:'تشغيلي',tasks:['تصميم وتسعير الباقات السياحية','التفاوض مع الفنادق والناقلين','إدارة جدول الرحلات','الإشراف على جودة الخدمة','حل مشكلات العملاء الميدانية']},
    mktg:{title:'مدير التسويق والمبيعات',reports:'المدير العام',approves:'ميزانية التسويق',count:'1 + فريق الديجيتال والمبيعات',priority:'نمو الإيرادات',tasks:['وضع استراتيجية التسويق','إدارة حسابات التواصل الاجتماعي','الإشراف على فريق المبيعات','متابعة مؤشرات الأداء','إطلاق العروض والحملات']},
    hr:{title:'مدير الموارد البشرية',reports:'المدير العام',approves:'التوظيف وسياسات العمل',count:'1 + مساعد إداري',priority:'تأسيسي',tasks:['التوظيف والاستقطاب','إعداد عقود الموظفين','إدارة الرواتب والمكافآت','إصدار كروت الموظفين وختم الشركة','الالتزام بقانون العمل']},
    acc:{title:'قسم المحاسبة',reports:'المدير المالي',approves:'—',count:'2–3 محاسبين',priority:'يومي',tasks:['تسجيل القيود المحاسبية اليومية','إصدار الفواتير وسندات القبض','صرف الرواتب الشهرية','متابعة الذمم المدينة والدائنة']},
    audit:{title:'المراجعة الداخلية',reports:'المدير المالي',approves:'—',count:'1 مراجع',priority:'شهري / ربعي',tasks:['مراجعة الحسابات الشهرية','إعداد تقرير الأرباح والخسائر','التحقق من الصرف وفق الميزانية','رفع تقرير للمدير المالي']},
    tours:{title:'فريق الرحلات والبرامج',reports:'مدير العمليات',approves:'—',count:'2–4 موظفين',priority:'تشغيلي يومي',tasks:['تنسيق حجوزات الفنادق والطيران','التواصل مع الموردين والمرشدين','إعداد جدول الرحلات','متابعة العملاء قبل وأثناء الرحلة']},
    cs:{title:'خدمة العملاء',reports:'مدير العمليات',approves:'—',count:'2–3 موظفين',priority:'واجهة العملاء',tasks:['استقبال الاستفسارات والحجوزات','الرد على الواتساب والمكالمات','معالجة الشكاوى وإحالتها','متابعة رضا العملاء بعد الرحلة']},
    digital:{title:'فريق الديجيتال والسوشيال ميديا',reports:'مدير التسويق',approves:'—',count:'1–2 موظفين',priority:'الحضور الرقمي',tasks:['إدارة إنستجرام وتيك توك وفيسبوك','تصميم المواد التسويقية','إطلاق وإدارة الإعلانات المدفوعة','تحليل أداء المنشورات']},
    sales:{title:'فريق المبيعات',reports:'مدير التسويق',approves:'—',count:'2–4 موظفين',priority:'تحقيق الإيرادات',tasks:['التواصل مع الوكلاء والمجموعات','إتمام صفقات الباقات','متابعة خط المبيعات الشهري','إعداد العروض والعقود']},
    recruit:{title:'قسم التوظيف',reports:'مدير الموارد البشرية',approves:'—',count:'1 موظف',priority:'دوري',tasks:['نشر الإعلانات الوظيفية','فرز المتقدمين وإجراء المقابلات','إعداد عقود التوظيف','تهيئة الموظفين الجدد']},
    admin:{title:'الشؤون الإدارية',reports:'مدير الموارد البشرية',approves:'—',count:'1 موظف',priority:'تأسيسي',tasks:['إصدار وتجديد كروت الموظفين','إدارة ختم الشركة الرسمي','حفظ الوثائق والعقود','التراخيص والمراسلات الرسمية']},
  };

  function showDetail(key){
    const d=orgData[key];if(!d)return;
    document.getElementById('d-title').textContent=d.title;
    document.getElementById('d-reports').textContent=d.reports;
    document.getElementById('d-approves').textContent=d.approves;
    document.getElementById('d-count').textContent=d.count;
    document.getElementById('d-priority').textContent=d.priority;
    document.getElementById('d-tasks').innerHTML=d.tasks.map(t=>
      \`<li style="font-size:12px;color:var(--text-muted);line-height:1.8">\${t}</li>\`
    ).join('');
    const panel=document.getElementById('detail-panel');
    panel.classList.add('visible');
    panel.scrollIntoView({behavior:'smooth',block:'nearest'});
  }
  </script>
  `
  return c.html(layout('الهيكل التنظيمي', 'structure', content))
})

export default app

