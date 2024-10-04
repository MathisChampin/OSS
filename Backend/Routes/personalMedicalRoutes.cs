// Routes/UserRoutes.cs
using Controllers;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace Routes
{
    public static class PMedicalRoutes
    {
        public static void MapPMedicalRoutes(this IEndpointRouteBuilder endpoints)
        {
            endpoints.MapControllers();
        }
    }
}
