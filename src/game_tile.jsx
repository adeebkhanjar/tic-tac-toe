const GameTile = ({ tileId, playMove, onTileClick }) => {
    return <div className = "tile"
    id = { tileId }
    onClick = { onTileClick } > { playMove } < /div>
}
export default GameTile;