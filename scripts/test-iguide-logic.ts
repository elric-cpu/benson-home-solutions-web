/**
 * iGUIDE Logic Verification Script
 * Validates spatial math and normalization patterns.
 * Run via: npx tsx scripts/test-iguide-logic.ts
 */

import {
  mm2ToSqft,
  calculateNetArea,
  fetchIGuideView,
} from '../src/lib/iguide/client';

async function verify() {
  console.log('🧪 Starting iGUIDE Logic Verification...\n');

  const viewId = 'test-benson-property';
  const data = await fetchIGuideView(viewId);

  console.log(`🏠 Property: ${viewId}`);
  console.log(`📐 Standard: ${data.measurement_standard}`);

  const totalGrossSqft = mm2ToSqft(data.total_interior_area);
  const totalNetMm2 = calculateNetArea(data.total_interior_area);
  const totalNetSqft = mm2ToSqft(totalNetMm2);

  console.log(`\n📊 Aggregate Spatial Data:`);
  console.log(`- Gross Area: ${totalGrossSqft} sqft`);
  console.log(`- Net Area (0.92 buffer): ${totalNetSqft} sqft`);

  if (Math.abs(totalGrossSqft - 2500) < 1) {
    console.log('✅ Gross area conversion matches benchmark (~2,500 sqft).');
  } else {
    console.log(
      `❌ Gross area conversion error: expected ~2500, got ${totalGrossSqft}`,
    );
  }

  console.log(`\n🏢 Floor Breakdown:`);
  data.floors.forEach((floor) => {
    const floorSqft = mm2ToSqft(floor.area);
    console.log(
      `- ${floor.name}: ${floorSqft} sqft (Level ${floor.level}${floor.is_below_grade ? ', Below Grade' : ''})`,
    );

    floor.rooms.forEach((room) => {
      const roomSqft = mm2ToSqft(room.area);
      console.log(`  └─ 🛋️ ${room.name}: ${roomSqft} sqft (${room.type})`);
    });
  });

  console.log('\n🎯 Verification complete.');
}

verify().catch((err) => {
  console.error('❌ Verification failed:', err);
  process.exit(1);
});
