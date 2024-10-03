using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Models;
using Services;

namespace Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DevicesController : ControllerBase
    {
        private readonly IDeviceService _deviceService;

        public DevicesController(IDeviceService deviceService)
        {
            _deviceService = deviceService;
        }


        /// <summary>
        /// Gets all devices
        /// </summary>
        /// <returns>A list of devices</returns>
        /// <response code="200">Returns the list of devices</response>
        [HttpGet]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetDevices()
        {
            var device = await _deviceService.GetAllDeviceAsync();
            if (device.Count == 0)
                return Ok(new { });
            return Ok(device);
        }

        /// <summary>
        /// Get a specific device by ID
        /// </summary>
        /// <param name="id">device ID</param>
        /// <returns>The requested device</returns>
        /// <response code="200">Returns the device</response>
        /// <response code="404">If the device is not found</response>
        [HttpGet("{id}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetDevice(int id)
        {    
            var device = await _deviceService.GetDeviceByIdAsync(id);
            if (device == null)
                return NotFound();
            return Ok(device);
        }

        /// <summary>
        /// Updates an existing Device
        /// </summary>
        /// <param name="id">Device ID</param>
        /// <param name="Device">The updated Device</param>
        /// <response code="204">If the update was successful</response>
        /// <response code="400">If the ID in the URL and the Device ID do not match</response>
        /// <response code="404">If the Device is not found</response>
        [HttpPut("{id}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PutDevice(int id, [FromBody] Device device)
        {
            if (id != device.Id)
                return BadRequest("ID mismatch");

            var existingDevice = await _deviceService.GetDeviceByIdAsync(id);
            if (existingDevice == null)
                return NotFound();

            existingDevice.Quantity = device.Quantity ?? existingDevice.Quantity;
            existingDevice.Name = device.Name ?? existingDevice.Name;

            await _deviceService.UpdateDeviceAsync(existingDevice);
            return Ok(existingDevice);
        }

        /// <summary>
        /// Deletes a specific device
        /// </summary>
        /// <param name="id">device ID</param>
        /// <response code="204">If the device was successfully deleted</response>
        /// <response code="404">If the device is not found</response>
        [HttpDelete("{id}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteDevice(int id)
        {
            var existingDevice = await _deviceService.GetDeviceByIdAsync(id);
            if (existingDevice == null)
                return NotFound();

            var success = await _deviceService.DeleteDeviceAsync(id);
            if (!success)
                return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting device.");
            return NoContent();
        }
    }
}