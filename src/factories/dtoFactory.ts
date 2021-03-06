/*
 * Copyright 2021 Byndyusoft
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

import { deepmergeCustom } from "deepmerge-ts";

import { IBuilder } from "~/src/builders";

import { TDeepPartial } from "./deepPartialType";

export class DtoFactory<T> {
  private readonly __deepmerge = deepmergeCustom({
    mergeArrays: false,
  });

  public constructor(private readonly __builder: IBuilder<T>) {}

  public build(override?: TDeepPartial<T>): T {
    const result = this.__builder.build();

    if (!override) {
      return result;
    }

    return this.__deepmerge(result, override) as T;
  }

  public buildList(count: number, override?: TDeepPartial<T>): T[] {
    return Array.from({ length: count }).map(() => this.build(override));
  }
}
