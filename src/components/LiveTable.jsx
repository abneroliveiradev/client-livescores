import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import io from "socket.io-client";

function LiveTable() {
  const [data, setData] = useState([]);
  useEffect(() => {
    // Conectar ao servidor Socket.io
    const socket = io("http://localhost:3333");

    // Manipular mensagens recebidas do servidor Socket.io
    socket.on("liveGames", (message) => {
      setData([]);
      updateTable(message);
    });

    // Função para atualizar a tabela com os dados recebidos
    function updateTable(message) {
      setData(message);
    }
  }, []);

  // Função para atualizar a tabela de eventos agendados
  function updateScheduledTable(event) {
    setData((prevData) => [...prevData, event]);
  }

  // Função para carregar eventos agendados
  const loadScheduledEvents = () => {
    // Zerar tabela
    setData([]);
    // Fazer uma chamada à API para obter os eventos agendados
    fetch("http://localhost:3333/events/live")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((event) => {
          updateScheduledTable(event);
        });
      })
      .catch((error) => {
        console.error("Erro ao obter os eventos agendados:", error);
      });
  };

  return (
    <div>
      <h3>Jogos em andamento</h3>
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
            {/* <th>Minuto</th> */}
            <th>Equipe A</th>
            {/* <th>Gols A</th>
            <th>Gols B</th> */}
            <th>Equipe B</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {data.map((event, index) => (
            <tr key={index}>
              <td>{event.id}</td>
              {/* <td>{event.gameMinute}</td> */}
              <td>
                <img
                  className="team-logo"
                  src={event.teamA.imageLink}
                  alt={event.teamA.name}
                />
                {/* {event.teamA.name} */}
              </td>
              {/* <td>{event.scoreA}</td>
              <td>{event.scoreB}</td> */}
              <td>
                <img
                  className="team-logo"
                  src={event.teamB.imageLink}
                  alt={event.teamB.name}
                />
                {/* {event.teamB.name} */}
              </td>

              <td>{format(parseISO(event.startTime), "dd/MM/yyyy HH:mm")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={loadScheduledEvents}>Carregar Eventos Agendados</button>
    </div>
  );
}

export default LiveTable;
