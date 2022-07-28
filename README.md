# Convert-XML-to-JSON-Guide in JavaScript project

## Dependencies Installation
<ul>
  <li>Axios - <code>npm i axios</code> - making API calls</li>
  <li>Xml2js - <code>npm i xml2js</code> - XML to JSON converter</li>
  <li>Node-Gyp - <code>npm install node-gyp</code> -  Xml2js conversion to work </li>
  <li>Steam & Timers - <code>npm install --save stream timers</code> - Xml2js conversion to work</li>
</ul>

## Usage
Structure the API call as code below and assign in to empty variable
<br/>
```
<script defer>
// import the dependencies as below
import axios from 'axios';
const xml2js = require('xml2js');

let data = await axios
.get(Insert URL with XML Response here)
.then((response) => {
    return xml2js.parseStringPromise(response.data);
});
console.log(data);
<script/>
```

