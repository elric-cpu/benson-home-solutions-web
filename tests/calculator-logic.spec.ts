import { test, expect } from '@playwright/test';
import { isServiceArea } from '@/lib/calculator-data';

test.describe('Calculator Logic: isServiceArea', () => {
  test('should return true for Linn County', () => {
    expect(isServiceArea('97321', 'Linn', 'OR')).toBe(true);
  });

  test('should return true for Benton County', () => {
    expect(isServiceArea('97330', 'Benton', 'OR')).toBe(true);
  });

  test('should return true for Harney County', () => {
    expect(isServiceArea('97720', 'Harney', 'OR')).toBe(true);
  });

  test('should return true for service-specific ZIPs', () => {
    expect(isServiceArea('97386', 'Unknown', 'OR')).toBe(true);
    expect(isServiceArea('97355', 'Unknown', 'OR')).toBe(true);
  });

  test('should return false for outside Oregon', () => {
    expect(isServiceArea('97321', 'Linn', 'WA')).toBe(false);
  });

  test('should return false for unrelated ZIPs/counties', () => {
    expect(isServiceArea('97201', 'Multnomah', 'OR')).toBe(false);
  });
});
