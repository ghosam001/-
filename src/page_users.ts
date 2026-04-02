// ======================================================
// USERS & PERMISSIONS PAGE
// Roles: admin / supervisor / employee
// Tracks sales per user
// ======================================================
export function usersPage(): string {
  return `
  <div class="page-header">
    <div class="page-header-left">
      <div class="page-header-title">إدارة المستخدمين والصلاحيات</div>
      <div class="page-header-sub">تحكم في الأدوار والصلاحيات وتتبع مبيعات كل موظف</div>
    </div>
    <i class="fas fa-users-cog page-header-icon"></i>
  </div>

  <!-- KPIs -->
  <div class="kpi-grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:1.2rem">
    <div class="kpi-card">
      <div class="kpi-icon" style="background:#E5F3F5;color:var(--teal-dark)"><i class="fas fa-users"></i></div>
      <div class="kpi-info"><div class="kpi-label">إجمالي المستخدمين</div><div class="kpi-value" id="u-kpi-total">0</div></div>
    </div>
    <div class="kpi-card">
      <div class="kpi-icon" style="background:#FAEEDA;color:#BA7517"><i class="fas fa-user-shield"></i></div>
      <div class="kpi-info"><div class="kpi-label">المديرون</div><div class="kpi-value" id="u-kpi-admin">0</div></div>
    </div>
    <div class="kpi-card">
      <div class="kpi-icon" style="background:#EEEDFE;color:#534AB7"><i class="fas fa-user-check"></i></div>
      <div class="kpi-info"><div class="kpi-label">المشرفون</div><div class="kpi-value" id="u-kpi-sup">0</div></div>
    </div>
    <div class="kpi-card">
      <div class="kpi-icon" style="background:#E1F5EE;color:#085041"><i class="fas fa-user-tie"></i></div>
      <div class="kpi-info"><div class="kpi-label">الموظفون</div><div class="kpi-value" id="u-kpi-emp">0</div></div>
    </div>
  </div>

  <!-- Tabs -->
  <div style="display:flex;gap:0;border-bottom:2px solid var(--border-light);margin-bottom:1.2rem">
    <button class="u-tab on" id="tab-users" onclick="switchTab('users')" style="padding:8px 20px;border:none;background:transparent;font-family:Cairo,sans-serif;font-size:13px;font-weight:600;cursor:pointer;border-bottom:3px solid var(--teal-dark);color:var(--teal-dark)">المستخدمون</button>
    <button class="u-tab" id="tab-perms" onclick="switchTab('perms')" style="padding:8px 20px;border:none;background:transparent;font-family:Cairo,sans-serif;font-size:13px;font-weight:600;cursor:pointer;border-bottom:3px solid transparent;color:var(--text-muted)">الصلاحيات</button>
    <button class="u-tab" id="tab-sales" onclick="switchTab('sales')" style="padding:8px 20px;border:none;background:transparent;font-family:Cairo,sans-serif;font-size:13px;font-weight:600;cursor:pointer;border-bottom:3px solid transparent;color:var(--text-muted)">تقرير المبيعات</button>
  </div>

  <!-- Users tab -->
  <div id="pane-users">
    <div class="action-bar">
      <div class="search-wrap" style="max-width:280px">
        <i class="fas fa-search"></i>
        <input id="u-search" placeholder="بحث في المستخدمين..." oninput="renderUsers()">
      </div>
      <select id="u-role-filter" onchange="renderUsers()" style="padding:8px 12px;border-radius:8px;border:1px solid var(--border);font-family:Cairo,sans-serif;font-size:12px">
        <option value="">جميع الأدوار</option>
        <option value="admin">مدير</option>
        <option value="supervisor">مشرف</option>
        <option value="employee">موظف</option>
      </select>
      <button class="btn btn-primary" onclick="openUserModal()"><i class="fas fa-user-plus"></i> إضافة مستخدم</button>
    </div>
    <div class="tbl-wrap">
      <table>
        <thead>
          <tr>
            <th>المستخدم</th><th>اسم المستخدم</th><th>الدور</th><th>البريد</th>
            <th>الهاتف</th><th>الحالة</th><th>المبيعات</th><th>إجراءات</th>
          </tr>
        </thead>
        <tbody id="users-tbody"></tbody>
      </table>
    </div>
  </div>

  <!-- Permissions tab -->
  <div id="pane-perms" style="display:none">
    <div class="card">
      <div class="card-header"><i class="fas fa-shield-alt" style="color:var(--teal-mid)"></i><span class="card-header-title">مصفوفة الصلاحيات</span></div>
      <div class="card-body">
        <div style="overflow-x:auto">
          <table>
            <thead>
              <tr>
                <th>الصلاحية</th>
                <th style="text-align:center;color:#BA7517"><i class="fas fa-user-shield"></i> مدير</th>
                <th style="text-align:center;color:#534AB7"><i class="fas fa-user-check"></i> مشرف</th>
                <th style="text-align:center;color:#085041"><i class="fas fa-user-tie"></i> موظف</th>
              </tr>
            </thead>
            <tbody id="perms-tbody"></tbody>
          </table>
        </div>
        <button class="btn btn-primary" style="margin-top:12px" onclick="savePerms()"><i class="fas fa-save"></i> حفظ الصلاحيات</button>
      </div>
    </div>
  </div>

  <!-- Sales report tab -->
  <div id="pane-sales" style="display:none">
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:1rem;margin-bottom:1rem" id="sales-cards"></div>
    <div class="card">
      <div class="card-header"><i class="fas fa-chart-bar" style="color:var(--teal-mid)"></i><span class="card-header-title">تفصيل مبيعات المستخدمين</span></div>
      <div class="card-body">
        <div class="tbl-wrap">
          <table>
            <thead><tr><th>الموظف</th><th>الدور</th><th>عدد الحجوزات</th><th>إجمالي المبيعات</th><th>آخر حجز</th><th>المتوسط</th></tr></thead>
            <tbody id="sales-tbody"></tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- User Modal -->
  <div class="modal-overlay" id="user-modal">
    <div class="modal" style="max-width:500px">
      <div class="modal-header">
        <div class="modal-title" id="user-modal-title">إضافة مستخدم جديد</div>
        <button class="modal-close" onclick="closeUserModal()"><i class="fas fa-times"></i></button>
      </div>
      <div class="modal-body">
        <input type="hidden" id="u-edit-id">
        <div class="form-grid" style="grid-template-columns:1fr 1fr">
          <div class="field full"><label>الاسم الكامل *</label><input id="u-name" placeholder="اسم المستخدم"></div>
          <div class="field"><label>اسم المستخدم (username) *</label><input id="u-username" placeholder="username" dir="ltr"></div>
          <div class="field"><label>كلمة المرور *</label><input id="u-password" type="password" placeholder="••••••••" dir="ltr"></div>
          <div class="field"><label>الدور *</label>
            <select id="u-role">
              <option value="admin">مدير — صلاحيات كاملة</option>
              <option value="supervisor">مشرف — إشراف وتقارير</option>
              <option value="employee">موظف — عمليات أساسية</option>
            </select>
          </div>
          <div class="field"><label>البريد الإلكتروني</label><input id="u-email" placeholder="email@example.com" dir="ltr"></div>
          <div class="field"><label>رقم الهاتف</label><input id="u-phone" placeholder="+968XXXXXXXX" dir="ltr"></div>
          <div class="field"><label>القسم</label><input id="u-dept" placeholder="مبيعات، خدمة عملاء..."></div>
          <div class="field"><label>الحالة</label>
            <select id="u-status">
              <option value="active">نشط</option>
              <option value="inactive">غير نشط</option>
            </select>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline" onclick="closeUserModal()">إلغاء</button>
        <button class="btn btn-primary" onclick="saveUser()"><i class="fas fa-save"></i> حفظ</button>
      </div>
    </div>
  </div>

  <script>
  function getSD(k,d){ try{ return JSON.parse(localStorage.getItem(k)||'null')||d; }catch(e){ return d; } }
  function setSD(k,v){ localStorage.setItem(k, JSON.stringify(v)); }

  // Default permissions matrix
  var defaultPerms = [
    {key:'view_dashboard',   label:'عرض لوحة التحكم',         admin:true,  supervisor:true,  employee:true},
    {key:'manage_clients',   label:'إدارة العملاء',            admin:true,  supervisor:true,  employee:true},
    {key:'view_clients',     label:'عرض العملاء فقط',          admin:true,  supervisor:true,  employee:true},
    {key:'manage_invoices',  label:'إنشاء وتعديل الفواتير',    admin:true,  supervisor:true,  employee:true},
    {key:'delete_invoices',  label:'حذف الفواتير',              admin:true,  supervisor:true,  employee:false},
    {key:'manage_services',  label:'إدارة الخدمات والبرامج',   admin:true,  supervisor:true,  employee:false},
    {key:'view_services',    label:'عرض الخدمات',              admin:true,  supervisor:true,  employee:true},
    {key:'create_bookings',  label:'إنشاء الحجوزات',           admin:true,  supervisor:true,  employee:true},
    {key:'manage_finance',   label:'عرض وإدارة المالية',       admin:true,  supervisor:true,  employee:false},
    {key:'view_reports',     label:'عرض التقارير',             admin:true,  supervisor:true,  employee:false},
    {key:'manage_users',     label:'إدارة المستخدمين',         admin:true,  supervisor:false, employee:false},
    {key:'site_settings',    label:'إعدادات الموقع والتصميم',  admin:true,  supervisor:false, employee:false},
    {key:'delete_data',      label:'حذف البيانات',             admin:true,  supervisor:false, employee:false},
    {key:'export_data',      label:'تصدير البيانات',           admin:true,  supervisor:true,  employee:false},
  ];

  function getPerms(){ return getSD('heg_permissions', defaultPerms); }
  function getUsers(){ return getSD('heg_users', []); }

  function seedUsers(){
    if(getUsers().length>0) return;
    setSD('heg_users', [
      {id:'u1', name:'مدير النظام', username:'admin', password:'admin123', role:'admin', email:'admin@heg.com', phone:'+968 9000 0000', dept:'الإدارة', status:'active', createdAt:'2026-01-01', sales:0, bookings:0}
    ]);
  }
  seedUsers();

  // ---- Tabs ----
  function switchTab(tab){
    ['users','perms','sales'].forEach(function(t){
      document.getElementById('pane-'+t).style.display = t===tab?'block':'none';
      var btn = document.getElementById('tab-'+t);
      btn.style.borderBottom = t===tab?'3px solid var(--teal-dark)':'3px solid transparent';
      btn.style.color = t===tab?'var(--teal-dark)':'var(--text-muted)';
    });
    if(tab==='sales') renderSales();
    if(tab==='perms') renderPerms();
  }

  // ---- Users ----
  function renderUsers(){
    var q = (document.getElementById('u-search').value||'').toLowerCase();
    var rf = document.getElementById('u-role-filter').value;
    var users = getUsers().filter(function(u){
      var match = !q || u.name.toLowerCase().includes(q) || (u.username||'').toLowerCase().includes(q);
      var rmatch = !rf || u.role===rf;
      return match && rmatch;
    });
    var roleLabel = {admin:'مدير',supervisor:'مشرف',employee:'موظف'};
    var roleColor = {admin:'#FAEEDA|#BA7517',supervisor:'#EEEDFE|#534AB7',employee:'#E1F5EE|#085041'};
    document.getElementById('u-kpi-total').textContent = getUsers().length;
    document.getElementById('u-kpi-admin').textContent = getUsers().filter(function(u){ return u.role==='admin'; }).length;
    document.getElementById('u-kpi-sup').textContent = getUsers().filter(function(u){ return u.role==='supervisor'; }).length;
    document.getElementById('u-kpi-emp').textContent = getUsers().filter(function(u){ return u.role==='employee'; }).length;

    var html = '';
    if(!users.length){ html = '<tr><td colspan="8" style="text-align:center;padding:24px;color:var(--text-muted)">لا توجد مستخدمون</td></tr>'; }
    users.forEach(function(u){
      var rc = (roleColor[u.role]||'#eee|#333').split('|');
      var bookings = getSD('heg_bookings',[]).filter(function(b){ return b.userId===u.id; }).length;
      var sales = getSD('heg_bookings',[]).filter(function(b){ return b.userId===u.id; }).reduce(function(s,b){ return s+(b.total||0); },0);
      html += '<tr>';
      html += '<td><div style="font-weight:600;font-size:13px">'+u.name+'</div><div style="font-size:10px;color:var(--text-muted)">'+u.dept+'</div></td>';
      html += '<td dir="ltr" style="font-family:monospace;font-size:12px">'+u.username+'</td>';
      html += '<td><span style="background:'+rc[0]+';color:'+rc[1]+';border-radius:5px;padding:3px 8px;font-size:11px;font-weight:600">'+roleLabel[u.role]+'</span></td>';
      html += '<td style="font-size:11px">'+u.email+'</td>';
      html += '<td dir="ltr" style="font-size:11px">'+u.phone+'</td>';
      html += '<td><span style="background:'+(u.status==='active'?'#E1F5EE':'#FCEBEB')+';color:'+(u.status==='active'?'#085041':'#791F1F')+';border-radius:4px;padding:2px 8px;font-size:10px">'+(u.status==='active'?'نشط':'غير نشط')+'</span></td>';
      html += '<td style="font-size:12px;font-weight:600;color:var(--teal-dark)">'+sales.toFixed(0)+' ر.ع</td>';
      html += '<td style="display:flex;gap:4px">';
      html += '<button data-action="edit-user" data-id="'+u.id+'" style="background:transparent;border:1px solid var(--border);border-radius:5px;padding:4px 8px;cursor:pointer;font-size:11px;color:var(--text-muted)"><i class="fas fa-edit"></i></button>';
      html += '<button data-action="toggle-user" data-id="'+u.id+'" style="background:transparent;border:1px solid '+(u.status==='active'?'#f09595':'#B7D9A0')+';border-radius:5px;padding:4px 8px;cursor:pointer;font-size:11px;color:'+(u.status==='active'?'#a32d2d':'#085041')+'">' + '<i class="fas fa-'+(u.status==='active'?'ban':'check')+'"></i></button>';
      html += '<button data-action="delete-user" data-id="'+u.id+'" style="background:transparent;border:1px solid #f09595;border-radius:5px;padding:4px 8px;cursor:pointer;font-size:11px;color:#a32d2d"><i class="fas fa-trash"></i></button>';
      html += '</td></tr>';
    });
    document.getElementById('users-tbody').innerHTML = html;
  }

  function openUserModal(){
    document.getElementById('u-edit-id').value='';
    ['u-name','u-username','u-password','u-email','u-phone','u-dept'].forEach(function(id){ document.getElementById(id).value=''; });
    document.getElementById('u-role').value='employee';
    document.getElementById('u-status').value='active';
    document.getElementById('user-modal-title').textContent='إضافة مستخدم جديد';
    document.getElementById('user-modal').classList.add('show');
  }

  function closeUserModal(){ document.getElementById('user-modal').classList.remove('show'); }

  function editUser(id){
    var u = getUsers().find(function(x){ return x.id===id; });
    if(!u) return;
    document.getElementById('u-edit-id').value=id;
    document.getElementById('u-name').value=u.name;
    document.getElementById('u-username').value=u.username;
    document.getElementById('u-password').value='';
    document.getElementById('u-email').value=u.email||'';
    document.getElementById('u-phone').value=u.phone||'';
    document.getElementById('u-dept').value=u.dept||'';
    document.getElementById('u-role').value=u.role;
    document.getElementById('u-status').value=u.status;
    document.getElementById('user-modal-title').textContent='تعديل المستخدم';
    document.getElementById('user-modal').classList.add('show');
  }

  function saveUser(){
    var name = document.getElementById('u-name').value.trim();
    var username = document.getElementById('u-username').value.trim();
    var pwd = document.getElementById('u-password').value;
    if(!name||!username){ showToast('أدخل الاسم واسم المستخدم'); return; }
    var id = document.getElementById('u-edit-id').value;
    var users = getUsers();
    var existing = users.find(function(u){ return u.username===username && u.id!==id; });
    if(existing){ showToast('اسم المستخدم موجود مسبقاً'); return; }
    var data = {
      id: id||'u'+Date.now(),
      name: name,
      username: username,
      password: pwd||(id ? (users.find(function(u){ return u.id===id; })||{}).password||'' : ''),
      role: document.getElementById('u-role').value,
      email: document.getElementById('u-email').value,
      phone: document.getElementById('u-phone').value,
      dept: document.getElementById('u-dept').value,
      status: document.getElementById('u-status').value,
      createdAt: new Date().toLocaleDateString('ar-EG')
    };
    if(id){ var idx=users.findIndex(function(u){ return u.id===id; }); if(idx>=0) users[idx]=data; }
    else users.push(data);
    setSD('heg_users', users);
    closeUserModal();
    renderUsers();
    showToast('تم حفظ المستخدم');
  }

  function toggleUserStatus(id){
    var users = getUsers();
    var u = users.find(function(x){ return x.id===id; });
    if(!u) return;
    u.status = u.status==='active'?'inactive':'active';
    var idx = users.findIndex(function(x){ return x.id===id; });
    users[idx]=u;
    setSD('heg_users', users);
    renderUsers();
    showToast('تم تغيير حالة المستخدم');
  }

  function deleteUser(id){
    var users = getUsers();
    if(users.length<=1){ showToast('لا يمكن حذف آخر مستخدم'); return; }
    if(!confirm('حذف هذا المستخدم؟')) return;
    setSD('heg_users', users.filter(function(u){ return u.id!==id; }));
    renderUsers();
    showToast('تم حذف المستخدم');
  }

  // ---- Permissions ----
  function renderPerms(){
    var perms = getPerms();
    var html = '';
    perms.forEach(function(p){
      html += '<tr>';
      html += '<td style="font-size:13px;font-weight:500">'+p.label+'</td>';
      ['admin','supervisor','employee'].forEach(function(role){
        var checked = p[role] ? 'checked' : '';
        var disabled = role==='admin' ? 'disabled' : '';
        html += '<td style="text-align:center"><input type="checkbox" '+checked+' '+disabled+' id="perm-'+p.key+'-'+role+'" style="width:16px;height:16px;cursor:pointer" '+(role==='admin'?'title="المدير دائماً لديه صلاحية كاملة"':'')+'></td>';
      });
      html += '</tr>';
    });
    document.getElementById('perms-tbody').innerHTML = html;
  }

  function savePerms(){
    var perms = getPerms();
    perms.forEach(function(p){
      ['supervisor','employee'].forEach(function(role){
        var el = document.getElementById('perm-'+p.key+'-'+role);
        if(el) p[role] = el.checked;
      });
    });
    setSD('heg_permissions', perms);
    showToast('تم حفظ الصلاحيات');
  }

  // ---- Sales ----
  function renderSales(){
    var users = getUsers();
    var bookings = getSD('heg_bookings', []);
    var html = '';
    var salesHtml = '';

    users.forEach(function(u){
      var ub = bookings.filter(function(b){ return b.userId===u.id; });
      var total = ub.reduce(function(s,b){ return s+(b.total||0); },0);
      var lastDate = ub.length ? ub[ub.length-1].date : '—';
      var avg = ub.length ? (total/ub.length).toFixed(0) : 0;
      var roleColor = {admin:'#BA7517',supervisor:'#534AB7',employee:'#085041'}[u.role]||'#333';
      var roleName = {admin:'مدير',supervisor:'مشرف',employee:'موظف'}[u.role]||'';

      html += '<div class="kpi-card" style="flex-direction:column;align-items:flex-start;gap:8px">';
      html += '<div style="display:flex;align-items:center;gap:8px;width:100%">';
      html += '<div style="width:36px;height:36px;border-radius:50%;background:'+roleColor+'22;color:'+roleColor+';display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;flex-shrink:0">'+u.name.charAt(0)+'</div>';
      html += '<div><div style="font-size:13px;font-weight:600">'+u.name+'</div><div style="font-size:10px;color:'+roleColor+'">'+roleName+'</div></div>';
      html += '</div>';
      html += '<div style="font-size:22px;font-weight:700;color:var(--teal-dark)">'+total.toFixed(0)+' <span style="font-size:12px">ر.ع</span></div>';
      html += '<div style="font-size:11px;color:var(--text-muted)">'+ub.length+' حجز</div>';
      html += '</div>';

      salesHtml += '<tr>';
      salesHtml += '<td><div style="font-weight:600">'+u.name+'</div><div style="font-size:10px;color:var(--text-muted)">@'+u.username+'</div></td>';
      salesHtml += '<td><span style="background:'+roleColor+'18;color:'+roleColor+';border-radius:4px;padding:2px 8px;font-size:11px">'+roleName+'</span></td>';
      salesHtml += '<td style="font-weight:600;text-align:center">'+ub.length+'</td>';
      salesHtml += '<td style="font-weight:700;color:var(--teal-dark)">'+total.toFixed(2)+' ر.ع</td>';
      salesHtml += '<td style="font-size:11px;color:var(--text-muted)">'+lastDate+'</td>';
      salesHtml += '<td style="font-size:12px">'+avg+' ر.ع</td>';
      salesHtml += '</tr>';
    });

    document.getElementById('sales-cards').innerHTML = html||'<div style="color:var(--text-muted);font-size:13px">لا توجد بيانات مبيعات بعد</div>';
    document.getElementById('sales-tbody').innerHTML = salesHtml||'<tr><td colspan="6" style="text-align:center;padding:20px;color:var(--text-muted)">لا توجد بيانات</td></tr>';
  }

  // ---- Event delegation for user action buttons ----
  document.addEventListener('click', function(e){
    var el = e.target;
    while(el && el !== document.body && !el.dataset.action){ el = el.parentElement; }
    if(!el || !el.dataset || !el.dataset.action) return;
    var a = el.dataset.action, id = el.dataset.id;
    if(a==='edit-user') editUser(id);
    else if(a==='toggle-user') toggleUserStatus(id);
    else if(a==='delete-user') deleteUser(id);
  });

  // ---- Wire static buttons ----
  var btnOpenUser = document.getElementById('btn-open-user-modal');
  if(btnOpenUser) btnOpenUser.addEventListener('click', openUserModal);
  var btnCloseUser = document.getElementById('btn-close-user');
  if(btnCloseUser) btnCloseUser.addEventListener('click', closeUserModal);
  var btnCancelUser = document.getElementById('btn-cancel-user');
  if(btnCancelUser) btnCancelUser.addEventListener('click', closeUserModal);
  var btnSaveUser = document.getElementById('btn-save-user');
  if(btnSaveUser) btnSaveUser.addEventListener('click', saveUser);
  var btnSavePerms = document.getElementById('btn-save-perms');
  if(btnSavePerms) btnSavePerms.addEventListener('click', savePerms);

  // ---- Tab buttons ----
  document.querySelectorAll('.u-tab').forEach(function(btn){
    btn.addEventListener('click', function(){ switchTab(this.id.replace('tab-','')); });
  });

  // Init
  renderUsers();
  </script>
  `;
}
