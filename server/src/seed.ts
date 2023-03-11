require('dotenv').config();
import mongoose from 'mongoose';
import client from './model/client';
import clients from './data/clients.json';
import projects from './data/projects.json';
import project from './model/project';

async function main() {
  const URI = process.env.MONGO_URI;
  try {
    console.log('🌱 Started seeding ......');

    const conn = await mongoose.connect(URI);
    console.log('🔗 Connected: ', conn.connection.host);

    // Clear database
    await conn.connection.db.dropCollection('clients');
    await conn.connection.db.dropCollection('projects');

    const createdClients = await client.insertMany(clients);
    console.log(`${createdClients.length} clients created!`);

    const createdProjects = await project.insertMany(projects);
    console.log(`${createdProjects.length} projects created!`);

    console.log('🌱 Seed completed successfully!');

    await conn.disconnect();
  } catch (e) {
    throw new Error(e);
  }
}

main();
