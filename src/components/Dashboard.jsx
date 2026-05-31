import React, { useState, useEffect } from 'react';
import ClientForm from './ClientForm';
import '../styles/Dashboard.css';

export default function Dashboard() {
  const [clients, setClients] = useState([]);
  const [stats, setStats] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchClients();
    fetchStats();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/clients');
      if (response.ok) {
        const data = await response.json();
        setClients(data);
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/dashboard/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleClientCreated = (newClient) => {
    setClients([newClient, ...clients]);
    fetchStats();
  };

  const handleUpdateStatus = async (clientId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/clients/${clientId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectStatus: newStatus }),
      });

      if (response.ok) {
        const updated = await response.json();
        setClients(clients.map((c) => (c._id === clientId ? updated : c)));
        fetchStats();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async (clientId) => {
    if (confirm('¿Eliminar este cliente?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/clients/${clientId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setClients(clients.filter((c) => c._id !== clientId));
          fetchStats();
        }
      } catch (error) {
        console.error('Error deleting client:', error);
      }
    }
  };

  const filteredClients = filter === 'all' ? clients : clients.filter((c) => c.projectStatus === filter);

  const getStatusColor = (status) => {
    const colors = {
      new: '#ff9800',
      'in-progress': '#2196F3',
      review: '#9C27B0',
      completed: '#4CAF50',
    };
    return colors[status] || '#999';
  };

  const getProgressColor = (progress) => {
    if (progress < 33) return '#ff5722';
    if (progress < 66) return '#ff9800';
    return '#4CAF50';
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>📊 Gestión de Clientes - Rotulweb</h1>
        <button onClick={() => setShowForm(true)} className="btn-new-client">
          ➕ Nuevo Cliente
        </button>
      </header>

      {/* Estadísticas */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>{stats.totalClients || 0}</h3>
          <p>Total Clientes</p>
        </div>
        <div className="stat-card">
          <h3>{stats.clientsInProgress || 0}</h3>
          <p>En Proceso</p>
        </div>
        <div className="stat-card">
          <h3>{stats.clientsCompleted || 0}</h3>
          <p>Completados</p>
        </div>
        <div className="stat-card">
          <h3>€{(stats.totalBudget || 0).toLocaleString()}</h3>
          <p>Presupuesto Total</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="filters">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Todos ({clients.length})
        </button>
        <button
          className={`filter-btn ${filter === 'new' ? 'active' : ''}`}
          onClick={() => setFilter('new')}
        >
          Nuevos
        </button>
        <button
          className={`filter-btn ${filter === 'in-progress' ? 'active' : ''}`}
          onClick={() => setFilter('in-progress')}
        >
          En Proceso
        </button>
        <button
          className={`filter-btn ${filter === 'review' ? 'active' : ''}`}
          onClick={() => setFilter('review')}
        >
          En Revisión
        </button>
        <button
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completados
        </button>
      </div>

      {/* Tabla de Clientes */}
      <div className="clients-container">
        {filteredClients.length === 0 ? (
          <div className="empty-state">
            <p>📭 No hay clientes en esta categoría</p>
          </div>
        ) : (
          <div className="clients-grid">
            {filteredClients.map((client) => (
              <div key={client._id} className="client-card">
                <div className="card-header">
                  <h3>{client.companyName}</h3>
                  <span className="status-badge" style={{ background: getStatusColor(client.projectStatus) }}>
                    {client.projectStatus}
                  </span>
                </div>

                <div className="card-info">
                  <p>
                    <strong>Contacto:</strong> {client.contactName}
                  </p>
                  <p>
                    <strong>Email:</strong> {client.email}
                  </p>
                  <p>
                    <strong>Teléfono:</strong> {client.phone}
                  </p>
                  <p>
                    <strong>Proyecto:</strong> {client.projectType}
                  </p>
                  <p>
                    <strong>Presupuesto:</strong> €{client.budget || 'No definido'}
                  </p>
                </div>

                {/* Barras de progreso */}
                <div className="progress-section">
                  <div className="progress-item">
                    <label>Diseño</label>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${client.designProgress}%`,
                          background: getProgressColor(client.designProgress),
                        }}
                      />
                    </div>
                    <span>{client.designProgress}%</span>
                  </div>

                  <div className="progress-item">
                    <label>Desarrollo</label>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${client.developmentProgress}%`,
                          background: getProgressColor(client.developmentProgress),
                        }}
                      />
                    </div>
                    <span>{client.developmentProgress}%</span>
                  </div>
                </div>

                {/* Estado de pago */}
                <div className="payment-status">
                  <span className={`payment-badge ${client.paymentStatus}`}>{client.paymentStatus}</span>
                </div>

                {/* Acciones */}
                <div className="card-actions">
                  <button
                    onClick={() => setSelectedClient(client)}
                    className="btn-view"
                    title="Ver detalles"
                  >
                    👁️ Ver
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(client._id, 'in-progress')}
                    className="btn-action"
                    title="Marcar en proceso"
                  >
                    ⚙️ Procesar
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(client._id, 'completed')}
                    className="btn-action"
                    title="Marcar completado"
                  >
                    ✅ Completar
                  </button>
                  <button
                    onClick={() => handleDelete(client._id)}
                    className="btn-delete"
                    title="Eliminar"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de detalles */}
      {selectedClient && (
        <ClientDetailModal client={selectedClient} onClose={() => setSelectedClient(null)} />
      )}

      {/* Formulario */}
      {showForm && <ClientForm onClientCreated={handleClientCreated} onClose={() => setShowForm(false)} />}
    </div>
  );
}

function ClientDetailModal({ client, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{client.companyName}</h2>
        <div className="modal-body">
          <div className="detail-section">
            <h4>📋 Información Básica</h4>
            <p>
              <strong>Contacto:</strong> {client.contactName}
            </p>
            <p>
              <strong>Email:</strong> {client.email}
            </p>
            <p>
              <strong>Teléfono:</strong> {client.phone}
            </p>
          </div>

          <div className="detail-section">
            <h4>🎯 Proyecto</h4>
            <p>
              <strong>Tipo:</strong> {client.projectType}
            </p>
            <p>
              <strong>Descripción:</strong> {client.projectDescription || 'No especificada'}
            </p>
            <p>
              <strong>Audiencia:</strong> {client.targetAudience || 'No especificada'}
            </p>
          </div>

          <div className="detail-section">
            <h4>🎨 Diseño</h4>
            <p>
              <strong>Estilo:</strong> {client.designStyle}
            </p>
            <p>
              <strong>Colores:</strong> {client.colorPreferences || 'No especificados'}
            </p>
            <p>
              <strong>Elementos:</strong> {client.brandElements || 'No especificados'}
            </p>
          </div>

          <div className="detail-section">
            <h4>⚙️ Funcionalidades</h4>
            <p>{client.requiredFeatures?.join(', ') || 'Ninguna'}</p>
          </div>

          <div className="detail-section">
            <h4>🔗 Integraciones</h4>
            <p>{client.integrations?.join(', ') || 'Ninguna'}</p>
          </div>

          <div className="detail-section">
            <h4>💰 Comercial</h4>
            <p>
              <strong>Presupuesto:</strong> €{client.budget || 'No definido'}
            </p>
            <p>
              <strong>Plazo:</strong> {client.deadline ? new Date(client.deadline).toLocaleDateString() : 'No definido'}
            </p>
            <p>
              <strong>Pago:</strong> {client.paymentStatus}
            </p>
          </div>

          {client.notes && (
            <div className="detail-section">
              <h4>📌 Notas</h4>
              <p>{client.notes}</p>
            </div>
          )}
        </div>

        <button onClick={onClose} className="btn-close-modal">
          Cerrar
        </button>
      </div>
    </div>
  );
}
