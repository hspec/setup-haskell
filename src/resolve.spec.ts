import { compareVersions, resolveVersion, resolve } from '../src/resolve';

const context = describe;

const allSet = new Set([
  '7.6.1',
  '7.6.2',
  '7.6.3',
  '7.8.1',
  '7.8.2',
  '7.8.3',
  '7.8.4',
  '7.10.1',
  '7.10.2',
  '7.10.3',
  '8.0.1',
  '8.0.2',
  '8.2.1',
  '8.2.2',
  '8.4.1',
  '8.4.2',
  '8.4.3',
  '8.4.4',
]);

describe('compareVersions', () => {
  it('compares versions', () => {
    expect(compareVersions('1.0', '1.2')).toBe(-1);
  });

  it('handles multi-digit version components', () => {
    expect(compareVersions('1.2', '1.10')).toBe(-1);
  });

  it('handles versions with a different number of components', () => {
    expect(compareVersions('1.2', '1.2.3')).toBe(-1);
  });
});

describe('resolveVersion', () => {
  it('resolves versions', () => {
    expect(resolveVersion('8.4', allSet)).toBe('8.4.4');
  });

  it('resolves "latest"', () => {
    expect(resolveVersion('latest', new Set(["8.6.4", "8.8.3", "8.10.4"]))).toBe('8.10.4');
  });

  context('with a fully qualified version', () => {
    it('returns that version verbatim', () => {
      expect(resolveVersion('7.6.2', allSet)).toBe('7.6.2');
    });
  });

  context('with an unknown version', () => {
    it('returns undefined', () => {
      expect(resolveVersion('7.6.10', allSet)).toBe(undefined);
    });
  });
});

describe('resolve', () => {

  process.env['ImageOS'] = 'ubuntu20';

  it('resolves apt versions', async () => {
    expect(await resolve('7.0')).toEqual({
      version: '7.0.4',
      source: 'apt',
    });
  });

  it('resolves fully qualified apt versions', async () => {
    expect(await resolve('7.0.4')).toEqual({
      version: '7.0.4',
      source: 'apt',
    });
  });

  it('resolves ghcup versions', async () => {
    expect(await resolve('8.10')).toEqual({
      version: '8.10.7',
      source: 'ghcup',
    });
  });

  it('resolves fully qualified ghcup versions', async () => {
    expect(await resolve('8.10.6')).toEqual({
      version: '8.10.6',
      source: 'ghcup',
    });
  });

  context('with an unknown version', () => {
    it('throws an exception', async () => {
      await expect(resolve('7.0.5')).rejects.toThrow(new Error('GHC version "7.0.5" is not available.'));
    });
  });
});
