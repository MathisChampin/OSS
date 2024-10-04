using Controllers;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace Routes
{
    public static class DeviceRoutes
    {
        public static void MapDeviceRoutes(this IEndpointRouteBuilder endpoints)
        {
            endpoints.MapControllers();
        }
    }
}
