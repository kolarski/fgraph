import Graph from './../graph';
import { assert } from 'chai';
import { IGraph, IVertex, IEdge } from '../interfaces';

describe('Graph', () => {

    it('newGraph', () => {
        const newGraph = Graph.newGraph();

        assert.hasAllKeys(newGraph, ['edges', 'vertices']);
        assert.isArray(newGraph.edges);
        assert.isArray(newGraph.vertices);
        assert.lengthOf(newGraph.edges, 0);
        assert.lengthOf(newGraph.vertices, 0);
    });

    it('addVertex', () => {
        const vertex = { name: "_root" };
        const result: IGraph = Graph.addVertex(vertex, Graph.newGraph());
        const expectedGraph: IGraph = {
            vertices: [vertex],
            edges: []
        };
        assert.deepEqual<IGraph>(result, expectedGraph);
    });

    it('addEdge', () => {
        let initialGraph: IGraph = {
            vertices: [
                { name: '_root' },
                { name: 'articles' }
            ],
            edges: []
        };

        const edge = { link: ["_root", "articles"] };
        const result = Graph.addEdge(edge, initialGraph)

        const expectedGraph: IGraph = {
            vertices: [
                { name: '_root' },
                { name: 'articles' }
            ],
            edges: [{
                link: ["_root", "articles"]
            }]
        };

        assert.deepEqual<IGraph>(result, expectedGraph);
    });
    // it('addEdge - INVALID vertex', () => {
    //     let initialGraph: IGraph = {
    //         vertices: [
    //             { name: '_root' },
    //             { name: 'articles' }
    //         ],
    //         edges: []
    //     };

    //     const edge = { link: ["_root", "INVALID"] };
    //     const addEdgeMethod = Graph.addEdge.bind(Graph, edge, initialGraph);

    //     assert.throws(addEdgeMethod, 'The vertex INVALID does not exist')
    // });
    it('getVertexHash', () => {
        const vertex = { name: 'vertex name' };
        const hash = Graph.getVertexHash(vertex);

        assert.typeOf(hash, 'string');
        assert.equal(hash, 'vertex name', 'Vertex Hash function does not work as expected');
    });

    it('getEdgeHash', () => {
        const edge = { link: ['vertex1', 'vertex2'] };
        const hash = Graph.getEdgeHash(edge);

        assert.typeOf(hash, 'string');
        assert.equal(hash, 'vertex1 - vertex2', 'Edge Hash function does not work as expected');
    });
    it('hasVertex', () => {
        let initialGraph: IGraph = {
            vertices: [
                { name: '_root' },
                { name: 'articles' }
            ],
            edges: []
        };

        const vertex = { name: '_root' };
        const expectedTrue = Graph.hasVertex(vertex, initialGraph);
        const expectedFalse = Graph.hasVertex({ name: 'not_root' }, initialGraph);

        assert.isTrue(expectedTrue);
        assert.isFalse(expectedFalse);
    });
    it('hasEdge', () => {
        let initialGraph: IGraph = {
            vertices: [
                { name: '_root' },
                { name: 'articles' }
            ],
            edges: [{
                link: ["_root", "articles"]
            }]
        };
        const edge = { link: ["_root", "articles"] };
        const nonExistantEdge = { link: ["articles", "_root"] };
        const expectedTrue = Graph.hasEdge(edge, initialGraph);
        const expectedFalse = Graph.hasEdge(nonExistantEdge, initialGraph);

        assert.isTrue(expectedTrue);
        assert.isFalse(expectedFalse);
    });
    it('hasVertexByHash', () => {
        let vertex: IVertex = { name: 'articles' };
        let initialGraph: IGraph = {
            vertices: [
                { name: '_root' },
                vertex
            ],
            edges: [{
                link: ["_root", "articles"]
            }]
        };

        const vertexHash = Graph.getVertexHash(vertex);
        const expectedTrue = Graph.hasVertexByHash(vertexHash, initialGraph);
        const expectedFalse = Graph.hasVertexByHash('random', initialGraph);

        assert.isTrue(expectedTrue);
        assert.isFalse(expectedFalse);
    })
    it('hasEdgeByHash', () => {
        let edge: IEdge = { link: ["_root", "articles"] };
        let initialGraph: IGraph = {
            vertices: [
                { name: '_root' },
                { name: 'articles' }
            ],
            edges: [edge]
        };

        const edgeHash = Graph.getEdgeHash(edge);
        const expectedTrue = Graph.hasEdgeByHash(edgeHash, initialGraph);
        const expectedFalse = Graph.hasEdgeByHash('random', initialGraph);

        assert.isTrue(expectedTrue);
        assert.isFalse(expectedFalse);
    });
    it('getVertexByHash', () => {
        let vertex: IVertex = { name: 'articles' };
        let initialGraph: IGraph = {
            vertices: [
                { name: '_root' },
                vertex
            ],
            edges: [{
                link: ["_root", "articles"]
            }]
        };

        const vertexHash = Graph.getVertexHash(vertex);
        const result = Graph.getVertexByHash(vertexHash, initialGraph);

        assert.deepEqual(result, vertex);
        assert.isUndefined(Graph.getVertexByHash('random', initialGraph));
    })

    it('getEdgeByHash', () => {
        let edge: IEdge = { link: ["_root", "articles"] };
        let initialGraph: IGraph = {
            vertices: [
                { name: '_root' },
                { name: 'articles' }
            ],
            edges: [edge]
        };

        const edgeHash = Graph.getEdgeHash(edge);
        const result = Graph.getEdgeByHash(edgeHash, initialGraph);

        assert.deepEqual(result, edge);
        assert.isUndefined(Graph.getEdgeByHash('random', initialGraph));
    });

    it('getVertices', () => {
        let vertices: Array<IVertex> = [
            { name: '_root' },
            { name: 'articles' }
        ];
        let initialGraph: IGraph = {
            vertices,
            edges: [{ link: ["_root", "articles"] }]
        };

        const result = Graph.getVertices(initialGraph);

        assert.deepEqual(result, vertices);
    });

    it('getEdges', () => {
        let edges: Array<IEdge> = [
            { link: ["_root", "articles"] },
            { link: ["articles", "_root"] }
        ];
        let initialGraph: IGraph = {
            vertices: [
                { name: '_root' },
                { name: 'articles' }
            ],
            edges
        };

        const result = Graph.getEdges(initialGraph);

        assert.deepEqual(result, edges);
    });
    it('removeEdgesAssociatedWithVertexHash', () => {
        let initialGraph: IGraph = {
            vertices: [
                { name: '_root' },
                { name: 'articles' }
            ],
            edges: [
                { link: ["_root", "articles"] },
                { link: ["articles", "_root"] }
            ]
        };
        const hash = Graph.getVertexHash({ name: 'articles' });
        const result = Graph.removeEdgesAssociatedWithVertexHash(hash, initialGraph);
        const expectedGraph: IGraph = {
            vertices: [
                { name: '_root' },
                { name: 'articles' }
            ],
            edges: [
                // Edges are removed 
            ]
        };
        assert.deepEqual(result, expectedGraph);
    });
    it('removeVertexByHash', () => {
        let initialGraph: IGraph = {
            vertices: [
                { name: '_root' },
                { name: 'articles' }
            ],
            edges: [
                { link: ["_root", "articles"] },
                { link: ["articles", "_root"] }
            ]
        };
        const hash = Graph.getVertexHash({ name: 'articles' });
        const result = Graph.removeVertexByHash(hash, initialGraph);
        const expectedGraph: IGraph = {
            vertices: [
                { name: '_root' }
            ],
            edges: [
                // Edges are removed also
            ]
        };
        assert.deepEqual(result, expectedGraph);
    });

    it('removeEdgeByHash', () => {
        let initialGraph: IGraph = {
            vertices: [
                { name: '_root' },
                { name: 'articles' }
            ],
            edges: [
                { link: ["_root", "articles"] },
                { link: ["articles", "_root"] }
            ]
        };
        const hash = Graph.getEdgeHash({ link: ["articles", "_root"] });

        const result = Graph.removeEdgeByHash(hash, initialGraph);
        const expectedGraph: IGraph = {
            vertices: [
                { name: '_root' },
                { name: 'articles' }
            ],
            edges: [
                { link: ["_root", "articles"] }
            ]
        };
        assert.deepEqual(result, expectedGraph);
    });

    it('getNeighborVerticesFromVertexHash', () => {
        let initialGraph: IGraph = {
            vertices: [
                { name: '_root' },
                { name: 'articles' },
                { name: 'article' },
                { name: 'name' },
                { name: 'author' }
            ],
            edges: [
                { link: ["_root", "articles"] },
                { link: ["articles", "article"] },
                { link: ["article", "name"] },
                { link: ["article", "author"] }
            ]
        };
        const vertexHash = Graph.getVertexHash({ name: 'article' });
        const result = Graph.getNeighborVerticesFromVertexHash(vertexHash, initialGraph);
        const expectedNeighbors: Array<IVertex> = [
            { name: 'name' },
            { name: 'author' }
        ]
        assert.deepEqual(result, expectedNeighbors);

        const vertexHash2 = Graph.getVertexHash({ name: '_root' });
        const result2 = Graph.getNeighborVerticesFromVertexHash(vertexHash2, initialGraph);
        const expectedNeighbors2: Array<IVertex> = [
            { name: 'articles' }
        ]
        assert.deepEqual(result2, expectedNeighbors2);
    });

    it('getNeightborEdgesFromVertexHash', () => {
        let initialGraph: IGraph = {
            vertices: [
                { name: '_root' },
                { name: 'articles' },
                { name: 'article' },
                { name: 'name' },
                { name: 'author' }
            ],
            edges: [
                { link: ["_root", "articles"] },
                { link: ["articles", "article"] },
                { link: ["article", "name"] },
                { link: ["article", "author"] }
            ]
        };
        const vertexHash = Graph.getVertexHash({ name: 'article' });
        const result = Graph.getNeightborEdgesFromVertexHash(vertexHash, initialGraph);
        const expectedNeighbors: Array<IEdge> = [
            { link: ["article", "name"] },
            { link: ["article", "author"] }
        ]
        assert.deepEqual(result, expectedNeighbors);

        const vertexHash2 = Graph.getVertexHash({ name: '_root' });
        const result2 = Graph.getNeightborEdgesFromVertexHash(vertexHash2, initialGraph);
        const expectedNeighbors2: Array<IEdge> = [
            { link: ["_root", "articles"] }
        ]
        assert.deepEqual(result2, expectedNeighbors2);
    });

    it('BFS', () => {
        let initialGraph: IGraph = {
            vertices: [
                { name: 'name' },
                { name: '_root' },
                { name: 'article' },
                { name: 'author' },
                { name: 'articles' },
            ],
            edges: [
                { link: ["_root", "articles"] },
                { link: ["articles", "article"] },
                { link: ["article", "name"] },

                { link: ["article", "author"] }
            ]
        };
        const vertexHash = Graph.getVertexHash({ name: '_root' });
        const result = Graph.BFS(vertexHash, initialGraph);
        const expectedResult: Array<IVertex> = [
            { name: '_root' },
            { name: 'articles' },
            { name: 'article' },
            { name: 'name' },
            { name: 'author' }
        ]
        assert.deepEqual(result, expectedResult);
    });
});