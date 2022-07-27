/*
 * Copyright 2020 Khalid H. Alharisi
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

interface TableColumn {

  /**
   * Table column label 
   */
  label: React.ReactNode;

  /**
   * The value the should be displayed in each row.
   * This could be either a string representing a property path in the item object
   * or a function which takes the item object and returns a value
   */
  value: string | ((item: any) => React.ReactNode);

  /**
   * Property path in the item object.
   * By default uses the path provided by `value` in case `value` was a string.
   * If `value` is a function, then you need to provide the sorting key path,
   * otherwise sorting will be disabled for this column.
   * Similarly, if you want to disable sorting for a column, you can pass null here.
   */
  sortKey?: string | null;

}

export default TableColumn;
