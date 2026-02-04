using albums_api.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Text.Json;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace albums_api.Controllers
{
    [Route("albums")]
    [ApiController]
    public class AlbumController : ControllerBase
    {
        // GET: api/albums
        // Supports optional query parameter: /albums?year=2021
        [HttpGet]
        public IActionResult Get([FromQuery] int? year)
        {
            if (year.HasValue)
            {
                var albumsByYear = Album.GetByYear(year.Value);
                return Ok(albumsByYear);
            }

            var albums = Album.GetAll();
            return Ok(albums);
        }

        // GET api/albums/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var album = Album.GetById(id);
            if (album == null)
            {
                return NotFound();
            }
            return Ok(album);
        }

        // GET api/albums/year/2021
        [HttpGet("year/{year}")]
        public IActionResult GetByYear(int year)
        {
            var albums = Album.GetByYear(year);
            return Ok(albums);
        }

        // POST api/albums
        [HttpPost]
        public IActionResult Create([FromBody] CreateAlbumRequest request)
        {
            var album = Album.Create(request.Title, request.Artist, request.Year, request.Price, request.Image_url);
            return CreatedAtAction(nameof(Get), new { id = album.Id }, album);
        }

        // PUT api/albums/5
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] CreateAlbumRequest request)
        {
            var album = Album.Update(id, request.Title, request.Artist, request.Year, request.Price, request.Image_url);
            if (album == null)
            {
                return NotFound();
            }
            return Ok(album);
        }

        // DELETE api/albums/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (!Album.Delete(id))
            {
                return NotFound();
            }
            return NoContent();
        }
    }

    public record CreateAlbumRequest(string Title, string Artist, int Year, double Price, string Image_url);
}
