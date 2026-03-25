import postgres from "postgres";
import dotenv from "dotenv";
import path from "path";

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), ".env") });
dotenv.config({ path: path.join(process.cwd(), ".env.local"), override: true });

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const CATALOG_DB_ID = "1048cf72-6121-4737-8573-79c0a8673691";
const DATABASE_URL = process.env.DATABASE_URL;

const sql = postgres(DATABASE_URL!, { ssl: "require" });

function getRichText(prop: any): string | null {
  if (!prop) return null;
  if (prop.type === 'rich_text' && Array.isArray(prop.rich_text)) {
    return prop.rich_text.map((t: any) => t.plain_text).join("") || null;
  }
  if (prop.type === 'title' && Array.isArray(prop.title)) {
    return prop.title.map((t: any) => t.plain_text).join("") || null;
  }
  return null;
}

function getNumber(prop: any): number | null {
  if (!prop) return null;
  if (prop.type === 'number') return typeof prop.number === 'number' ? prop.number : null;
  if (prop.type === 'formula') {
     return prop.formula.type === 'number' ? prop.formula.number : null;
  }
  return null;
}

async function syncCatalog() {
  try {
    console.log("Starting Notion -> Postgres Catalog Sync using FETCH...");
    let hasMore = true;
    let cursor: string | undefined = undefined;
    let totalSynced = 0;

    while (hasMore) {
      const response = await fetch(`https://api.notion.com/v1/databases/${CATALOG_DB_ID}/query`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${NOTION_API_KEY}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          start_cursor: cursor,
          page_size: 100,
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Notion API error: ${response.status} ${errorText}`);
      }

      const data: any = await response.json();
      console.log(`Processing batch: ${data.results.length} items.`);

      for (const p of data.results) {
        const props = p.properties;
        
        const name = getRichText(props.Name) || "Untitled";
        const onebuildId = getRichText(props["1build ID"]);
        const description = getRichText(props.Description);
        const cat1 = getRichText(props["Category 1"]);
        const cat2 = getRichText(props["Category 2"]);
        const cat3 = getRichText(props["Category 3"]);
        const unitRate = getNumber(props["Unit Rate"]);
        const materialRate = getNumber(props["Material Rate"]);
        const laborRate = getNumber(props["Labor Rate"]);
        const productionRate = getNumber(props["Production Rate"]);
        const uom = getRichText(props.UOM);
        const county = props.County?.select?.name || null;

        await sql`
          INSERT INTO catalog_items (
            notion_id, onebuild_id, name, description, 
            category_1, category_2, category_3, 
            unit_rate, material_rate, labor_rate, production_rate, 
            uom, county, last_synced_at
          ) VALUES (
            ${p.id}, ${onebuildId}, ${name}, ${description},
            ${cat1}, ${cat2}, ${cat3},
            ${unitRate}, ${materialRate}, ${laborRate}, ${productionRate},
            ${uom}, ${county}, NOW()
          )
          ON CONFLICT (notion_id) DO UPDATE SET
            onebuild_id = EXCLUDED.onebuild_id,
            name = EXCLUDED.name,
            description = EXCLUDED.description,
            category_1 = EXCLUDED.category_1,
            category_2 = EXCLUDED.category_2,
            category_3 = EXCLUDED.category_3,
            unit_rate = EXCLUDED.unit_rate,
            material_rate = EXCLUDED.material_rate,
            labor_rate = EXCLUDED.labor_rate,
            production_rate = EXCLUDED.production_rate,
            uom = EXCLUDED.uom,
            county = EXCLUDED.county,
            last_synced_at = NOW()
        `;
        totalSynced++;
      }

      hasMore = data.has_more;
      cursor = data.next_cursor || undefined;
      console.log(`Synced ${totalSynced} items...`);
      if (totalSynced >= 5000) break; // Safety limit
    }

    console.log(`
Sync complete! Total items synced: ${totalSynced}`);
    process.exit(0);
  } catch (error: any) {
    console.error("Sync failed:", error.message);
    process.exit(1);
  }
}

syncCatalog();
