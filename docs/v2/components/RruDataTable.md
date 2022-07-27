[Docs](/) > [V2](/docs/v2/get-started) > [Tables](/docs/v2/components/RruDataTable)

# RruDataTable

## Props

### RruDataTable

| Name              | Description                                                                                  | Required |
| ----------------- | -------------------------------------------------------------------------------------------- | -------- |
| pageFetcher       | A function that fetches a page from where-ever your data might be, usually from an HTTP API. | Yes      |
| columns           | An array of column objects that determine how to render columns in the table.                | Yes      |
| search            | The search parameters the will be sent to the endpoint specified                             | No       |
| pageSize          | The page size. The default value is `10`                                                     | No       |
| noDataLabel       | Message rendered when there is no data available                                             | No       |
| errorLabel        | Message rendered when there is an error                                                      | No       |
| defaultPageNumber | Set the initial page number                                                                  | No       |
| defaultSortKey    | Set the initial sort key                                                                     | No       |
| defaultSortDir    | Set the initial sort direction                                                               | No       |
| onChange          | A callback for when one of these information gets updated (pageNumber, sortKey, sortDir)     | No       |

### Column

| Name    | Description                                                                                                                                                                                                                                                                                                          | Required |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| label   | Header label                                                                                                                                                                                                                                                                                                         | Yes      |
| value   | The value the should be displayed in each row. This could be either a property path in row object or a function which takes the row object and returns cell value                                                                                                                                                    | Yes      |
| sortKey | Property path in row object. By default uses the path provided by `value` in case `value` was a string. If `value` is a function, then you need to provide the sorting key path, otherwise sorting will be disabled for this column. Similarly, if you want to disable sorting for a column, you can pass null here. | No       |
