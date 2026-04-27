// seed.js
// =============================================================================
//  Seed the database with realistic test data.
//  Run with: npm run seed
//
//  Required minimum:
//    - 2 users
//    - 4 projects (split across the users)
//    - 5 tasks (with embedded subtasks and tags arrays)
//    - 5 notes (some attached to projects, some standalone)
//
//  Use the bcrypt module to hash passwords before inserting users.
//  Use ObjectId references for relationships (projectId, ownerId).
// =============================================================================

require('dotenv').config();
const bcrypt = require('bcryptjs');
const { connect } = require('./db/connection');

(async () => {
  const db = await connect();

  // OPTIONAL: clear existing data so re-seeding is idempotent
   await db.collection('users').deleteMany({});
   await db.collection('projects').deleteMany({});
   await db.collection('tasks').deleteMany({});
   await db.collection('notes').deleteMany({});

  // =============================================================================
  //  TODO: Insert your seed data below.
  //
  const hashedPassword=await bcrypt.hash('12345678',10)
  const user1=await db.collection('users').insertone({
    name : 'Ali',
    email:'ali@gmail.com',
    password:hashedPassword
  })
  const user2=await db.collection('users').insertone({
    name : 'Saad',
    email:'saad@gmail.com',
    password:hashedPassword
  })

  const project1=await db.collection('projects')
  //  Sample task shape:
  //    {
  //      ownerId: <ObjectId>,
  //      projectId: <ObjectId>,
  //      title: "Write report introduction",
  //      status: "todo",
  //      priority: 3,
  //      tags: ["writing", "urgent"],
  //      subtasks: [
  //        { title: "Outline sections", done: true },
  //        { title: "Draft", done: false }
  //      ],
  //      createdAt: new Date()
  //    }
  // =============================================================================

  console.log('TODO: implement seed.js');
  process.exit(0);
})();
