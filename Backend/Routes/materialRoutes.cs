using Controllers;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace Routes
{
    public static class MaterialRoutes
    {
        public static void MapMaterialRoutes(this IEndpointRouteBuilder endpoints)
        {
            endpoints.MapControllers();
        }
    }
}