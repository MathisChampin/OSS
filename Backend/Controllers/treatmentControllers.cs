using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Models;
using Services;

namespace Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TreatmentController : ControllerBase
    {
        private readonly ITreatmentService _treatmentService;

        public TreatmentController(ITreatmentService treatmentService)
        {
            _treatmentService = treatmentService;
        }

        // <summary>
        // Gets all treatment
        // </summary>
        // <returns>A list of treatment</returns>
        // <response code="200">Returns the list of treatments</response>
        [HttpGet]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetTreatments()
        {
            var treatment = await _treatmentService.GetAllTreatmentsAsync();
            if (treatment.Count == 0)
                return Ok(new { });
            return Ok(treatment);
        }

        // <summary>
        // Gets a specific Treatment by Name
        // </summary>
        /// <param name="NameTreatment">Treatment Name</param>
        // <returns>The requested Treatment</returns>
        // <response code="200">Returns the treatmen</response>
        // <response code="404">If the patient is not found</response>
        [HttpGet("{name}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetTreatmentByName(string name)
        {
            var treatment = await _treatmentService.GetTreatmentByNameAsync(name);
            if (treatment == null)
            {
                return NotFound($"Treatment with name '{name}' not found.");
            }
            return Ok(treatment);
        }

        // <summary>
        // Creates a new treatment treatment
        // </summary>
        /// <param name="model">Treatment</param>
        // <returns>The created treatment</returns>
        // <response code="201">Returns the created treatment</response>
        // <response code="404">If the hospital is not found</response>
        [HttpPost]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PostTreatment([FromBody] Treatment model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try {
                var createdTreatment = await _treatmentService.CreateTreatmentAsync(model);
                return CreatedAtAction(nameof(GetTreatments), new { id = createdTreatment.Id }, createdTreatment);
            } catch (KeyNotFoundException ex) {
                return NotFound(ex.Message);
            } catch (Exception ex) {
                return StatusCode(500, "Erreur interne du serveur : " + ex.Message);
            }
        }

        // <summary>
        // Gets statistics for patients who have been healed by a specific treatment.
        // </summary>
        /// <param name="name">Treatment Name</param>
        // <returns>Statistics about the healed patients</returns>
        // <response code="200">Returns the statistics of healed patients</response>
        // <response code="404">If the treatment is not found</response>
        [HttpGet("statistics/{name}/healed")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetStatisticsByTreatmentNameHeal(string name)
        {
            var statistics = await _treatmentService.GetTreatmentStatisticsByNameHealAsync(name);
            if (statistics == null)
            {
                return NotFound($"Treatment with name '{name}' not found.");
            }
            return Ok(statistics);
        }

        // <summary>
        // Gets statistics for patients who have died using a specific treatment.
        // </summary>
        /// <param name="name">Treatment Name</param>
        // <returns>Statistics about the deceased patients</returns>
        // <response code="200">Returns the statistics of deceased patients</response>
        // <response code="404">If the treatment is not found</response>
        [HttpGet("statistics/{name}/deceased")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetStatisticsByTreatmentNameDie(string name)
        {
            var statistics = await _treatmentService.GetTreatmentStatisticsByNameDieAsync(name);
            if (statistics == null)
            {
                return NotFound($"Treatment with name '{name}' not found.");
            }
            return Ok(statistics);
        }

        // <summary>
        // Gets statistics for patients currently undergoing a specific treatment.
        // </summary>
        /// <param name="name">Treatment Name</param>
        // <returns>Statistics about patients currently undergoing treatment</returns>
        // <response code="200">Returns the statistics of patients currently undergoing treatment</response>
        // <response code="404">If the treatment is not found</response>
        [HttpGet("statistics/{name}/current")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetStatisticsByTreatmentNameCurrent(string name)
        {
            var statistics = await _treatmentService.GetTreatmentStatisticsByNameCurrentAsync(name);
            if (statistics == null)
            {
                return NotFound($"Treatment with name '{name}' not found.");
            }
            return Ok(statistics);
        }

        // <summary>
        // Gets statistics for the number of patients currently undergoing a specific treatment compared to the total number of patients.
        // </summary>
        /// <param name="name">The name of the treatment for which statistics are requested.</param>
        // <returns>A percentage of patients currently using the treatment compared to all patients.</returns>
        // <response code="200">Returns the statistics of patients currently undergoing the specified treatment.</response>
        // <response code="404">If the treatment is not found.</response>
        [HttpGet("statistics/{name}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetStatisticsByTreatmentName(string name)
        {
            var statistics = await _treatmentService.GetTreatmentStatisticsByNameAsync(name);
            if (statistics == null)
            {
                return NotFound($"Treatment with name '{name}' not found.");
            }
            return Ok(statistics);
        }

        // <summary>
        // Gets statistics for the percentage of patients currently undergoing treatment compared to the total number of patients.
        // </summary>
        // <returns>A percentage of patients currently undergoing treatment compared to all patients.</returns>
        // <response code="200">Returns the statistics of patients currently undergoing treatment.</response>
        // <response code="404">If no statistics are found.</response>
        [HttpGet("statistics/current")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetStatisticsByTreatmentCurrent()
        {
            var statistics = await _treatmentService.GetTreatmentStatisticsCurrentAsync();
            if (statistics == null)
            {
                return NotFound($"Treatment not found.");
            }
            return Ok(statistics);
        }

        // <summary>
        // Gets statistics for the percentage of patients who have healed compared to the total number of patients.
        // </summary>
        // <returns>A percentage of patients who have healed compared to all patients.</returns>
        // <response code="200">Returns the statistics of healed patients.</response>
        // <response code="404">If no statistics are found.</response>
        [HttpGet("statistics/healed")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetStatisticsByTreatmentHeal()
        {
            var statistics = await _treatmentService.GetTreatmentStatisticsHealAsync();
            if (statistics == null)
            {
                return NotFound($"Treatment not found.");
            }
            return Ok(statistics);
        }

        // <summary>
        // Gets statistics for the percentage of patients who have deceased compared to the total number of patients.
        // </summary>
        // <returns>A percentage of patients who have deceased compared to all patients.</returns>
        // <response code="200">Returns the statistics of deceased patients.</response>
        // <response code="404">If no statistics are found.</response>
        [HttpGet("statistics/deceased")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetStatisticsByTreatmentDie()
        {
            var statistics = await _treatmentService.GetTreatmentStatisticsDieAsync();
            if (statistics == null)
            {
                return NotFound($"Treatment not found.");
            }
            return Ok(statistics);
        }

        // <summary>
        // Gets the percentage of patients currently undergoing a specific treatment compared to all patients.
        // </summary>
        /// <param name="name">The name of the treatment for which statistics are requested.</param>
        // <returns>A percentage of patients currently using the treatment compared to all patients.</returns>
        // <response code="200">Returns the percentage of patients currently undergoing the specified treatment.</response>
        // <response code="404">If the treatment is not found.</response>
        [HttpGet("statistics/current/{name}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetPercentageOfCurrentPatientsByTreatment(string name)
        {
            var statistics = await _treatmentService.GetPercentageOfCurrentPatientsByTreatmentAsync(name);
            if (statistics == null)
            {
                return NotFound($"Treatment with name '{name}' not found or no patients currently undergoing the treatment.");
            }
            return Ok(statistics);
        }

        // <summary>
        // Gets the percentage of patients who have been healed using a specific treatment compared to all patients.
        // </summary>
        /// <param name="name">The name of the treatment for which statistics are requested.</param>
        // <returns>A percentage of patients healed using the treatment compared to all patients.</returns>
        // <response code="200">Returns the percentage of healed patients for the specified treatment.</response>
        // <response code="404">If the treatment is not found.</response>
        [HttpGet("statistics/healed/{name}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetPercentageOfHealedPatientsByTreatment(string name)
        {
            var statistics = await _treatmentService.GetPercentageOfHealPatientsByTreatmentAsync(name);
            if (statistics == null)
            {
                return NotFound($"Treatment with name '{name}' not found or no patients healed using the treatment.");
            }
            return Ok(statistics);
        }

        // <summary>
        // Gets the percentage of patients who have died while undergoing a specific treatment compared to all patients.
        // </summary>
        /// <param name="name">The name of the treatment for which statistics are requested.</param>
        // <returns>A percentage of patients who have died using the treatment compared to all patients.</returns>
        // <response code="200">Returns the percentage of deceased patients for the specified treatment.</response>
        // <response code="404">If the treatment is not found.</response>
        [HttpGet("statistics/deceased/{name}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetPercentageOfDeceasedPatientsByTreatment(string name)
        {
            var statistics = await _treatmentService.GetPercentageOfDiePatientsByTreatmentAsync(name);
            if (statistics == null)
            {
                return NotFound($"Treatment with name '{name}' not found or no patients deceased using the treatment.");
            }
            return Ok(statistics);
        }

        // <summary>
        // Gets the treatment with the highest healing percentage among all treatments.
        // </summary>
        // <returns>The name and healing percentage of the most effective treatment.</returns>
        // <response code="200">Returns the most effective treatment and its healing percentage.</response>
        // <response code="404">If no treatments are found or there is insufficient data.</response>
        [HttpGet("bestTreatment")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetBestTreatment()
        {
            var statistics = await _treatmentService.GetBestTreatmentAsync();
            if (statistics == null)
            {
                return NotFound($"Treatment not found or no patients deceased using the treatment.");
            }
            return Ok(statistics);
        }

        // <summary>
        // Gets the treatment with the lowest healing percentage among all treatments.
        // </summary>
        // <returns>The name and healing percentage of the least effective treatment.</returns>
        // <response code="200">Returns the least effective treatment and its die percentage.</response>
        // <response code="404">If no treatments are found or there is insufficient data.</response>
        [HttpGet("leastTreatment")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetLeastTreatment()
        {
            var statistics = await _treatmentService.GetLeastTreatmentAsync();
            if (statistics == null)
            {
                return NotFound($"Treatment not found or no patients deceased using the treatment.");
            }
            return Ok(statistics);
        }

        // <summary>
        // Gets the treatment with the highest percentage of healed patients over a specified number of weeks.
        // </summary>
        /// <param name="week">The number of weeks used to filter treatments.</param>
        // <returns>The treatment name and the percentage of healed patients for that treatment within the specified duration.</returns>
        // <response code="200">Returns the name and heal percentage of the most effective treatment.</response>
        // <response code="404">If no treatment matches the criteria.</response>
        [HttpGet("bestTreatment/{week}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetBestTreatmentByWeek(int week)
        {
            var statistics = await _treatmentService.GetBestTreatmentByDurationAsync(week);
            if (statistics == null)
            {
                return NotFound($"Treatment not found or no patients deceased using the treatment.");
            }
            return Ok(statistics);
        }

        // <summary>
        // Gets the treatment with the lowest percentage of healed patients over a specified number of weeks.
        // </summary>
        /// <param name="week">The number of weeks used to filter treatments.</param>
        // <returns>The treatment name and the percentage of healed patients for that treatment within the specified duration.</returns>
        // <response code="200">Returns the name and heal percentage of the least effective treatment.</response>
        // <response code="404">If no treatment matches the criteria.</response>
        [HttpGet("leastTreatment/{week}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetLeatTreatmentByWeek(int week)
        {
            var statistics = await _treatmentService.GetLeastTreatmentByDurationAsync(week);
            if (statistics == null)
            {
                return NotFound($"Treatment not found or no patients deceased using the treatment.");
            }
            return Ok(statistics);
        }

        // <summary>
        // Retrieves the percentage of treatments by name over a specified duration in weeks.
        // </summary>
        /// <param name="week">The duration in weeks to filter the treatment statistics.</param>
        /// <param name="name">The name of the treatment.</param>
        // <returns>A dictionary containing the percentages of healed and deceased patients.</returns>
        // <response code="200">Returns the treatment statistics if found.</response>
        // <response code="404">If the treatment or patient statistics are not found.</response>
        [HttpGet("{name}/{week}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetPercentageTreatmentByNameByWeek(int week, string name)
        {
            var statistics = await _treatmentService.GetPercentageTreatmentByNameByDurationAsync(week, name);
            if (statistics == null)
            {
                return NotFound($"Treatment not found or no patients deceased using the treatment.");
            }
            return Ok(statistics);
        }

        // <summary>
        // Retrieves the healing percentage of treatments by name over a specified duration in weeks.
        // </summary>
        /// <param name="week">The duration in weeks to filter the healing statistics.</param>
        /// <param name="name">The name of the treatment.</param>
        // <returns>The healing percentage of patients.</returns>
        // <response code="200">Returns the healing percentage if found.</response>
        // <response code="404">If the treatment or healing statistics are not found.</response>
        [HttpGet("heal/{name}/{week}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetHealPercentageTreatmentByNameByWeek(int week, string name)
        {
            var statistics = await _treatmentService.GetHealPercentageByNameByDurationAsync(week, name);
            if (statistics == null)
            {
                return NotFound($"Treatment not found or no patients deceased using the treatment.");
            }
            return Ok(statistics);
        }

        // <summary>
        // Retrieves the death percentage of treatments by name over a specified duration in weeks.
        // </summary>
        /// <param name="week">The duration in weeks to filter the death statistics.</param>
        /// <param name="name">The name of the treatment.</param>
        // <returns>The death percentage of patients.</returns>
        // <response code="200">Returns the death percentage if found.</response>
        // <response code="404">If the treatment or death statistics are not found.</response>
        [HttpGet("die/{name}/{week}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetDiePercentageTreatmentByNameByWeek(int week, string name)
        {
            var statistics = await _treatmentService.GetDiePercentageByNameByDurationAsync(week, name);
            if (statistics == null)
            {
                return NotFound($"Treatment not found or no patients deceased using the treatment.");
            }
            return Ok(statistics);
        }

        // <summary>
        // Retrieves the average duration of treatments during the pandemic in days.
        // </summary>
        // <returns>The average treatment duration in days.</returns>
        // <response code="200">Returns the average treatment duration if found.</response>
        // <response code="404">If no valid treatments are found or data is missing.</response>
        [HttpGet("duration")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetAveragePandemicDuration()
        {
            var statistics = await _treatmentService.GetAveragePandemicDurationAsync();
            if (statistics == null)
            {
                return NotFound($"Treatment not found or no patients deceased using the treatment.");
            }
            return Ok(statistics);
        }
        // <summary>
        // Retrieves the average duration of treatments during the pandemic in days.
        // </summary>
        // <returns>The average treatment duration in days.</returns>
        // <response code="200">Returns the average treatment duration if found.</response>
        // <response code="404">If no valid treatments are found or data is missing.</response>
        [HttpGet("duration/{name}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetAverageTreatmentDuration(string name)
        {
            var statistics = await _treatmentService.GetAverageTreatmentDurationAsync(name);
            if (statistics == null)
            {
                return NotFound($"Treatment not found or no patients deceased using the treatment.");
            }
            return Ok(statistics);
        }
    }
}