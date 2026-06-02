import dotenv from 'dotenv';
import mongoose from 'mongoose';
import instagramLeadAgent from './instagramLeadAgent.js';

dotenv.config();

async function main() {
  try {
    console.log('🔄 Conectando a MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rotulweb');
    console.log('✅ Conectado\n');

    // Datos de ejemplo
    const exampleLeads = [
      {
        instagramUsername: '@juan_diseño',
        followerCount: 3500,
        followingCount: 450,
        bio: 'Agencia de diseño gráfico digital',
        industry: 'diseño',
        isFollower: true,
        notes: 'Vio mis historias hace 2 días'
      },
      {
        instagramUsername: '@maria_ecommerce',
        followerCount: 2100,
        followingCount: 320,
        bio: 'Tienda online de ropa y accesorios',
        industry: 'e-commerce',
        isFollower: true,
        notes: 'Compartió mi contenido'
      },
      {
        instagramUsername: '@carlos_restaurante',
        followerCount: 1800,
        followingCount: 200,
        bio: 'Chef pasionado - Restaurante en CDMX',
        industry: 'restaurante',
        isFollower: false,
        notes: 'Potencial cliente alto'
      },
      {
        instagramUsername: '@laura_fitness',
        followerCount: 5200,
        followingCount: 600,
        bio: 'Entrenadora personal & coach fitness',
        industry: 'fitness',
        isFollower: true,
        notes: 'Muy activa'
      },
      {
        instagramUsername: '@pedro_empresa',
        followerCount: 800,
        followingCount: 150,
        bio: 'Dueño PYME - buscando crecer online',
        industry: 'negocio',
        isFollower: false,
        notes: 'Cliente potencial'
      }
    ];

    console.log('📱 Agregando leads de ejemplo...\n');

    for (const lead of exampleLeads) {
      await instagramLeadAgent.addNewLead(lead);
    }

    console.log('\n📊 Obteniendo estadísticas...\n');
    const stats = await instagramLeadAgent.getLeadStats();

    console.log('📈 ESTADÍSTICAS DEL SISTEMA:\n');
    console.log(`Total de leads: ${stats.total}`);
    console.log(`Leads convertidos: ${stats.converted}`);
    if (stats.avgLeadScore[0]) {
      console.log(`Puntuación promedio: ${stats.avgLeadScore[0].avg.toFixed(2)}`);
    }

    console.log('\n📋 Top Leads:\n');
    const topLeads = await instagramLeadAgent.getTopLeads(5);
    console.table(topLeads.map(l => ({
      Usuario: l.instagramUsername,
      Puntuación: l.leadScore,
      Seguidores: l.followerCount,
      Industria: l.industry
    })));

    console.log('\n✅ SISTEMA LISTO\n');
    console.log('Próximos pasos:');
    console.log('1. npm run instagram-lead      (Para usar el CLI interactivo)');
    console.log('2. npm run backend             (Para iniciar el servidor API)');
    console.log('3. Revisa INSTAGRAM_QUICK_START.md para más info\n');

    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
