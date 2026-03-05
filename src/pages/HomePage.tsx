import React from "react";

function HomePage() {
  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px" }}>
      <header style={{ marginBottom: "20px" }}>
        <h1>TextSocial</h1>
        <p>Mini retea sociala doar cu postari text.</p>
      </header>

      <section style={{ marginBottom: "20px" }}>
        <h2>Scrie o postare</h2>
        <form>
          <input
            type="text"
            placeholder="Numele tau"
            style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
          />
          <textarea
            placeholder="Ce ai pe suflet?"
            style={{ width: "100%", padding: "8px", height: "80px" }}
          />
          <button type="submit" style={{ marginTop: "8px" }}>
            Posteaza
          </button>
        </form>
      </section>

      <section>
        <h2>Postari recente</h2>
        <p>(Deocamdata lista e goala, urmeaza sa o legam la backend.)</p>
      </section>
    </div>
  );
}

export default HomePage;
