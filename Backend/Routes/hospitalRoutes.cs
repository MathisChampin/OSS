// Routes/UserRoutes.cs
using Controllers;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace Routes
{
    public static class HospitalRoutes
    {
        public static void MapHospitalRoutes(this IEndpointRouteBuilder endpoints)
        {
            endpoints.MapControllers();
        }
    }
}
