using Controllers;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace Routes
{
    public static class HospitalisationRoutes
    {
        public static void MapHospitalisationRoutes(this IEndpointRouteBuilder endpoints)
        {
            endpoints.MapControllers();
        }
    }
}
