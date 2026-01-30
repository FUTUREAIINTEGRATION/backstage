/*
 * Copyright 2025 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ConfigReader } from '@backstage/config';
import {
  readPredicateFromConfig,
  readOptionalPredicateFromConfig,
} from './config';

describe('readPredicateFromConfig', () => {
  it('should read a predicate from config', () => {
    const config = new ConfigReader({
      predicate: { kind: 'component', 'spec.type': 'service' },
    });

    const result = readPredicateFromConfig(config, { key: 'predicate' });

    expect(result).toEqual({ kind: 'component', 'spec.type': 'service' });
  });

  it('should read a predicate from the root config', () => {
    const config = new ConfigReader({
      kind: 'component',
      'spec.type': 'service',
    });

    const result = readPredicateFromConfig(config);

    expect(result).toEqual({ kind: 'component', 'spec.type': 'service' });
  });

  it('should throw when predicate is missing', () => {
    const config = new ConfigReader({});

    expect(() => readPredicateFromConfig(config, { key: 'predicate' })).toThrow(
      /predicate/,
    );
  });

  it('should throw when predicate is invalid', () => {
    const config = new ConfigReader({
      predicate: { kind: { $invalid: 'foo' } },
    });

    expect(() => readPredicateFromConfig(config, { key: 'predicate' })).toThrow(
      /Invalid predicate in config/,
    );
  });
});

describe('readOptionalPredicateFromConfig', () => {
  it('should read a predicate from config', () => {
    const config = new ConfigReader({
      predicate: { kind: 'component' },
    });

    const result = readOptionalPredicateFromConfig(config, {
      key: 'predicate',
    });

    expect(result).toEqual({ kind: 'component' });
  });

  it('should return undefined when predicate is missing', () => {
    const config = new ConfigReader({});

    const result = readOptionalPredicateFromConfig(config, {
      key: 'predicate',
    });

    expect(result).toBeUndefined();
  });

  it('should throw when predicate is invalid', () => {
    const config = new ConfigReader({
      predicate: { kind: { $invalid: 'foo' } },
    });

    expect(() =>
      readOptionalPredicateFromConfig(config, { key: 'predicate' }),
    ).toThrow(/Invalid predicate in config/);
  });

  it('should read complex predicates', () => {
    const config = new ConfigReader({
      filter: {
        $any: [{ kind: 'component', 'spec.type': 'service' }, { kind: 'api' }],
      },
    });

    const result = readOptionalPredicateFromConfig(config, { key: 'filter' });

    expect(result).toEqual({
      $any: [{ kind: 'component', 'spec.type': 'service' }, { kind: 'api' }],
    });
  });
});
