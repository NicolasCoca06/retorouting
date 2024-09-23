import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function Detail() {
  const { mascotaId } = useParams();
  const [mascotas, setMascotas] = useState([]);
  const [mascota, setMascota] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const getMascota = (id) => {
    return mascotas.find((m) => m.id === parseInt(id)) || null;
  };

  useEffect(() => {
    const URL =
      "https://gist.githubusercontent.com/josejbocanegra/829a853c6c68880477697acd0490cecc/raw/99c31372b4d419a855e53f0e891246f313a71b20/mascotas.json";
    fetch(URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setMascotas(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError("Error loading data");
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (mascotas.length > 0) {
      const selectedMascota = getMascota(mascotaId);
      if (selectedMascota) {
        setMascota(selectedMascota);
      } else {
        setError("Mascota not found");
      }
    }
  }, [mascotas, mascotaId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={styles.container}>
      {mascota ? (
        <>
          <h1 style={styles.title}>{mascota.nombre}</h1>
          <img
            style={styles.image}
            src={mascota.foto}
            alt={`Foto de ${mascota.nombre}`}
          />
          <p style={styles.race}>{mascota.raza}</p>
        </>
      ) : (
        <div>No mascota found</div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "2rem",
    color: "#333",
    marginBottom: "10px",
  },
  image: {
    width: "200px",
    height: "200px",
    objectFit: "cover",
    borderRadius: "50%",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    marginBottom: "15px",
  },
  race: {
    fontSize: "1.2rem",
    color: "#666",
  },
};
