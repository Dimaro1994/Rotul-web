(() => {
  if (window.__ROTULWEB_LEAD_WIDGET__) return;
  window.__ROTULWEB_LEAD_WIDGET__ = true;

  const API_URL = '/api/lead.php';
  const style = document.createElement('style');
  style.textContent = `
    #rw-lead-button{position:fixed;right:22px;bottom:22px;z-index:99998;border:0;border-radius:999px;padding:14px 18px;background:#0b6cff;color:#fff;font:700 15px system-ui,sans-serif;box-shadow:0 8px 30px rgba(0,0,0,.22);cursor:pointer}
    #rw-lead-panel{position:fixed;right:22px;bottom:78px;width:min(380px,calc(100vw - 28px));z-index:99999;background:#fff;border:1px solid #e7e7e7;border-radius:18px;box-shadow:0 18px 55px rgba(0,0,0,.22);overflow:hidden;font:14px system-ui,sans-serif;color:#182230}
    #rw-lead-head{background:#062a58;color:#fff;padding:18px 20px;display:flex;justify-content:space-between;align-items:center}
    #rw-lead-head strong{font-size:16px} #rw-lead-close{background:none;border:0;color:#fff;font-size:22px;cursor:pointer}
    #rw-lead-body{padding:18px 20px} #rw-lead-body p{margin:0 0 14px;line-height:1.45}
    #rw-lead-form label{display:block;font-weight:650;margin:10px 0 5px}
    #rw-lead-form input,#rw-lead-form select,#rw-lead-form textarea{width:100%;box-sizing:border-box;border:1px solid #d7dce3;border-radius:9px;padding:10px 11px;font:inherit;background:#fff}
    #rw-lead-form textarea{min-height:70px;resize:vertical}
    #rw-lead-form button[type=submit]{width:100%;margin-top:14px;border:0;border-radius:10px;padding:12px;background:#0b6cff;color:#fff;font-weight:750;cursor:pointer}
    #rw-lead-status{margin-top:12px;font-size:13px;line-height:1.4} .rw-ok{color:#16703a}.rw-err{color:#a22}
    .rw-hp{position:absolute;left:-10000px;top:auto;width:1px;height:1px;overflow:hidden}
  `;
  document.head.appendChild(style);

  const button = document.createElement('button');
  button.id = 'rw-lead-button';
  button.type = 'button';
  button.textContent = '💬 Hablar sobre mi web';

  const panel = document.createElement('section');
  panel.id = 'rw-lead-panel';
  panel.hidden = true;
  panel.innerHTML = `
    <div id="rw-lead-head"><strong>¿Hablamos de tu web?</strong><button id="rw-lead-close" type="button" aria-label="Cerrar">×</button></div>
    <div id="rw-lead-body">
      <p>Cuéntanos tu negocio y te orientamos sin compromiso.</p>
      <form id="rw-lead-form">
        <label>Nombre *</label><input name="name" required autocomplete="name" maxlength="120">
        <label>Email *</label><input name="email" type="email" required autocomplete="email" maxlength="160">
        <label>Teléfono *</label><input name="phone" type="tel" required autocomplete="tel" maxlength="50">
        <label>Tipo de negocio</label><select name="businessType"><option value="">Selecciona una opción</option><option>Restaurante</option><option>Mecánico / taller</option><option>Clínica dental</option><option>Clínica / salud</option><option>Bar / cafetería</option><option>Tienda / comercio</option><option>Profesional / servicios</option><option>Otro</option></select>
        <label>¿Tienes web actualmente?</label><select name="hasWebsite"><option value="">Selecciona</option><option>Sí</option><option>No</option></select>
        <label>¿Qué buscas?</label><textarea name="goal" maxlength="300" placeholder="Por ejemplo: conseguir más clientes, reservas, dar mejor imagen..."></textarea>
        <div class="rw-hp"><label>Website</label><input name="website" tabindex="-1" autocomplete="off"></div>
        <button type="submit">Solicitar presupuesto</button>
        <div id="rw-lead-status" aria-live="polite"></div>
      </form>
    </div>`;

  document.body.append(button, panel);
  const close = () => { panel.hidden = true; };
  button.addEventListener('click', () => { panel.hidden = !panel.hidden; });
  panel.querySelector('#rw-lead-close').addEventListener('click', close);

  panel.querySelector('#rw-lead-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const status = panel.querySelector('#rw-lead-status');
    const submit = form.querySelector('button[type="submit"]');
    const data = Object.fromEntries(new FormData(form).entries());
    data.createdAt = new Date().toISOString();
    data.source = 'rotulweb-floating-form';
    data.score = (data.hasWebsite === 'No' ? 4 : 0) + (data.businessType ? 2 : 0) + (data.email ? 1 : 0) + (data.phone ? 1 : 0) + (data.goal ? 1 : 0);
    status.textContent = 'Enviando...';
    status.className = '';
    submit.disabled = true;
    try {
      const response = await fetch(API_URL, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) throw new Error(result.error || 'No se pudo enviar');
      form.reset();
      status.textContent = '✅ Recibido. Te contactaremos lo antes posible.';
      status.className = 'rw-ok';
    } catch (error) {
      status.textContent = 'No hemos podido enviar el formulario. Escríbenos directamente por email o WhatsApp.';
      status.className = 'rw-err';
    } finally {
      submit.disabled = false;
    }
  });
})();
