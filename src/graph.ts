import * as R from 'ramda';
import { IGraph, IVertex, IEdge } from './interfaces';

const graph = {

    /**
     * () -> IGraph
     * 
     * Generates new empty graph
     * @returns IGraph Graph
     */
    newGraph: (): IGraph => ({
        vertices: [],
        edges: []
    }),

    /**
     * getVertexHash :: IVertex -> String
     * 
     * Hashing function for IVertex. Can be customized.
     * @param IVertex Vertex
     * @return String Vertex's hash
     */
    getVertexHash: (vertex: IVertex) => vertex.name,

    /**
     * getEdgeHash :: IEdge -> String
     * 
     * Hashing function for IEdge. Can be customized.
     * @param IEdge Edge
     * @return String Edge's hash
     */
    getEdgeHash: (edge: IEdge) => `${edge.link[0]} - ${edge.link[1]}`,

    /**
    * edgeHash :: () -> Array<IVertex>
    * 
    * Returns a list of all vertices in a graph
    * @params IGraph Graph
    * @return Array<IVertex> List of all Vertices
    */
    getVertices: R.prop('vertices'),

    /**
    * getEdges :: IGraph -> Array<IEdge>
    * 
    * Returns a list of all edges in a graph
    * @params IGraph Graph
    * @return Array<IEdge> List of all Edges
    */
    getEdges: R.prop('edges'),

    /**
     * addVertex :: IVertex -> IGraph -> IGraph
     * 
     * Adds Vertex to the graph
     * @param IVertex Vertex
     * @param IGraph Graph
     * @return IGraph Graph
     */
    addVertex: R.curry(
        (vertex: IVertex, g: IGraph): IGraph => {
            return R.pipe(
                graph.getVertices,
                R.append(vertex),
                R.assoc('vertices', R.__, g)
            )(g)
        }
    ),

    /**
     * addVertices :: Array<IVertex> -> IGraph -> IGraph
     * 
     * Adds multiple Vertices to the graph
     * @param Array<IVertex> multiple Vertices
     * @param IGraph Graph
     * @return IGraph Graph
     */
    addVertices: R.curry(
        (vertices: Array<IVertex>, g: IGraph): IGraph => R.reduce((acc, value) => graph.addVertex(value, acc), g, vertices)
    ),

    /**
     * getVertexByHash :: String -> IGraph -> IVertex
     * 
     * Return Vertex by Hash
     * @param String Vertex's hash
     * @param IGraph Graph
     * @return IVertex Vertex if exists or undefined
     */
    getVertexByHash: R.curry(
        (vertexHash: String, g: IGraph): IVertex => {
            return R.pipe(
                graph.getVertices,
                R.find(
                    R.pipe(
                        graph.getVertexHash,
                        R.equals(vertexHash)
                    )
                )
            )(g)
        }
    ),

    /**
     * addEdge :: IEdge -> IGraph -> IGraph
     * 
     * Adds edge to the graph
     * @param IEdge Edge to add 
     * @param IGraph Graph
     * @return boolean
     */
    addEdge: R.curry(
        (edge: IEdge, g: IGraph): IGraph => {

            // TODO: Not really functional. Suggestions are wellcome..
            if (!graph.hasVertexByHash(edge.link[0], g)) {
                throw new Error(`The vertex ${edge.link[0]} does not exist`)
            }
            if (!graph.hasVertexByHash(edge.link[1], g)) {
                throw new Error(`The vertex ${edge.link[1]} does not exist`)
            }
            return R.pipe(
                graph.getEdges,
                R.append(edge),
                R.assoc('edges', R.__, g)
            )(g)
        }
    ),

    /**
     * addEdges :: Array<IEdge> -> IGraph -> IGraph
     * 
     * Adds multiple Edges to the graph
     * @param Array<Iedge> multiple Edges
     * @param IGraph Graph
     * @return IGraph Graph
     */
    addEdges: R.curry(
        (edges: Array<IEdge>, g: IGraph): IGraph => R.reduce((acc, value) => graph.addEdge(value, acc), g, edges)
    ),

    /**
     * getEdgeByHash :: String -> IGraph -> IEdge
     * 
     * Return Edge by Hash
     * @param String Edge's hash
     * @param IGraph Graph
     * @return IEdge Edge if exists or undefined
     */
    getEdgeByHash: R.curry<(edgeHash: String, ...args: any) => any>(
        (edgeHash: String, g: IGraph): IEdge => {
            return R.pipe(
                graph.getEdges,
                R.find(
                    R.pipe(
                        graph.getEdgeHash,
                        R.equals(edgeHash)
                    )
                )
            )(g)
        }
    ),

    /**
     * hasVertexByHash :: String -> IGraph -> Boolean
     * 
     * Checks if vertex's hash exists in the graph
     * @param String vertex's hash 
     * @param IGraph Graph
     * @return boolean
     */
    hasVertexByHash: R.curry(
        (vertexHash: String, g: IGraph): Boolean => {
            return R.pipe<any, any, any, any>(
                graph.getVertexByHash(vertexHash),
                R.isNil,
                R.not
            )(g)
        }
    ),

    /**
     * hasVertex :: IVertex -> IGraph -> Boolean
     * 
     * Checks if vertex exists in Graph
     * @param IVertex Vertex
     * @param IGraph Graph
     * @returns boolean
     */
    hasVertex: R.curry(
        (vertex: IVertex, g: IGraph): Boolean => graph.hasVertexByHash(graph.getVertexHash(vertex), g)
    ),

    /**
     * hasEdgeByHash :: String -> IGraph -> Boolean
     * 
     * Checks if edge's hash exists in the graph
     * @param String Edge's hash
     * @param IGraph Graph
     * @returns boolean
     * 
     */
    hasEdgeByHash: R.curry(
        (edgeHash: String, g: IGraph): Boolean => {
            return R.pipe<any, any, any, any>(
                graph.getEdgeByHash(edgeHash),
                R.isNil,
                R.not
            )(g)
        }
    ),

    /**
     * hasEdge :: IEdge -> IGraph -> Boolean
     * 
     * Checks if edge exists in the graph
     * @param IEdge Edge
     * @param IGraph Graph
     * @returns boolean
     */
    hasEdge: R.curry(
        (edge: IEdge, g: IGraph): Boolean => graph.hasEdgeByHash(graph.getEdgeHash(edge), g)
    ),

    removeEdgesAssociatedWithVertexHash: R.curry(
        (vertexHash: String, g: IGraph): IGraph => {
            return R.pipe(
                graph.getEdges,
                R.filter(
                    R.pipe(
                        R.prop('link'),
                        R.contains(vertexHash),
                        R.not
                    )
                ),
                R.assoc('edges', R.__, g)
            )(g);
        }
    ),

    /**
     * removeVertexByHash :: String -> IGraph -> IGraph
     * 
     * Removes vertex and all edges associated with it
     * @param String Vertex's Hash
     * @param IGraph Graph
     * @return IGraph Graph
     */
    removeVertexByHash: R.curry(
        (vertexHash: String, g: IGraph): IGraph => {
            return R.pipe(
                graph.getVertices,
                R.filter(
                    R.pipe(
                        graph.getVertexHash,
                        R.equals(vertexHash),
                        R.not
                    )
                ),
                R.assoc('vertices', R.__, g),
                graph.removeEdgesAssociatedWithVertexHash(vertexHash)
            )(g)
        }
    ),

    /**
     * removeEdgeByHash :: String -> IGraph -> IGraph
     * 
     * Removes edge from graph
     * @param String Edge's Hash
     * @param IGraph Graph
     * @return IGraph Graph
     */
    removeEdgeByHash: R.curry(
        (edgeHash: String, g: IGraph): IGraph => {
            return R.pipe(
                graph.getEdges,
                R.filter(
                    R.pipe(
                        graph.getEdgeHash,
                        R.equals(edgeHash),
                        R.not
                    )
                ),
                R.assoc('edges', R.__, g)
            )(g)
        }
    ),

    /**
     * getNeightborEdgesFromVertexHash :: String -> IGraph -> Array<IEdge>
     * 
     * Get all neightboring Edges from Vertex by Vertex Hash
     * @param String Vertex's Hash
     * @param IGraph Graph
     * @result Array<IEdge> Matched Edges from the Vertex
     */
    getNeightborEdgesFromVertexHash: R.curry(
        (vertexHash: String, g: IGraph): Array<IEdge> => {
            return R.pipe<any, any, any>(
                graph.getEdges,
                R.filter(
                    R.pipe(
                        R.prop('link'),
                        R.nth(0),
                        R.equals(vertexHash),
                    )
                )
            )(g)
        }
    ),

    /**
     * getNeighborVerticesFromVertexHash :: String -> IGraph -> Array<IVertex>
     * 
     * Get all neightboring Vertices From Vertex by Vertex hash
     * @param String Vertex's Hash
     * @param IGraph Graph
     * @return Array<IVertex>
     */
    getNeighborVerticesFromVertexHash: R.curry(
        (vertexHash: String, g: IGraph): Array<IVertex> => {
            return R.pipe<any, any, any>(
                graph.getNeightborEdgesFromVertexHash(vertexHash),
                R.map(
                    R.pipe(
                        R.prop('link'),
                        R.nth(1),
                        graph.getVertexByHash(R.__, g)
                    )
                )
            )(g)
        }
    ),

    /**
     * BFS :: String -> IGraph -> Array<IVertex>
     * 
     * Breadth First Search with starting node
     * @param String Vertex's Hash from which will start BFS
     * @param IGraph Graph
     * @returns Array<IVertex> List of Vertices ordered by traversal path
     */
    BFS: R.curry(
        (startVertexHash: String, g: IGraph): Array<IVertex> => {
            let visited = [];
            let notVisited = [startVertexHash];
            while (R.compose(R.not, R.isEmpty)(notVisited)) {
                visited = R.concat(visited, notVisited);
                notVisited = R.pipe<any, any, any, any, any, any>(
                    R.map(graph.getNeighborVerticesFromVertexHash(R.__, g)),
                    R.flatten,
                    R.map(graph.getVertexHash),
                    R.uniq,
                    R.filter(R.compose(R.not, R.contains(R.__, visited)))
                )(notVisited)
            }
            return R.map(graph.getVertexByHash(R.__, g), visited);
        }
    )
}

export default graph;