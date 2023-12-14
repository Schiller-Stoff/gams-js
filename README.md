
<h1>GAMS.js</h1>

## Quickstart

1. go to the snippet overview of the project (https://zimlab.uni-graz.at/gams/frontend/js-libs/gamsjs/-/snippets) + check provided functionality of gamsjs
2. Access the "qickstart snippet"

### What is this?

Repository to build / maintain a collaborative, sustainable Javascript library for Digital Humanities research in Graz Austria at the ZIM.

Two aims:
1. Directly provide functionality for necessary __imperative Javacsript__ and general __utility functions__.
2. __Maintenance-Focused__: Open Source worfklow with focus on __transparency__ and __collaboration__. Usage of basic testing technologies and Javascript features. Avoidance and Encapsulation of quickly changing Javascript dependencies.      

Acknowledgements:
(based on https://github.com/Microsoft/TypeScript-Babel-Starter#readme
AND
https://github.com/a-tarasyuk/webpack-typescript-babel)

<hr>

### How to use gams.js

- Take a look at the <a href="https://zimlab.uni-graz.at/gams/frontend/js-libs/gamsjs/-/snippets">code snippet overview on zimlab</a> 


### Contribute: How to build gams.js / Changing implementation

#### Building gams.js

First __install all required dependencies__ (as declared in package.json):

```sh
npm run i
```

Compile gams.js via:

```sh
npm run build
```

- applies following code-lifecycle goals: 
__Typecheck -> Unit- and Interagtiontests -> Compile__

- This will create a __"dist" folder__ on root with the bundled gams.js inside.

- __Compilation will only be done__ if __Typecheck- AND Test- phase succeed__.

Above command takes all files referenced in index.ts (in src folder) and bundles them. 

Type-Checking and tests will be run before before bundling process. Build will 
fail if tests or type-check fail. 
 

```sh
npm run bundle
```
NOT RECOMMENDED
...if the build failes you can also run the bundle command directly 
...therefore skip typecheck and testing --> DANGEROUS!


```sh
npm run typeTest
```
... runs __Typecheck and then Unit- and Integrationtests once__. 


```sh
npm run test
```
... runs __only Unit- and Integrationtests__ inside folder with same name.


```sh
npm run testWatch
```
... __automatically__ runs __according Unit- and Integrationstests__ when a __file was changed__. 


<br>

## How To Contribute

### Repository Dev Workflow

- __Checkout / Clone__ the __develop branch__
- Changes into the __master-branch__ must be made via __pull requests__.
- Releases / older versions will get own branches with specified version number.

<br>

### Recommended / required development setup:

- VSCode with plugins:
    1. Material Icon Theme
    2. Prettier - Code formatter
    3. TSLint 
- Node.js LTS Version 12.x (compiling + local automated testing)
    1. <a href="https://nodejs.org/en/">Node.js</a>

<br>

### Testing of GamsJS

Testing consists of two different aspects:
1. __Unit- and Integration-Testing__ via __Jest__.
2. __E2E-Testing__ via the tool __Katalon Recorder__ (The Katalon .html files are under tests/e2e )

<br>
<hr>
<br>