using System;
using Xunit;
using albums_api.Controllers;
using albums_api.Models;

namespace albums_api.Tests
{
    public class AlbumControllerTests
    {
        [Fact]
        public void GetAll_ReturnsAllAlbums()
        {
            var controller = new AlbumController();
            var result = controller.Get(null);
            Assert.Equal("OkObjectResult", result.GetType().Name);

            var value = result.GetType().GetProperty("Value")?.GetValue(result);
            Assert.NotNull(value);

            bool found = false;
            foreach (var item in (System.Collections.IEnumerable)value)
            {
                var idProp = item.GetType().GetProperty("Id");
                if (idProp != null && (int)idProp.GetValue(item) == 1)
                {
                    found = true;
                    break;
                }
            }

            Assert.True(found);
        }

        [Fact]
        public void GetById_ReturnsAlbum_WhenExists()
        {
            var controller = new AlbumController();
            var result = controller.Get(1);
            Assert.Equal("OkObjectResult", result.GetType().Name);

            var value = result.GetType().GetProperty("Value")?.GetValue(result);
            Assert.NotNull(value);
            var idProp = value.GetType().GetProperty("Id");
            Assert.Equal(1, idProp.GetValue(value));
        }

        [Fact]
        public void GetById_ReturnsNotFound_WhenMissing()
        {
            var controller = new AlbumController();
            var result = controller.Get(9999);
            Assert.Equal("NotFoundResult", result.GetType().Name);
        }

        [Fact]
        public void Create_AddsAlbum_ReturnsCreated()
        {
            var controller = new AlbumController();
            var req = new CreateAlbumRequest("Test Title", "Test Artist", 2025, 9.99, "img");
            var result = controller.Create(req);
            Assert.Equal("CreatedAtActionResult", result.GetType().Name);

            var value = result.GetType().GetProperty("Value")?.GetValue(result);
            Assert.NotNull(value);
            var idProp = value.GetType().GetProperty("Id");
            Assert.True((int)idProp.GetValue(value) > 0);
        }
    }
}
