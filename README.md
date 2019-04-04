fGraph  [![npm version](https://badge.fury.io/js/rescheme.svg)](http://badge.fury.io/js/rescheme)  [![Coverage Status](https://coveralls.io/repos/kolarski/rescheme/badge.svg?branch=master)](https://coveralls.io/r/kolarski/f-graph?branch=master)
=======

Functional / TypeScript implementation of Graph with 100% unit test coverage! All methods are pure and the data structures are immutable.

It has build-in functional BFS.

It uses [https://github.com/ramda/ramda](Ramda.JS)

# Install

```bash
$ npm install fgraph --save
```

# Usage with Ramda
```js
import * as R from 'ramda'
import Graph from 'fgraph'

const result = R.pipe(
    Graph.newGraph,
    Graph.addVertices([
        { name: 'New York' },
        { name: 'San Francisco' }
    ]),
    Graph.addEdges([
        {
            link: ['New York', 'San Francisco'],
            distance: 2902,
            unit: 'miles'
        }
    ]),
    Graph.BFS('New York')
)();

/**
 * returns: 
 * [
 *     { name: 'New York' },
 *     { name: 'San Francisco' }
 * ]
 */
```

# Usage without Ramda
```js
let myGraph = Graph.newGraph();

myGraph = addVertices([
    {name: 'New-York'},
    {name: 'San Francisco'}
], myGraph);

myGraph = addEdges([
    {
        link: ['New York', 'San Francisco'], 
        distance: 2902, 
        unit: 'miles'
    }
], myGraph);

const nodeList = Graph.BFS('New York', myGraph);

/**
 * nodeList: 
 * [
 *     { name: 'New York' },
 *     { name: 'San Francisco' }
 * ]
 */
```

# Methods

```js
 Graph
    ✓ newGraph
    ✓ addVertex
    ✓ addVertices
    ✓ addEdge
    ✓ addEdges
    ✓ getVertexHash
    ✓ getEdgeHash
    ✓ hasVertex
    ✓ hasEdge
    ✓ hasVertexByHash
    ✓ hasEdgeByHash
    ✓ getVertexByHash
    ✓ getEdgeByHash
    ✓ getVertices
    ✓ getEdges
    ✓ removeEdgesAssociatedWithVertexHash
    ✓ removeVertexByHash
    ✓ removeEdgeByHash
    ✓ getNeighborVerticesFromVertexHash
    ✓ getNeightborEdgesFromVertexHash
    ✓ BFS
```
# TypeScript Interfaces
````ts
interface IEdge {
    link: Array<String>
}
interface IVertex {
    name: String
}

interface IGraph {
    vertices: Array<IVertex>,
    edges: Array<IEdge>,
}
````

# Simple Documentation (will update soon)
`newGraph :: () -> IGraph`

Generates new empty graph

`getVertexHash :: IVertex -> String`

Hashing function for IVertex. Can be customized.

`getEdgeHash :: IEdge -> String`

Hashing function for IEdge. Can be customized.

`edgeHash :: () -> Array<IVertex>`

Hashing function for IVertex. Can be customized.

`getEdges :: IGraph -> Array<IEdge>`

Returns a list of all edges in a graph

`addVertex :: IVertex -> IGraph -> IGraph`

Adds Vertex to the graph

`addVertices :: Array<IVertex> -> IGraph -> IGraph`

Adds multiple Vertices to the graph

`getVertexByHash :: String -> IGraph -> IVertex`

Return Vertex by Hash

`addEdge :: IEdge -> IGraph -> IGraph`

Adds edge to the graph

`addEdges :: Array<IEdge> -> IGraph -> IGraph`

Adds multiple Edges to the graph

`getEdgeByHash :: String -> IGraph -> IEdge`

Return Edge by Hash

`hasVertexByHash :: String -> IGraph -> Boolean`

Checks if vertex's hash exists in the graph

`hasVertex :: IVertex -> IGraph -> Boolean`

Checks if vertex exists in Graph

`hasEdgeByHash :: String -> IGraph -> Boolean`

Checks if edge's hash exists in the graph


`hasEdge :: IEdge -> IGraph -> Boolean`

Checks if edge exists in the graph

`removeVertexByHash :: String -> IGraph -> IGraph`

Removes vertex and all edges associated with it

`removeEdgeByHash :: String -> IGraph -> IGraph`

Removes edge from graph

`getNeightborEdgesFromVertexHash :: String -> IGraph -> Array<IEdge>`

Get all neightboring Edges from Vertex by Vertex Hash

`getNeighborVerticesFromVertexHash :: String -> IGraph -> Array<IVertex>`

Get all neightboring Vertices From Vertex by Vertex hash

`BFS :: String -> IGraph -> Array<IVertex>`

Breadth First Search with starting node

# Contribution
All PRs and feedback is wellcome!

### Running unit tests
`npm test`

### Development
`npm run dev`

## Author
Alex Kolarski (aleks.rk@gmail.com)

## License 

(The MIT License)

Copyright (c) 2019 Alex Kolarski &lt;aleks.rk@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
