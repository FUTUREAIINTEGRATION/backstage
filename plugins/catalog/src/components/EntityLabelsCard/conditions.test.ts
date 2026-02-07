/*
 * Copyright 2023 The Backstage Authors
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

import { Entity } from '@backstage/catalog-model';
import { hasLabels } from './conditions';

describe('hasLabels', () => {
  it('should return false if entity has no labels', () => {
    const entity: Entity = {
      apiVersion: 'v1',
      kind: 'Component',
      metadata: {
        name: 'test',
      },
    };
    expect(hasLabels(entity)).toBe(false);
  });

  it('should return false if entity has empty labels', () => {
    const entity: Entity = {
      apiVersion: 'v1',
      kind: 'Component',
      metadata: {
        name: 'test',
        labels: {},
      },
    };
    expect(hasLabels(entity)).toBe(false);
  });

  it('should return true if entity has labels', () => {
    const entity: Entity = {
      apiVersion: 'v1',
      kind: 'Component',
      metadata: {
        name: 'test',
        labels: {
          test: 'label',
        },
      },
    };
    expect(hasLabels(entity)).toBe(true);
  });

  it('should return false if entity has no metadata', () => {
    const entity = {
      apiVersion: 'v1',
      kind: 'Component',
    } as Entity;
    expect(hasLabels(entity)).toBe(false);
  });
});
