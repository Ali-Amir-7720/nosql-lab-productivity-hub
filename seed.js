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
  await db.collection('users').createIndex({ email: 1 }, { unique: true });
  const hashedPassword=await bcrypt.hash('12345678',10)
  const user1 = await db.collection('users').insertOne({
  name: 'Ali',
  email: 'ali@gmail.com',
  passwordHash: hashedPassword,
  createdAt: new Date()
});

const user2 = await db.collection('users').insertOne({
  name: 'Saad',
  email: 'saad@gmail.com',
  passwordHash: hashedPassword,
  createdAt: new Date()
});
//project{
//  _id:Objectid,
// ownerid:ObjectId(UserId),
// name: string(required),
//  createdAt:Date(required)
//}
  const project1 = await db.collection('projects').insertOne({
  name: 'Cost Optimizer',
  createdAt: new Date(),
  archived:false,
  ownerId: user1.insertedId
});

const project2 = await db.collection('projects').insertOne({
  name: 'Chess game',
  createdAt: new Date(),
  archived:false,
  ownerId: user1.insertedId
});

const project3 = await db.collection('projects').insertOne({
  name: 'E-commerce Platform',
  createdAt: new Date(),
  archived:false,
  ownerId: user2.insertedId
});

const project4 = await db.collection('projects').insertOne({
  name: 'Linear regression',
  createdAt: new Date(),
  archived:true,
  ownerId: user2.insertedId
});
  //  Sample task shape:
      const task2=await db.collection('tasks').insertOne({
        ownerId: user2.insertedId,
        projectId: project2.insertedId,
        title: "Write report introduction",
        status: "todo",
        priority: 3,
        tags: ["writing", "urgent"],
        subtasks: [
          { title: "Outline sections", done: true },
          { title: "Draft", done: false }
        ],
        createdAt: new Date()
      })
  // =============================================================================
  const task1 = await db.collection('tasks').insertOne({
  ownerId: user1.insertedId,
  projectId: project1.insertedId,
  title: "Fix Bugs",
  status: "todo",
  priority: 3,
  tags: ["bugfix", "urgent"],
  subtasks: [
    { title: "Fix C++ bugs", done: false },
    { title: "Fix header issues", done: true }
  ],
  createdAt: new Date()
});

const task6 = await db.collection('tasks').insertOne({
  ownerId: user1.insertedId,
  projectId: project2.insertedId,
  title: "Finalize Design",
  status: "in-progress",
  priority: 2,
  tags: ["design"],
  subtasks: [
    { title: "Correct UI issues", done: false },
    { title: "Push to GitHub", done: true }
  ],
  createdAt: new Date()
});

const task3 = await db.collection('tasks').insertOne({
  ownerId: user2.insertedId,
  projectId: project3.insertedId,
  title: "Build API",
  status: "todo",
  priority: 4,
  tags: ["backend", "api"],
  subtasks: [
    { title: "Setup routes", done: false },
    { title: "Connect DB", done: false }
  ],
  createdAt: new Date()
});

const task4 = await db.collection('tasks').insertOne({
  ownerId: user2.insertedId,
  projectId: project4.insertedId,
  title: "Train Model",
  status: "todo",
  priority: 5,
  tags: ["ml", "ai"],
  subtasks: [
    { title: "Prepare dataset", done: true },
    { title: "Train regression model", done: false }
  ],
  createdAt: new Date()
});

const task5 = await db.collection('tasks').insertOne({
  ownerId: user1.insertedId,
  projectId: project1.insertedId,
  title: "Write Documentation",
  status: "todo",
  priority: 2,
  tags: ["docs"],
  subtasks: [
    { title: "Write intro", done: false },
    { title: "Add API docs", done: false }
  ],
  createdAt: new Date()
});
//
//notes{
//  _id:ObjectId,
//  name:string(required),
//  content:string,
//  projectId:ObjectId,
//  createdAt:Date(required)
//}
await db.collection('notes').insertMany([
  {
    name: "Meeting Notes",
    content: "Discussed project deadlines",
    projectId: project1.insertedId,
    createdAt: new Date()
  },
  {
    name: "Chess Ideas",
    content: "Add AI opponent",
    projectId: project2.insertedId,
    createdAt: new Date()
  },
  {
    name: "Random Idea",
    content: "Standalone productivity idea",
    createdAt: new Date()
  },
  {
    name: "E-commerce UI Notes",
    content: "Improve checkout flow",
    projectId: project3.insertedId,
    createdAt: new Date()
  },
  {
    name: "ML Notes",
    content: "Use normalization before training",
    projectId: project4.insertedId,
    createdAt: new Date()
  }
]);
  console.log('TODO: implement seed.js');
  process.exit(0);
})();
