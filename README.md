
# Side Select

`Side select` is simple pure javascript selector script.

```html
<script type="module">
    import NiceSelect from '../src/Select.js'
    document.addEventListener("DOMContentLoaded", function (e) {
      var options = { 
        searchable: true,
        height: 150,
        data: [
          {label: "First item", value: 1},
          {label: "Second item", value: 2},
          {label: "Third item", value: 3},
          {label: "Forth item", value: 4},
          {label: "Second item", value: 5},
          {label: "Third item", value: 6},
          {label: "Last item", value: 7},
        ]
      };
      new NiceSelect(document.getElementById("selector"), options);
    });
  </script>
```  