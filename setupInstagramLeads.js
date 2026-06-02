import instagramLeadAgent from './instagramLeadAgent.js';
import leadStore from './services/leadStore.js';

console.log('🚀 Inicializando Instagram Lead Manager...\n');

// Datos de ejemplo
const exampleLeads = [
  {
    instagramUsername: '@juan_diseño',
    followerCount: 3500,
    followingCount: 450,
    bio: 'Agencia de diseño gráfico digital - Especialista en branding',
    industry: 'diseño',
    isFollower: true,
    notes: 'Vio mis historias hace 2 días, muy activo'
  },
  {
    instagramUsername: '@maria_ecommerce',
    followerCount: 2100,
    followingCount: 320,
    bio: 'Tienda online de ropa y accesorios - Necesita web profesional',
    industry: 'e-commerce',
    isFollower: true,
    notes: 'Compartió mi contenido, alto potencial'
  },
  {
    instagramUsername: '@carlos_restaurante',
    followerCount: 1800,
    followingCount: 200,
    bio: 'Chef pasionado - Restaurante en CDMX',
    industry: 'restaurante',
    isFollower: false,
    notes: 'Buen potencial, negocio establecido'
  },
  {
    instagramUsername: '@laura_fitness',
    followerCount: 5200,
    followingCount: 600,
    bio: 'Entrenadora personal & coach fitness online',
    industry: 'fitness',
    isFollower: true,
    notes: 'Muy activa, excelente engagement'
  },
  {
    instagramUsername: '@pedro_startup',
    followerCount: 800,
    followingCount: 150,
    bio: 'Emprendedor - Startup tech buscando crecer online',
    industry: 'negocio',
    isFollower: false,
    notes: 'Startup con presupuesto'
  },
  {
    instagramUsername: '@ana_marketing',
    followerCount: 4200,
    followingCount: 380,
    bio: 'Consultor de marketing digital - Agencia boutique',
    industry: 'marketing',
    isFollower: true,
    notes: 'Perfil profesional, muy relevante'
  },
  {
    instagramUsername: '@diego_turismo',
    followerCount: 1200,
    followingCount: 290,
    bio: 'Agencia de turismo local - Hermosa playa',
    industry: 'turismo',
    isFollower: false,
    notes: 'Negocio turístico'
  },
  {
    instagramUsername: '@sofía_belleza',
    followerCount: 6800,
    followingCount: 420,
    bio: 'Salón de belleza premium - Estética y bienestar',
    industry: 'belleza',
    isFollower: true,
    notes: 'Gran potencial, muchos seguidores'
  }
];

console.log(`📱 Agregando ${exampleLeads.length} leads de ejemplo...\n`);

for (const lead of exampleLeads) {
  try {
    instagramLeadAgent.addNewLead(lead);
  } catch (error) {
    console.error(`Error agregando ${lead.instagramUsername}:`, error.message);
  }
}

console.log('\n✅ Leads agregados exitosamente\n');

console.log('📊 ESTADÍSTICAS DEL SISTEMA:\n');
const stats = instagramLeadAgent.getLeadStats();

console.log(`Total de leads: ${stats.total}`);
console.log(`Leads convertidos: ${stats.converted}`);
console.log(`Puntuación promedio: ${stats.avgLeadScore}`);

console.log('\n📋 Top 5 Leads por puntuación:\n');
const topLeads = instagramLeadAgent.getTopLeads(5);
console.table(topLeads.map(l => ({
  Usuario: l.instagramUsername,
  Puntuación: l.leadScore,
  Seguidores: l.followerCount,
  Industria: l.industry || 'N/A',
  Estado: l.status
})));

console.log('\n✅ SISTEMA 100% LISTO\n');
console.log('════════════════════════════════════════════');
console.log('Próximos comandos:');
console.log('');
console.log('  npm run instagram-lead');
console.log('  → Para usar el CLI interactivo');
console.log('');
console.log('════════════════════════════════════════════\n');
console.log('Tu base de datos se guardó en: /data/instagram-leads.json\n');
