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

/**
 * A predicate that can be evaluated against a value.
 *
 * @public
 */
export type Predicate =
  | PredicateExpression
  | PredicatePrimitive
  | { $all: Predicate[] }
  | { $any: Predicate[] }
  | { $not: Predicate };

/**
 * A predicate expression that matches against object properties.
 *
 * @public
 */
export type PredicateExpression = {
  [KPath in string]: PredicateValue;
} & {
  [KPath in `$${string}`]: never;
};

/**
 * A predicate value that can be used to match against a property value.
 *
 * @public
 */
export type PredicateValue =
  | PredicatePrimitive
  | { $exists: boolean }
  | { $in: PredicatePrimitive[] }
  | { $contains: Predicate };

/**
 * A primitive value that can be used in predicates.
 *
 * @public
 */
export type PredicatePrimitive = string | number | boolean;
