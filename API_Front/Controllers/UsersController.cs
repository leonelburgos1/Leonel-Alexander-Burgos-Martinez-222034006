using API_Front;
using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace Api_Front.Controllers
{
    [Route("api/[controller]")] // la ruta se compone por lo anterior mas api + nombre el controlador + nombre del metodo
    [ApiController]
    public class UsersController : ControllerBase
    {
        //aqui va todo sobre metodos, validasiones, condiciones, conexiones

        private readonly string _connectionString = "Server=LAPTOP-0SMBKNDP;Database=dbtest2;User Id=sa;Password=12345678;TrustServerCertificate=true;";

        //así se construyen metodos de api todo lo que siga despues del Http es lo que le va a pedir a la base de datos

        [HttpPost("login")]

        public IActionResult Login([FromBody] Users user) // me permite recibir los datos // el segundo user es donde se va a recibir lo que se 
                                                          // mande desde User
        {

            //un método de acción en un controlador de ASP.NET Core que recibe datos de una solicitud HTTP y devuelve un resultado de acción.
            //Indica que el método espera un objeto user de tipo Users en el cuerpo de la solicitud HTTP. El atributo [FromBody]
            //le dice a ASP.NET Core que los datos deben ser deserializados desde el cuerpo de la solicitud en un objeto Users


            if (user == null) // si viene vacio // esto se ve en consola
            {
                return BadRequest("Invalid user data.");
            }
            using (var connection = new SqlConnection(_connectionString)) // esto nos permite hacer la conexión a la base de datos
            // entonces ahora ya puedo hacer las consultas sql
            {

                // va @Username por que recibe un parametro igual en @Password
                var sql = "SELECT * FROM Users WHERE Username = @Username AND Password = @Password"; //@ define un parametro no es un valor sino un parametro.
                var result = connection.QuerySingleOrDefault<Users>(sql, new { user.Username, user.Password }); //reemplazar loss datos capturados
                // en los valores de username y password del backend que son los que estan en User
                // el QuerySingleOrDefault es de Dapper y sirve para mapear los campos.

                if (result != null)
                {

                    return Ok("Login successful.");
                }
                else
                {
                    return Unauthorized("Invalid credentials.");
                }
            }
        }


        [HttpPost("register")]

        public IActionResult Register([FromBody] Users user)
        {
            if (user == null)
            {
                return BadRequest("Invalid user data.");
            }

            using (var connection = new SqlConnection(_connectionString))
            {
                var sql = "INSERT INTO Users (Username, Password) VALUES  (@Username, @Password)";
                var rowsAffected = connection.Execute(sql, new { user.Username, user.Password });
                // execute es de Dapper y ahora es para mandarle

                if (rowsAffected != 0)
                {
                    return Ok("User registered succesfully. ");
                }
                else
                {
                    return StatusCode(500, "An error ocurred while registering the user.");
                }
            }
        }
    }
}

// en conclusion lo que se hace aqui es primero capturar los datos que recibe el front y cogerlos de la consola
// una vez capturados ya empiezo el proceso con la base de datos y hago lo que necesite en cada metodo.