import React, { useState, useEffect } from 'react';
import './EscalationDashboard.css';

export default function EscalationDashboard() {
  const businessPhone = import.meta.env.VITE_BUSINESS_PHONE || 'Configurar BUSINESS_PHONE';
  const [stats, setStats] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [escalating, setEscalating] = useState(false);

  // Cargar estadísticas
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/escalation-stats');
        const data = await response.json();
        setStats(data);

        const logsResponse = await fetch('/api/escalation-logs');
        const logsData = await logsResponse.json();
        setLogs(logsData.slice(-10).reverse());
      } catch (error) {
        console.error('Error cargando estadísticas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000); // Actualizar cada 30s
    return () => clearInterval(interval);
  }, []);

  // Escalar leads confusos
  const handleEscalate = async () => {
    setEscalating(true);
    try {
      const response = await fetch('/api/escalate-leads', { method: 'POST' });
      const data = await response.json();
      alert(`✅ ${data.message}`);

      // Recargar estadísticas
      const newStats = await fetch('/api/escalation-stats').then(r => r.json());
      setStats(newStats);
    } catch (error) {
      alert('❌ Error al escalar leads');
      console.error(error);
    } finally {
      setEscalating(false);
    }
  };

  if (loading) return <div className="dashboard-loading">⏳ Cargando datos...</div>;

  const successRate = stats?.responded && stats?.contacted
    ? Math.round((stats.responded / stats.contacted) * 100)
    : 0;

  return (
    <div className="escalation-dashboard">
      <div className="dashboard-header">
        <h1>🚀 Agente de Escalonamiento</h1>
        <p>Monitoreo de clientes confusos y contacto directo</p>
      </div>

      <div className="stats-grid">
        {/* Total Leads */}
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>Total Leads</h3>
            <p className="stat-number">{stats?.total_leads || 0}</p>
          </div>
        </div>

        {/* Contactados */}
        <div className="stat-card">
          <div className="stat-icon">📧</div>
          <div className="stat-content">
            <h3>Contactados</h3>
            <p className="stat-number">{stats?.contacted || 0}</p>
            <p className="stat-percent">
              {stats?.total_leads ? Math.round((stats.contacted / stats.total_leads) * 100) : 0}%
            </p>
          </div>
        </div>

        {/* Respondidos */}
        <div className="stat-card success">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>Respondidos</h3>
            <p className="stat-number">{stats?.responded || 0}</p>
            <p className="stat-percent">{successRate}% tasa éxito</p>
          </div>
        </div>

        {/* Confusos */}
        <div className="stat-card warning">
          <div className="stat-icon">⚠️</div>
          <div className="stat-content">
            <h3>Confusos (24h+)</h3>
            <p className="stat-number">{stats?.confused || 0}</p>
            <p className="stat-subtitle">Sin respuesta</p>
          </div>
        </div>

        {/* Escalados */}
        <div className="stat-card info">
          <div className="stat-icon">🚀</div>
          <div className="stat-content">
            <h3>Escalados</h3>
            <p className="stat-number">{stats?.escalated || 0}</p>
            <p className="stat-subtitle">Contacto directo</p>
          </div>
        </div>
      </div>

      {/* Botón de Escalonamiento */}
      <div className="action-section">
        <button
          className="escalate-btn"
          onClick={handleEscalate}
          disabled={escalating}
        >
          {escalating ? '⏳ Escalando...' : '🚀 Escalar Leads Confusos'}
        </button>
        <p className="action-description">
          Envía emails con opción de contacto directo a {stats?.confused || 0} clientes sin respuesta
        </p>
      </div>

      {/* Logs Recientes */}
      <div className="logs-section">
        <h2>📝 Actividad Reciente</h2>
        <div className="logs-container">
          {logs.length > 0 ? (
            <table className="logs-table">
              <thead>
                <tr>
                  <th>Empresa</th>
                  <th>Evento</th>
                  <th>Hora</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, index) => (
                  <tr key={index} className={`log-${log.type || 'event'}`}>
                    <td>{log.leadId}</td>
                    <td>
                      {log.type === 'email_escalation' ? '📧 Email escalado' :
                       log.event === 'client_responded' ? '✅ Cliente respondió' :
                       '📊 Evento'}
                    </td>
                    <td>{new Date(log.sentAt || log.timestamp).toLocaleTimeString('es-ES')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-logs">Sin actividad reciente</p>
          )}
        </div>
      </div>

      {/* Información */}
      <div className="info-section">
        <h2>ℹ️ Información</h2>
        <ul>
          <li>✅ Los clientes reciben email con botones de WhatsApp y Llamada</li>
          <li>⏰ Se escalan después de 24 horas sin respuesta</li>
          <li>📱 Contacto directo: {businessPhone}</li>
          <li>🔄 Las estadísticas se actualizan automáticamente cada 30 segundos</li>
        </ul>
      </div>
    </div>
  );
}
