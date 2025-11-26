[Docs](/docs) > [Tables](/docs/components/RruDataTable)

# RruDataTable

## Example

Click "Open Sandbox" to see the example source code

<iframe src="https://codesandbox.io/embed/rrudatatable-pd93eh?autoresize=1&fontsize=14&theme=dark&view=preview"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="RruDataTable"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

## Props

### RruDataTable

| Name              | Description                                                                                                      | Required |
|-------------------|------------------------------------------------------------------------------------------------------------------| -------- |
| pageFetcher       | A function that fetches a page from where-ever your data might be, usually from an HTTP API.                     | Yes      |
| columns           | An array of column objects that determine how to render columns in the table.                                    | Yes      |
| search            | The search parameters the will be sent to the endpoint specified                                                 | No       |
| pageSize          | The page size. The default value is `10`                                                                         | No       |
| noDataLabel       | Message rendered when there is no data available                                                                 | No       |
| errorLabel        | Message rendered when there is an error                                                                          | No       |
| defaultPageNumber | Set the initial page number                                                                                      | No       |
| defaultSortKey    | Set the initial sort key                                                                                         | No       |
| defaultSortDir    | Set the initial sort direction                                                                                   | No       |
| onChange          | A callback is called on initialization as well for when one of these gets updated (pageNumber, sortKey, sortDir) | No       |
| id                | optional table id                                                                                                | No       |

### Column

| Name    | Description                                                                                                                                                                                                                                                                                                               | Required |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| label   | Table column label                                                                                                                                                                                                                                                                                                        | Yes      |
| value   | The value the should be displayed in each row. This could be either a string representing a property path in the item object or a function which takes the item object and returns a value                                                                                                                                | Yes      |
| sortKey | Property path in the item object. By default uses the path provided by `value` in case `value` was a string. If `value` is a function, then you need to provide the sorting key path, otherwise sorting will be disabled for this column. Similarly, if you want to disable sorting for a column, you can pass null here. | No       |
