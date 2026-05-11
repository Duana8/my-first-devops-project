using Npgsql;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Маршрут для проверки связи с БД
app.MapGet("/api/status", async () => {
    // Берем строку подключения из переменных окружения (их прокинет Docker)
    var connectionString = Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnection");
    try {
        using var conn = new NpgsqlConnection(connectionString);
        await conn.OpenAsync();
        using var cmd = new NpgsqlCommand("SELECT 'Connection Successful at ' || NOW();", conn);
        var result = await cmd.ExecuteScalarAsync();
        return Results.Ok(new { message = "Backend & DB are working!", dbTime = result });
    }
    catch (Exception ex) {
        return Results.Problem($"Database Error: {ex.Message}");
    }
});

app.Run("http://0.0.0.0:8080");