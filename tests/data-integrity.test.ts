import { describe, expect, it } from 'vitest';
import registry from '../src/data/registry.json';
import frameworks from '../src/data/frameworks.json';
import studio from '../src/data/studio.json';
import experiences from '../src/data/experiences.json';
import report from '../evidence/evaluation-workbench-report.json';

describe('migration preservation gates', () => {
  it('preserves the open-ended research catalog and framework atlas', () => {
    expect(registry.catalog).toHaveLength(64);
    expect(frameworks).toHaveLength(63);
    expect(registry.catalog.filter((item) => item.status === 'Locally Runnable Real System')).toHaveLength(1);
    expect(registry.catalog.find((item) => item.id === 'eval-workbench')?.status).toBe('Locally Runnable Real System');
  });

  it('preserves eight active browser simulations while retiring Customer 360', () => {
    const active = studio.products.filter((product) => product.slug !== 'customer-360-copilot');
    expect(active).toHaveLength(8);
    expect(Object.keys(experiences.caseStudies)).toEqual(expect.arrayContaining(active.map((product) => product.slug)));
  });

  it('preserves the executable evaluation evidence', () => {
    expect(report.summary).toMatchObject({ total: 8, passed: 5, failed: 3, pass_rate: 0.625, average_score: 0.75 });
    expect(report.disclosure).toContain('Synthetic');
  });

  it('does not mark planned framework work as executed', () => {
    const executed = frameworks.filter((item) => item.implemented.startsWith('Executed'));
    expect(executed.map((item) => item.name)).toEqual(['Python unittest']);
  });
});
