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
export { IGraph, IVertex, IEdge }