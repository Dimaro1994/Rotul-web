import React, { useState } from 'react';
import '../styles/ClientForm.css';

export default function ClientForm({ onClientCreated, onClose }) {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    projectType: 'both',
    projectDescription: '',
    targetAudience: '',
    colorPreferences: '',
    designStyle: 'professional',
    brandElements: '',
    requiredFeatures: [],
    integrations: [],
    pages: [],
    content: '',
    domain: '',
    hosting: '',
    budget: '',
    deadline: '',
    preferredContact: 'email',
    notes: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? [...(prev[name] || []), value]
          : (prev[name] || []).filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newClient = await response.json();
        alert('✅ Cliente creado exitosamente');
        onClientCreated(newClient);
        onClose();
      } else {
        alert('❌ Error al crear cliente');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <h2>Nuevo Cliente - Formulario Completo</h2>
        <form onSubmit={handleSubmit} className="client-form">
          {/* Sección 1: Información Básica */}
          <fieldset>
            <legend>📋 Información Básica</legend>
            <div className="form-group">
              <label>Nombre de Empresa *</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                placeholder="Ej: Mi Empresa S.A."
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Nombre de Contacto *</label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  required
                  placeholder="Ej: Juan Pérez"
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="correo@ejemplo.com"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Teléfono *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+34 XXX XXX XXX"
              />
            </div>
          </fieldset>

          {/* Sección 2: Tipo de Proyecto */}
          <fieldset>
            <legend>🎯 Tipo de Proyecto</legend>
            <div className="form-group">
              <label>¿Qué necesitas? *</label>
              <select name="projectType" value={formData.projectType} onChange={handleChange} required>
                <option value="website">Sitio Web</option>
                <option value="design">Diseño Gráfico</option>
                <option value="both">Ambos</option>
              </select>
            </div>

            <div className="form-group">
              <label>Descripción del Proyecto</label>
              <textarea
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleChange}
                placeholder="Cuéntanos sobre tu proyecto..."
              />
            </div>

            <div className="form-group">
              <label>Audiencia Objetivo</label>
              <input
                type="text"
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleChange}
                placeholder="Ej: Empresas B2B, consumidores finales, etc."
              />
            </div>
          </fieldset>

          {/* Sección 3: Preferencias de Diseño */}
          <fieldset>
            <legend>🎨 Preferencias de Diseño</legend>
            <div className="form-group">
              <label>Estilo de Diseño</label>
              <select name="designStyle" value={formData.designStyle} onChange={handleChange}>
                <option value="minimalist">Minimalista</option>
                <option value="professional">Profesional</option>
                <option value="creative">Creativo</option>
                <option value="corporate">Corporativo</option>
                <option value="modern">Moderno</option>
              </select>
            </div>

            <div className="form-group">
              <label>Colores Preferidos</label>
              <input
                type="text"
                name="colorPreferences"
                value={formData.colorPreferences}
                onChange={handleChange}
                placeholder="Ej: Azul, blanco, rojo"
              />
            </div>

            <div className="form-group">
              <label>Elementos de Marca</label>
              <textarea
                name="brandElements"
                value={formData.brandElements}
                onChange={handleChange}
                placeholder="Logo, tipografía, valores, identidad..."
              />
            </div>
          </fieldset>

          {/* Sección 4: Funcionalidades */}
          <fieldset>
            <legend>⚙️ Funcionalidades Requeridas</legend>
            <div className="checkbox-group">
              {[
                { value: 'ecommerce', label: 'E-commerce' },
                { value: 'blog', label: 'Blog' },
                { value: 'contactForm', label: 'Formulario de Contacto' },
                { value: 'portfolio', label: 'Portafolio' },
                { value: 'gallery', label: 'Galería de Imágenes' },
                { value: 'newsletter', label: 'Newsletter' },
                { value: 'booking', label: 'Sistema de Reservas' },
                { value: 'videoGallery', label: 'Galería de Videos' },
              ].map((feature) => (
                <label key={feature.value} className="checkbox-label">
                  <input
                    type="checkbox"
                    name="requiredFeatures"
                    value={feature.value}
                    checked={formData.requiredFeatures.includes(feature.value)}
                    onChange={handleChange}
                  />
                  {feature.label}
                </label>
              ))}
            </div>
          </fieldset>

          {/* Sección 5: Integraciones */}
          <fieldset>
            <legend>🔗 Integraciones Necesarias</legend>
            <div className="checkbox-group">
              {[
                { value: 'facebook', label: 'Facebook' },
                { value: 'instagram', label: 'Instagram' },
                { value: 'stripe', label: 'Stripe (Pagos)' },
                { value: 'whatsapp', label: 'WhatsApp' },
                { value: 'googleAnalytics', label: 'Google Analytics' },
                { value: 'gmail', label: 'Gmail' },
              ].map((integration) => (
                <label key={integration.value} className="checkbox-label">
                  <input
                    type="checkbox"
                    name="integrations"
                    value={integration.value}
                    checked={formData.integrations.includes(integration.value)}
                    onChange={handleChange}
                  />
                  {integration.label}
                </label>
              ))}
            </div>
          </fieldset>

          {/* Sección 6: Páginas */}
          <fieldset>
            <legend>📄 Páginas Necesarias</legend>
            <div className="checkbox-group">
              {[
                { value: 'home', label: 'Inicio' },
                { value: 'about', label: 'Acerca de' },
                { value: 'services', label: 'Servicios' },
                { value: 'contact', label: 'Contacto' },
                { value: 'products', label: 'Productos' },
                { value: 'testimonials', label: 'Testimonios' },
                { value: 'faq', label: 'Preguntas Frecuentes' },
                { value: 'privacy', label: 'Política de Privacidad' },
              ].map((page) => (
                <label key={page.value} className="checkbox-label">
                  <input
                    type="checkbox"
                    name="pages"
                    value={page.value}
                    checked={formData.pages.includes(page.value)}
                    onChange={handleChange}
                  />
                  {page.label}
                </label>
              ))}
            </div>
          </fieldset>

          {/* Sección 7: Contenido y Técnico */}
          <fieldset>
            <legend>📝 Contenido</legend>
            <div className="form-group">
              <label>Contenido a incluir (si tienes)</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Textos, descripciones, información del negocio..."
              />
            </div>
          </fieldset>

          {/* Sección 8: Técnico */}
          <fieldset>
            <legend>💻 Configuración Técnica</legend>
            <div className="form-row">
              <div className="form-group">
                <label>¿Tienes dominio?</label>
                <input
                  type="text"
                  name="domain"
                  value={formData.domain}
                  onChange={handleChange}
                  placeholder="midominio.com"
                />
              </div>
              <div className="form-group">
                <label>¿Tienes hosting?</label>
                <input
                  type="text"
                  name="hosting"
                  value={formData.hosting}
                  onChange={handleChange}
                  placeholder="Nombre del proveedor"
                />
              </div>
            </div>
          </fieldset>

          {/* Sección 9: Comercial */}
          <fieldset>
            <legend>💰 Información Comercial</legend>
            <div className="form-row">
              <div className="form-group">
                <label>Presupuesto (€)</label>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="0.00"
                />
              </div>
              <div className="form-group">
                <label>Fecha Límite</label>
                <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} />
              </div>
            </div>

            <div className="form-group">
              <label>Medio de Contacto Preferido</label>
              <select name="preferredContact" value={formData.preferredContact} onChange={handleChange}>
                <option value="email">Email</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="phone">Teléfono</option>
              </select>
            </div>
          </fieldset>

          {/* Sección 10: Notas */}
          <fieldset>
            <legend>📌 Notas Adicionales</legend>
            <div className="form-group">
              <label>Cualquier otra información</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Información adicional importante..."
              />
            </div>
          </fieldset>

          {/* Botones */}
          <div className="form-buttons">
            <button type="submit" disabled={loading} className="btn-submit">
              {loading ? '⏳ Guardando...' : '✅ Crear Cliente'}
            </button>
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
