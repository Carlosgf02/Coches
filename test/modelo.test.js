const request = require("supertest");
const app = require("../index"); // Importar la app de Express

describe("🚗 Pruebas sobre la API de Modelos (sin autenticación)", () => {
  let modeloId = "";

  test("✅ POST /api/modelos → Crear un nuevo modelo", async () => {
    const res = await request(app)
      .post("/api/modelos")
      .send({
        nombre: "Toyota Supra",
        tipo: "Deportivo",
        anio: 2023,
      });

    console.log("📌 Respuesta POST /api/modelos:", res.body); // 🔹 Depuración

    expect(res.statusCode).toBe(201);
    expect(res.body.ok).toBe(true);
    expect(res.body.datos).toHaveProperty("id_modelo");
    modeloId = res.body.datos.id_modelo; // Guardamos el ID para pruebas posteriores
  });

  test("✅ GET /api/modelos → Obtener lista de modelos", async () => {
    const res = await request(app).get("/api/modelos");
    
    console.log("📌 Respuesta GET /api/modelos:", res.body); // 🔹 Depuración

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.datos)).toBe(true);
  });

  test("✅ GET /api/modelos/:id → Obtener un modelo por ID", async () => {
    const res = await request(app).get(`/api/modelos/${modeloId}`);

    console.log(`📌 Respuesta GET /api/modelos/${modeloId}:`, res.body); // 🔹 Depuración

    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.datos.id_modelo).toBe(modeloId);
  });

  test("✅ PUT /api/modelos/:id → Actualizar un modelo existente", async () => {
    const res = await request(app)
      .put(`/api/modelos/${modeloId}`)
      .send({
        id_modelo: modeloId,
        nombre: "Toyota Supra GR",
        tipo: "Deportivo",
        anio: 2024,
      });

    console.log(`📌 Respuesta PUT /api/modelos/${modeloId}:`, res.body); // 🔹 Depuración

    expect(res.statusCode).toBe(204); // No devuelve contenido al actualizar
  });

  test("✅ DELETE /api/modelos/:id → Eliminar un modelo", async () => {
    const res = await request(app)
      .delete(`/api/modelos/${modeloId}`);

    console.log(`📌 Respuesta DELETE /api/modelos/${modeloId}:`, res.body); // 🔹 Depuración

    expect(res.statusCode).toBe(204); // No devuelve contenido al eliminar
  });

  test("✅ GET /api/modelos/:id → Intentar obtener un modelo eliminado", async () => {
    const res = await request(app).get(`/api/modelos/${modeloId}`);

    console.log(`📌 Respuesta GET /api/modelos/${modeloId} después de DELETE:`, res.body); // 🔹 Depuración

    expect(res.statusCode).toBe(404);
    expect(res.body.ok).toBe(false);
  });
});
