# Schema Design — Personal Productivity Hub

> Fill in every section below. Keep answers concise.

---

## 1. Collections Overview

Briefly describe each collection (1–2 sentences each):

- The users table have id(primary key),email,name,password and the date which it is created at
- **projects** —
- **tasks** —
- **notes** —

---

## 2. Document Shapes

For each collection, write the document shape (field name + type + required/optional):

### users
```
{
  _id: ObjectId,
  email: string (required, unique),
  passwordHash: string (required),
  name: string (required),
  createdAt: Date (required)
}
```

### projects
```
{
  _id:Objectid,
  name: string(required),
  createdAt:Date(required)

}
```

### tasks
```
{
  _id:ObjectId,
  projectId:ObjectId,
  name : string(required),
  projectId:ObjectId,
  createdAt:Date(required)
}
```

### notes
```
{
  _id:ObjectId,
  name:string(required),
  content:string,
  createdAt:Date(required)
}
```

---

## 3. Embed vs Reference — Decisions

For each relationship, state whether you embedded or referenced, and **why** (one sentence):

| Relationship                       | Embed or Reference? | Why? |
|-----------------------------------|---------------------|------|
| Subtasks inside a task            |        Embed              |Subtasks are tightly related to a single task and are always accessed together.      |
| Tags on a task                    |        Embed       |Tags are simple values stored within the task and don’t need a separate collection.      |
| Project → Task ownership          |        Reference             |  A project can have many tasks, so linking by projectId avoids duplication and supports scaling.    |
| Note → optional Project link      |        Reference             |  A note may or may not belong to a project, so referencing keeps it flexible and optional.    |

---

## 4. Schema Flexibility Example

Name one field that exists on **some** documents but not **all** in the same collection. Explain why this is acceptable (or even useful) in MongoDB.

> The content field in the notes collection may exist in some documents but be empty or omitted in others. This is acceptable in MongoDB because it allows notes to be either simple titles or detailed text entries without enforcing a fixed structure for every document.
