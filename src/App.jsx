// import du hook useState depuis React
import { useState } from "react";

// composant Square : représente une case du plateau
function Square({ value, onSquareClick }) {
  // retourne un bouton cliquable avec la valeur de la case
  return (
    // bouton avec classe CSS et gestionnaire de clic
    <button className="square" onClick={onSquareClick}>
      {/* affiche X, O ou rien */}
      {value}
    </button>
  );
}

// composant Board : gère le plateau de jeu 3x3
function Board({ xIsNext, squares, onPlay }) {
  // fonction qui gère le clic sur une case
  function handleClick(i) {
    // si quelqu'un a gagné ou si la case est occupée, ne rien faire
    if (calculateWinner(squares) || squares[i]) {
      // sortir de la fonction
      return;
    }
    // créer une copie du tableau squares
    const nextSquares = squares.slice();
    // si c'est le tour de X
    if (xIsNext) {
      // placer X dans la case
      nextSquares[i] = "X";
    } else {
      // sinon placer O dans la case
      nextSquares[i] = "O";
    }
    // appeler la fonction onPlay avec le nouveau plateau
    onPlay(nextSquares);
  }

  // vérifier s'il y a un gagnant
  const winner = calculateWinner(squares);
  // variable pour le message d'état
  let status;
  // si il y a un gagnant
  if (winner) {
    // message de victoire
    status = winner + " a gagné";
  } else {
    // message indiquant le prochain joueur
    status = "Prochain tour : " + (xIsNext ? "X" : "O");
  }

  // retourne le JSX du plateau
  return (
    // fragment React pour grouper sans div
    <>
      {/* div pour afficher le statut */}
      <div className="status">{status}</div>
      {/* première rangée du plateau */}
      <div className="board-row">
        {/* case 0 */}
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        {/* case 1 */}
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        {/* case 2 */}
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      {/* deuxième rangée du plateau */}
      <div className="board-row">
        {/* case 3 */}
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        {/* case 4 */}
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        {/* case 5 */}
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      {/* troisième rangée du plateau */}
      <div className="board-row">
        {/* case 6 */}
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        {/* case 7 */}
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        {/* case 8 */}
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

// composant principal Game exporté par défaut
export default function Game() {
  // état pour savoir si c'est le tour de X (true) ou O (false)
  const [xIsNext, setXIsNext] = useState(true);
  // état pour l'historique des plateaux (commence avec un plateau vide)
  const [history, setHistory] = useState([Array(9).fill(null)]);
  // récupère l'état actuel du plateau (dernier élément de l'historique)
  const currentSquares = history[history.length - 1];

  // fonction appelée quand un joueur fait un mouvement
  function handlePlay(nextSquares) {
    // ajouter le nouveau plateau à l'historique
    setHistory([...history, nextSquares]);
    // changer de joueur
    setXIsNext(!xIsNext);
  }

  // retourne le JSX du jeu complet
  return (
    // container principal du jeu
    <div className="game">
      {/* zone du plateau */}
      <div className="game-board">
        {/* composant Board avec ses props */}
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      {/* zone pour informations/historique */}
      <div className="game-info">
        {/* liste vide pour l'historique (TODO) */}
        <ol>{/*TODO*/}</ol>
      </div>
    </div>
  );
}

// fonction utilitaire pour calculer le gagnant
function calculateWinner(squares) {
  // tableau des combinaisons gagnantes possibles
  const lines = [
    // lignes horizontales
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // colonnes verticales
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonales
    [0, 4, 8],
    [2, 4, 6],
  ];
  // boucle pour vérifier chaque combinaison
  for (let i = 0; i < lines.length; i++) {
    // extraire les 3 positions de la combinaison actuelle
    const [a, b, c] = lines[i];
    // si les 3 positions ont le même symbole non-vide
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // retourner le symbole gagnant
      return squares[a];
    }
  }
  // aucun gagnant trouvé
  return null;
}
