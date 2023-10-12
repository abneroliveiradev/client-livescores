import { useEffect, useState } from "react";
import io from "socket.io-client";

function MoveTable() {
  const [liveData, setLivedata] = useState([]);
  useEffect(() => {
    // Conectar ao servidor Socket.io
    const socket = io("http://localhost:3333");

    // Manipular mensagens recebidas do servidor Socket.io
    socket.on("liveMoves", (data) => {
      console.log(data);
      updateTable(data);
    });

    // Função para atualizar a tabela com os dados recebidos
    function updateTable(data) {
      setLivedata((prevData) => [...prevData, data]);
    }
  }, []);

  return (
    <div>
      <h3>Lances de jogos ao vivo</h3>
      <table
        style={{
          border: "1px solid white",
          borderRadius: "5px",
          padding: "10px",
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Minuto</th>
            <th>Equipe A</th>
            <th>Gols A</th>
            <th>Gols B</th>
            <th>Equipe B</th>
            <th>Lance</th>
          </tr>
        </thead>
        <tbody>
          {liveData.map((move, index) => (
            <tr key={index}>
              <td>{move.id}</td>
              <td>{move.minute}</td>
              <td>
                <img
                  className="team-logo"
                  src={move.event.teamA.imageLink}
                  alt={move.event.teamA.name}
                />
                {/* {move.event.teamA.name} */}
              </td>
              <td>{move.event.scoreA}</td>
              <td>{move.event.scoreB}</td>
              <td>
                <img
                  className="team-logo"
                  src={move.event.teamB.imageLink}
                  alt={move.event.teamB.name}
                />
                {/* {move.event.teamB.name} */}
              </td>

              <td>{move.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MoveTable;
