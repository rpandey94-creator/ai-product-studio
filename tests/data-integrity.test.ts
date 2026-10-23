import { describe, expect, it } from 'vitest';
import registry from '../src/data/registry.json';
import frameworks from '../src/data/frameworks.json';
import studio from '../src/data/studio.json';
import experiences from '../src/data/experiences.json';
import report from '../evidence/evaluation-workbench-report.json';
import { portfolioProjects } from '../src/data/portfolio';
import { calculateEconomics, documentExceptions, transitionVoice } from '../src/lib/productLogic';

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

  it('publishes a curated independent portfolio with honest status labels', () => {
    expect(portfolioProjects).toHaveLength(13);
    expect(portfolioProjects.some((item) => item.title.includes('Customer 360'))).toBe(false);
    expect(portfolioProjects.filter((item) => item.flagship)).toHaveLength(4);
    expect(portfolioProjects.filter((item) => item.status === 'Locally Implemented and Tested').map((item) => item.slug)).toEqual(['ai-reliability-observability-studio']);
    expect(portfolioProjects.flatMap((item) => item.stack).filter((item) => item.status === 'Integrated and tested').map((item) => item.name)).toEqual(expect.arrayContaining(['Python', 'unittest', 'React + TypeScript']));
  });

  it('keeps visitor-facing case data free of course attribution', () => {
    expect(JSON.stringify(portfolioProjects)).not.toMatch(/Aishwarya|course|curriculum/i);
  });

  it('uses the explicit metric evidence taxonomy', () => {
    const allowed = new Set(['actually-measured','synthetic-illustrative','proposed-target','modeled-assumption','external-fact']);
    expect(portfolioProjects.flatMap((item)=>item.metrics).every((metric)=>allowed.has(metric.kind))).toBe(true);
    expect(portfolioProjects.filter((item)=>item.metrics.some((metric)=>metric.kind==='actually-measured')).map((item)=>item.slug)).toEqual(['ai-reliability-observability-studio']);
  });

  it('documents every architecture component and blueprint', () => {
    for (const project of portfolioProjects) {
      expect(project.blueprint).toMatch(/^blueprints\//);
      for (const node of project.architecture) expect(node).toMatchObject({ role: expect.any(String), technology: expect.any(String), inputs: expect.any(Array), outputs: expect.any(Array), failureModes: expect.any(Array), cost: expect.any(String), status: expect.any(String) });
    }
  });

  it('calculates product-specific economic scenarios', () => {
    expect(calculateEconomics('customer-feedback-intelligence',[500,2,800,500])).toBeCloseTo(12833.33,1);
    expect(calculateEconomics('intelligent-inventory-forecasting',[20,600,12,80])).toBe(11040);
    expect(calculateEconomics('real-time-multimodal-assistant',[1000,12,4,1500])).toBe(6500);
  });

  it('enforces voice transitions and document review gates', () => {
    expect(transitionVoice('idle','start')).toBe('listening');
    expect(transitionVoice('speaking','interrupt')).toBe('interrupted');
    expect(() => transitionVoice('idle','confirm')).toThrow(/Invalid voice transition/);
    expect(documentExceptions([{confidence:99,valid:true},{confidence:62,valid:false}],85)).toHaveLength(1);
  });
});
