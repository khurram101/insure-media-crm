const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname)));

// ── Database ──────────────────────────────────────────────
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS crm_store (
      key TEXT PRIMARY KEY,
      val JSONB NOT NULL DEFAULT '[]'
    )
  `);

  // Seed initial data if the DB is completely empty
  const check = await pool.query(`SELECT COUNT(*) FROM crm_store`);
  if (parseInt(check.rows[0].count) === 0) {
    const seed = {
      emp:  [{"id":"sx8tw3d9h","name":"Jerry","role":"Sales Agent","salary":50000,"commission":0},{"id":"n00t3mbcp","name":"Nayab Malik","role":"Sales Agent","salary":50000,"commission":0},{"id":"91bddwor4","name":"Shoaib Akhtar","role":"Sales Agent","salary":50000,"commission":0},{"id":"xtklmjw5f","name":"Daud Mansha","role":"Sales Agent","salary":50000,"commission":0},{"id":"vupa0hyy1","name":"Amous John","role":"Sales Agent","salary":50000,"commission":0}],
      att:  [{"id":"fc47pqocs","empId":"sx8tw3d9h","empName":"Jerry","date":"2026-03-10","status":"On time","loggedBy":"admin"},{"id":"3g7e1lss1","empId":"sx8tw3d9h","empName":"Jerry","date":"2026-03-11","status":"On time","loggedBy":"admin"},{"id":"n52bourl9","empId":"sx8tw3d9h","empName":"Jerry","date":"2026-03-12","status":"On time","loggedBy":"admin"},{"id":"c0letreu4","empId":"sx8tw3d9h","empName":"Jerry","date":"2026-03-13","status":"On time","loggedBy":"admin"},{"id":"kaikfrqao","empId":"sx8tw3d9h","empName":"Jerry","date":"2026-03-16","status":"On time","loggedBy":"admin"},{"id":"78g1h0zqm","empId":"sx8tw3d9h","empName":"Jerry","date":"2026-03-17","status":"On time","loggedBy":"admin"},{"id":"jyojceu4j","empId":"sx8tw3d9h","empName":"Jerry","date":"2026-03-18","status":"On time","loggedBy":"admin"},{"id":"r3y65bwpo","empId":"sx8tw3d9h","empName":"Jerry","date":"2026-03-19","status":"Late","loggedBy":"admin"},{"id":"p4j9rcmif","empId":"sx8tw3d9h","empName":"Jerry","date":"2026-03-20","status":"Late","loggedBy":"admin"},{"id":"si9y2xkby","empId":"n00t3mbcp","empName":"Nayab Malik","date":"2026-03-10","status":"On time","loggedBy":"admin"},{"id":"5gmmy0xdh","empId":"n00t3mbcp","empName":"Nayab Malik","date":"2026-03-11","status":"On time","loggedBy":"admin"},{"id":"x4ub0vtju","empId":"n00t3mbcp","empName":"Nayab Malik","date":"2026-03-12","status":"Late","loggedBy":"admin"},{"id":"30tlnd5b7","empId":"n00t3mbcp","empName":"Nayab Malik","date":"2026-03-13","status":"On time","loggedBy":"admin"},{"id":"0tpkgpvdi","empId":"n00t3mbcp","empName":"Nayab Malik","date":"2026-03-16","status":"On time","loggedBy":"admin"},{"id":"76b8u19jx","empId":"n00t3mbcp","empName":"Nayab Malik","date":"2026-03-17","status":"On time","loggedBy":"admin"},{"id":"cwkm63ie6","empId":"n00t3mbcp","empName":"Nayab Malik","date":"2026-03-18","status":"On time","loggedBy":"admin"},{"id":"9i8ee8oj4","empId":"n00t3mbcp","empName":"Nayab Malik","date":"2026-03-19","status":"Late","loggedBy":"admin"},{"id":"khtydknmt","empId":"n00t3mbcp","empName":"Nayab Malik","date":"2026-03-20","status":"Late","loggedBy":"admin"},{"id":"0ky4crkgd","empId":"91bddwor4","empName":"Shoaib Akhtar","date":"2026-03-10","status":"On time","loggedBy":"admin"},{"id":"r1x0d63dk","empId":"91bddwor4","empName":"Shoaib Akhtar","date":"2026-03-11","status":"On time","loggedBy":"admin"},{"id":"zuzztk82j","empId":"91bddwor4","empName":"Shoaib Akhtar","date":"2026-03-12","status":"On time","loggedBy":"admin"},{"id":"2q145b68j","empId":"91bddwor4","empName":"Shoaib Akhtar","date":"2026-03-13","status":"Absent","loggedBy":"admin"},{"id":"pmkv2phz9","empId":"91bddwor4","empName":"Shoaib Akhtar","date":"2026-03-16","status":"On time","loggedBy":"admin"},{"id":"nasnr2b03","empId":"91bddwor4","empName":"Shoaib Akhtar","date":"2026-03-17","status":"On time","loggedBy":"admin"},{"id":"9mot5j7ix","empId":"91bddwor4","empName":"Shoaib Akhtar","date":"2026-03-18","status":"Late","loggedBy":"admin"},{"id":"tef92jjti","empId":"91bddwor4","empName":"Shoaib Akhtar","date":"2026-03-19","status":"Late","loggedBy":"admin"},{"id":"dn6c2rmn0","empId":"91bddwor4","empName":"Shoaib Akhtar","date":"2026-03-20","status":"Late","loggedBy":"admin"},{"id":"dk6gfibqw","empId":"xtklmjw5f","empName":"Daud Mansha","date":"2026-03-18","status":"On time","loggedBy":"admin"},{"id":"77p4r122k","empId":"xtklmjw5f","empName":"Daud Mansha","date":"2026-03-19","status":"Late","loggedBy":"admin"},{"id":"uiw5x01fq","empId":"xtklmjw5f","empName":"Daud Mansha","date":"2026-03-20","status":"On time","loggedBy":"admin"},{"id":"q68a16n4a","empId":"vupa0hyy1","empName":"Amous John","date":"2026-03-18","status":"On time","loggedBy":"admin"},{"id":"a7vvahla6","empId":"vupa0hyy1","empName":"Amous John","date":"2026-03-19","status":"Late","loggedBy":"admin"},{"id":"bqbpr6iup","empId":"vupa0hyy1","empName":"Amous John","date":"2026-03-20","status":"Late","loggedBy":"admin"}],
      adj:  [],
      sls:  [],
      exp:  [],
      cats: [],
      jobs: [{"id":"b67wtnrfl","title":"Sales Agent"}],
      rec:  [
        {"id":"rec_rent_01",     "name":"Office Rent", "category":"Rent",      "amount":0, "dayOfMonth":5, "notes":"Monthly office rent due on the 5th"},
        {"id":"rec_electric_01", "name":"Electricity", "category":"Utilities", "amount":0, "dayOfMonth":5, "notes":"Monthly electricity bill"},
        {"id":"rec_internet_01", "name":"Internet",    "category":"Utilities", "amount":0, "dayOfMonth":5, "notes":"Monthly internet bill"}
      ]
    };
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      for (const [key, val] of Object.entries(seed)) {
        await client.query(
          'INSERT INTO crm_store (key, val) VALUES ($1, $2) ON CONFLICT (key) DO NOTHING',
          [key, JSON.stringify(val)]
        );
      }
      await client.query('COMMIT');
      console.log('Database seeded with initial data.');
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  } else {
    // Ensure recurring seeds exist (migration for existing installs)
    const recRow = await pool.query(`SELECT val FROM crm_store WHERE key = 'rec'`);
    if (recRow.rows.length > 0) {
      let rec = recRow.rows[0].val;
      const recSeeds = [
        {"id":"rec_rent_01",     "name":"Office Rent", "category":"Rent",      "amount":0, "dayOfMonth":5, "notes":"Monthly office rent due on the 5th"},
        {"id":"rec_electric_01", "name":"Electricity", "category":"Utilities", "amount":0, "dayOfMonth":5, "notes":"Monthly electricity bill"},
        {"id":"rec_internet_01", "name":"Internet",    "category":"Utilities", "amount":0, "dayOfMonth":5, "notes":"Monthly internet bill"}
      ];
      let changed = false;
      recSeeds.forEach(seed => {
        if (!rec.find(r => r.id === seed.id)) { rec.push(seed); changed = true; }
      });
      if (changed) {
        await pool.query(`UPDATE crm_store SET val = $1 WHERE key = 'rec'`, [JSON.stringify(rec)]);
      }
    }
  }
}

// ── Auth ──────────────────────────────────────────────────
const CREDS = {
  admin:   { password: 'Admin@2024',   role: 'admin' },
  manager: { password: 'Manager@2024', role: 'manager' }
};

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const cred = CREDS[username];
  if (cred && cred.password === password) {
    res.json({ ok: true, role: cred.role });
  } else {
    res.status(401).json({ ok: false, error: 'Invalid username or password.' });
  }
});

// ── Data ──────────────────────────────────────────────────
app.get('/api/data', async (req, res) => {
  try {
    const result = await pool.query(`SELECT key, val FROM crm_store`);
    const state = { E: [], A: [], J: [], S: [], X: [], C: [], P: [], R: [] };
    const keyMap = { emp:'E', att:'A', adj:'J', sls:'S', exp:'X', cats:'C', jobs:'P', rec:'R' };
    result.rows.forEach(row => {
      if (keyMap[row.key]) state[keyMap[row.key]] = row.val;
    });
    res.json(state);
  } catch (e) {
    console.error('GET /api/data error:', e);
    res.status(500).json({ error: e.message });
  }
});

app.put('/api/data', async (req, res) => {
  const { E, A, J, S, X, C, P, R } = req.body;
  const entries = [
    ['emp', E], ['att', A], ['adj', J], ['sls', S],
    ['exp', X], ['cats', C], ['jobs', P], ['rec', R]
  ];
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (const [key, val] of entries) {
      await client.query(
        `INSERT INTO crm_store (key, val) VALUES ($1, $2)
         ON CONFLICT (key) DO UPDATE SET val = EXCLUDED.val`,
        [key, JSON.stringify(val)]
      );
    }
    await client.query('COMMIT');
    res.json({ ok: true });
  } catch (e) {
    await client.query('ROLLBACK');
    console.error('PUT /api/data error:', e);
    res.status(500).json({ error: e.message });
  } finally {
    client.release();
  }
});

// ── Start ─────────────────────────────────────────────────
initDb()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  });
