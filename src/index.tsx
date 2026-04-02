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
        <a href="/clients" class="nav-item ${activeNav === 'clients' ? 'active' : ''}">
          <i class="fas fa-users"></i> العملاء
        </a>
        <a href="/invoices" class="nav-item ${activeNav === 'invoices' ? 'active' : ''}">
          <i class="fas fa-file-invoice"></i> الفواتير
        </a>
        <a href="/services" class="nav-item ${activeNav === 'services' ? 'active' : ''}">
          <i class="fas fa-concierge-bell"></i> الخدمات
        </a>
        <a href="/finance" class="nav-item ${activeNav === 'finance' ? 'active' : ''}">
          <i class="fas fa-coins"></i> المالية
        </a>
      </div>
      <div class="nav-divider"></div>
      <div class="nav-section">
        <div class="nav-section-label">التواصل والموقع</div>
        <a href="/whatsapp" class="nav-item ${activeNav === 'whatsapp' ? 'active' : ''}">
          <i class="fab fa-whatsapp" style="color:#25D366"></i> واتساب
        </a>
        <a href="/site" class="nav-item ${activeNav === 'site' ? 'active' : ''}">
          <i class="fas fa-globe"></i> إدارة الموقع
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


// ======== CLIENTS PAGE ========
app.get('/clients', (c) => {
  const content = `
  <div class="page-header">
    <div class="page-header-left">
      <div class="page-header-title">إدارة بيانات العملاء</div>
      <div class="page-header-sub">تسجيل وحفظ وتصدير بيانات عملاء HEG</div>
    </div>
    <i class="fas fa-users page-header-icon"></i>
  </div>

  <div class="kpi-grid" style="grid-template-columns:repeat(auto-fit,minmax(140px,1fr))">
    <div class="kpi-card">
      <div class="kpi-icon" style="background:#E5F3F5;color:var(--teal-dark)"><i class="fas fa-users"></i></div>
      <div class="kpi-info"><div class="kpi-label">إجمالي العملاء</div><div class="kpi-value" id="k-total">0</div></div>
    </div>
    <div class="kpi-card">
      <div class="kpi-icon" style="background:#E1F5EE;color:#085041"><i class="fas fa-globe"></i></div>
      <div class="kpi-info"><div class="kpi-label">الجنسيات المختلفة</div><div class="kpi-value" id="k-nat">0</div></div>
    </div>
    <div class="kpi-card">
      <div class="kpi-icon" style="background:#FAEEDA;color:#BA7517"><i class="fas fa-calendar-plus"></i></div>
      <div class="kpi-info"><div class="kpi-label">أضيفوا هذا الشهر</div><div class="kpi-value" id="k-new">0</div></div>
    </div>
  </div>

  <div class="action-bar">
    <div class="search-wrap">
      <i class="fas fa-search"></i>
      <input id="c-srch" placeholder="بحث بالاسم أو الرقم أو البطاقة..." oninput="renderClients()">
    </div>
    <button class="btn btn-primary" onclick="openClientModal()">
      <i class="fas fa-user-plus"></i> إضافة عميل
    </button>
    <button class="btn" onclick="exportExcel()" style="background:#1D6F42;color:#fff">
      <i class="fas fa-file-csv"></i> تصدير CSV
    </button>
  </div>

  <div class="card">
    <div class="card-body" style="padding:0">
      <div class="tbl-wrap" style="border:none;border-radius:0;overflow-x:auto">
        <table id="clients-table">
          <thead>
            <tr>
              <th style="width:40px">#</th>
              <th style="min-width:170px">الاسم الكامل</th>
              <th style="min-width:130px">رقم الهاتف</th>
              <th style="min-width:150px">العنوان</th>
              <th style="min-width:130px">رقم الهوية / البطاقة</th>
              <th style="min-width:90px">الجنسية</th>
              <th style="min-width:100px">تاريخ التسجيل</th>
              <th style="min-width:120px">ملاحظات</th>
              <th style="width:100px">إجراءات</th>
            </tr>
          </thead>
          <tbody id="clients-body">
            <tr><td colspan="9" style="text-align:center;padding:36px;color:var(--text-muted)">
              <i class="fas fa-users" style="font-size:30px;display:block;margin-bottom:10px;opacity:.25"></i>
              لا يوجد عملاء — ابدأ بإضافة أول عميل
            </td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- MODAL -->
  <div class="modal-overlay" id="client-modal">
    <div class="modal" style="max-width:640px">
      <div class="modal-header">
        <div class="modal-title" id="client-modal-title">
          <i class="fas fa-user-plus" style="margin-left:6px;color:var(--teal-mid)"></i>إضافة عميل جديد
        </div>
        <button class="modal-close" onclick="closeClientModal()"><i class="fas fa-times"></i></button>
      </div>
      <div class="modal-body">
        <div class="form-grid">
          <div class="field full"><label>الاسم الكامل *</label><input id="cl-name" placeholder="الاسم الثلاثي أو الرباعي"></div>
          <div class="field"><label>رقم الهاتف *</label><input id="cl-phone" placeholder="+968 9X XXX XXX" dir="ltr"></div>
          <div class="field"><label>رقم بديل</label><input id="cl-phone2" placeholder="اختياري" dir="ltr"></div>
          <div class="field full"><label>العنوان</label><input id="cl-address" placeholder="المدينة – الحي – الشارع"></div>
          <div class="field"><label>رقم الهوية / البطاقة</label><input id="cl-id" placeholder="رقم الهوية أو الجواز" dir="ltr"></div>
          <div class="field">
            <label>الجنسية</label>
            <select id="cl-nat">
              <option value="">— اختر —</option>
              <option>عُماني</option><option>إماراتي</option><option>سعودي</option>
              <option>كويتي</option><option>بحريني</option><option>قطري</option>
              <option>يمني</option><option>مصري</option><option>أردني</option>
              <option>لبناني</option><option>سوري</option><option>عراقي</option>
              <option>باكستاني</option><option>هندي</option><option>بنغلاديشي</option>
              <option>فلبيني</option><option>بريطاني</option><option>أمريكي</option><option>أخرى</option>
            </select>
          </div>
          <div class="field"><label>البريد الإلكتروني</label><input id="cl-email" type="email" placeholder="example@mail.com" dir="ltr"></div>
          <div class="field"><label>تاريخ الميلاد</label><input id="cl-dob" type="date"></div>
          <div class="field full"><label>ملاحظات</label><textarea id="cl-note" rows="2" placeholder="أي ملاحظات إضافية..."></textarea></div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline" onclick="closeClientModal()">إلغاء</button>
        <button class="btn btn-primary" onclick="saveClient()"><i class="fas fa-save"></i> حفظ العميل</button>
      </div>
    </div>
  </div>

  <script>
  let clients = JSON.parse(localStorage.getItem('heg_clients')||'[]');
  let editClientId = null;
  function saveClients(){ localStorage.setItem('heg_clients', JSON.stringify(clients)); }

  function updateKPIs(){
    document.getElementById('k-total').textContent = clients.length;
    document.getElementById('k-nat').textContent = new Set(clients.map(c=>c.nat).filter(Boolean)).size;
    const now = new Date();
    document.getElementById('k-new').textContent = clients.filter(c=>{
      if(!c.date) return false;
      const d=new Date(c.date);
      return d.getMonth()===now.getMonth()&&d.getFullYear()===now.getFullYear();
    }).length;
  }

  function renderClients(){
    const q = document.getElementById('c-srch').value.trim().toLowerCase();
    let list = q ? clients.filter(c=>
      (c.name||'').toLowerCase().includes(q)||(c.phone||'').includes(q)||
      (c.id||'').toLowerCase().includes(q)||(c.nat||'').includes(q)
    ) : clients;
    const tb = document.getElementById('clients-body');
    if(!list.length){
      tb.innerHTML='<tr><td colspan="9" style="text-align:center;padding:36px;color:var(--text-muted)"><i class="fas fa-search" style="font-size:24px;display:block;margin-bottom:8px;opacity:.25"></i>لا توجد نتائج</td></tr>';
      return;
    }
    tb.innerHTML = list.map((c,i)=>\`
      <tr>
        <td style="color:var(--text-muted);font-size:11px">\${i+1}</td>
        <td>
          <div style="display:flex;align-items:center;gap:8px">
            <div style="width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,var(--teal-dark),var(--teal-mid));color:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;flex-shrink:0">\${(c.name||'?').charAt(0)}</div>
            <div><div style="font-weight:600">\${c.name}</div><div style="font-size:10px;color:var(--text-muted)">\${c.email||''}</div></div>
          </div>
        </td>
        <td><div style="font-weight:500">\${c.phone||'—'}</div>\${c.phone2?\`<div style="font-size:10px;color:var(--text-muted)">\${c.phone2}</div>\`:''}</td>
        <td style="color:var(--text-muted);font-size:12px">\${c.address||'—'}</td>
        <td dir="ltr" style="color:var(--text-muted);font-size:12px">\${c.id||'—'}</td>
        <td>\${c.nat?\`<span class="badge" style="background:#E5F3F5;color:var(--teal-dark)">\${c.nat}</span>\`:'—'}</td>
        <td style="color:var(--text-muted);font-size:11px">\${c.date||'—'}</td>
        <td style="color:var(--text-muted);font-size:11px;max-width:110px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="\${c.note||''}">\${c.note||'—'}</td>
        <td>
          <div style="display:flex;gap:3px">
            <button class="btn btn-outline btn-sm" onclick="editClient(\${c.cid})" title="تعديل" style="color:var(--teal-dark);padding:4px 7px"><i class="fas fa-pen"></i></button>
            <button onclick="sendWA(\${c.cid})" title="إرسال واتساب" style="background:#25D366;color:#fff;padding:4px 7px;border-radius:6px;border:none;cursor:pointer"><i class="fab fa-whatsapp"></i></button>
            <button class="btn btn-danger btn-sm" onclick="delClient(\${c.cid})" title="حذف" style="padding:4px 7px"><i class="fas fa-trash"></i></button>
          </div>
        </td>
      </tr>\`).join('');
    updateKPIs();
  }

  function openClientModal(){
    editClientId=null;
    document.getElementById('client-modal-title').innerHTML='<i class="fas fa-user-plus" style="margin-left:6px;color:var(--teal-mid)"></i>إضافة عميل جديد';
    ['cl-name','cl-phone','cl-phone2','cl-address','cl-id','cl-email','cl-note'].forEach(id=>document.getElementById(id).value='');
    document.getElementById('cl-nat').value='';document.getElementById('cl-dob').value='';
    document.getElementById('client-modal').classList.add('show');
  }
  function closeClientModal(){ document.getElementById('client-modal').classList.remove('show'); editClientId=null; }
  document.getElementById('client-modal').addEventListener('click',function(e){if(e.target===this)closeClientModal();});

  function saveClient(){
    const name=document.getElementById('cl-name').value.trim();
    const phone=document.getElementById('cl-phone').value.trim();
    if(!name){document.getElementById('cl-name').focus();showToast('الاسم مطلوب');return;}
    if(!phone){document.getElementById('cl-phone').focus();showToast('رقم الهاتف مطلوب');return;}
    const obj={
      cid:editClientId||Date.now(), name, phone,
      phone2:document.getElementById('cl-phone2').value.trim(),
      address:document.getElementById('cl-address').value.trim(),
      id:document.getElementById('cl-id').value.trim(),
      nat:document.getElementById('cl-nat').value,
      email:document.getElementById('cl-email').value.trim(),
      dob:document.getElementById('cl-dob').value,
      note:document.getElementById('cl-note').value.trim(),
      date:new Date().toISOString().split('T')[0]
    };
    if(editClientId){ const i=clients.findIndex(c=>c.cid===editClientId); if(i>=0){obj.date=clients[i].date;clients[i]=obj;} }
    else clients.push(obj);
    saveClients();closeClientModal();renderClients();updateKPIs();
    showToast(editClientId?'تم تعديل بيانات العميل':'تمت إضافة العميل بنجاح');
  }

  function editClient(cid){
    const c=clients.find(x=>x.cid===cid);if(!c)return;
    editClientId=cid;
    document.getElementById('client-modal-title').innerHTML='<i class="fas fa-user-edit" style="margin-left:6px;color:var(--gold)"></i>تعديل: '+c.name;
    document.getElementById('cl-name').value=c.name||'';document.getElementById('cl-phone').value=c.phone||'';
    document.getElementById('cl-phone2').value=c.phone2||'';document.getElementById('cl-address').value=c.address||'';
    document.getElementById('cl-id').value=c.id||'';document.getElementById('cl-nat').value=c.nat||'';
    document.getElementById('cl-email').value=c.email||'';document.getElementById('cl-dob').value=c.dob||'';
    document.getElementById('cl-note').value=c.note||'';
    document.getElementById('client-modal').classList.add('show');
  }
  function delClient(cid){
    const c=clients.find(x=>x.cid===cid);
    if(!confirm('حذف العميل: '+(c?c.name:'')+' ؟'))return;
    clients=clients.filter(x=>x.cid!==cid);saveClients();renderClients();updateKPIs();showToast('تم حذف العميل');
  }
  function sendWA(cid){
    const c=clients.find(x=>x.cid===cid);if(!c)return;
    const phone=c.phone.replace(/[^0-9]/g,'');
    const msg=encodeURIComponent('مرحباً '+c.name+'\\nنتشرف بخدمتكم في HEG للسياحة\\nهل تحتاج مساعدة في التخطيط لرحلتك القادمة؟');
    window.open('https://wa.me/'+phone+'?text='+msg,'_blank');
  }
  function exportExcel(){
    if(!clients.length){showToast('لا يوجد عملاء للتصدير');return;}
    const headers=['#','الاسم الكامل','رقم الهاتف','هاتف بديل','العنوان','رقم الهوية','الجنسية','البريد الإلكتروني','تاريخ الميلاد','ملاحظات','تاريخ التسجيل'];
    const rows=clients.map((c,i)=>[i+1,c.name||'',c.phone||'',c.phone2||'',c.address||'',c.id||'',c.nat||'',c.email||'',c.dob||'',c.note||'',c.date||'']);
    const q=String.fromCharCode(34);
    let csv=''+headers.join(',')+String.fromCharCode(10);
    rows.forEach(r=>{ csv+=r.map(v=>q+String(v).replace(new RegExp(q,'g'),q+q)+q).join(',')+String.fromCharCode(10); });
    const blob=new Blob([csv],{type:'text/csv;charset=utf-8'});
    const a=document.createElement('a');a.href=URL.createObjectURL(blob);
    a.download='HEG_Clients_'+new Date().toISOString().split('T')[0]+'.csv';
    a.click();URL.revokeObjectURL(a.href);
    showToast('تم تصدير بيانات العملاء — CSV');
  }
  renderClients();updateKPIs();
  </script>
  `
  return c.html(layout('العملاء', 'clients', content))
})

// ======== INVOICES PAGE ========
app.get('/invoices', (c) => {
  const content = `
  <div class="page-header">
    <div class="page-header-left">
      <div class="page-header-title">نظام الفواتير</div>
      <div class="page-header-sub">إنشاء وطباعة وإدارة فواتير العملاء</div>
    </div>
    <i class="fas fa-file-invoice page-header-icon"></i>
  </div>

  <div style="display:grid;grid-template-columns:1fr 380px;gap:1.2rem;align-items:start" id="inv-layout">

    <!-- RIGHT: INVOICES LIST -->
    <div>
      <div class="action-bar">
        <div class="search-wrap">
          <i class="fas fa-search"></i>
          <input id="inv-srch" placeholder="بحث برقم الفاتورة أو اسم العميل..." oninput="renderInvoices()">
        </div>
        <button class="btn btn-primary" onclick="newInvoice()">
          <i class="fas fa-plus"></i> فاتورة جديدة
        </button>
      </div>
      <div class="card">
        <div class="card-body" style="padding:0">
          <div style="overflow-x:auto">
            <table>
              <thead><tr>
                <th>رقم الفاتورة</th>
                <th>اسم العميل</th>
                <th>الخدمة</th>
                <th>المبلغ</th>
                <th>طريقة الدفع</th>
                <th>الحالة</th>
                <th>التاريخ</th>
                <th style="width:120px">إجراءات</th>
              </tr></thead>
              <tbody id="inv-body"></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- LEFT: INVOICE FORM + PREVIEW -->
    <div style="position:sticky;top:80px">
      <div class="card">
        <div class="card-header">
          <i class="fas fa-edit" style="color:var(--teal-mid)"></i>
          <span class="card-header-title" id="inv-form-title">فاتورة جديدة</span>
        </div>
        <div class="card-body" style="display:flex;flex-direction:column;gap:10px">

          <!-- Company Logo Section -->
          <div style="background:var(--bg-light);border-radius:8px;padding:10px;text-align:center;border:1px dashed var(--border)">
            <div style="font-size:10px;color:var(--text-muted);margin-bottom:6px">شعار / اسم الشركة في الفاتورة</div>
            <div id="inv-logo-preview" style="font-family:'Montserrat',sans-serif;font-size:18px;font-weight:800;color:var(--teal-dark)">HEG</div>
            <div style="font-size:9px;color:var(--text-muted)">HOLIDAY TRAVEL SERVICES</div>
            <button class="btn btn-outline btn-sm" onclick="document.getElementById('inv-logo-upload').click()" style="margin-top:6px">
              <i class="fas fa-upload"></i> رفع شعار
            </button>
            <input type="file" id="inv-logo-upload" accept="image/*" style="display:none" onchange="loadLogo(this)">
          </div>

          <div class="field"><label>رقم الفاتورة</label><input id="inv-num" placeholder="INV-2026-001" dir="ltr"></div>
          <div class="field">
            <label>اسم العميل</label>
            <select id="inv-client">
              <option value="">— اختر من العملاء المسجلين —</option>
            </select>
          </div>
          <div class="field"><label>أو اكتب الاسم يدوياً</label><input id="inv-client-manual" placeholder="اسم العميل"></div>
          <div class="field"><label>رقم الهاتف</label><input id="inv-phone" placeholder="+968..." dir="ltr"></div>
          <div class="field">
            <label>الخدمة</label>
            <select id="inv-service">
              <option value="">— اختر الخدمة —</option>
              <option>باقات سياحة داخلية</option>
              <option>باقات سياحة خارجية</option>
              <option>خدمة التأشيرات</option>
              <option>حجوزات الفنادق</option>
              <option>السياحة الدينية</option>
              <option>سياحة الأعمال</option>
              <option>تأجير الحافلات</option>
              <option>برامج شهر العسل</option>
              <option>أخرى</option>
            </select>
          </div>
          <div class="field"><label>تفاصيل إضافية</label><input id="inv-detail" placeholder="وصف الخدمة أو الوجهة..."></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
            <div class="field"><label>المبلغ (ر.ع)</label><input id="inv-amount" type="number" step="0.001" min="0" placeholder="0.000" oninput="calcTotal()"></div>
            <div class="field"><label>الخصم (ر.ع)</label><input id="inv-disc" type="number" step="0.001" min="0" value="0" oninput="calcTotal()"></div>
          </div>
          <div style="background:var(--bg-light);border-radius:8px;padding:10px;display:flex;justify-content:space-between;align-items:center">
            <span style="font-size:12px;color:var(--text-muted)">الإجمالي بعد الخصم:</span>
            <span id="inv-total-display" style="font-size:18px;font-weight:700;color:var(--teal-dark)">0.000 ر.ع</span>
          </div>
          <div class="field">
            <label>طريقة الدفع</label>
            <select id="inv-pay">
              <option>نقداً</option><option>بطاقة بنكية</option>
              <option>تحويل بنكي</option><option>واتساب باي</option>
              <option>آجل</option><option>دفعات</option>
            </select>
          </div>
          <div class="field">
            <label>الحالة</label>
            <select id="inv-status">
              <option>مسدد</option><option>معلق</option><option>جزئي</option><option>ملغي</option>
            </select>
          </div>
          <div class="field"><label>إجالي الحساب (تاريخ)</label><input id="inv-due" type="date"></div>
          <div class="field"><label>ملاحظات الفاتورة</label><textarea id="inv-note" rows="2" placeholder="شكر وتقدير..."></textarea></div>

          <div style="display:flex;gap:6px">
            <button class="btn btn-primary" onclick="saveInvoice()" style="flex:1"><i class="fas fa-save"></i> حفظ</button>
            <button class="btn btn-gold" onclick="printInvoice()" style="flex:1"><i class="fas fa-print"></i> طباعة</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- PRINT TEMPLATE (hidden) -->
  <div id="print-area" style="display:none"></div>

  <script>
  let invoices = JSON.parse(localStorage.getItem('heg_invoices')||'[]');
  let editInvId = null;
  let logoDataUrl = localStorage.getItem('heg_inv_logo') || null;

  function saveInvoices(){ localStorage.setItem('heg_invoices', JSON.stringify(invoices)); }

  // Auto fill invoice number
  function genInvNum(){
    const n = invoices.length + 1;
    return 'INV-' + new Date().getFullYear() + '-' + String(n).padStart(3,'0');
  }

  function newInvoice(){
    editInvId = null;
    document.getElementById('inv-form-title').textContent = 'فاتورة جديدة';
    document.getElementById('inv-num').value = genInvNum();
    document.getElementById('inv-client').value = '';
    document.getElementById('inv-client-manual').value = '';
    document.getElementById('inv-phone').value = '';
    document.getElementById('inv-service').value = '';
    document.getElementById('inv-detail').value = '';
    document.getElementById('inv-amount').value = '';
    document.getElementById('inv-disc').value = '0';
    document.getElementById('inv-pay').value = 'نقداً';
    document.getElementById('inv-status').value = 'مسدد';
    document.getElementById('inv-due').value = new Date().toISOString().split('T')[0];
    document.getElementById('inv-note').value = 'شكراً لثقتكم بـ HEG للسياحة';
    document.getElementById('inv-total-display').textContent = '0.000 ر.ع';
  }

  function loadClients(){
    const clients = JSON.parse(localStorage.getItem('heg_clients')||'[]');
    const sel = document.getElementById('inv-client');
    sel.innerHTML = '<option value="">— اختر من العملاء المسجلين —</option>' +
      clients.map(c=>\`<option value="\${c.cid}">\${c.name} — \${c.phone}</option>\`).join('');
    sel.onchange = function(){
      const c = clients.find(x=>x.cid==this.value);
      if(c){
        document.getElementById('inv-client-manual').value = c.name;
        document.getElementById('inv-phone').value = c.phone;
      }
    };
  }

  function calcTotal(){
    const amt = parseFloat(document.getElementById('inv-amount').value)||0;
    const disc = parseFloat(document.getElementById('inv-disc').value)||0;
    const total = Math.max(0, amt - disc);
    document.getElementById('inv-total-display').textContent = total.toFixed(3) + ' ر.ع';
  }

  function loadLogo(input){
    if(!input.files[0]) return;
    const reader = new FileReader();
    reader.onload = function(e){
      logoDataUrl = e.target.result;
      localStorage.setItem('heg_inv_logo', logoDataUrl);
      document.getElementById('inv-logo-preview').innerHTML = \`<img src="\${logoDataUrl}" style="max-height:60px;max-width:140px;object-fit:contain">\`;
      showToast('تم رفع الشعار');
    };
    reader.readAsDataURL(input.files[0]);
  }

  function saveInvoice(){
    const clientName = document.getElementById('inv-client-manual').value.trim() ||
      (document.getElementById('inv-client').options[document.getElementById('inv-client').selectedIndex]?.text || '');
    if(!clientName){ showToast('اسم العميل مطلوب'); return; }
    const amt = parseFloat(document.getElementById('inv-amount').value)||0;
    const disc = parseFloat(document.getElementById('inv-disc').value)||0;
    const obj = {
      iid: editInvId || Date.now(),
      num: document.getElementById('inv-num').value.trim() || genInvNum(),
      client: clientName,
      phone: document.getElementById('inv-phone').value.trim(),
      service: document.getElementById('inv-service').value,
      detail: document.getElementById('inv-detail').value.trim(),
      amount: amt, disc,
      total: Math.max(0, amt - disc),
      pay: document.getElementById('inv-pay').value,
      status: document.getElementById('inv-status').value,
      due: document.getElementById('inv-due').value,
      note: document.getElementById('inv-note').value.trim(),
      date: new Date().toISOString().split('T')[0]
    };
    if(editInvId){ const i=invoices.findIndex(x=>x.iid===editInvId); if(i>=0){obj.date=invoices[i].date;invoices[i]=obj;} }
    else invoices.unshift(obj);
    saveInvoices(); renderInvoices(); newInvoice();
    showToast(editInvId ? 'تم تعديل الفاتورة' : 'تم حفظ الفاتورة');
  }

  function editInvoice(iid){
    const inv = invoices.find(x=>x.iid===iid); if(!inv) return;
    editInvId = iid;
    document.getElementById('inv-form-title').textContent = 'تعديل: ' + inv.num;
    document.getElementById('inv-num').value = inv.num;
    document.getElementById('inv-client-manual').value = inv.client;
    document.getElementById('inv-phone').value = inv.phone||'';
    document.getElementById('inv-service').value = inv.service||'';
    document.getElementById('inv-detail').value = inv.detail||'';
    document.getElementById('inv-amount').value = inv.amount;
    document.getElementById('inv-disc').value = inv.disc||0;
    document.getElementById('inv-pay').value = inv.pay;
    document.getElementById('inv-status').value = inv.status;
    document.getElementById('inv-due').value = inv.due||'';
    document.getElementById('inv-note').value = inv.note||'';
    calcTotal();
    document.getElementById('inv-num').scrollIntoView({behavior:'smooth',block:'center'});
  }

  function delInvoice(iid){
    const inv = invoices.find(x=>x.iid===iid);
    if(!confirm('حذف الفاتورة: '+(inv?inv.num:'')+' ؟')) return;
    invoices = invoices.filter(x=>x.iid!==iid);
    saveInvoices(); renderInvoices(); showToast('تم حذف الفاتورة');
  }

  function printInvoice(){
    const clientName = document.getElementById('inv-client-manual').value.trim();
    if(!clientName){ showToast('أدخل بيانات الفاتورة أولاً'); return; }
    const num = document.getElementById('inv-num').value || genInvNum();
    const service = document.getElementById('inv-service').value;
    const detail = document.getElementById('inv-detail').value;
    const amt = parseFloat(document.getElementById('inv-amount').value)||0;
    const disc = parseFloat(document.getElementById('inv-disc').value)||0;
    const total = Math.max(0, amt - disc);
    const pay = document.getElementById('inv-pay').value;
    const status = document.getElementById('inv-status').value;
    const due = document.getElementById('inv-due').value;
    const note = document.getElementById('inv-note').value;
    const phone = document.getElementById('inv-phone').value;
    const logoHtml = logoDataUrl
      ? \`<img src="\${logoDataUrl}" style="max-height:70px;max-width:180px;object-fit:contain">\`
      : \`<div style="font-family:Montserrat,sans-serif;font-size:26px;font-weight:900;color:#1A5C6B;letter-spacing:2px">HEG</div>
         <div style="font-size:10px;color:#3A8C9B;letter-spacing:1px">HOLIDAY TRAVEL SERVICES</div>\`;
    const html = \`<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8">
  <title>فاتورة \${num}</title>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=Montserrat:wght@700;900&display=swap" rel="stylesheet">
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Cairo',sans-serif;background:#fff;color:#163D47;font-size:13px}
    .inv-wrap{max-width:780px;margin:0 auto;padding:30px}
    .header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px;padding-bottom:16px;border-bottom:3px solid #1A5C6B}
    .header-left{text-align:right}
    .header-right{text-align:left}
    .inv-title{font-size:28px;font-weight:800;color:#1A5C6B;font-family:'Montserrat',sans-serif}
    .inv-num{font-size:14px;color:#3A8C9B;margin-top:2px}
    .inv-date{font-size:11px;color:#6B8C94}
    .gold-line{height:4px;background:linear-gradient(to right,#D4AB4B,#E8C96A,#D4AB4B);border-radius:2px;margin-bottom:20px}
    .section-title{font-size:11px;font-weight:700;color:#6B8C94;letter-spacing:.5px;text-transform:uppercase;margin-bottom:8px;border-bottom:1px solid #E8F2F4;padding-bottom:4px}
    .info-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px}
    .info-box{background:#F4F8F9;border-radius:8px;padding:12px 14px}
    .info-label{font-size:10px;color:#6B8C94;margin-bottom:2px}
    .info-value{font-size:13px;font-weight:600;color:#163D47}
    table{width:100%;border-collapse:collapse;margin-bottom:16px}
    thead th{background:#1A5C6B;color:#fff;padding:9px 12px;text-align:right;font-size:12px;font-weight:600}
    tbody td{padding:9px 12px;border-bottom:1px solid #E8F2F4;font-size:12px}
    tbody tr:last-child td{border-bottom:none}
    tbody tr:nth-child(even) td{background:#F9FBFC}
    .total-box{background:linear-gradient(135deg,#1A5C6B,#3A8C9B);color:#fff;border-radius:10px;padding:14px 18px;display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}
    .total-label{font-size:13px;opacity:.85}
    .total-value{font-size:24px;font-weight:800;font-family:'Montserrat',sans-serif}
    .gold-badge{display:inline-block;background:#D4AB4B;color:#163D47;padding:3px 10px;border-radius:5px;font-size:11px;font-weight:700;margin-right:6px}
    .footer{margin-top:24px;text-align:center;padding-top:16px;border-top:1px solid #D0E4E8;color:#6B8C94;font-size:11px}
    .note-box{background:#FAEEDA;border-right:4px solid #D4AB4B;padding:10px 14px;border-radius:0 8px 8px 0;margin-bottom:16px;font-size:12px;color:#412402}
    @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
  </style>
</head>
<body>
<div class="inv-wrap">
  <div class="header">
    <div class="header-left">\${logoHtml}</div>
    <div class="header-right">
      <div class="inv-title">فـاتـورة</div>
      <div class="inv-num"># \${num}</div>
      <div class="inv-date">التاريخ: \${new Date().toLocaleDateString('ar-EG',{year:'numeric',month:'long',day:'numeric'})}</div>
      \${due?\`<div class="inv-date">إجالي الحساب: \${new Date(due).toLocaleDateString('ar-EG',{year:'numeric',month:'long',day:'numeric'})}</div>\`:''}
    </div>
  </div>
  <div class="gold-line"></div>
  <div class="info-grid">
    <div class="info-box">
      <div class="section-title">بيانات العميل</div>
      <div class="info-label">الاسم</div><div class="info-value">\${clientName}</div>
      \${phone?\`<div class="info-label" style="margin-top:6px">رقم الهاتف</div><div class="info-value" dir="ltr">\${phone}</div>\`:''}
    </div>
    <div class="info-box">
      <div class="section-title">تفاصيل الدفع</div>
      <div class="info-label">طريقة الدفع</div><div class="info-value">\${pay}</div>
      <div class="info-label" style="margin-top:6px">الحالة</div>
      <div><span class="gold-badge">\${status}</span></div>
    </div>
  </div>
  <div class="section-title">تفاصيل الخدمة</div>
  <table>
    <thead><tr><th style="width:50%">الخدمة</th><th>التفاصيل</th><th style="width:80px">الخصم</th><th style="width:100px">المبلغ</th></tr></thead>
    <tbody>
      <tr>
        <td><b>\${service||'خدمة سياحية'}</b></td>
        <td>\${detail||'—'}</td>
        <td style="color:#A32D2D">\${disc>0?disc.toFixed(3)+' ر.ع':'—'}</td>
        <td style="color:#0F6E56;font-weight:700">\${amt.toFixed(3)} ر.ع</td>
      </tr>
    </tbody>
  </table>
  <div class="total-box">
    <span class="total-label">الإجمالي المستحق</span>
    <span class="total-value">\${total.toFixed(3)} ر.ع</span>
  </div>
  \${note?\`<div class="note-box"><strong>ملاحظة:</strong> \${note}</div>\`:''}
  <div class="footer">
    <strong>HEG Holiday Travel Services</strong> &nbsp;|&nbsp;
    شكراً لثقتكم بنا &nbsp;|&nbsp;
    هذه الفاتورة صادرة إلكترونياً وصالحة بدون توقيع أو ختم
  </div>
</div>
<script>window.onload=function(){window.print()}<'+'/script>
</body></html>\`;
    const w = window.open('','_blank','width=900,height=700');
    w.document.write(html);
    w.document.close();
  }

  function renderInvoices(){
    const q = document.getElementById('inv-srch').value.trim().toLowerCase();
    let list = q ? invoices.filter(i=>(i.num||'').toLowerCase().includes(q)||(i.client||'').toLowerCase().includes(q)) : invoices;
    const tb = document.getElementById('inv-body');
    if(!list.length){
      tb.innerHTML='<tr><td colspan="8" style="text-align:center;padding:36px;color:var(--text-muted)"><i class="fas fa-file-invoice" style="font-size:26px;display:block;margin-bottom:8px;opacity:.25"></i>لا توجد فواتير بعد</td></tr>';
      return;
    }
    const statusColor={'مسدد':'#E1F5EE','معلق':'#FAEEDA','جزئي':'#EEEDFE','ملغي':'#FCEBEB'};
    const statusText={'مسدد':'#085041','معلق':'#412402','جزئي':'#26215C','ملغي':'#791F1F'};
    tb.innerHTML = list.map(inv=>\`
      <tr>
        <td><span style="font-family:'Montserrat',sans-serif;font-size:11px;font-weight:600;color:var(--teal-dark)">\${inv.num}</span></td>
        <td style="font-weight:600">\${inv.client}</td>
        <td style="color:var(--text-muted);font-size:11px">\${inv.service||'—'}</td>
        <td style="font-weight:700;color:var(--teal-dark)">\${inv.total.toFixed(3)} ر.ع</td>
        <td style="font-size:11px">\${inv.pay}</td>
        <td><span style="padding:2px 8px;border-radius:5px;font-size:10px;font-weight:600;background:\${statusColor[inv.status]||'#eee'};color:\${statusText[inv.status]||'#333'}">\${inv.status}</span></td>
        <td style="color:var(--text-muted);font-size:11px">\${inv.date||'—'}</td>
        <td>
          <div style="display:flex;gap:3px">
            <button class="btn btn-outline btn-sm" onclick="editInvoice(\${inv.iid})" title="تعديل" style="color:var(--teal-dark);padding:4px 7px"><i class="fas fa-pen"></i></button>
            <button class="btn btn-gold btn-sm" onclick="printSaved(\${inv.iid})" title="طباعة" style="padding:4px 7px"><i class="fas fa-print"></i></button>
            <button class="btn btn-danger btn-sm" onclick="delInvoice(\${inv.iid})" title="حذف" style="padding:4px 7px"><i class="fas fa-trash"></i></button>
          </div>
        </td>
      </tr>\`).join('');
  }

  function printSaved(iid){
    const inv = invoices.find(x=>x.iid===iid); if(!inv) return;
    document.getElementById('inv-client-manual').value = inv.client;
    document.getElementById('inv-num').value = inv.num;
    document.getElementById('inv-phone').value = inv.phone||'';
    document.getElementById('inv-service').value = inv.service||'';
    document.getElementById('inv-detail').value = inv.detail||'';
    document.getElementById('inv-amount').value = inv.amount;
    document.getElementById('inv-disc').value = inv.disc||0;
    document.getElementById('inv-pay').value = inv.pay;
    document.getElementById('inv-status').value = inv.status;
    document.getElementById('inv-due').value = inv.due||'';
    document.getElementById('inv-note').value = inv.note||'';
    setTimeout(printInvoice, 100);
  }

  // Load logo if saved
  if(logoDataUrl){
    document.getElementById('inv-logo-preview').innerHTML = \`<img src="\${logoDataUrl}" style="max-height:60px;max-width:140px;object-fit:contain">\`;
  }

  loadClients();
  newInvoice();
  renderInvoices();
  </script>
  `
  return c.html(layout('الفواتير', 'invoices', content))
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
          <div class="field"><label>الأيقونة</label><input id="f-icon" placeholder="\\2708\\FE0F" maxlength="4"></div>
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
  const catIcons={'سياحة داخلية':'\\uD83C\\uDFD4\\FE0F','سياحة خارجية':'\\2708\\FE0F','خدمات سفر':'\\uD83D\\uDEC2','سياحة دينية':'\\uD83D\\uDD4C','أعمال وشركات':'\\uD83E\\uDD1D'};
  const defaultServices=[
    {id:1,title:'باقات سياحة داخلية',cat:'سياحة داخلية',icon:'\\uD83C\\uDFD4\\FE0F',status:'نشط',price:'من 45 ر.ع للشخص',dur:'يوم – أسبوع',target:'أفراد، عائلات، مجموعات',cap:'2–50 شخص',desc:'برامج سياحية متكاملة داخل سلطنة عُمان تشمل الوجهات الطبيعية والتاريخية.',inc:['نقل ذهاب وإياب','مرشد سياحي معتمد','وجبات خلال الجولة'],steps:['استقبال الطلب','إعداد العرض','تأكيد الحجز','تنفيذ البرنامج'],pop:['جبل شمس','وادي شاب','نزوى','صلالة']},
    {id:2,title:'باقات سياحة خارجية',cat:'سياحة خارجية',icon:'\\2708\\FE0F',status:'نشط',price:'من 350 ر.ع للشخص',dur:'5 أيام – 3 أسابيع',target:'أفراد، عائلات، أزواج',cap:'2–30 شخص',desc:'برامج سفر منظمة لوجهات دولية مع تأمين الطيران والإقامة والجولات.',inc:['تذاكر الطيران','فندق 3–5 نجوم','جولات منظمة','تأمين سفر'],steps:['تحديد الوجهة','إصدار العرض','دفع 50% مقدم','تسليم مستندات السفر'],pop:['تركيا','جورجيا','تايلاند','الأردن']},
    {id:3,title:'خدمة التأشيرات',cat:'خدمات سفر',icon:'\\uD83D\\uDEC2',status:'نشط',price:'من 15 ر.ع رسوم خدمة',dur:'3–15 يوم عمل',target:'الأفراد والشركات',cap:'غير محدود',desc:'استخراج التأشيرات لمختلف الدول مع متابعة الطلب حتى الموافقة.',inc:['مراجعة المستندات','تقديم الطلب','متابعة الطلب'],steps:['تقديم جواز السفر','مراجعة المتطلبات','دفع الرسوم','استلام التأشيرة'],pop:['شنغن','أمريكا','المملكة المتحدة','كندا']},
    {id:4,title:'حجوزات الفنادق',cat:'خدمات سفر',icon:'\\uD83C\\uDFE8',status:'نشط',price:'حسب الفندق + 5% عمولة',dur:'فوري',target:'الأفراد والشركات',cap:'غير محدود',desc:'حجز الفنادق محلياً ودولياً بأسعار تنافسية من خلال شراكات مباشرة.',inc:['مقارنة أسعار','تأكيد فوري','سياسة إلغاء واضحة'],steps:['تحديد الوجهة','عرض الخيارات','الدفع','إرسال التأكيد'],pop:['فنادق مسقط','صلالة','دبي']},
    {id:5,title:'السياحة الدينية',cat:'سياحة دينية',icon:'\\uD83D\\uDD4C',status:'موسمي',price:'من 650 ر.ع للشخص',dur:'7–14 يوم',target:'الأفراد والعائلات',cap:'10–40 شخص',desc:'برامج العمرة والزيارات الدينية وجولات المواقع الإسلامية.',inc:['تذاكر طيران','إقامة قرب الحرم','مرشد ديني'],steps:['تسجيل الطلب','دفع كامل المبلغ','استخراج التصريح','تنفيذ البرنامج'],pop:['عمرة رمضان','عمرة شعبان','المدينة المنورة']},
    {id:6,title:'سياحة الأعمال والمؤتمرات',cat:'أعمال وشركات',icon:'\\uD83E\\uDD1D',status:'نشط',price:'حسب العقد',dur:'يوم – أسبوع',target:'الشركات والمؤسسات',cap:'10–200 شخص',desc:'تنظيم رحلات العمل ومؤتمرات الشركات وبرامج تحفيز الموظفين.',inc:['تنظيم كامل','نقل وإقامة','كاترينج وتجهيزات'],steps:['اجتماع تحديد الاحتياجات','إصدار عرض','توقيع العقد','تنفيذ الفعالية'],pop:['تيم بيلدنج','مؤتمرات سنوية','احتفاليات شركات']},
    {id:7,title:'تأجير الحافلات والنقل',cat:'خدمات سفر',icon:'\\uD83D\\uDE8C',status:'نشط',price:'من 80 ر.ع/يوم',dur:'حسب الطلب',target:'المجموعات والشركات',cap:'10–50 شخص',desc:'خدمات نقل سياحي بحافلات مجهزة مع سائقين محترفين.',inc:['حافلة مكيفة','سائق محترف','تأمين'],steps:['تحديد المسار','إصدار عرض','تأكيد الحجز','تنفيذ النقل'],pop:['استقبال مطار','جولات سياحية','نقل المؤتمرات']},
    {id:8,title:'برامج شهر العسل',cat:'سياحة خارجية',icon:'\\uD83D\\uDC91',status:'نشط',price:'من 480 ر.ع للشخصين',dur:'5–10 أيام',target:'الأزواج الجدد',cap:'2 أشخاص',desc:'باقات مخصصة للأزواج الجدد تجمع الرومانسية والترفيه في وجهات فاخرة.',inc:['غرفة ديلوكس','زهور ترحيبية','عشاء رومانسي'],steps:['تحديد الوجهة','تخصيص البرنامج','دفع 50%','تنفيذ البرنامج'],pop:['المالديف','إيطاليا','باريس','بالي']},
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
          <div class="scard-icon" style="background:\${iconBgs[s.cat]||'#F1EFE8'}">\${s.icon||catIcons[s.cat]||'\\uD83D\\uDD39'}</div>
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
      icon:document.getElementById('f-icon').value.trim()||catIcons[document.getElementById('f-cat').value]||'\\uD83D\\uDD39',
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
    showToast(editId?'تم تعديل الخدمة':'تمت إضافة الخدمة الجديدة');
  }

  function delService(id){
    if(!confirm('هل أنت متأكد من حذف هذه الخدمة؟')) return;
    services=services.filter(x=>x.id!==id);
    save();render();
    showToast('تم حذف الخدمة');
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
    showToast('تم حفظ بند المصروف');
  }
  function addIncome(){
    const r=getIncFields();
    if(!r.name){document.getElementById('i-name').focus();return;}
    if(editIncIdx>=0){incomes[editIncIdx]=r;editIncIdx=-1;document.getElementById('i-add-btn').innerHTML='<i class="fas fa-plus"></i> إضافة';}
    else incomes.push(r);
    clearIncFields();saveData();renderIncomes();updateKPIs();
    showToast('تم حفظ الوارد');
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
    expenses.splice(i,1);saveData();renderExpenses();updateKPIs();showToast('تم حذف البند');
  }
  function delInc(i){
    if(!confirm('حذف هذا الوارد؟'))return;
    incomes.splice(i,1);saveData();renderIncomes();updateKPIs();showToast('تم حذف الوارد');
  }

  renderExpenses();renderIncomes();updateKPIs();
  </script>
  `
  return c.html(layout('المالية', 'finance', content))
})

// ======== WHATSAPP PAGE ========
app.get('/whatsapp', (c) => {
  const content = `
  <div class="page-header">
    <div class="page-header-left">
      <div class="page-header-title">نظام إرسال واتساب</div>
      <div class="page-header-sub">إرسال رسائل واتساب لعميل واحد أو مجموعة من العملاء</div>
    </div>
    <i class="fab fa-whatsapp page-header-icon"></i>
  </div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.2rem;align-items:start">

    <!-- RIGHT: Message Composer -->
    <div class="card">
      <div class="card-header">
        <i class="fab fa-whatsapp" style="color:#25D366;font-size:18px"></i>
        <span class="card-header-title">إعداد الرسالة</span>
      </div>
      <div class="card-body" style="display:flex;flex-direction:column;gap:12px">

        <!-- Send Mode -->
        <div style="display:flex;gap:6px">
          <button class="filter-btn on" id="mode-single" onclick="setMode('single')">
            <i class="fas fa-user"></i> عميل واحد
          </button>
          <button class="filter-btn" id="mode-multi" onclick="setMode('multi')">
            <i class="fas fa-users"></i> مجموعة عملاء
          </button>
          <button class="filter-btn" id="mode-manual" onclick="setMode('manual')">
            <i class="fas fa-keyboard"></i> إدخال يدوي
          </button>
        </div>

        <!-- Single client -->
        <div id="single-section">
          <div class="field">
            <label>اختر العميل</label>
            <select id="wa-client-sel">
              <option value="">— اختر عميلاً —</option>
            </select>
          </div>
          <div style="padding:10px;background:var(--bg-light);border-radius:8px;font-size:12px;color:var(--text-muted)" id="client-preview" style="display:none"></div>
        </div>

        <!-- Multi select -->
        <div id="multi-section" style="display:none">
          <div style="font-size:11px;color:var(--text-muted);margin-bottom:6px">
            اختر العملاء (يمكن اختيار أكثر من واحد)
          </div>
          <div id="clients-checklist" style="max-height:200px;overflow-y:auto;border:1px solid var(--border);border-radius:8px;padding:8px;display:flex;flex-direction:column;gap:4px"></div>
          <div style="display:flex;gap:6px;margin-top:6px">
            <button class="btn btn-outline btn-sm" onclick="selectAll()"><i class="fas fa-check-double"></i> تحديد الكل</button>
            <button class="btn btn-outline btn-sm" onclick="clearAll()"><i class="fas fa-times"></i> إلغاء الكل</button>
          </div>
          <div style="font-size:11px;color:var(--teal-dark);margin-top:4px" id="selected-count">0 عميل محدد</div>
        </div>

        <!-- Manual -->
        <div id="manual-section" style="display:none">
          <div class="field">
            <label>أرقام الهاتف (سطر لكل رقم)</label>
            <textarea id="manual-phones" rows="4" placeholder="+96891234567&#10;+96891234568&#10;+96891234569" dir="ltr" style="font-family:monospace;font-size:12px"></textarea>
          </div>
        </div>

        <!-- Message Templates -->
        <div>
          <div style="font-size:11px;color:var(--text-muted);margin-bottom:6px;font-weight:600">قوالب الرسائل الجاهزة</div>
          <div style="display:flex;flex-wrap:wrap;gap:4px" id="templates-bar">
            <button class="filter-btn" onclick="useTemplate('welcome')">ترحيب</button>
            <button class="filter-btn" onclick="useTemplate('offer')">عرض خاص</button>
            <button class="filter-btn" onclick="useTemplate('eid')">عيد مبارك</button>
            <button class="filter-btn" onclick="useTemplate('reminder')">تذكير</button>
            <button class="filter-btn" onclick="useTemplate('confirm')">تأكيد حجز</button>
            <button class="filter-btn" onclick="useTemplate('followup')">متابعة</button>
          </div>
        </div>

        <div class="field">
          <label>نص الرسالة *</label>
          <textarea id="wa-message" rows="6" placeholder="اكتب رسالتك هنا... يمكنك استخدام {name} لإضافة اسم العميل تلقائياً"
            style="font-size:13px;line-height:1.7"></textarea>
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center">
          <span id="char-count" style="font-size:11px;color:var(--text-muted)">0 حرف</span>
          <span style="font-size:11px;color:var(--text-muted)">يمكن استخدام {name} لاسم العميل</span>
        </div>

        <button class="btn" onclick="sendMessages()" 
          style="background:linear-gradient(135deg,#128C7E,#25D366);color:#fff;padding:12px;font-size:14px;font-weight:600;border-radius:10px">
          <i class="fab fa-whatsapp" style="font-size:16px"></i> إرسال عبر واتساب
        </button>

        <div style="background:#E1F5EE;border-radius:8px;padding:10px 12px;font-size:11px;color:#085041;border-right:3px solid #25D366">
          <i class="fas fa-info-circle" style="margin-left:4px"></i>
          سيتم فتح واتساب ويب لكل رقم مع الرسالة. إذا كان لديك واتساب بيزنس يمكنك الإرسال المباشر.
        </div>
      </div>
    </div>

    <!-- LEFT: History + Stats -->
    <div style="display:flex;flex-direction:column;gap:1rem">
      <!-- Stats -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
        <div class="kpi-card">
          <div class="kpi-icon" style="background:#DCF8C6;color:#128C7E"><i class="fab fa-whatsapp"></i></div>
          <div class="kpi-info"><div class="kpi-label">رسائل أرسلت</div><div class="kpi-value" id="wa-sent-count" style="color:#128C7E">0</div></div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon" style="background:#E5F3F5;color:var(--teal-dark)"><i class="fas fa-users"></i></div>
          <div class="kpi-info"><div class="kpi-label">عملاء متاحون</div><div class="kpi-value" id="wa-clients-count">0</div></div>
        </div>
      </div>

      <!-- Send History -->
      <div class="card">
        <div class="card-header">
          <i class="fas fa-history" style="color:var(--text-muted)"></i>
          <span class="card-header-title">سجل الإرسال</span>
          <button class="btn btn-outline btn-sm" onclick="clearHistory()" style="margin-right:auto">
            <i class="fas fa-trash"></i> مسح
          </button>
        </div>
        <div class="card-body" style="padding:0;max-height:400px;overflow-y:auto">
          <div id="wa-history">
            <div style="text-align:center;padding:24px;color:var(--text-muted);font-size:12px">
              <i class="fab fa-whatsapp" style="font-size:24px;display:block;margin-bottom:8px;opacity:.25;color:#25D366"></i>
              لم يتم إرسال أي رسائل بعد
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Message -->
      <div class="card">
        <div class="card-header">
          <i class="fas fa-bolt" style="color:var(--gold)"></i>
          <span class="card-header-title">إرسال سريع لعميل</span>
        </div>
        <div class="card-body" style="display:flex;gap:8px;align-items:flex-end">
          <div class="field" style="flex:1;margin:0">
            <label>رقم الهاتف</label>
            <input id="quick-phone" placeholder="+96891234567" dir="ltr">
          </div>
          <button class="btn" onclick="quickSend()" 
            style="background:#25D366;color:#fff;white-space:nowrap;flex-shrink:0">
            <i class="fab fa-whatsapp"></i> إرسال
          </button>
        </div>
      </div>
    </div>
  </div>

  <script>
  let waMode = 'single';
  let waHistory = JSON.parse(localStorage.getItem('heg_wa_history')||'[]');
  let clients = JSON.parse(localStorage.getItem('heg_clients')||'[]');

  const templates = {
    welcome: 'مرحباً {name}' + String.fromCharCode(10) + 'نتشرف بخدمتكم في HEG للسياحة' + String.fromCharCode(10) + 'نقدم أفضل الباقات السياحية بأسعار مميزة.' + String.fromCharCode(10) + 'هل تودون الاستفسار عن رحلتكم القادمة؟ نحن في خدمتكم!',
    offer: 'عرض خاص لعميلنا الكريم {name}' + String.fromCharCode(10) + 'باقات صيفية حصرية - أسعار لا تقاوم - تأمين سفر شامل' + String.fromCharCode(10) + 'تواصل معنا الآن لحجز مكانك!',
    eid: 'عيد مبارك وكل عام وأنتم بخير {name}' + String.fromCharCode(10) + 'بمناسبة العيد المبارك، نقدم لكم عروضاً استثنائية على رحلات العيد.' + String.fromCharCode(10) + 'تمنياتنا لكم بعيد سعيد وإجازة مميزة! — فريق HEG للسياحة',
    reminder: 'تذكير ودي لعميلنا {name}' + String.fromCharCode(10) + 'نذكركم بموعد رحلتكم القادمة مع HEG.' + String.fromCharCode(10) + 'للاستفسار عن التفاصيل أو أي تعديلات، تواصلوا معنا على الفور.' + String.fromCharCode(10) + 'نتمنى لكم رحلة ممتعة!',
    confirm: 'تأكيد الحجز' + String.fromCharCode(10) + 'عزيزنا {name}، تم تأكيد حجزكم بنجاح.' + String.fromCharCode(10) + 'سيتم إرسال تفاصيل الرحلة كاملة قريباً.' + String.fromCharCode(10) + 'شكراً لثقتكم بـ HEG للسياحة',
    followup: 'أهلاً {name}' + String.fromCharCode(10) + 'نأمل أنكم بخير وأن رحلتكم كانت ممتعة!' + String.fromCharCode(10) + 'يسعدنا معرفة رأيكم في الخدمة، وهل أعجبتكم تجربة السفر معنا؟' + String.fromCharCode(10) + 'آراؤكم تهمنا — HEG للسياحة'
  };

  function useTemplate(t){
    document.getElementById('wa-message').value = templates[t]||'';
    updateCharCount();
  }

  document.getElementById('wa-message').addEventListener('input', updateCharCount);
  function updateCharCount(){
    const len = document.getElementById('wa-message').value.length;
    document.getElementById('char-count').textContent = len + ' حرف';
  }

  function setMode(m){
    waMode = m;
    ['single','multi','manual'].forEach(x=>{
      document.getElementById('mode-'+x).className = 'filter-btn' + (x===m?' on':'');
      document.getElementById(x+'-section').style.display = x===m?'block':'none';
    });
  }

  function loadClientsList(){
    const sel = document.getElementById('wa-client-sel');
    sel.innerHTML = '<option value="">— اختر عميلاً —</option>' +
      clients.map(c=>\`<option value="\${c.cid}">\${c.name} (\${c.phone})</option>\`).join('');
    sel.onchange = function(){
      const c = clients.find(x=>x.cid==this.value);
      const prev = document.getElementById('client-preview');
      if(c){
        prev.style.display='block';
        prev.innerHTML=\`<i class="fas fa-user" style="margin-left:4px;color:var(--teal-mid)"></i><b>\${c.name}</b> — \${c.phone}\${c.nat?' — '+c.nat:''}\`;
      } else { prev.style.display='none'; }
    };
    const cl = document.getElementById('clients-checklist');
    cl.innerHTML = clients.length ? clients.map(c=>\`
      <label style="display:flex;align-items:center;gap:8px;padding:5px 8px;border-radius:6px;cursor:pointer;font-size:12px" 
        onmouseover="this.style.background='var(--bg-light)'" onmouseout="this.style.background=''">
        <input type="checkbox" class="client-chk" value="\${c.cid}" style="width:14px;height:14px" onchange="updateSelectedCount()">
        <div style="width:28px;height:28px;border-radius:50%;background:var(--teal-dark);color:#fff;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0">\${c.name.charAt(0)}</div>
        <div><div style="font-weight:600">\${c.name}</div><div style="color:var(--text-muted);font-size:10px">\${c.phone}</div></div>
      </label>\`).join('') :
      '<div style="text-align:center;padding:16px;color:var(--text-muted);font-size:12px">لا يوجد عملاء مسجلين</div>';
    document.getElementById('wa-clients-count').textContent = clients.length;
  }

  function selectAll(){ document.querySelectorAll('.client-chk').forEach(c=>c.checked=true); updateSelectedCount(); }
  function clearAll(){ document.querySelectorAll('.client-chk').forEach(c=>c.checked=false); updateSelectedCount(); }
  function updateSelectedCount(){
    const n = document.querySelectorAll('.client-chk:checked').length;
    document.getElementById('selected-count').textContent = n + ' عميل محدد';
  }

  function getPhoneAndName(){
    if(waMode==='single'){
      const cid = document.getElementById('wa-client-sel').value;
      if(!cid) return null;
      const c = clients.find(x=>x.cid==cid);
      return c ? [{phone:c.phone, name:c.name}] : null;
    }
    if(waMode==='multi'){
      const checked = document.querySelectorAll('.client-chk:checked');
      if(!checked.length) return null;
      return Array.from(checked).map(cb=>{
        const c = clients.find(x=>x.cid==cb.value);
        return c ? {phone:c.phone, name:c.name} : null;
      }).filter(Boolean);
    }
    if(waMode==='manual'){
      const phones = document.getElementById('manual-phones').value.trim().split(/\\n/).map(p=>p.trim()).filter(Boolean);
      if(!phones.length) return null;
      return phones.map(p=>({phone:p, name:''}));
    }
    return null;
  }

  function sendMessages(){
    const targets = getPhoneAndName();
    if(!targets || !targets.length){ showToast('اختر عميلاً أو أدخل رقماً'); return; }
    const msgTemplate = document.getElementById('wa-message').value.trim();
    if(!msgTemplate){ showToast('اكتب نص الرسالة'); return; }
    targets.forEach((t, idx) => {
      const msg = msgTemplate.replace(/\\{name\\}/g, t.name||'');
      const phone = t.phone.replace(/[^0-9]/g,'');
      const url = 'https://wa.me/'+phone+'?text='+encodeURIComponent(msg);
      setTimeout(()=>window.open(url,'_blank'), idx * 800);
    });
    const entry = {
      id: Date.now(),
      targets: targets.map(t=>t.name||t.phone).join('، '),
      count: targets.length,
      msg: msgTemplate.substring(0,60)+'...',
      time: new Date().toLocaleString('ar-EG')
    };
    waHistory.unshift(entry);
    if(waHistory.length>50) waHistory=waHistory.slice(0,50);
    localStorage.setItem('heg_wa_history', JSON.stringify(waHistory));
    document.getElementById('wa-sent-count').textContent = waHistory.reduce((s,h)=>s+h.count, 0);
    renderHistory();
    showToast('جاري فتح واتساب لـ ' + targets.length + ' عميل...');
  }

  function quickSend(){
    const p = document.getElementById('quick-phone').value.trim();
    if(!p){ showToast('أدخل رقم الهاتف'); return; }
    const phone = p.replace(/[^0-9]/g,'');
    const msg = encodeURIComponent('مرحباً - HEG للسياحة');
    window.open('https://wa.me/'+phone+'?text='+msg,'_blank');
    showToast('جاري فتح واتساب...');
  }

  function renderHistory(){
    const h = document.getElementById('wa-history');
    if(!waHistory.length){
      h.innerHTML='<div style="text-align:center;padding:24px;color:var(--text-muted);font-size:12px"><i class="fab fa-whatsapp" style="font-size:24px;display:block;margin-bottom:8px;opacity:.25;color:#25D366"></i>لم يتم إرسال أي رسائل بعد</div>';
      return;
    }
    h.innerHTML = waHistory.map(e=>\`
      <div style="display:flex;align-items:flex-start;gap:10px;padding:10px 12px;border-bottom:1px solid var(--border-light)">
        <div style="width:32px;height:32px;border-radius:50%;background:#DCF8C6;color:#128C7E;display:flex;align-items:center;justify-content:center;flex-shrink:0">
          <i class="fab fa-whatsapp"></i>
        </div>
        <div style="flex:1;min-width:0">
          <div style="font-size:12px;font-weight:600">\${e.targets}</div>
          <div style="font-size:11px;color:var(--text-muted);margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">\${e.msg}</div>
          <div style="display:flex;justify-content:space-between;margin-top:3px">
            <span style="font-size:10px;background:#DCF8C6;color:#128C7E;padding:1px 6px;border-radius:4px">\${e.count} رسالة</span>
            <span style="font-size:10px;color:var(--text-muted)">\${e.time}</span>
          </div>
        </div>
      </div>\`).join('');
    document.getElementById('wa-sent-count').textContent = waHistory.reduce((s,h)=>s+h.count, 0);
  }

  function clearHistory(){
    if(!confirm('مسح سجل الإرسال؟')) return;
    waHistory=[];localStorage.removeItem('heg_wa_history');renderHistory();showToast('تم مسح السجل');
  }

  loadClientsList();
  renderHistory();
  </script>
  `
  return c.html(layout('واتساب', 'whatsapp', content))
})

// ======== SITE MANAGEMENT PAGE ========
app.get('/site', (c) => {
  const content = `
  <div class="page-header">
    <div class="page-header-left">
      <div class="page-header-title">إدارة الموقع والهوية البصرية</div>
      <div class="page-header-sub">تحكم كامل في مظهر ومحتوى موقع HEG</div>
    </div>
    <i class="fas fa-globe page-header-icon"></i>
  </div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.2rem">

    <!-- Logo & Identity -->
    <div class="card">
      <div class="card-header">
        <i class="fas fa-paint-brush" style="color:var(--gold)"></i>
        <span class="card-header-title">الشعار والهوية البصرية</span>
      </div>
      <div class="card-body" style="display:flex;flex-direction:column;gap:14px">
        <!-- Logo upload -->
        <div>
          <div style="font-size:11px;color:var(--text-muted);font-weight:600;margin-bottom:8px">الشعار الرسمي للشركة</div>
          <div id="logo-preview-box" style="width:100%;height:100px;border:2px dashed var(--border);border-radius:10px;display:flex;align-items:center;justify-content:center;background:var(--bg-light);cursor:pointer;transition:.2s" onclick="document.getElementById('logo-upload').click()" onmouseover="this.style.borderColor='var(--teal-mid)'" onmouseout="this.style.borderColor='var(--border)'">
            <div id="logo-inner" style="text-align:center">
              <i class="fas fa-cloud-upload-alt" style="font-size:24px;color:var(--text-muted);display:block;margin-bottom:6px"></i>
              <span style="font-size:12px;color:var(--text-muted)">اضغط لرفع الشعار</span>
            </div>
          </div>
          <input type="file" id="logo-upload" accept="image/*" style="display:none" onchange="uploadLogo(this)">
          <div style="display:flex;gap:6px;margin-top:8px">
            <button class="btn btn-outline btn-sm" onclick="document.getElementById('logo-upload').click()"><i class="fas fa-upload"></i> رفع صورة</button>
            <button class="btn btn-danger btn-sm" onclick="removeLogo()"><i class="fas fa-trash"></i> حذف الشعار</button>
          </div>
        </div>

        <!-- Company Info -->
        <div style="border-top:1px solid var(--border-light);padding-top:14px">
          <div style="font-size:11px;color:var(--text-muted);font-weight:600;margin-bottom:10px">معلومات الشركة</div>
          <div style="display:flex;flex-direction:column;gap:8px">
            <div class="field"><label>اسم الشركة</label><input id="site-name" value="HEG Holiday Travel Services"></div>
            <div class="field"><label>الشعار النصي (Tagline)</label><input id="site-tagline" value="وجهتك السياحية الأولى في سلطنة عُمان"></div>
            <div class="field"><label>البريد الإلكتروني</label><input id="site-email" value="info@hegtravel.com" dir="ltr"></div>
            <div class="field"><label>رقم الهاتف</label><input id="site-phone" value="+968 XXXX XXXX" dir="ltr"></div>
            <div class="field"><label>الموقع الإلكتروني</label><input id="site-web" value="www.hegtravel.com" dir="ltr"></div>
            <div class="field"><label>العنوان</label><input id="site-address" value="مسقط، سلطنة عُمان"></div>
          </div>
        </div>

        <button class="btn btn-primary" onclick="saveSiteInfo()"><i class="fas fa-save"></i> حفظ المعلومات</button>
      </div>
    </div>

    <!-- Homepage Banners -->
    <div class="card">
      <div class="card-header">
        <i class="fas fa-images" style="color:var(--teal-mid)"></i>
        <span class="card-header-title">صور الواجهة والبانرات</span>
      </div>
      <div class="card-body" style="display:flex;flex-direction:column;gap:12px">
        <div style="font-size:11px;color:var(--text-muted)">إضافة صور للصفحة الرئيسية أو البانرات الترويجية</div>

        <!-- Upload area -->
        <div id="banner-upload-area" style="border:2px dashed var(--border);border-radius:10px;padding:20px;text-align:center;cursor:pointer;transition:.2s;background:var(--bg-light)" 
          onclick="document.getElementById('banner-upload').click()"
          onmouseover="this.style.borderColor='var(--teal-mid)'" 
          onmouseout="this.style.borderColor='var(--border)'">
          <i class="fas fa-photo-video" style="font-size:28px;color:var(--text-muted);display:block;margin-bottom:8px"></i>
          <div style="font-size:13px;font-weight:600;color:var(--text-mid)">اضغط أو اسحب الصور هنا</div>
          <div style="font-size:11px;color:var(--text-muted);margin-top:4px">JPG, PNG, WebP — حتى 5MB لكل صورة</div>
        </div>
        <input type="file" id="banner-upload" accept="image/*" multiple style="display:none" onchange="uploadBanners(this)">

        <!-- Gallery -->
        <div id="banners-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px"></div>

        <button class="btn btn-outline btn-sm" onclick="document.getElementById('banner-upload').click()" style="align-self:flex-start">
          <i class="fas fa-plus"></i> إضافة صور
        </button>
      </div>
    </div>

    <!-- Colors & Theme -->
    <div class="card">
      <div class="card-header">
        <i class="fas fa-palette" style="color:var(--teal-mid)"></i>
        <span class="card-header-title">الألوان والثيم</span>
      </div>
      <div class="card-body">
        <div style="font-size:11px;color:var(--text-muted);margin-bottom:12px">ألوان هوية HEG الرسمية</div>
        <div style="display:flex;flex-direction:column;gap:10px">
          <div style="display:flex;align-items:center;justify-content:space-between;padding:10px;background:var(--bg-light);border-radius:8px">
            <div style="display:flex;align-items:center;gap:10px">
              <div style="width:36px;height:36px;border-radius:8px;background:#1A5C6B;box-shadow:0 2px 6px rgba(0,0,0,.15)"></div>
              <div><div style="font-size:12px;font-weight:600">Primary Teal Dark</div><div style="font-size:10px;color:var(--text-muted)">#1A5C6B</div></div>
            </div>
            <input type="color" value="#1A5C6B" onchange="updateColor('--teal-dark',this.value)" style="width:36px;height:36px;border:none;cursor:pointer;border-radius:6px">
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;padding:10px;background:var(--bg-light);border-radius:8px">
            <div style="display:flex;align-items:center;gap:10px">
              <div style="width:36px;height:36px;border-radius:8px;background:#3A8C9B;box-shadow:0 2px 6px rgba(0,0,0,.15)"></div>
              <div><div style="font-size:12px;font-weight:600">Primary Teal Light</div><div style="font-size:10px;color:var(--text-muted)">#3A8C9B</div></div>
            </div>
            <input type="color" value="#3A8C9B" onchange="updateColor('--teal-mid',this.value)" style="width:36px;height:36px;border:none;cursor:pointer;border-radius:6px">
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;padding:10px;background:var(--bg-light);border-radius:8px">
            <div style="display:flex;align-items:center;gap:10px">
              <div style="width:36px;height:36px;border-radius:8px;background:#D4AB4B;box-shadow:0 2px 6px rgba(0,0,0,.15)"></div>
              <div><div style="font-size:12px;font-weight:600">Accent Gold</div><div style="font-size:10px;color:var(--text-muted)">#D4AB4B</div></div>
            </div>
            <input type="color" value="#D4AB4B" onchange="updateColor('--gold',this.value)" style="width:36px;height;36px;border:none;cursor:pointer;border-radius:6px">
          </div>
        </div>
        <button class="btn btn-outline btn-sm" onclick="resetColors()" style="margin-top:12px">
          <i class="fas fa-undo"></i> استعادة الألوان الأصلية
        </button>
      </div>
    </div>

    <!-- Social Media Links -->
    <div class="card">
      <div class="card-header">
        <i class="fas fa-share-alt" style="color:var(--teal-mid)"></i>
        <span class="card-header-title">روابط التواصل الاجتماعي</span>
      </div>
      <div class="card-body" style="display:flex;flex-direction:column;gap:10px">
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:36px;height:36px;border-radius:8px;background:#E4405F;display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;flex-shrink:0"><i class="fab fa-instagram"></i></div>
          <input id="social-ig" placeholder="https://instagram.com/hegtravel" dir="ltr" style="flex:1;padding:7px 10px;border-radius:6px;border:1px solid var(--border);font-size:12px;background:var(--bg-card);color:var(--text-dark)">
        </div>
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:36px;height:36px;border-radius:8px;background:#25D366;display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;flex-shrink:0"><i class="fab fa-whatsapp"></i></div>
          <input id="social-wa" placeholder="+968XXXXXXXX" dir="ltr" style="flex:1;padding:7px 10px;border-radius:6px;border:1px solid var(--border);font-size:12px;background:var(--bg-card);color:var(--text-dark)">
        </div>
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:36px;height:36px;border-radius:8px;background:#1877F2;display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;flex-shrink:0"><i class="fab fa-facebook"></i></div>
          <input id="social-fb" placeholder="https://facebook.com/hegtravel" dir="ltr" style="flex:1;padding:7px 10px;border-radius:6px;border:1px solid var(--border);font-size:12px;background:var(--bg-card);color:var(--text-dark)">
        </div>
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:36px;height:36px;border-radius:8px;background:#000;display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;flex-shrink:0"><i class="fab fa-tiktok"></i></div>
          <input id="social-tt" placeholder="https://tiktok.com/@hegtravel" dir="ltr" style="flex:1;padding:7px 10px;border-radius:6px;border:1px solid var(--border);font-size:12px;background:var(--bg-card);color:var(--text-dark)">
        </div>
        <button class="btn btn-primary" onclick="saveSocial()"><i class="fas fa-save"></i> حفظ الروابط</button>
      </div>
    </div>

  </div>

  <script>
  // Load saved data
  function loadSiteData(){
    const data = JSON.parse(localStorage.getItem('heg_site_data')||'{}');
    if(data.name) document.getElementById('site-name').value = data.name;
    if(data.tagline) document.getElementById('site-tagline').value = data.tagline;
    if(data.email) document.getElementById('site-email').value = data.email;
    if(data.phone) document.getElementById('site-phone').value = data.phone;
    if(data.web) document.getElementById('site-web').value = data.web;
    if(data.address) document.getElementById('site-address').value = data.address;
    const social = JSON.parse(localStorage.getItem('heg_social')||'{}');
    if(social.ig) document.getElementById('social-ig').value = social.ig;
    if(social.wa) document.getElementById('social-wa').value = social.wa;
    if(social.fb) document.getElementById('social-fb').value = social.fb;
    if(social.tt) document.getElementById('social-tt').value = social.tt;
    const logo = localStorage.getItem('heg_site_logo');
    if(logo) showLogo(logo);
    loadBanners();
  }

  function saveSiteInfo(){
    const data = {
      name: document.getElementById('site-name').value,
      tagline: document.getElementById('site-tagline').value,
      email: document.getElementById('site-email').value,
      phone: document.getElementById('site-phone').value,
      web: document.getElementById('site-web').value,
      address: document.getElementById('site-address').value
    };
    localStorage.setItem('heg_site_data', JSON.stringify(data));
    showToast('تم حفظ معلومات الشركة');
  }

  function saveSocial(){
    const social = {
      ig: document.getElementById('social-ig').value,
      wa: document.getElementById('social-wa').value,
      fb: document.getElementById('social-fb').value,
      tt: document.getElementById('social-tt').value
    };
    localStorage.setItem('heg_social', JSON.stringify(social));
    showToast('تم حفظ روابط التواصل');
  }

  function uploadLogo(input){
    if(!input.files[0]) return;
    const reader = new FileReader();
    reader.onload = function(e){
      localStorage.setItem('heg_site_logo', e.target.result);
      showLogo(e.target.result);
      showToast('تم رفع الشعار بنجاح');
    };
    reader.readAsDataURL(input.files[0]);
  }

  function showLogo(src){
    document.getElementById('logo-inner').innerHTML =
      \`<img src="\${src}" style="max-height:80px;max-width:200px;object-fit:contain">\`;
  }

  function removeLogo(){
    if(!confirm('حذف الشعار الحالي؟')) return;
    localStorage.removeItem('heg_site_logo');
    document.getElementById('logo-inner').innerHTML =
      \`<i class="fas fa-cloud-upload-alt" style="font-size:24px;color:var(--text-muted);display:block;margin-bottom:6px"></i>
       <span style="font-size:12px;color:var(--text-muted)">اضغط لرفع الشعار</span>\`;
    showToast('تم حذف الشعار');
  }

  function uploadBanners(input){
    const files = Array.from(input.files);
    let banners = JSON.parse(localStorage.getItem('heg_banners')||'[]');
    let loaded = 0;
    files.forEach(file=>{
      if(file.size > 5*1024*1024){ showToast('حجم الصورة أكبر من 5MB'); return; }
      const reader = new FileReader();
      reader.onload = function(e){
        banners.push({id:Date.now()+Math.random(),src:e.target.result,name:file.name,date:new Date().toLocaleDateString('ar-EG')});
        loaded++;
        if(loaded===files.length){
          localStorage.setItem('heg_banners', JSON.stringify(banners));
          loadBanners();
          showToast('تم رفع ' + files.length + ' صورة');
        }
      };
      reader.readAsDataURL(file);
    });
  }

  function loadBanners(){
    const banners = JSON.parse(localStorage.getItem('heg_banners')||'[]');
    const grid = document.getElementById('banners-grid');
    if(!banners.length){
      grid.innerHTML='<div style="grid-column:1/-1;text-align:center;padding:16px;color:var(--text-muted);font-size:12px"><i class="fas fa-image" style="font-size:20px;display:block;margin-bottom:6px;opacity:.3"></i>لا توجد صور بعد</div>';
      return;
    }
    grid.innerHTML = banners.map(b=>\`
      <div style="position:relative;border-radius:8px;overflow:hidden;aspect-ratio:4/3;background:#eee;border:1px solid var(--border-light)">
        <img src="\${b.src}" style="width:100%;height:100%;object-fit:cover">
        <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.6),transparent);opacity:0;transition:.2s" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0'">
          <div style="position:absolute;bottom:6px;right:6px;display:flex;gap:4px">
            <button onclick="removeBanner('\${b.id}')" style="background:rgba(163,45,45,.85);color:#fff;border:none;border-radius:5px;padding:4px 8px;cursor:pointer;font-size:10px">
              <i class="fas fa-trash"></i>
            </button>
          </div>
          <div style="position:absolute;top:6px;right:6px;background:rgba(0,0,0,.6);color:#fff;padding:2px 6px;border-radius:4px;font-size:9px">\${b.name.substring(0,12)}</div>
        </div>
      </div>\`).join('');
  }

  function removeBanner(id){
    let banners = JSON.parse(localStorage.getItem('heg_banners')||'[]');
    banners = banners.filter(b=>b.id!=id);
    localStorage.setItem('heg_banners', JSON.stringify(banners));
    loadBanners();
    showToast('\\uD83D\\uDDD1\\FE0F تم حذف الصورة');
  }

  function updateColor(varName, value){
    document.documentElement.style.setProperty(varName, value);
    const colors = JSON.parse(localStorage.getItem('heg_colors')||'{}');
    colors[varName] = value;
    localStorage.setItem('heg_colors', JSON.stringify(colors));
    showToast('\\uD83C\\uDFA8 تم تغيير اللون');
  }

  function resetColors(){
    localStorage.removeItem('heg_colors');
    location.reload();
  }

  // Apply saved colors on load
  const savedColors = JSON.parse(localStorage.getItem('heg_colors')||'{}');
  Object.entries(savedColors).forEach(([k,v])=>document.documentElement.style.setProperty(k,v));

  loadSiteData();
  </script>
  `
  return c.html(layout('إدارة الموقع', 'site', content))
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

